import Joi from "joi";

export const ProfilSchemas = {
    createProfil: Joi.object({
        userId: Joi.string().hex().length(24).required() ,

        firstName: Joi.string()
                    .required(),
                    
        lastName: Joi.string()
                    .required(),

        birthDate: Joi.string()
                    .pattern(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/)
                    .required()
                    .messages({
                      'string.pattern.base': 'Tug‘ilgan sana dd-mm-yyyy formatida bo‘lishi kerak',
                      'any.required': 'Tug‘ilgan sana majburiy maydon',
                    }),
                    
        phoneNumber:Joi.string()
                    .pattern(/^(\+998|8\-9|998)?\s?(\d{2})?\-?\d{3}\-?\d{2}\-?\d{2}$/)
                    .length(13)
                    .required(),
                    
        parentsNumber: Joi.string()
                    .pattern(/^(\+998|8\-9|998)?\s?(\d{2})?\-?\d{3}\-?\d{2}\-?\d{2}$/)
                    .length(13),
 } ),
    updateProfil:Joi.object({
        _id:Joi.string().hex().length(24) ,
        userId: Joi.string().hex().length(24) ,
      
        firstName: Joi.string(),
                    
        lastName: Joi.string(),
      
        birthDate: Joi.string()
                    .pattern(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/)
                    .messages({
                      'string.pattern.base': 'Tug‘ilgan sana dd-mm-yyyy formatida bo‘lishi kerak',
                      'any.required': 'Tug‘ilgan sana majburiy maydon',
                    }),
                    
        phoneNumber:Joi.string()
                    .pattern(/^(\+998|8\-9|998)?\s?(\d{2})?\-?\d{3}\-?\d{2}\-?\d{2}$/)
                    .length(13),
                    
        parentsNumber: Joi.string()
                    .pattern(/^(\+998|8\-9|998)?\s?(\d{2})?\-?\d{3}\-?\d{2}\-?\d{2}$/)
                    .length(13),
} )
       }
