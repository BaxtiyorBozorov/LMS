import { UserModel } from "../../db/models/user.model/user.model.js";
import { BaseService } from "../base.service.js";

class UserService extends BaseService{
    project={
        fullName:1,
        email:1,
        phoneNumber:1,
        role:1
    }
    async getAll(options = {}){
        return await this.findByQuery({} , {...options , ...this.project})
    }
    
}

export default new UserService(UserModel)