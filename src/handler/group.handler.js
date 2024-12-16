import { CommonException } from "../common/exeption/index.js";
import { HttpErrorCodes } from "../common/exeption/error.code.js";
import userService from "../common/services/user.service.js";
import groupService from "../common/services/group.service.js";
import mongoose from "mongoose";
import { groupModel } from "../common/db/models/group.model.js";
import { UserModel } from "../common/db/models/user.model.js";
import { profilModel } from "../common/db/models/profil.model.js";
import roleService from "../common/services/role.service.js";
import { courseService } from "../common/services/course.service.js";

export const createGroupHandler = async (req, res) => {
    try {
        const data = req.body
        const teacher = await userService.findById(data.teacherId)
        const teacherRole = await roleService.findByQuery({name:"teacher"})
        //check teacher and teacher role
        if(!teacher || !teacherRole.length) return res.status(HttpErrorCodes.NotFound).json(CommonException.NotFound("Teacher not found"))
        const course = await courseService.findById(data.courseId)
        //check course
        if(!course) return res.status(HttpErrorCodes.NotFound).json(CommonException.NotFound("Course not found"))
        const group = await groupService.create(data)
        return res.status(HttpErrorCodes.Success).json(CommonException.Success(group))
    } catch (error) {
        console.log(error);
        return res.status(HttpErrorCodes.InternalServerError).json(CommonException.Unknown(error.message))
    }
}

export const getGroupHandler = async (req, res) => {
    try {
        const pipeline = [  
            {
                $lookup: {
                  from: "users", // Teacherlar saqlanadigan kolleksiyaning nomi
                  localField: "teacherId", // Group modeldagi teacherId maydoni
                  foreignField: "_id", // Teachers kolleksiyadagi `_id` maydoni
                  as: "teacher", // Natijada teacher ma'lumotlarini joylash uchun
                },
              },
              {
                $lookup: {
                  from: "courses", // Kurslar saqlanadigan kolleksiyaning nomi
                  localField: "courseId", // Group modeldagi courseId maydoni
                  foreignField: "_id", // Courses kolleksiyadagi `_id` maydoni
                  as: "course", // Natijada course ma'lumotlarini joylash uchun
                },
              },
              {
                $project: {
                  _id: 1,
                  name: 1,
                  teacher: { 
                    _id: { $arrayElemAt: ["$teacher._id", 0] },
                    fullName: { $arrayElemAt: ["$teacher.fullName",0] },
                    profilImage: { $arrayElemAt: ["$teache.profilImage", 0] },
                    phoneNumber: { $arrayElemAt: ["$teacher.phoneNumber", 0] },
                   }, // Teacher obyektini massivdan olish
                  course: { 
                    _id: { $arrayElemAt: ["$course._id", 0] },
                    name: { $arrayElemAt: ["$course.title", 0] },
                    description: { $arrayElemAt: ["$course.discription", 0] },
                    image: { $arrayElemAt: ["$course.image", 0] },
                    price: { $arrayElemAt: ["$course.price", 0] },
                   }, // Course obyektini massivdan olish
                },
              },
        ];
        
        const groups = await groupService.aggregate({},pipeline)
        if(!groups.length) return res.status(HttpErrorCodes.NotFound).json(CommonException.NotFound("Groups not found"))
        return res.status(HttpErrorCodes.Success).json(CommonException.Success(groups))
    } catch (error) {
        console.log(error);
        return res.status(HttpErrorCodes.InternalServerError).json(CommonException.Unknown(error.message))
    }
}

export const updateGroupHandler = async (req, res) => {
    try {
        const data = req.body
        const group = await groupService.findById(data._id)
        if(!group) return res.status(HttpErrorCodes.NotFound).json(CommonException.NotFound("Group not found"))
        if(data.teacherId) {
            const teacher = await userService.findById(data.teacherId)
            const teacherRole = await roleService.findById(teacher.roleId)
            if(!teacher || teacherRole.name !== 'teacher') return res.status(HttpErrorCodes.NotFound).json(CommonException.NotFound("Teacher not found"))
        }
        if(data.courseId) {
            const course = await courseService.findById(data.courseId)
            if(!course) return res.status(HttpErrorCodes.NotFound).json(CommonException.NotFound("Course not found"))
        }
        await groupService.updateOne(data._id , data)
        return res.status(HttpErrorCodes.Success).json(CommonException.Success("Group updated successfully"))
    } catch (error) {
        console.log(error);
        return res.status(HttpErrorCodes.InternalServerError).json(CommonException.Unknown(error.message))
    }
}

export const deleteGroupHandleer = async (req, res) => {
    try {
        const group = await groupService.findById(req.params._id)
        if(!group) return res.status(HttpErrorCodes.NotFound).json(CommonException.NotFound("Group not found"))
        await groupService.deleteOne(req.params._id)
        return res.status(HttpErrorCodes.Success).json(CommonException.Success("Group deleted successfully"))
    } catch (error) {
        console.log(error);
        return res.status(HttpErrorCodes.InternalServerError).json(CommonException.Unknown(error.message))
    }
}

export const addStudentToGroupHandler = async (req, res) => {
    try {
        const {groupId, studentId} = req.params
        const group = await groupService.findById(groupId)
        if(!group) return res.status(HttpErrorCodes.NotFound).json(CommonException.NotFound("Group not found"))
        const student = await userService.findById(studentId)
        const studentRole = await roleService.findById(student.roleId)
        if(!student || studentRole.name !== 'student') return res.status(HttpErrorCodes.NotFound).json(CommonException.NotFound("Student not found"))   
        student.groupId = groupId
        await userService.updateOne(studentId , student)
        return res.status(HttpErrorCodes.Success).json(CommonException.Success("Student added to group successfully"))
    } catch (error) {
        console.log(error);
        return res.status(HttpErrorCodes.InternalServerError).json(CommonException.Unknown(error.message))
    }
}

export const removeStudentFromGroupHandler = async (req, res) => {
    try {
        const {groupId, studentId} = req.params
        const group = await groupService.findById(groupId)
        if(!group) return res.status(HttpErrorCodes.NotFound).json(CommonException.NotFound("Group not found"))
        const student = await userService.findById(studentId)
        const studentRole = await roleService.findById(student.roleId)
        if(!student || studentRole.name !== 'student') return res.status(HttpErrorCodes.NotFound).json(CommonException.NotFound("Student not found"))
        student.groupId = null
        await userService.updateOne(studentId , student)
        return res.status(HttpErrorCodes.Success).json(CommonException.Success("Student removed from group successfully"))
    } catch (error) {
        console.log(error);
        return res.status(HttpErrorCodes.InternalServerError).json(CommonException.Unknown(error.message))
    }
}

export const getGroupStudentsHandler = async (req, res) => {
    try {
        const {groupId} = req.params
        const group = await groupService.findById(groupId)
        if(!group) return res.status(HttpErrorCodes.NotFound).json(CommonException.NotFound("Group not found"))
        
        // const result = await groupModel.findById(groupId)
        //     .populate({
        //         path: 'users',
        //         model: UserModel,
        //         select: 'email',
        //         populate: {
        //             path: 'profils',
        //             model: profilModel,
        //             select: 'firstName lastName profilImage'
        //         }
        //     })
        //     .exec()

        const result = await userService.findByQuery({groupId:groupId}  , { _id:1 , phoneNumber:1  , fullName:1, photoUrl:1 })
        return res.status(HttpErrorCodes.Success).json(CommonException.Success(result))
    } catch (error) {
        console.log(error);
        return res.status(HttpErrorCodes.InternalServerError).json(CommonException.Unknown(error.message))
    }
}

