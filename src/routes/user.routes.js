import express from "express"
import { createUserHandler, deleteUserByIdHandler, getAllUserHandler, getUserByIdHandler, updateUserHandler } from "../handler/user.handler.js"
import { validateIt } from "../common/middleware/validate.js"
import { UserSchemas } from "../common/joi-schemas/user.scema.js"
import { baseSchemas } from "../common/joi-schemas/base.schema.js"
import {authorization} from "../common/middleware/auth.js"
import {checkRole} from "../common/middleware/auth-role.js"

const routes = express.Router()

routes.route("/" )
    .post(authorization,checkRole("admin"),validateIt(UserSchemas.createUser) , createUserHandler)
    .get(authorization,checkRole("admin"),getAllUserHandler)
    .put(authorization , checkRole("admin"),validateIt(UserSchemas.updateUser),updateUserHandler)

routes.get("/:_id" , authorization , checkRole('admin'),validateIt(baseSchemas.byId , 'params'), getUserByIdHandler)
routes.delete("/:_id",authorization,checkRole('admin'), validateIt(baseSchemas.byId , 'params') , deleteUserByIdHandler) 
export default routes