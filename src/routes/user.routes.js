import express from "express"
import { createUserHandler, 
    deleteUserByIdHandler, 
    getAllUserHandler, 
    getUserByIdHandler, 
    getUsersByTypeHandler, 
    updateUserHandler 
} from "../handler/user.handler.js"
import { validateIt } from "../common/middleware/validate.js"
import { UserSchemas } from "../common/joi-schemas/user.scema.js"
import { baseSchemas } from "../common/joi-schemas/base.schema.js"
import {authorization} from "../common/middleware/auth.js"
import {checkRole} from "../common/middleware/auth-role.js"

const routes = express.Router()
routes.use(authorization)
routes.use(checkRole)

routes.route("/" )
    .post(validateIt(UserSchemas.createUser) , createUserHandler)
    .get(getAllUserHandler)
    .put(validateIt(UserSchemas.updateUser),updateUserHandler)

routes.get("/:_id" , validateIt(baseSchemas.byId , 'params'), getUserByIdHandler)
routes.delete("/:_id", validateIt(baseSchemas.byId , 'params') , deleteUserByIdHandler) 
routes.get("/type/:type" , validateIt(UserSchemas.byType , 'params'),getUsersByTypeHandler)
export default routes