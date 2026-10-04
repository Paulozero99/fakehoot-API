import mongoose from "mongoose"

const contadorSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },

        sequencia: {
            type: Number,
            default: 0
        }
    }
)

const Contador = mongoose.model('Contador', contadorSchema)

export default Contador