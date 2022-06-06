import Joi from 'joi'

export const signupSchema = Joi.object({
    userName: Joi.string().required(),
    userEmail: Joi.string().email().required(),
    userPassword: Joi.string().required().min(8).max(30)
})