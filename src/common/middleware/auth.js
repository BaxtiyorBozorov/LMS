import jwt from 'jsonwebtoken'
import {CommonException} from '../exeption/index.js'
import {ENV} from '../config.js'
import userService from '../services/user.service.js'

export async function authorization(request , response , next) {
    try {
        const token = request.headers['token']
        if(!token) throw new Error("Authentication token is missing or invalid")
        const payload = jwt.verify(token , ENV.TOKEN_SECRET_KEY)
        request.user = await userService.findWithId(payload.userId)
        next()
    } catch (error) {
        response.status(401).json(CommonException.Unauthorized(error.message))
    }
}