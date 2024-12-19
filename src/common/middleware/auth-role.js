import {CommonException} from "../exeption/index.js"
import roleService from "../services/role.service.js"

const URL_ACCESS = {
    POST: {
        "/admin/group" : "addGroup",
        "/admin/course" : "addCourse",
        "/admin/user" : "addUser",
        '/admin/role' : "addRole",
        "/admin/lesson" : "addLesson",

    },
    PUT: {
        "/admin/group" : "updateGroup",
        "/admin/course" : "updateCourse",
        "/admin/user" : "updateUser",
        "/admin/role" : "updateRole",
        "/admin/lesson" : "updateLesson",
    },
    DELETE: {
        "/admin/group" : "deleteGroup",
        "/admin/course" : "deleteCourse",
        "/admin/user" : "deleteUser",
        "/admin/role" : "deleteRole",
        "/admin/lesson" : "deleteLesson",
    },
    GET: {
        "/admin/role" : "getRole",
        "/admin/user" : "getUser",
        "/admin/group" : "getGroup",
        "/admin/course" : "getCourse",
        "/admin/lesson" : "getLesson",
    },
    PATCH: {
        "/admin/group" : "updateUser",
    }
}

export async function checkRole(request,response,next) {
    try {
        const {roleId} = request.user
        const role = await roleService.findById(roleId)
        const url = request.baseUrl
        const method = request.method
        // console.log(url , method , role);
        
        const permission = role[URL_ACCESS[method][url]]
        if (!permission) {
            return response.status(403).json(CommonException.NotEnoughPermission('permission denied!'))
        }
        
        next()
    } catch (error) {
        console.log(error);
        
        return response.status(500).json(CommonException.Unknown(error.message))
    }
}