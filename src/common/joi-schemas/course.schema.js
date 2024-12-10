import Joi from "joi";

export const courseSchemas = {
    createCourse: Joi.object({
        title: Joi.string().required(),
        discription: Joi.string().required(),
        teacherId: Joi.string().hex().length(24).required(),
        price: Joi.number().required(),
        duration: Joi.string().required(),
    }),
    updateCourse: Joi.object({
        _id: Joi.string().hex().length(24).required(),
        title: Joi.string().optional(),
        discription: Joi.string().optional(),
        teacherId: Joi.string().hex().length(24).optional(),
        price: Joi.number().optional(),
        duration: Joi.string().optional(),
    })
}