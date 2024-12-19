import mongoose from "mongoose";
import { COLLECTIONS } from "../../constants/collections.js";


const lessonSchema  = new mongoose.Schema({
    groupId: {
        type : mongoose.Schema.Types.ObjectId,
        ref : COLLECTIONS.GROUP
    },
    title : {
        type : String, 
        trim: true
    
    },
    description : {
        type : String,
        trim : true
    },
    date: {
        type : mongoose.SchemaTypes.Date
    },
    resources: {
        type : [String],
        default : []
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
        default:0
    }
} , {versionKey: false})

export const lessonModel = mongoose.model(COLLECTIONS.LESSON , lessonSchema)