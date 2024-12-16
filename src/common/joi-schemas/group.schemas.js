import Joi from "joi";

export const groupSchema = {
    create:Joi.object({
        name:Joi.string()
                .required(),
        teacherId:Joi.string()
                    .hex()
                    .length(24)
                    .required(),
        courseId:Joi.string()
                    .hex()
                    .length(24)
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
        courseId:Joi.string()
                    .hex()
                    .length(24)
    })
}

export const addStudentToGroupSchema = Joi.object({
    groupId:Joi.string()
                .hex()
                .length(24)
                .required(),
    studentId:Joi.string()
                .hex()
                .length(24)
                .required()
})