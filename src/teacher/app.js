// console.log("BAxa nima gap");
import express from "express";
import { connectDB } from "../common/db/connect.js";
import { ENV } from "../common/config.js";

const app = express()

async function start (){
    await connectDB()
    console.log(`teacher server is running on http://${ENV.HOST}:${ENV.TEACHER_PORT}`);
    
}
app.listen(ENV.TEACHER_PORT , start)
