import { Router } from "express";
import { validateIt } from "../common/middleware/validate.js";
import { ProfilSchemas } from "../common/joi-schemas/profil.schema.js";
import {  createProfilHandler, deleteProfilHandler, getAllProfilsHandler, getProfilByIdHandler, updateProfilHandler } from "../handler/profil.handler.js";
import {baseSchemas} from "../common/joi-schemas/base.schema.js";
import {authorization} from "../common/middleware/auth.js";
import {checkRole} from "../common/middleware/auth-role.js";

const routes = Router()

routes.route("/")
        .post(authorization,checkRole,validateIt(ProfilSchemas.createProfil ) , createProfilHandler)
        .get(authorization , checkRole,getAllProfilsHandler)
        .put(authorization , checkRole, validateIt(ProfilSchemas.updateProfil) , updateProfilHandler)

routes.get("/:_id" ,authorization , checkRole,validateIt(baseSchemas.byId , 'params'), getProfilByIdHandler)
routes.delete("/:_id" ,authorization,checkRole , validateIt(baseSchemas.byId , 'params' ), deleteProfilHandler)

export default routes