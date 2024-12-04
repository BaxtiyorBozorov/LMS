import {Types} from "mongoose";
import { UserModel } from "../../db/models/user.model/user.model.js";
import { BaseService } from "../base.service.js";
import {CommonException} from "../../exeption/index.js";

class UserService extends BaseService{
    project={
        email:1,
        role:1
    }
    async getAll(options = {}){
        return await this.findByQuery({} , {...options , ...this.project})
    }
    async getById(id, options = {}){
        return await this.findById(id, {...this.project, ...options})
    }
    
}

export default new UserService(UserModel)