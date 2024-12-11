import { COLLECTIONS } from "../../constants/collections.js";
import mongoose from "mongoose";


const groupSchema = new mongoose.Schema({
    name:{
        type: String , 
        unique: true
    },
    teacherId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: COLLECTIONS.USER   
    },
    students: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: COLLECTIONS.USER
    }],
    createdAt: {
        type: mongoose.SchemaTypes.Mixed,
        default:0
    },
    updatedAt: {
        type: mongoose.SchemaTypes.Mixed,
        default:0
    },
    deletedAt: {
        type: mongoose.SchemaTypes.Mixed,
        default:0
    }
} , {versionKey: false})

export const groupModel = mongoose.model(COLLECTIONS.GROUP , groupSchema)