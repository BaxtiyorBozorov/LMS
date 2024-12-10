import { Router } from "express";
import { createCourseHandler, deleteCourseHandler, getCourseByIdHandler, getCourseHandler, updateCourseHandler } from "../handler/course.handler.js";
import { authorization } from "../common/middleware/auth.js";
import { validateIt } from "../common/middleware/validate.js";
import { courseSchemas } from "../common/joi-schemas/course.schema.js";
import { baseSchemas } from "../common/joi-schemas/base.schema.js";

const router = Router()

router.route("/")
    .get(authorization,getCourseHandler)
    .post(authorization,validateIt(courseSchemas.createCourse),createCourseHandler)
    .put(authorization,validateIt(courseSchemas.updateCourse),updateCourseHandler)

router.route("/:_id")
    .delete(authorization, validateIt(baseSchemas.byId ,'params'),deleteCourseHandler)
    .get(authorization, validateIt(baseSchemas.byId ,'params'),getCourseByIdHandler)

export default router