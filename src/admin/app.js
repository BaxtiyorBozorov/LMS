// console.log("BAxa nima gap");
import express from "express";
import { connectDB } from "../common/db/connect.js";
import { ENV } from "../common/config.js";

import userRoutes from './routes/user/user.routes.js'
const app = express()

async function start (){
    await connectDB()
    app.use(express.json())
    app.use('/user' , userRoutes)
    console.log(`adimin server is running on http://${ENV.HOST}:${ENV.ADMIN_PORT}`);
    
}
app.listen(ENV.ADMIN_PORT , start)
