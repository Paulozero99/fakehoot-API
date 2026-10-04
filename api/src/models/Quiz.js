import mongoose from "mongoose"

const quizSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            unique: true,
            required: true
        },

        titulo: {
            type: String,
            required: true,
            trim: true
        },

        descricao: {
            type: String,
            trim: true
        },

        mestreId: {
            type: String,
            ref: 'Usuario',
            required: true
        }

    },
    {
        timestamps: true
    }
)

const Quiz = mongoose.model('Quiz', quizSchema)

export default Quiz