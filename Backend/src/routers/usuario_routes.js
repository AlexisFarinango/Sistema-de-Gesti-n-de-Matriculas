import { Router } from "express";
const router = Router()

import { 
    loginUserController, 
    obtenerdatos, 
    registerUserController } from "../controllers/usuarios_controller.js";
import autenticacionUsuario from "../middlewares/autenticacionUsuario.js";

router.post("/usuario/login", loginUserController)
router.post("/usuario/register", registerUserController)
router.get("/usuario/datos",autenticacionUsuario,obtenerdatos)


export default router
