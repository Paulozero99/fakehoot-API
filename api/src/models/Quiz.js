import mongoose from "mongoose"

const quizSchema = new mongoose.Schema(
    {
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
            type: mongoose.Schema.Types.ObjectId,
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