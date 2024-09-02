import crearToken from "../helpers/crearJWT.js"
import materias from "../models/materias.js"
import mongoose from "mongoose"


//Crear materia
const crearMateriaController = async(req, res)=>{

    const {codigo} = req.body
    if(Object.values(req.body).includes("")) return res.status(400).json({msg: "Por favor completa todos los campos"})

    const materiaRegistrada = await materias.findOne({codigo})
    if(materiaRegistrada) return res.status(404).json({msg: "Lo sentimos esta materia ya se encuentra registrada"})

    const nuevaMateria = new materias(req.body)
    
    ///guardar id

    await nuevaMateria.save()

    res.status(200).json({msg: "Materia creada con exito"})
}


//Detalle materia

const detalleMateriaController = async(req, res)=>{    
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg: "Lo sentimos ese id no es valido"})
    
    const materiaEncontrada = await materias.findById(id)
    if(!materiaEncontrada) return res.status(404).json({msg: "Lo sentimos pero esta materia no existe"})
    await materiaEncontrada.save()
    
    res.status(200).json(materiaEncontrada)
}

const listarmaterias = async (req, res) => {
    try {
        // Encuentra todas las materias
        const materiasdatos = await materias.find().select("-descripcion -createdAt -updatedAt -__v");
        
        // Verifica si se encontraron materias
        if (materiasdatos.length > 0) {
            res.status(200).json(materiasdatos);
        } else {
            res.status(404).json({ message: "No se encontraron materias" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las materias", error });
    }
};


//Actualizar materia 

const actualizarMateriaController = async(req, res)=>{

    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg: "Lo sentimos ese id no es valido"})
    if(Object.values(req.body).includes("")) return res.status(400).json({msg: "Por favor completa todos los campos"})

    const materiaRegistrada = await materias.findByIdAndUpdate(id, req.body)
    if(!materiaRegistrada) return res.status(404).json({msg: "Lo sentimos pero esta materia no existe"})
    await materiaRegistrada?.save()
        
    res.status(200).json({msg: "Materia actualizada con exito"})
}

//Eliminar materia

const eliminarMateriaController = async(req, res)=>{

    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg: "Lo sentimos ese id no es valido"})
    
    const materiaExiste = await materias.findById(id)
    if(materiaExiste === null) return res.status(404).json({msg: "Lo sentimos pero esta materia no existe"})

    const materiaRegistrada = await materias.findByIdAndDelete(id)

    res.status(200).json({msg: "Materia eliminada con exito"})
}


export{ crearMateriaController, 
    detalleMateriaController, 
    actualizarMateriaController, 
    eliminarMateriaController,
    listarmaterias
}
