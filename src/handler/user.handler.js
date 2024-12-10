import md5 from "md5";
import userService from "../common/services/user.service.js";
import {sendError} from "../common/utils/send.Error.js";
import {CommonException} from "../common/exeption/index.js";

export async function createUserHandler(request,response) {
    try {
        const data = request.body
        //check email exists
        const isValidEmail = await userService.findByQuery({email:data.email})
        if(isValidEmail.length) return response.json(CommonException.BadRequest("This email is already in use."))
        //hash password
        data.password = md5(data.password)
        //create user
        const result = await userService.create(data)
        //return result
        return response.json(CommonException.Success(result))
    } catch (error) {
        sendError(response,error)
    }

}

export async function getAllUserHandler(request,response) {
    try {
        //find all users
        const pipeline = [
            {$project: {email: 1,role: 1}}
        ]
        const data = await userService.aggregate({},pipeline)      // aggregatsiya orqali
        //return result
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
        const data = await userService.getByType(type)
        return response.json(CommonException.Success(data))
    } catch (error) {
        return response.status(400).json(CommonException.Unknown(error.message))
    }
}