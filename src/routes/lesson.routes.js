import { Router } from "express";
import { createLessonHandler, 
        deleteLessonHandler, 
        getAllLessonsHandler, 
        getLessonHandler, 
        updateLessonHandler 
} from "../handler/lesson.handler.js";
import { authorization } from "../common/middleware/auth.js";
import { checkRole } from "../common/middleware/auth-role.js";
import { validateIt } from "../common/middleware/validate.js";
import { lessonSchemas } from "../common/joi-schemas/lesson.schema.js";
import { baseSchemas } from "../common/joi-schemas/base.schema.js";

const router = Router()

router.use(authorization)
router.use(checkRole)

router.post("/" , validateIt(lessonSchemas.createLesson) , createLessonHandler)
router.get("/all" , getAllLessonsHandler)
router.get("/:_id" , validateIt(baseSchemas.byId , 'params') , getLessonHandler)
router.delete("/:_id" , validateIt(baseSchemas.byId , 'params') ,deleteLessonHandler)
router.put("/" , validateIt(lessonSchemas.updateLesson) , updateLessonHandler)

export default router