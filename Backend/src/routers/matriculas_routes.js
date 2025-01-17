import { Router } from "express";
const router = Router()

import { 
    crearMatriculaController,
    detalleMatriculaController,
    actualizarMatriculaController,
    eliminarMatriculaController

 } from "../controllers/matriculas_controller.js";

import autenticacionUsuario from "../middlewares/autenticacionUsuario.js";

//Crear
router.post("/matriculas/crear-matricula",autenticacionUsuario, crearMatriculaController)
//Detalle
router.get("/matriculas/detalle-matricula/:id",autenticacionUsuario, detalleMatriculaController)
//Actualizar
router.put("/matriculas/actualizar-matricula/:id",autenticacionUsuario,  actualizarMatriculaController)
//Eliminar
router.delete("/matriculas/eliminar-matricula/:id",autenticacionUsuario,  eliminarMatriculaController)


export default router

