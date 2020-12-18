const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// To support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// To parse cookies from the HTTP Request
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/static')));
app.set('views', path.join(__dirname, '/views'))
app.engine('hbs', exphbs({
    extname: '.hbs',
}));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.set('view engine', 'hbs');

// Our requests hadlers will be implemented here...

app.listen(3000);