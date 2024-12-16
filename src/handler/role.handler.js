import { RoleModel } from "../common/db/models/role.model.js"
import { CommonException } from "../common/exeption/index.js"
import roleService from "../common/services/role.service.js"
import userService from "../common/services/user.service.js"


export const createRoleHandler = async (req , res ) => {
    try {
        const data = req.body
        const role = await roleService.create(data)
        return res.status(201).json(CommonException.Success(role))
    } catch (error) {
        return res.status(500).json(CommonException.Unknown(error.message))
    }
}

export const getRoleHandler = async (req , res ) => {
    try {
        const role = await roleService.findByQuery({} , {deletedAt:0 , createdAt:0 , updatedAt:0})
        return res.status(200).json(CommonException.Success(role))
    } catch (error) {
        return res.status(500).json(CommonException.Unknown(error.message))
    }
}

export const updateRoleHandler = async (req , res ) => {
    try {
        const data = req.body
        const role = await roleService.findWithId(data._id)
        await roleService.updateOne(role._id , data)
        return res.status(200).json(CommonException.Success())
    } catch (error) {
        return res.status(500).json(CommonException.Unknown(error.message))
    }
}

export const deleteRoleHandler = async (req , res ) => {
    try {
        const {_id} = req.params
        const role = await roleService.findById(_id)
        if(!role) return res.status(404).json(CommonException.NotFound("Role not found"))
        await RoleModel.deleteOne({_id})
        return res.status(200).json(CommonException.Success("Role deleted successfully"))
    } catch (error) {
        return res.status(500).json(CommonException.Unknown(error.message))
    }
}


export const addRoleToUserHandler = async (req, res) => {
    try {
        const { userId, roleId } = req.body
        
        // Zaruriy ma'lumotlarni tekshirish
        if (!userId || !roleId) {
            return res.status(400).json(
                CommonException.BadRequest('userId and roleId required')
            )
        }

        // Foydalanuvchi mavjudligini tekshirish
        const user = await userService.findById(userId)
        if (!user) {
            return res.status(404).json(
                CommonException.NotFound('User not found')
            )
        }

        // Rol mavjudligini tekshirish
        const role = await roleService.findById(roleId)
        if (!role) {
            return res.status(404).json(
                CommonException.NotFound('Role not found')
            )
        }

        // Rolning allaqachon mavjudligini tekshirish
        if (user.roles.includes(roleId)) {
            return res.status(400).json(
                CommonException.BadRequest('User already has this role')
            )
        }

        // Foydalanuvchiga rolni qo'shish
        await userService.addRole(userId, roleId)

        return res.status(200).json({
            success: true,
            message: "Role added successfully",
            data: {
                userId,
                roleId
            }
        })

    } catch (error) {
        console.error('addRoleToUserHandler error:', error)
        return res.status(500).json(
            CommonException.Unknown(error.message)
        )
    }
}

