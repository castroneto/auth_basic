const UserEntitie = require('../entities/user.entitie');
const Joi = require('joi');
const sessions = require('../sessions');
module.exports = async (req, res) => {
    const usersEntitie = new UserEntitie();

    const { error, value } = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }).validate(req.body)

    if (error)
        return res.render('login', { message: 'Campos incorretos', messageClass: 'alert-danger' });

    const user = await usersEntitie.database.find({ email: value.email });

    if (user.length === 0)
        return res.render('login', { message: 'Usuario não cadastrado', messageClass: 'alert-danger' });

    if (!(user[0].password === usersEntitie.getHashedPassword(value.password)))
        return res.render('login', { message: 'Password incorreto', messageClass: 'alert-danger' });

    if (user[0]) {
        const authToken = usersEntitie.generateAuthToken()

        sessions[authToken] = user;

        res.cookie('AuthToken', authToken);

        res.redirect('/home');
    }
}

