import { Router } from "express";
const router = Router()


import { 
    actualizarMateriaController, 
    crearMateriaController,
    detalleMateriaController,
    eliminarMateriaController,
    listarmaterias
 } from "../controllers/materias_controller.js";

import autenticacionUsuario from "../middlewares/autenticacionUsuario.js";

//Crear
router.post("/materia/crear-materia", autenticacionUsuario, crearMateriaController) 
//Detalle
router.get("/materia/detalle-materia/:id", autenticacionUsuario, detalleMateriaController) //Validar aqui lo del login y materia
//listar Materias
router.get("/materia/listarmaterias", autenticacionUsuario, listarmaterias)

//Actualizar
router.put("/materia/actualizar-materia/:id", autenticacionUsuario,  actualizarMateriaController)
//Eliminar
router.delete("/materia/eliminar-materia/:id", autenticacionUsuario, eliminarMateriaController)


export default router