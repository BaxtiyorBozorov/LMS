import mongoose from "mongoose";
import { COLLECTIONS } from "../../../constants/collections.js";

const ProfilSchema = new mongoose.Schema({
    userId : {
        type: mongoose.SchemaType.ObjectId,
        ref: COLLECTIONS.USER
    },
    profilImage: {
        type: String,
        default : null
    }
})

export const profilModel = mongoose.model(COLLECTIONS.PROFIL , ProfilSchema)