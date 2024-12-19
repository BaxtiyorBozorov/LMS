import { CommonException } from "../common/exeption/index.js";
import { HttpErrorCodes } from "../common/exeption/error.code.js";
import { dateParser } from "../common/utils/date.parser.js";
import lessonService from "../common/services/lesson.service.js";
import groupService from "../common/services/group.service.js";
import { COLLECTIONS } from "../common/constants/collections.js";


export const createLessonHandler = async (req, res) => {
    try {   
        const data = req.body 
        const group  = await groupService.findById(data.groupId)
        if(!group) return res.status(HttpErrorCodes.NotFound).json(CommonException.NotFound("Group not found"))
        data.date = dateParser(data.date)
        const lesson = await lessonService.create(data)
        return res.status(201).json(CommonException.Success(lesson))
    } catch (error) {
        console.log(error);
        return res.status(HttpErrorCodes.ServerError).json(CommonException.Unknown(error.message))
    }
}

export const getAllLessonsHandler = async (req, res) => {
    try {
        const pipeline = [
            {
                $lookup: {
                    from: COLLECTIONS.GROUP,
                    localField: "groupId",
                    foreignField: "_id",
                    as: "group"
                }
            } , 
            {
                $unwind:"$group"
            } , 
            {
                $lookup:{
                    from:COLLECTIONS.USER,
                    localField:"group.teacherId",
                    foreignField:"_id",
                    as:"teacher"
                }
            } , 
            {
                $unwind:"$teacher"
            } , 
            {
                $lookup:{
                    from:COLLECTIONS.COURSES,
                    localField:"group.courseId",
                    foreignField:"_id",
                    as:"course"
                }
            } , 
            {
                $unwind:"$course"
            } , 
            {
                $project:{
                    title:1 , 
                    date:1 , 
                    description:1 , 
                    
                    group:{
                        _id:"$group._id",
                        name:"$group.name"
                    },
                    course:{
                        _id:"$course._id",
                        title:"$course.title",
                        discription:"$course.discription",
                        price:"$course.price",
                        completed:"$course.completed"
                    },
                    teacher:{
                        _id:"$teacher._id",
                        fullName:"$teacher.fullName",
                        phoneNumber:"$teacher.phoneNumber"

                    } 
                }
            }
        ]
        const lessons = await lessonService.aggregate({} , pipeline  )

        return res.status(HttpErrorCodes.Success).json(CommonException.Success(lessons))
    } catch (error) {
        console.log(error);
        return res.status(HttpErrorCodes.ServerError).json(CommonException.Unknown(error.message))
    }
}

export const getLessonHandler = async (req, res) => {
    try {
        const {_id} = req.params
        const lesson = await lessonService.findById(_id , {deletedAt:0 , updatedAt: 0 , createdAt: 0 , resources:0})
        if(!lesson) return res.status(HttpErrorCodes.NotFound).json(CommonException.NotFound("Lesson not found"))
        return res.status(HttpErrorCodes.Success).json(CommonException.Success(lesson))
    } catch (error) {
        console.log(error);
        return res.status(HttpErrorCodes.ServerError).json(CommonException.Unknown(error.message))
    }
}

export const updateLessonHandler = async (req, res) => {
    try {
        const data = req.body
        if(data.groupId){
            const group = await groupService.findById(data.groupId)
            if(!group) return res.status(HttpErrorCodes.NotFound).json(CommonException.NotFound("Group not found"))
        }
        await lessonService.updateOne(data._id , data)
        return res.status(HttpErrorCodes.Success).json(CommonException.Success("Lesson updated successfully"))
    } catch (error) {
        console.log(error);
        return res.status(HttpErrorCodes.ServerError).json(CommonException.Unknown(error.message))
    }
}

export const deleteLessonHandler = async (req, res) => {
    try {
        const {_id} = req.params
        const lesson = await lessonService.findById(_id)
        if(!lesson) return res.status(HttpErrorCodes.NotFound).json(CommonException.NotFound("Lesson not found"))
        await lessonService.deleteOne(_id)
        return res.status(HttpErrorCodes.Success).json(CommonException.Success("Lesson deleted successfully"))
    } catch (error) {
        console.log(error);
        return res.status(HttpErrorCodes.ServerError).json(CommonException.Unknown(error.message))
    }
}