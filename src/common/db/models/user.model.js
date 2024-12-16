import mongoose from "mongoose";
import { COLLECTIONS } from "../../constants/collections.js";

const UserSchema = new mongoose.Schema({
    fullName:{
        type:String
    },
    userName:{
        type:String,
        unique:true
    },
    phoneNumber:{
        type: String,
        unique:true
    },
    password: {
        type: String
    },
    birthDate: {
        type: mongoose.SchemaTypes.Date
    },
    parentsNumber:{
        type: mongoose.SchemaTypes.Mixed,
        default:null
    },
    paretnsName:{
        type:mongoose.SchemaTypes.Mixed,
        default:null
    },
    balans:{
        type:Number,
        default:0
    },
    roleId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: COLLECTIONS.ROLE
    },
    groupId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: COLLECTIONS.GROUP,
        default:null
    },
    photoUrl: {
        type: String,
        default : null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: mongoose.SchemaTypes.Mixed,
        default: 0
    },
    updatedAt: {
        type: mongoose.SchemaTypes.Mixed

    },
    deletedAt: {
        type: mongoose.SchemaTypes.Mixed,
        default: 0
    }
},{
    // timestamps:true, 
    versionKey: false
})
export const UserModel = mongoose.model(COLLECTIONS.USER,UserSchema)