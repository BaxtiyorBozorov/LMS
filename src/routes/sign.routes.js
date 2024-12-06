import { Router } from "express";
import {validateIt} from "../common/middleware/validate.js";
import {baseSchemas} from "../common/joi-schemas/base.schema.js";
import {loginHandler, resetPasswordHandler, resetPasswordOtpVeritifyHandler, resetPasswortOtpHandler} from "../handler/sign.handler.js";
import {authorization} from "../common/middleware/auth.js";

const routes = Router()

routes.post("/login" , validateIt(baseSchemas.login) , loginHandler)
routes.post("/password-reset" , resetPasswortOtpHandler)
routes.post("/password-reset-veritfy" , resetPasswordOtpVeritifyHandler)
routes.put('/password-reset' , authorization , resetPasswordHandler)

export default routes