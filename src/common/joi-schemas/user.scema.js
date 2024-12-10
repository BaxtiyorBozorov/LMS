import Joi from "joi";

export const UserSchemas = {
        createUser: Joi.object({
            email:    Joi.string()
                        .email()
                        .required(),
    
            role:     Joi.string()
                        .valid("admin", 'student', "teacher"),
    
            password: Joi.string()
                    .trim()
                    .min(6)
                    .max(30)
                    .required(),
        }),
        updateUser: Joi.object({
            _id: Joi.string().hex().length(24).required() ,
           
            role:     Joi.string()
                    .valid("admin", 'student', "teacher"),

            password: Joi.string()
                    .trim()
                    .min(6)
                    .max(30)
                  
        }),
        byType: Joi.object({
            type: Joi.string()
                    .valid("admin", 'student', "teacher")
                    .required()
        })
    
    }
        // fullName: Joi.string()
        //             .pattern(/^[A-Z][a-z']+\s[A-Z][a-z']+\s[A-Z][a-z']+(\s(o'g'li|qizi|ovich|ovna))?$/)
        //             .required(),
        
        // phoneNumber: Joi.string()
        //         .pattern(/^(\+998|8\-9|998)?\s?(\d{2})?\-?\d{3}\-?\d{2}\-?\d{2}$/)
        //         .length(13)
        //         .required(),
        //         //+998 93 729 2777
        // parentsNumber: Joi.string()
        //         .pattern(/^(\+998|8\-9|998)?\s?(\d{2})?\-?\d{3}\-?\d{2}\-?\d{2}$/)
        //         .length(13),
                
        // address: Joi.object({
        //     country:Joi.string(),
        //     city: Joi.string(),
        //     district: Joi.string(),
        //     street: Joi.string()
            
        // })
        // age: Joi.number()
        //         .min(0)
        //         .max(100)
        //         .required(),