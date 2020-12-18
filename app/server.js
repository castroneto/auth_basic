const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const routes = require('./routes');

// To support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// To parse cookies from the HTTP Request
app.use(cookieParser());
app.set('views', path.join(__dirname, '/views'))
app.engine('hbs', exphbs({
    extname: '.hbs',
}));
app.set('view engine', 'hbs');

routes(app)

app.listen(3000);