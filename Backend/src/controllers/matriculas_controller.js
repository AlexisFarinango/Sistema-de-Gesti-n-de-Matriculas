import estudiantes from "../models/estudiantes.js"
import materias from "../models/materias.js"
import matriculas from "../models/matriculas.js"
import mongoose from "mongoose"


// //Crear matriculas
const crearMatriculaController = async(req, res)=>{
    const {codigo, estudiante, materia} = req.body
    
    if(Object.values(req.body).includes("")) return res.status(400).json({msg: "Por favor completa todos los campos"})
    const matriculaEncontrada = await matriculas.findOne({codigo})
    if(matriculaEncontrada) return res.status(404).json({msg: "Lo sentimos esta matricula ya se encuentra registrada"})
    
    const estudianteRegistrado = await estudiantes.findOne({cedula: estudiante})
    console.log(estudianteRegistrado)
    if(!estudianteRegistrado) return res.status(404).json({msg: "Lo sentimos pero este estudiante no se encuentra registrado"})
    
    //Verificar si materias existen
    const materiasValidas = []
    for (const codigoMateria of materia){
        const materiaRegistrada = await materias.findOne({codigo: codigoMateria})
        console.log(materiaRegistrada)
        if(!materiaRegistrada) return res.status(404).json({msg: "Lo sentimos pero esta materia no se encuentra registrado"})
        materiasValidas.push(materiaRegistrada)        
    }

    console.log(materiasValidas)
                
    const nuevaMatricula = new matriculas({...req.body, materia : materiasValidas.map(materia => materia.codigo)})
    await nuevaMatricula?.save()

    res.status(200).json({msg : `Registro exitoso de la Matricula` , nuevaMatricula})
}

// const crearMatriculaController = async (req, res) => {
//     const { codigo, estudiante, materia } = req.body;

//     // Validación de campos vacíos
//     if (Object.values(req.body).includes("")) {
//         return res.status(400).json({ msg: "Por favor completa todos los campos" });
//     }

//     // Verificar si la matrícula ya está registrada
//     const matriculaEncontrada = await matriculas.findOne({ codigo });
//     if (matriculaEncontrada) {
//         return res.status(404).json({ msg: "Lo sentimos, esta matrícula ya se encuentra registrada" });
//     }

//     // Verificar si el estudiante está registrado
//     const estudianteRegistrado = await estudiantes.findOne({ cedula: estudiante });
//     console.log(estudianteRegistrado);
//     if (!estudianteRegistrado) {
//         return res.status(404).json({ msg: "Lo sentimos, pero este estudiante no se encuentra registrado" });
//     }

//     // Verificar si las materias existen
//     const materiasValidas = [];
//     for (const codigoMateria of materia) {
//         const materiaRegistrada = await materias.findOne({ codigo: codigoMateria });
//         if (!materiaRegistrada) {
//             return res.status(404).json({ msg: `Lo sentimos, pero la materia con código ${codigoMateria} no se encuentra registrada` });
//         }

//         // Verificar si la materia ya está en la lista
//         if (!materiasValidas.includes(materiaRegistrada._id)) {
//             materiasValidas.push(materiaRegistrada._id);  // Usar el ObjectId de la materia
//         }
//     }

//     console.log(materiasValidas);

//     // Crear una nueva matrícula
//     try {
//         const nuevaMatricula = new matriculas({
//             codigo,
//             estudiante: estudianteRegistrado._id,  // Usar el ObjectId del estudiante
//             materia: materiasValidas,  // Array de ObjectId de las materias
//         });

//         await nuevaMatricula.save();

//         res.status(200).json({ msg: "Registro exitoso de la matrícula" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ msg: "Error al registrar la matrícula" });
//     }
// }



//Detalle matriculas
const detalleMatriculaController = async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg: "Lo sentimos ese id no es valido"})
    
    const matriculaEncontrada = await matriculas.findById(id)
    if(!matriculaEncontrada) return res.status(404).json({msg: "Lo sentimos pero esta matricula no existe"})
    await matriculaEncontrada?.save()
    
    res.status(200).json(matriculaEncontrada)

}

//Actualizar matriculas 

const actualizarMatriculaController = async(req, res)=>{

    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg: "Lo sentimos ese id no es valido"})
    if(Object.values(req.body).includes("")) return res.status(400).json({msg: "Por favor completa todos los campos"})

    const materiaRegistrada = await matriculas.findByIdAndUpdate(id,req.body)
    if(!materiaRegistrada) return res.status(404).json({msg: "Lo sentimos pero esta matricula no existe"})

    await materiaRegistrada?.save()



    res.status(200).json({msg: "Matricula actualizada con exito"})

}

//Eliminar matriculas

const eliminarMatriculaController = async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg: "Lo sentimos ese id no es valido"})
    
    const materiaRegistrada = await matriculas.findByIdAndDelete(id)
    if(!materiaRegistrada) return res.status(404).json({msg: "Lo sentimos pero esta matricula no existe"})
    
    res.status(200).send({msg: "Matricula eliminada con exito"})

}


export{ crearMatriculaController, 
    detalleMatriculaController, 
    actualizarMatriculaController, 
    eliminarMatriculaController}
