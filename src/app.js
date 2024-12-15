// console.log("BAxa nima gap");
import express from "express";
import { connectDB } from "./common/db/connect.js";
import { ENV } from "./common/config.js";

import userRoutes from './routes/user.routes.js'
import signRoutes from './routes/sign.routes.js'
import roleRoutes from './routes/role.routes.js'
import courseRoutes from './routes/course.routes.js'
import groupRoutes from './routes/group.routes.js'

const app = express()

async function start (){
    await connectDB()
    app.use(express.json())
    app.use('/admin/user' , userRoutes)
    app.use('/sign' , signRoutes)
    app.use('/admin/role' , roleRoutes)
    app.use('/admin/course' , courseRoutes)
    app.use('/admin/group' , groupRoutes)
    console.log(`adimin server is running on http://${ENV.HOST}:${ENV.ADMIN_PORT}`);
    
}
app.listen(ENV.ADMIN_PORT , start)
