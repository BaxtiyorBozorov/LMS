import { courseService } from "../common/services/course.service.js"
import { CommonException } from "../common/exeption/index.js"
import userService from "../common/services/user.service.js"
import { dateParser } from "../common/utils/date.parser.js"
import { courseModel } from "../common/db/models/courses.model.js"


export const createCourseHandler = async (req, res) => {
    try {
        const data = req.body
        // const teacher = await userService.findById(data.teacherId)
        // if(!teacher || teacher.role !== "teacher") return res.status(404).json(CommonException.NotFound("Teacher not found"))
        data.startDate = dateParser(data.startDate)
        const course = await courseService.create(data)
        return res.status(201).json(CommonException.Success(course))
    } catch (error) {
        return res.status(500).json(CommonException.Unknown(error.message))
    }
}

export const updateCourseHandler = async (req, res) => {
    try {
        const data = req.body
        const course = await courseService.findById(data._id )
        if(!course) return res.status(404).json(CommonException.NotFound("Course not found"))
        await courseService.updateOne(data._id, data)
        return res.status(200).json(CommonException.Success("Course updated successfully"))
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(CommonException.Unknown(error.message))
    }
}

export const deleteCourseHandler = async (req, res) => {
    try {
        const {_id} = req.params
        const course = await courseService.findById(_id)
        if(!course) return res.status(404).json(CommonException.NotFound("Course not found"))
        await courseModel.deleteOne({_id})
        return res.status(200).json(CommonException.Success("Course deleted successfully"))
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(CommonException.Unknown(error.message))
    }
}

export const getCourseHandler = async (req, res) => {
    try {
        const courses = await courseService.findByQuery({} , {deletedAt:0 , createdAt:0 , updatedAt:0} )
        return res.status(200).json(CommonException.Success(courses))
    } catch (error) {
        console.log(error.message);
        return res.status(500).json(CommonException.Unknown(error.message))
    }
}

export const getCourseByIdHandler = async (req, res) => {
    try {
        const course = await courseService.findById(req.params._id , {deletedAt:0 , createdAt:0 , updatedAt:0})
        if(!course) return res.status(404).json(CommonException.NotFound("Course not found"))
        return res.status(200).json(CommonException.Success(course))
    } catch (error) {
        console.log(error.message); 
        return res.status(500).json(CommonException.Unknown(error.message))
    }
}