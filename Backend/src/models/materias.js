import {Schema, model} from "mongoose";
import bcrypt from "bcryptjs"
 

const MateriasSchema = new Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    codigo: {
        type: String,
        require: true,
        trim: true
    },
    creditos: {
        type: Number,
        require: true,
        trim: true
    },
    descripcion: {
        type: String,
        require: true,
        trim: true
    }

},{
    timestamps: true
})


export default model("Materia", MateriasSchema)