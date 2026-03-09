const Joi = require('joi');



const signupSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .trim()
        .required()
        .messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 3 characters',
        }),

    email: Joi.string()
        .email()
        .lowercase()
        .trim()
        .required()
        .messages({
            'string.email': 'Invalid email format',
            'string.empty': 'Email is required',
        }),

    password: Joi.string()
        .min(6)
        .max(20)
        .required()
        .pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9])'))
        .messages({
            'string.pattern.base':
                'Password must contain at least one uppercase letter and one number',
            'string.min': 'Password must be at least 6 characters',
        }),

    masterPassword: Joi.string()
        .min(6)
        .max(20)
        .required()
        .pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9])'))
        .messages({
            'string.pattern.base':
                'Master Password must contain at least one uppercase letter and one number',
            'string.min': 'Password must be at least 6 characters',
        }),
});

const loginSchema = Joi.object({

    email: Joi.string()
        .email()
        .lowercase()
        .trim()
        .required()
        .messages({
            'string.email': 'Invalid email format',
            'string.empty': 'Email is required',
        }),

    password: Joi.string()
        .min(6)
        .max(20)
        .required()
        .pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9])'))
        .messages({
            'string.pattern.base':
                'Password must contain at least one uppercase letter and one number',
            'string.min': 'Password must be at least 6 characters',
        }),
});

module.exports = { signupSchema, loginSchema };