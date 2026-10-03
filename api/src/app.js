import express from "express"
import cors from "cors"
import helmet from "helmet"

import authRoutes from './routes/authRoutes.js'
import quizRoutes from './routes/quizRoutes.js'

const app = express()

//esse middleware ser para aplicar barreiras de seguranças
app.use(helmet())
//esse middleware gerencia quem pode conversar com a nossa API
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json({mensagem: 'API Fakehoot no Ar!'})
})

app.use('/auth', authRoutes)
app.use('/quizzes', quizRoutes)

export default app 