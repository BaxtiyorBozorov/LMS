import Dotenv from "dotenv" 
import path from 'path'
import { env } from "process"

Dotenv.config({
    path:path.join(process.cwd() , '.env')
})

export const ENV = {
    HOST : env.HOST || 'localhost',
    ADMIN_PORT: env.ADMIN_PORT || 9000,
    TEACHER_PORT: env.TEACHER_PORT || 8000,
    STUDENT_PORT: env.STUDENT_PORT || 7000,
    DB_URL: env.DB_URL || 'mongodb://localhost:27017/LMS',
    UNIVERSAL_PASSWORD: env.UNIVERSAL_PASSWORD || "universal-password"

}