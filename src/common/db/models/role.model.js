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
    getUser:{
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
    },
    getRole:{
        type:Boolean ,
        default: false
    } ,
    //group
    addGroup:{
        type:Boolean,
        default:false
    },
    updateGroup:{
        type:Boolean,
        default:false
    },  
    deleteGroup:{
        type:Boolean,
        default:false
    },
    getGroup:{
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
    getCourse:{
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