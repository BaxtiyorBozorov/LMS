import md5 from "md5";
import userService from "../common/services/user.service.js";
import {sendError} from "../common/utils/send.Error.js";
import {CommonException} from "../common/exeption/index.js";
import { dateParser } from "../common/utils/date.parser.js";
import roleService from "../common/services/role.service.js";
export async function createUserHandler(request,response) {
    try {
        const data = request.body
        const isValidUserName = await userService.findByQuery({userName:data.userName})
        if(isValidUserName.length) return response.status(404).json(CommonException.BadRequest("This user name is already in use."))
        const isValidPhoneNumber = await userService.findByQuery({phoneNumber:data.phoneNumber})
        if(isValidPhoneNumber.length) return response.status(404).json(CommonException.BadRequest("This phone number is already in use."))
        if(data.parentsNumber) {
            const isValidParentsNumber = await userService.findByQuery({parentsNumber:data.parentsNumber})
            if(isValidParentsNumber.length) return response.status(404).json(CommonException.BadRequest("This parents number is already in use."))
        }
        data.password = md5(data.password)
        data.birthDate = dateParser(data.birthDate)

        const result = await userService.create(data)
        return response.status(201).json(CommonException.Success(result))

    } catch (error) {
        console.log(error);
        return response.status(400).json(CommonException.Unknown(error.message))
    }

}

export async function getAllUserHandler(request,response) {
    try {
        //find all users
        // const pipeline = [
        //     {$project: {fullName: 1,role: 1}}
        // ]
        // const data = await userService.aggregate({},pipeline)      // aggregatsiya orqali
        
        //return result
        const data = await userService.getAll({})
        return response.json(CommonException.Success(data))


    } catch (error) {
        sendError(request,error)
    }
}

// export async function getAllUserHandlerAggregations(request , response) {
//     try {
//         const data = await userService.aggregate({})
//     } catch (error) {
//         sendError(error)
//     }
// }

export async function getUserByIdHandler(request,response) {
    try {
        const {_id} = request.params
        const result = await userService.getById(_id)
        if (!result) return response.json(
            CommonException.NotFound(_id)
        )

        return response.json(CommonException.Success(result))
    } catch (error) {
        console.log(error);
        CommonException.Unknown(error)

    }
}


export async function deleteUserByIdHandler(request,response) {
    try {
        const {_id} = request.params
        //find user
        const user = await userService.findById(_id)
        //check user exists
        if(!user) return response.json(CommonException.NotFound(_id))

        await userService.deleteOne(_id)
        return response.json(CommonException.Success())
    } catch (error) {
        console.log(error);
        CommonException.Unknown(error)

    }
}

export async function updateUserHandler(request , response){
    try {
        const data = request.body
        //find user
        const user = await userService.findById(data._id)
        //check user exists
        if(!user) return response.json(CommonException.NotFound(data._id))
        //update user
        await userService.updateOne(data._id , data)
        //return result
        return response.json(CommonException.Success())
    } catch (error) {
        console.log(error);
        return response.status(400).json(CommonException.Unknown(error.message))
    }
}

export const getUsersByTypeHandler = async (request , response) => {
    try {
        const {type} = request.params
        const role = await roleService.findByQuery({name:type})
        if(!role.length) return response.status(404).json(CommonException.NotFound(type))
        const data = await userService.findByQuery({roleId:role[0]._id} , {fullName:1 , phoneNumber:1  })
        if(!data.length) return response.status(404).json(CommonException.NotFound(type))
        return response.json(CommonException.Success(data))
    } catch (error) {
        return response.status(400).json(CommonException.Unknown(error.message))
    }
}