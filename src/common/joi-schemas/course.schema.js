import Joi from "joi";

export const courseSchemas = {
    createCourse: Joi.object({
        title: Joi.string().required(),
        discription: Joi.string().required(),
        // teacherId: Joi.string().hex().length(24).required(),
        price: Joi.number().required(),
        startDate: Joi.string().pattern(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/).required(),
    }),
    updateCourse: Joi.object({
        _id: Joi.string().hex().length(24).required(),
        title: Joi.string().optional(),
        discription: Joi.string().optional(),
        // teacherId: Joi.string().hex().length(24).optional(),
        price: Joi.number().optional(),
        startDate: Joi.string().pattern(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/).optional(),
      
    })
}