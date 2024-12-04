import { Router } from "express";
import {validateIt} from "../common/middleware/validate.js";
import {baseSchemas} from "../common/joi-schemas/base.schema.js";
import {loginHandler} from "../handler/sign.handler.js";

const routes = Router()

routes.post("/login" , validateIt(baseSchemas.login) , loginHandler)

export default routes