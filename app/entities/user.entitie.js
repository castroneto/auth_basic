const crypto = require('crypto');
const Joi = require('joi');
const fileStorage = require('../database/fileStorage');

class UserEntitie {
    constructor() {
        this.database = new fileStorage({file: "./app/database/users.json"});
    }

    getHashedPassword(password) {
        const sha256 = crypto.createHash('sha256');
        const hash = sha256.update(password).digest('base64');
        return hash;
    }

    isValid(data) {
        return Joi.object({
            nome: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().required(),
        }).validate(data)
    }

    generateAuthToken() {
        return crypto.randomBytes(30).toString('hex');
    }
}

module.exports = UserEntitie



