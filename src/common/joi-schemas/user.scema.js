import Joi from "joi";

export const UserSchemas = {
        createUser: Joi.object({
                fullName: Joi.string()
                        .pattern(/^[A-Z][a-z]+ [A-Z][a-z]+$/)
                        .required(),
                userName: Joi.string()       
                        .required(),
                 phoneNumber: Joi.string()
                        .pattern(/^(\+998|8\-9|998)?\s?(\d{2})?\-?\d{3}\-?\d{2}\-?\d{2}$/)
                        .length(13)
                        .required(),
           
                password: Joi.string()
                        .trim()
                        .min(6)
                        .max(30)
                        .required(),
                birthDate: Joi.string()
                        .pattern(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/)
                        .required()
                        .messages({
                          'string.pattern.base': 'Tug‘ilgan sana dd-mm-yyyy formatida bo‘lishi kerak',
                          'any.required': 'Tug‘ilgan sana majburiy maydon',
                        }),
                parentsNumber: Joi.string()
                                .pattern(/^(\+998|8\-9|998)?\s?(\d{2})?\-?\d{3}\-?\d{2}\-?\d{2}$/)
                                .length(13),
                paretnsName: Joi.string()
                                .pattern(/^[A-Z][a-z]+ [A-Z][a-z]+$/),
                balans: Joi.number(),
                roleId: Joi.string()
                                .hex()
                                .length(24)
                                .optional(),
                groupId: Joi.string()
                                .hex()
                                .length(24)
                                .optional(),
                photoUrl: Joi.string(),
                isActive: Joi.boolean(),

        }),
        updateUser: Joi.object({
            _id: Joi.string().hex().length(24).required() ,
           
             fullName: Joi.string()
                        .pattern(/^[A-Z][a-z]+ [A-Z][a-z]+$/)
                        .optional(),
                userName: Joi.string()       
                        .optional(),
                phoneNumber: Joi.string()
                        .pattern(/^(\+998|8\-9|998)?\s?(\d{2})?\-?\d{3}\-?\d{2}\-?\d{2}$/)
                        .length(13)
                        .optional(),
           
                password: Joi.string()
                        .trim()
                        .min(6)
                        .max(30)
                        .optional(),
                birthDate: Joi.string()
                        .pattern(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/)
                        .optional()
                        .messages({
                          'string.pattern.base': 'Tug‘ilgan sana dd-mm-yyyy formatida bo‘lishi kerak',
                          'any.required': 'Tug‘ilgan sana majburiy maydon',
                        }),
                groupId: Joi.string()
                                .hex()
                                .length(24)
                                .optional(),
                parentsNumber: Joi.string()
                                .pattern(/^(\+998|8\-9|998)?\s?(\d{2})?\-?\d{3}\-?\d{2}\-?\d{2}$/)
                                .length(13),
                paretnsName: Joi.string()
                                .pattern(/^[A-Z][a-z]+ [A-Z][a-z]+$/),
                
                photoUrl: Joi.string(),
                isActive: Joi.boolean(),
                  
        }),
        byType: Joi.object({
            type: Joi.string()
                    .valid("admin", 'student', "teacher")
                    .required()
        })
    
    }
       