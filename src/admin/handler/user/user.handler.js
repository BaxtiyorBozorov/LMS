import md5 from "md5";
import userService from "../../common/services/user/user.service.js";
import { sendError } from "../../common/utils/send.Error.js";

export async function createUserHandler(request , response) {
    try {
        const data = request.body
        data.password = md5(data.password)
        const result = await userService.create(data)
        // console.log(result);
        
        return response.json({
            message: "OK",
            data: result
        })
    } catch (error) {
        sendError(response , error)
    }
    
}

export async function getAllUserHandler(request  , response) {
    try {
        // const pipleline
        // const data = await userService.getAll({address:1})
        const pipeline = [
            {$project:{fullName: 1 , age:1 , address:1 , phoneNumber:1}}
        ]
        const data = await userService.aggregate({}, pipeline)      // aggregatsiya orqali
        console.log(data);
        return response.json({
            message: "OK",
            data: data
        })
        

    } catch (error) {
        sendError(request , error)
    }
}

// export async function getAllUserHandlerAggregations(request , response) {
//     try {
//         const data = await userService.aggregate({})
//     } catch (error) {
//         sendError(error)
//     }
// }
