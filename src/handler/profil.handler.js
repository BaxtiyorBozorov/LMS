import { CommonException } from "../common/exeption/index.js";
import profilService from "../common/services/profil.service.js";
import userService from "../common/services/user.service.js";
import { dateParser } from "../common/utils/date.parser.js";

export async function createProfilHandler(request , response) {
    try {
        const data = request.body
        //find user
        const user = await userService.findById(data.userId )
        //check user exists
        if(!user) return response.json(CommonException.NotFound(data.userId))
        //check profil exists
        const profil = await profilService.findByQuery({userId:user._id})
        
        if(profil.length) return response.status(409).json(CommonException.AllreadyExist("Profil already exists"))
        //parse date
        data.birthDate = dateParser(data.birthDate)
        //create profil
        const result = await profilService.create(data)
        //return result 
        return response.json(CommonException.Success(result))
    } catch (error) {
        console.log(error);
        
        response.json({error: error})
    }
}

export async function getAllProfilsHandler(request , response) {
    try {
        //find all profils
        const pipleline = [
            {$project:{firstName:1 , lastName:1 , birthDate:1}}
        ]
        const data = await profilService.aggregate({} , pipleline)
        return response.json(CommonException.Success(data))
    } catch (error) {
        console.log(error);
        CommonException.Unknown(error)
    }
}

export async function getProfilByIdHandler( request , response){
    try {
        const {_id} = request.params
        //find profil
        const result = await profilService.getById(_id)
        //check profil exists
        if(!result) return response.json(CommonException.NotFound(_id) )
        //return result
        return response.json(CommonException.Success(result))
    } catch (error) {
        console.log();
        response.json(CommonException.Unknown(error))
    }
}

export async function deleteProfilHandler(request , response) {
    try {
        const {_id} = request.params
        //find profil
        const profil = await profilService.getById(_id)
        //check profil exists
        if(!profil) return response.json(CommonException.NotFound(_id))
        //delete profil
        await profilService.deleteOne(_id)
        //return result
        return response.json(CommonException.Success())
    } catch (error) {
        console.log(error);
        response.json(CommonException.Unknown(error))
    }
}

export async function updateProfilHandler(request , response) {
    try {
        const data = request.body
        const profil = await profilService.getById(data._id)
        //check profil exists
        if(!profil) return response.json(CommonException.NotFound("Profil not found"))
        //parse date
        data.birthDate = dateParser(data.birthDate)
        //update profil
        await profilService.updateOne(data._id , data)
        //return result
        return response.json(CommonException.Success())
        
    } catch (error) {
        console.log(error);
        response.json(CommonException.Unknown(error))
    }
}