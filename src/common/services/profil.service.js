import { profilModel } from "../db/models/profil.model.js";
import { BaseService } from "./base.service.js";

class ProfilService extends BaseService{
    project = {
        firstName: 1 , 
        lastName: 1,
        birthDate: 1, 
        phoneNumber:1
    }
    async getAll(options = {}){
        return await this.findByQuery({} , {...options , ...this.project})
    }
    async getById(id , options = {}){
        return await this.findById(id , {...this.project , ...options})
    }
}

export default new ProfilService(profilModel)