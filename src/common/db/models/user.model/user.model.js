import mongoose from "mongoose";
import { COLLECTIONS } from "../../../constants/collections.js";

const UserSchema = new mongoose.Schema({
    fullName: {
        type : String
    },
    email: {
        type: String,
        required:true
    },
    role: {
        type: String,
        enum : ["admin" , "student" , "teacher"],
        default : "student"
    },
    age: {
        type: Number
    },
    password:{
        type: String
    },
    phoneNumber:{
        type: String
    },
    parentsNumber:{
        type: String,
        default:null
    },
    address: {
        country: { type: String, default: "O'zbekiston" }, // Mamlakat
        city: { type: String , default: null },           // Shahar
        district: { type: String, default: null },        // Tuman
        street: { type: String, default: null },          // Ko‘cha
        // postalCode: { type: String, default: null }       // Pochta indeksi
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
} , {
    // timestamps:true, 
    versionKey:false
})
export const UserModel = mongoose.model(COLLECTIONS.USER , UserSchema)