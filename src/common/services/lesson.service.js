

import { lessonModel } from "../db/models/lesson.model.js";
import { BaseService } from "./base.service.js";

class LessonService extends BaseService {
    project = {
        title: 1,
        description: 1,
        resources: 1,
        date: 1,
        groupId: 1
    }
}

export default new LessonService(lessonModel)