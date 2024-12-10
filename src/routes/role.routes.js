import {Router} from "express"
import {createRoleHandler , getRoleHandler , updateRoleHandler , deleteRoleHandler , addRoleToUserHandler} from "../handler/role.handler.js"
import {validateIt} from "../common/middleware/validate.js"
import {roleSchemas} from "../common/joi-schemas/role.schema.js"
import { authorization } from "../common/middleware/auth.js"
import { baseSchemas } from "../common/joi-schemas/base.schema.js"

const router = Router()

router.post("/" , authorization,validateIt(roleSchemas.createRole) , createRoleHandler)
router.get("/" , authorization,getRoleHandler)
router.put("/" , authorization, validateIt(roleSchemas.updateRole) , updateRoleHandler)
router.delete("/:_id" , authorization , validateIt(baseSchemas.byId , 'params'), deleteRoleHandler)
router.post("/add-role-to-user/" , authorization, addRoleToUserHandler)

export default router