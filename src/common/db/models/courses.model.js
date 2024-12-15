import mongoose from "mongoose";
import { COLLECTIONS } from "../../constants/collections.js";

const courseSchema = new mongoose.Schema({
    title: {
        type: String
    },
    discription: {
        type : String
    },
    price: {
        type : Number
    },
    completed:{
        type: Boolean,
        default: false
    },
    startDate: {
        type: Date
    },
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
        default: 0
    }
},{
    versionKey:false
})

export const courseModel = mongoose.model(COLLECTIONS.COURSES , courseSchema)