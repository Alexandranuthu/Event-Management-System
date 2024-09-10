const Joi = require('joi');

module.exports = {
    authSchema : Joi.object({
        userName: Joi.string().required(),
        email: Joi.string().email().required().lowercase(),
        password: Joi.string().min(8).max(50).required(),

    })
}


