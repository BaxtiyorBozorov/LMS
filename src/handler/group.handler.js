import { CommonException } from "../common/exeption/index.js";
import { HttpErrorCodes } from "../common/exeption/error.code.js";
import userService from "../common/services/user.service.js";
import groupService from "../common/services/group.service.js";
import mongoose from "mongoose";
import { groupModel } from "../common/db/models/group.model.js";
import { UserModel } from "../common/db/models/user.model.js";
import { profilModel } from "../common/db/models/profil.model.js";


export const createGroupHandler = async (req, res) => {
    try {
        const data = req.body
        const teacher = await userService.findById(data.teacherId)
        if(!teacher || teacher.role !== 'teacher') return res.status(HttpErrorCodes.NotFound).json(CommonException.NotFound("Teacher not found"))
        for(let studentId of data.students){
            const student = await userService.findById(studentId)
            if(!student || student.role !== 'student') return res.status(HttpErrorCodes.NotFound).json(CommonException.NotFound("Student not found"))
        }
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
                    from: 'users',
                    localField: 'teacherId',
                    foreignField: '_id',
                    as: 'teacher'
                }
            },
            {
                $project: {
                    name: 1, // Guruh nomi
                    students: 1, // O‘quvchilar
                    teacher: {
                        $arrayElemAt: [
                            {
                                $map: {
                                    input: "$teacher",
                                    as: "t",
                                    in: {
                                        _id: "$$t._id",     // Faqat kerakli maydonlarni tanlang
                                        email: "$$t.email"
                                    }
                                }
                            }, 0
                        ]
                    }
                }
            }
        ];
        
        const groups = await groupService.aggregate({},pipeline)
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
        const updatedGroup = await groupService.update(data._id , data)
        return res.status(HttpErrorCodes.Success).json(CommonException.Success(updatedGroup))
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
        if(!student || student.role !== 'student') return res.status(HttpErrorCodes.NotFound).json(CommonException.NotFound("Student not found"))
            // pipeline create
        const pipeline = [
            // {
            //     $match: {
            //         _id: mongoose.Types.ObjectId(groupId) // Guruhni topish
            //     }
            // },
            {
                $addFields: {
                    students: {
                        $setUnion: ["$students", [ new mongoose.Types.ObjectId(studentId)]] // Student qo‘shish (takrorlanishdan qochadi)
                    },
                    updatedAt: new Date() // Yangilangan vaqtni qo‘shish
                }
            },
            {
                $merge: {
                    into: "groups", // Yangilangan ma'lumotni saqlash uchun "groups" kolleksiyasiga qaytaradi
                    on: "_id",
                    whenMatched: "merge",
                    whenNotMatched: "discard" // Guruh topilmasa, yangisini yaratmaydi
                }
            }
        ];
        await groupService.aggregate({_id: new mongoose.Types.ObjectId(groupId)}, pipeline)
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
        if(!student || student.role !== 'student') return res.status(HttpErrorCodes.NotFound).json(CommonException.NotFound("Student not found"))
        
        await groupService.softUpdateOne(groupId, { $pull: { students: studentId } })
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
        
        const result = await groupModel.findById(groupId)
            .populate({
                path: 'users',
                model: UserModel,
                select: 'email',
                populate: {
                    path: 'profils',
                    model: profilModel,
                    select: 'firstName lastName profilImage'
                }
            })
            .exec()
        return res.status(HttpErrorCodes.Success).json(CommonException.Success(result))
    } catch (error) {
        console.log(error);
        return res.status(HttpErrorCodes.InternalServerError).json(CommonException.Unknown(error.message))
    }
}