import mongoose from "mongoose"

const usuarioSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true
        },

        nome: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        senha: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ['MESTRE', 'PLAYER'],
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Usuario = mongoose.model('Usuario', usuarioSchema)

export default Usuario