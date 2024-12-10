import mongoose from "mongoose";
const roleSchema = new mongoose.Schema({
    name : {
        type: String ,
        unique: true
    } , 
    //user
    addUser:{
        type:Boolean ,
        default: false
    } , 
    updateUser:{
        type:Boolean ,
        default: false
    } , 
    deleteUser:{
        type:Boolean ,
        default: false
    } , 
    //role
    addRole:{
        type:Boolean ,
        default: false
    } ,  
    updateRole:{
        type:Boolean ,
        default: false
    } , 
    deleteRole:{
        type:Boolean ,
        default: false
    } ,
    //profil
    addProfil:{
        type:Boolean,
        default:false
    } , 
    updateProfil:{
        type:Boolean,
        default:false
    } , 
    deleteProfil:{
        type:Boolean,
        default:false
    },
    //course
    addCourse:{
        type:Boolean,
        default:false
    } , 
    updateCourse:{
        type:Boolean,
        default:false
    },
    deleteCourse:{
        type:Boolean,
        default:false
    },
    createdAt: {
        type: mongoose.SchemaTypes.Mixed,
        default:0
    },
    updatedAt: {
        type: mongoose.SchemaTypes.Mixed,
        default:0
    },
    deletedAt:{
        type: mongoose.SchemaTypes.Mixed,
        default:0
    }
},{
    versionKey:false
})

export const RoleModel = mongoose.model("role" , roleSchema)