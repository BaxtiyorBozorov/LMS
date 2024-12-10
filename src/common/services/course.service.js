import { BaseService } from "./base.service.js"
import { courseModel } from "../db/models/courses.model.js"

class CourseService extends BaseService{
    
}

export const courseService = new CourseService(courseModel)