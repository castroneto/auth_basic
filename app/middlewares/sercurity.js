const sessions = require('../sessions');

module.exports = function (req, res, next) {
    // Get auth token from the cookies
    const authToken = req.cookies['AuthToken'];
    // Inject the user to the request

    if (!sessions[authToken]) {
        return res.render('login', {
            message: 'Please login to continue',
            messageClass: 'alert-danger'
        });
    }

    req.user = sessions[authToken][0];

    next();
}