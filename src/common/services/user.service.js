import {Types} from "mongoose";

import { BaseService } from "./base.service.js";
import { UserModel } from "../db/models/user.model.js";
class UserService extends BaseService{
    project={
        role:1,
        fullName:1,
        birthDate:1,
        phoneNumber:1,
        
    }
    async getAll(options = {}){
        return await this.findByQuery({} , {...options , ...this.project})
    }
    async getById(id, options = {}){
        return await this.findById(id, {...this.project, ...options})
    }
    
    async getByType(type , options = {}){
        return await this.findByQuery({role:type} , {...this.project, ...options})
    }
    async find(query , options = {}){
        return await this.findByQuery(query , {...this.project, ...options})
    }
}

export default new UserService(UserModel)