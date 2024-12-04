import md5 from "md5";
import jwt from "jsonwebtoken"
import {CommonException} from "../common/exeption/index.js";
import profilService from "../common/services/profils/profil.service.js";
import userService from "../common/services/user/user.service.js";
import {ENV} from "../common/config.js";




export async function loginHandler(request , response) {
    try {
        const data = request.body
        
        const user = await userService.findOne({email:data.login} , {_id:1,email:1 , password:1 , role:1}) // find user 
        
        if(!user) return response.json(CommonException.NotFound("user not found"))

        if(md5(data.password )!== user.password) return response.json(CommonException.IncorrectPassword()) // tekshirish

        const profil = await profilService.findOne({userId:user._id} , {deletedAt:0 , createdAt:0 , updatedAt:0}) // profil find
        if(!profil) return response.json(CommonException.NotFound("Profil not found"))

        const token = jwt.sign({type: user.role , profilId: profil.id  , userId : user._id}, ENV.TOKEN_SECRET_KEY , {expiresIn:"4h"}) //create token

        
        return response.json({
            message: "OK" , 
            token
        })
        
    } catch (error) {
        console.log(error);
        // response.json(CommonException.Unknown(error))
        return response.status(500).json(CommonException.Unknown(error.message));
        
    }
}