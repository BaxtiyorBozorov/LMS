
import { groupModel } from "../db/models/group.model.js"
import {BaseService} from "./base.service.js"

class GroupService extends BaseService {
    project = {
        students: 1,
        name: 1,
        description: 1,
        startDate: 1,
        endDate: 1,
        teacher: 1,
        
    }
    async find(query , options = {}){
        return await this.findByQuery(query , {...options, ...this.project})
    }
}

export default new GroupService(groupModel)