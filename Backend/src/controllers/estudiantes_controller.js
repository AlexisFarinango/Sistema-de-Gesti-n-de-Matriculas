import estudiantes from "../models/estudiantes.js"
import mongoose from "mongoose"


//Crear estudiantes
const crearEstudianteController = async(req, res)=>{

    const {cedula} = req.body
    if(Object.values(req.body).includes("")) return res.status(400).json({msg: "Por favor completa todos los campos"})

    const estudianteEncontrado = await estudiantes.findOne({cedula})
    if(estudianteEncontrado) return res.status(404).json({msg: "Lo sentimos este estudiante ya se encuentra registrado"})
        
    const nuevoEstudiante = new estudiantes(req.body)
    await nuevoEstudiante?.save()

    //Utilizar token para guardar la info del estudiante
    //Insertar token aki
    res.status(200).json({msg: "Estudiante creado con exito", nuevoEstudiante})
}

//listar materias
const listarestudiantes = async (req, res) => {
    try {
        // Encuentra todas las materias
        const estudiantesdatos = await estudiantes.find().select("-descripcion -createdAt -updatedAt -__v");
        
        // Verifica si se encontraron materias
        if (estudiantesdatos.length > 0) {
            res.status(200).json(estudiantesdatos);
        } else {
            res.status(404).json({ message: "No se encontraron materias" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las materias", error });
    }
};


//Detalle estudiantes

const detalleEstudianteController = async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg: "Lo sentimos ese id no es valido"})
    
    const estudianteEncontrado = await estudiantes.findById(id)
    if(!estudianteEncontrado) return res.status(404).json({msg: "Lo sentimos pero este estudiante no existe"})
    await estudianteEncontrado.save()
    
    res.status(200).json(estudianteEncontrado)
}

//Actualizar estudiantes 

const actualizarEstudianteController = async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg: "Lo sentimos ese id no es valido"})
    if(Object.values(req.body).includes("")) return res.status(400).json({msg: "Por favor completa todos los campos"})

    const estudianteRegistrado = await estudiantes.findByIdAndUpdate(id, req.body)
    if(!estudianteRegistrado) return res.status(404).json({msg: "Lo sentimos pero este estudiante no existe"})

    await estudianteRegistrado?.save()

    res.status(200).json({msg: "Estudiante actualizado con exito"})

}

//Eliminar estudiantes

const eliminarEstudianteController = async(req, res)=>{

    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg: "Lo sentimos ese id no es valido"})

    const estudianteRegistrado = await estudiantes.findByIdAndDelete(id)
    if(!estudianteRegistrado) return res.status(404).json({msg: "Lo sentimos pero este estudiante no existe"})

    res.status(200).send("Estudiante eliminado con exito")
}


export{ crearEstudianteController, 
    detalleEstudianteController, 
    actualizarEstudianteController, 
    eliminarEstudianteController,
    listarestudiantes}
