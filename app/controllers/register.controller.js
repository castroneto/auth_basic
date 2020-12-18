const UserEntitie = require('../entities/user.entitie');

module.exports = async (req, res) => {
    const usersEntitie = new UserEntitie();

    const { error, value } = usersEntitie.isValid(req.body)

    if (error)
        return res.render('register', { message: 'Campos incompletos.', messageClass: 'alert-danger' });

    if (!(value.password === value.confirmPassword))
        return res.render('register', { message: 'Senha não corresponde.', messageClass: 'alert-danger' });


    const users = await usersEntitie.database.find({ email: value.email })

    if (users.length === 0) {

        await usersEntitie.database.create({
            nome: value.nome,
            email: value.email,
            password: usersEntitie.getHashedPassword(value.password)
        })

        return res.render('login', { message: 'Registro concluído. Por favor faça o login para continuar.', messageClass: 'alert-success' });
    } else {
        return res.render('register', { message: 'E-mail já registrado.', messageClass: 'alert-danger' });
    }

}



