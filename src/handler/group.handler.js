import { CommonException } from "../common/exeption/index.js";
import { HttpErrorCodes } from "../common/exeption/error.code.js";
import userService from "../common/services/user.service.js";
import groupService from "../common/services/group.service.js";



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