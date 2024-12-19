import Joi from "joi"

export const lessonSchemas = {
    createLesson: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        date: Joi.string()
            .pattern(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/)
            .required()
            .messages({
                'string.pattern.base': 'Sana dd-mm-yyyy formatida bo‘lishi kerak',
                'any.required': 'date majburiy maydon',
            }),
        groupId: Joi.string().required()
    }),
    updateLesson: Joi.object({
        _id: Joi.string()
                .hex()
                .length(24)
                .required(),
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        date:Joi.string()
            .pattern(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/)
            .messages({
                'string.pattern.base': 'Sana dd-mm-yyyy formatida bo‘lishi kerak'
            })
    })
}