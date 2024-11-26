import express from "express"
import { createUserHandler, getAllUserHandler } from "../../../handler/user/user.handler.js"

const routes = express.Router()

routes.route("/" )
    .post(createUserHandler)
    .get(getAllUserHandler)

export default routes