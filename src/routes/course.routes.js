import { Router } from "express";
import { createCourseHandler, deleteCourseHandler, getCourseByIdHandler, getCourseHandler, updateCourseHandler } from "../handler/course.handler.js";
import { authorization } from "../common/middleware/auth.js";
import { validateIt } from "../common/middleware/validate.js";
import { courseSchemas } from "../common/joi-schemas/course.schema.js";
import { baseSchemas } from "../common/joi-schemas/base.schema.js";
import { checkRole } from "../common/middleware/auth-role.js";
const router = Router()

router.use(authorization)
router.use(checkRole)  

router.route("/")
    .get(getCourseHandler)
    .post(validateIt(courseSchemas.createCourse),createCourseHandler)
    .put(validateIt(courseSchemas.updateCourse),updateCourseHandler)

router.route("/:_id")
    .delete(validateIt(baseSchemas.byId ,'params'),deleteCourseHandler)
    .get(validateIt(baseSchemas.byId ,'params'),getCourseByIdHandler)

export default router