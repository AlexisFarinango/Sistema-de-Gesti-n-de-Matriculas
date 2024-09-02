import { Router } from "express";
const router = Router()

import { 
    crearEstudianteController,
    detalleEstudianteController,
    actualizarEstudianteController,
    eliminarEstudianteController,
    listarestudiantes
} from "../controllers/estudiantes_controller.js";

import autenticacionUsuario from "../middlewares/autenticacionUsuario.js";

//Crear
router.post("/estudiantes/crear-estudiante", autenticacionUsuario, crearEstudianteController)
//Detalle
router.get("/estudiantes/detalle-estudiante/:id", autenticacionUsuario, detalleEstudianteController)

//listar estudiantes
router.get("/estudiantes/listarestudiantes", autenticacionUsuario, listarestudiantes)

//Actualizar
router.put("/estudiantes/actualizar-estudiante/:id", autenticacionUsuario, actualizarEstudianteController)
//Eliminar
router.delete("/estudiantes/eliminar-estudiante/:id", autenticacionUsuario, eliminarEstudianteController)


export default router

