import mongoose from "mongoose";
import { COLLECTIONS } from "../../../constants/collections.js";

const courseSchema = new mongoose.Schema({
    title: {
        type: String
    },
    discription: {
        type : String
    },
    teacherId: {
        type : mongoose.SchemaType.ObjectId
    },
    category: {
        type: String
    },
    price: {
        type : Number
    },
    duration: {
        type : Number
    }
    
})

export const courseModel = mongoose.model(COLLECTIONS.COURSES , courseSchema)