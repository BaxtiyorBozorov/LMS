import Joi from "joi";

export const groupSchema = {
    create:Joi.object({
        name:Joi.string()
                .required(),
        teacherId:Joi.string()
                    .hex()
                    .length(24)
                    .required(),
        students:Joi.array()
                    .items(Joi.string().hex().length(24))
                    .required()
    }),
    update:Joi.object({
        _id:Joi.string()
                .hex()
                .length(24)
                .required(),
        name:Joi.string(),
        teacherId:Joi.string()
                    .hex()
                    .length(24),
        students:Joi.array()
                    .items(Joi.string()
                    .hex()
                    .length(24))
    })
}