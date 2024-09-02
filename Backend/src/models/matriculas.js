import mongoose, {Schema, model} from "mongoose";
import bcrypt from "bcryptjs"
 

const MatriculasSchema = new Schema({
    codigo: {
        type: String,
        require: true,
        trim: true
    },
    descripcion: {
        type: String,
        require: true,
        trim: true
    },
    creditos: {
        type: Number,
        require: true,
        trim: true, 
        unique: true
    },
    materia: [{
        type: mongoose.Schema.Types.String, 
        ref: "Materia"    
    }],
    estudiante: {
       type: mongoose.Schema.Types.String, 
        ref: "Estudiantes"
    }
    
},{
    timestamps: true
})


export default model("Matriculas", MatriculasSchema)