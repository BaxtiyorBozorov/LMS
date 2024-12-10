import Joi from "joi";

export const roleSchemas = {
    createRole: Joi.object({
        name: Joi.string().required(),
        addUser: Joi.boolean(),
        updateUser:Joi.boolean(),
        deleteUser:Joi.boolean(),
        addRole:Joi.boolean(),
        updateRole:Joi.boolean(),
        deleteRole:Joi.boolean(),
        addProfil:Joi.boolean(),
        updateProfil:Joi.boolean(),
        deleteProfil:Joi.boolean(),
        addCourse:Joi.boolean(),
        updateCourse:Joi.boolean(),
        deleteCourse:Joi.boolean()
    }),
    updateRole: Joi.object({
        _id: Joi.string().required(),
        name: Joi.string(),
        addUser: Joi.boolean(),
        updateUser:Joi.boolean(),
        deleteUser:Joi.boolean(),
        addRole:Joi.boolean(),
        updateRole:Joi.boolean(),
        deleteRole:Joi.boolean(),
        addProfil:Joi.boolean(),
        updateProfil:Joi.boolean(),
        deleteProfil:Joi.boolean(),
        addCourse:Joi.boolean(),
        updateCourse:Joi.boolean(),
        deleteCourse:Joi.boolean()
    })
}