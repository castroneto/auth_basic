const router = require('express').Router();

router.use('/auth', require('../controllers/login.controller'));
router.use('/register', require('../controllers/register.controller'));
router.use('/logoff', require('../controllers/logoff.controller'));


module.exports = router