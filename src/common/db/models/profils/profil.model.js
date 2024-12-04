import mongoose from "mongoose";
import { COLLECTIONS } from "../../../constants/collections.js";

const ProfilSchema = new mongoose.Schema({
    userId : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: COLLECTIONS.USER
    },
    profilImage: {
        type: String,
        default : null
    },
    firstName: {
        type : String
    },
    lastName: {
        type: String
    },
    birthDate: {
        type: mongoose.SchemaTypes.Date
    },
    phoneNumber:{
        type: String
    },
    parentsNumber:{
        type: mongoose.SchemaTypes.Mixed,
        default:0
    },
    balans:{
        type:Number,
        default:0
    },
    createdAt: {
        type: mongoose.SchemaTypes.Mixed,
        default:0
    },
    updatedAt: {
        type: mongoose.SchemaTypes.Mixed

    },
    deletedAt:{
        type: mongoose.SchemaTypes.Mixed,
        default:0
    }
},{
    versionKey:false
})

export const profilModel = mongoose.model(COLLECTIONS.PROFIL , ProfilSchema)