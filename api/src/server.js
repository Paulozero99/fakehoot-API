import 'dotenv/config'

import app from './app.js'
import { connectDatabase } from './config/database.js'

const PORTA = process.env.PORT || 3000

await connectDatabase()

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`)
})