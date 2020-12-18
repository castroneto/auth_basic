const api = require('./api.routes');
const sercurity = require('../middlewares/sercurity');

module.exports = function(app) {
    app.use('/api/v1', api);
    
    app.get('/', function (req, res) {
        res.render('login');
    });
    
    app.get('/register', (req, res) => {
        res.render('register');
    });
    
    app.get('/home', sercurity, (req, res) => {
        res.render('home', { nome: req.user.nome, email: req.user.email });
    });
}