import mongoose from "mongoose";
import {COLLECTIONS} from "../../constants/collections.js";

const otpSchema = new mongoose.Schema({
    userId : {
        type: mongoose.SchemaTypes.ObjectId,
        ref:COLLECTIONS.OTP
    },
    otp: {
        type: Number , 
        default:null
    } , 
    sendAt: Date,
    updatedAt: {
        type: mongoose.SchemaTypes.Mixed,
        default: 0
    },
    deletedAt: {
        type: mongoose.SchemaTypes.Mixed,
        default: 0
    }
})

export const OtpModel = mongoose.model(COLLECTIONS.OTP ,otpSchema )