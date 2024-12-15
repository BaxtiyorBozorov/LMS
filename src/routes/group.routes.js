import { Router } from "express";
import { addStudentToGroupHandler, 
    createGroupHandler, 
    deleteGroupHandleer, 
    getGroupHandler, 
    getGroupStudentsHandler, 
    removeStudentFromGroupHandler } from "../handler/group.handler.js";
import { authorization } from "../common/middleware/auth.js";
import { validateIt } from "../common/middleware/validate.js";
import { addStudentToGroupSchema, groupSchema } from "../common/joi-schemas/group.schemas.js";
import { checkRole } from "../common/middleware/auth-role.js";
import { baseSchemas } from "../common/joi-schemas/base.schema.js";

const router = Router()

router.use(authorization)// middleware for authorization
router.use(checkRole) // middleware for admin role

router.route('/')
    .post(validateIt(groupSchema.create),createGroupHandler)
    .get(getGroupHandler)

router.patch('/:groupId/students/:studentId',validateIt(addStudentToGroupSchema , 'params'),addStudentToGroupHandler)
router.delete('/:groupId/students/:studentId',validateIt(addStudentToGroupSchema , 'params'),removeStudentFromGroupHandler)
router.get('/:groupId/students',validateIt(baseSchemas.groupId , 'params'),getGroupStudentsHandler)
router.delete('/:groupId',validateIt(baseSchemas.groupId , 'params'),deleteGroupHandleer)
export default router