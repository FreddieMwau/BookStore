import Joi from 'joi'

export const addBookSchema = Joi.object({
    bookTitle: Joi.string().required(),
    bookImageUrl: Joi.string().required(),
    bookAuthor: Joi.string().required(),
    bookDescription: Joi.string().required(),
    publishedDate: Joi.number().required()
})