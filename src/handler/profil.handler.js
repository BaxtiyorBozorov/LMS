import { CommonException } from "../common/exeption/index.js";
import profilService from "../common/services/profil.service.js";
import userService from "../common/services/user.service.js";
import { dateParser } from "../common/utils/date.parser.js";
import { sendError } from "../common/utils/send.Error.js";

export async function createProfilHandler(request , response) {
    try {
        const data = request.body
        const user = await userService.findById(data.userId )
        if(!user) return response.json(CommonException.NotFound(data.userId))
        
        data.birthDate = dateParser(data.birthDate)
        
        const result = await profilService.create(data)

        return response.json(CommonException.Success(result))
    } catch (error) {
        console.log(error);
        
        response.json({error: error})
    }
}

export async function getAllProfilsHandler(request , response) {
    try {
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
        const result = await profilService.getById(_id)
        if(!result) return response.json(CommonException.NotFound(_id) )
        return response.json(CommonException.Success(result))
    } catch (error) {
        console.log();
        response.json(CommonException.Unknown(error))
    }
}

export async function deleteProfilHandler(request , response) {
    try {
        const {_id} = request.params
        const profil = await profilService.getById(_id)
        if(!profil) return response.json(CommonException.NotFound(_id))
        await profilService.deleteOne(_id)
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
        if(!profil) response.json(CommonException.NotFound("Profil not found"))
        data.birthDate = dateParser(data.birthDate)
        await profilService.updateOne(data._id , data)
        response.json(CommonException.Success())
        
    } catch (error) {
        console.log(error);
        response.json(CommonException.Unknown(error))
    }
}