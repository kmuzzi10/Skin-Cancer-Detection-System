import Joi from 'joi';

// Joi validation schema
const userValidationSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a type of string',
        'string.email': 'Please provide a valid email',
        'any.required': 'Email is required',
    }),
    name: Joi.string().min(3).required().messages({
        'string.base': 'Name should be a type of string',
        'string.min': 'Name should have a minimum length of 3 characters',
        'any.required': 'Name is required',
    }),
    country: Joi.string().required().messages({
        'string.base': 'Country should be a type of string',
        'any.required': 'Country is required',
    }),
    password: Joi.string().min(6).required().messages({
        'string.base': 'Password should be a type of string',
        'string.min': 'Password should have a minimum length of 6 characters',
        'any.required': 'Password is required',
    }),
    answer: Joi.string().required().messages({
        'string.base': 'Answer should be a type of string',
        'any.required': 'Answer is required',
    })
});

// Validate function
const validateUser = (user) => {
    return userValidationSchema.validate(user, { abortEarly: false });
}

export default validateUser;
