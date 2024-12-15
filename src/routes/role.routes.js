import {Router} from "express"
import {createRoleHandler , getRoleHandler , updateRoleHandler , deleteRoleHandler , addRoleToUserHandler} from "../handler/role.handler.js"
import {validateIt} from "../common/middleware/validate.js"
import {roleSchemas} from "../common/joi-schemas/role.schema.js"
import { authorization } from "../common/middleware/auth.js"
import { baseSchemas } from "../common/joi-schemas/base.schema.js"

const router = Router()

// router.use(authorization)
// router.use(checkRole)


router.post("/" , validateIt(roleSchemas.createRole) , createRoleHandler)
router.get("/" , getRoleHandler)
router.put("/" , validateIt(roleSchemas.updateRole) , updateRoleHandler)
router.delete("/:_id" , validateIt(baseSchemas.byId , 'params'), deleteRoleHandler)
router.post("/add-role-to-user/" , addRoleToUserHandler)

export default router