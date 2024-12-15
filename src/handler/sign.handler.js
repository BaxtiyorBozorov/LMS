import md5 from "md5";
import jwt from "jsonwebtoken"
import {CommonException} from "../common/exeption/index.js";
import profilService from "../common/services/profil.service.js";
import userService from "../common/services/user.service.js";
import {ENV} from "../common/config.js";
import {otpGenerator} from "../common/utils/otp.generator.js";
import otpService from "../common/services/otp.service.js";
import {sendEmail} from "../common/utils/otp.sender.js";
import { HttpErrorCodes } from "../common/exeption/error.code.js";
import roleService from "../common/services/role.service.js";




export async function loginHandler(request , response) {
    try {
        const data = request.body
        
        const user = await userService.findOne({userName:data.login} ) // find user 
        
        if(!user) return response.json(CommonException.NotFound("user not found"))

        if(md5(data.password )!== user.password) return response.status(HttpErrorCodes.Unauthorized).json(CommonException.IncorrectPassword()) // tekshirish
        const role = await roleService.findById(user.role)

        const token = jwt.sign({userId:user._id , type : role.name }, ENV.TOKEN_SECRET_KEY , ) //create token

        console.log(token);
        
        return response.status(HttpErrorCodes.Success).json(CommonException.Success(token))
        
    } catch (error) {
        console.log(error);
        // response.json(CommonException.Unknown(error))
        return response.status(500).json(CommonException.Unknown(error.message));
        
    }
}

export async function resetPasswortOtpHandler(request , response) {
    try {
        const {email} = request.body
        if(!email) throw new Error("email must be provided!")
        const user = await userService.findOne({email})
        if(!user)  throw new Error("user not found")
        const profil = await profilService.findOne({userId:user._id})
        if(!profil) throw new Error("You don't have a profile yet!")
        const otp = otpGenerator()
        const otpParams = {
            userId: user._id,
            otp,
            sendAt: new Date()
        }
        await otpService.updateOne(user._id , otpParams , {upsert : true})
        await sendEmail(user.email , otp )
        return response.json(CommonException.Success("Your verification code has been sent to your email."))

    } catch (error) {
        console.log(error);
        
        return response.status(500).json(CommonException.Unknown(error.message))
    }
}

export async function resetPasswordOtpVeritifyHandler(request , response) {
    try {
        const {email , otp} = request.body
        if(!email) throw new Error("Email must be provided!")
        if(!otp) throw new Error("otp must be provided!")
        const user = await userService.findOne({email})
        if(!user)  return response.json(CommonException.NotFound('user'))
        const exitingOtp = await otpService.findOne({userId:user._id})
        if(!exitingOtp) throw new Error("otp not found")
        console.log(otp , exitingOtp.otp);
        if(otp !== exitingOtp.otp) throw new Error("Otp is incorrect!")
        const profil = await profilService.findOne({userId:user._id})
        const token = jwt.sign({type: user.role , userId:user._id , profilId:profil._id} ,ENV.TOKEN_SECRET_KEY)

        return response.json({
            message:"Ok",
            token
        })

    } catch (error) {
        console.log(error);
        
        return response.status(500).json(CommonException.Unknown(error.message))
    }
    
}

export async function resetPasswordHandler(request , response) {
    try {
        const {password} = request.body
        const user = request.user
        await userService.updateOne(user._id , {password:md5(password)})
        return response.json(CommonException.Success("Password updated successfully"))
    } catch (error) {
        console.log(error);
        
        return response.status(500).json(CommonException.Unknown(error.message))
    }
}