import { Router } from "express";
import { createGroupHandler, getGroupHandler } from "../handler/group.handler.js";
import { authorization } from "../common/middleware/auth.js";
import { validateIt } from "../common/middleware/validate.js";
import { groupSchema } from "../common/joi-schemas/group.schemas.js";

const router = Router()

router.use(authorization)
router.route('/')
    .post(validateIt(groupSchema.create),createGroupHandler)
    .get(getGroupHandler)

export default router