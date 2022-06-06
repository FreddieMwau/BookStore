import Joi from 'joi'

export const loginSchema = Joi.object({
    userEmail: Joi.string().email().required(),
    userPassword: Joi.string().required().min(8).max(30)
})