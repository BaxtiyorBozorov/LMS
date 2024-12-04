import jwt from 'jsonwebtoken'
import {CommonException} from '../exeption/index.js'
import {ENV} from '../config.js'
import userService from '../services/user/user.service.js'
import profilService from '../services/profils/profil.service.js'

export async function authorization(request , response , next) {
    try {
        const token = request.headers['token']
        if(!token) throw new Error("token must be provided")
        const payload = jwt.verify(token , ENV.TOKEN_SECRET_KEY)
        request.user = await userService.findWithId(payload.userId)
        request.profil = await profilService.findWithId(payload.profilId)

        next()
    } catch (error) {
        response.status(500).json(CommonException.Unknown(error.message))
    }
}