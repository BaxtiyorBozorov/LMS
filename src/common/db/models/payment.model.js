import mongoose, { Schema } from "mongoose";
import { COLLECTIONS } from "../../constants/collections.js";

const paymetSchema = Schema({
    studentId:{
        type : mongoose.SchemaTypes.ObjectId,
        ref: COLLECTIONS.USER
    },
    courseId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: COLLECTIONS.COURSES
    },
    amount:{
        type:Number,
    },
    status:{
        type:String,
        enum:["successful" , 'pending' , "failed"],
        default: "pending"
    },
    createdAt:{
        type:mongoose.SchemaTypes.Mixed,
        default:0
    },
    updatedAt: {
        type:mongoose.SchemaTypes.Mixed,
        default :0
    },
    deletedAt:{
        type : mongoose.SchemaTypes.Mixed,
        default : 0
    }
})

export const paymentModel = mongoose.model (COLLECTIONS.PAYMENTS , paymetSchema)

