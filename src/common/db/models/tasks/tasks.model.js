import mongoose from "mongoose";
import { COLLECTIONS } from "../../../constants/collections.js";

const taskSchema = new mongoose.Schema({
    patokId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref: COLLECTIONS.PATOK
    },
    description: {type: String},
    maxBall:{type : Number},
    document:{}
})