import md5 from "md5";
import userService from "../common/services/user/user.service.js";
import {sendError} from "../common/utils/send.Error.js";
import {CommonException} from "../common/exeption/index.js";

export async function createUserHandler(request,response) {
    try {
        const data = request.body
        const isValidEmail = await userService.findByQuery({email:data.email})
        // console.log(isValidEmail.length);
        if(isValidEmail.length) return response.json(CommonException.BadRequest("This email is already in use."))
        data.password = md5(data.password)
        const result = await userService.create(data)
        return response.json(CommonException.Success(result))
    } catch (error) {
        sendError(response,error)
    }

}

export async function getAllUserHandler(request,response) {
    try {
        const pipeline = [
            {$project: {email: 1,role: 1}}
        ]
        const data = await userService.aggregate({},pipeline)      // aggregatsiya orqali
        // console.log(data);
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
        const user = await userService.findById(_id)
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
        const user = await userService.findWithId(data._id)
        await userService.updateOne(data._id , data)
        response.json({
            message:"OK"
        })

    } catch (error) {
        console.log(error);
        return response.status(400).json(CommonException.Unknown(error.message))
    }
}