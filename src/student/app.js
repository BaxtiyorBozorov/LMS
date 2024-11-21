// console.log("BAxa nima gap");
import express from "express";
import { connectDB } from "../common/db/connect.js";
import { ENV } from "../common/config.js";

const app = express()

async function start (){
    await connectDB()
    console.log(`student server is running on http://${ENV.HOST}:${ENV.STUDENT_PORT}`);
    
}
app.listen(ENV.STUDENT_PORT , start)

