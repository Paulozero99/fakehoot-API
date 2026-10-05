import { Router } from "express"

import { registrarUsuario } from "../controllers/authController.js"
import { validarUsuario } from "../middlewares/validarUsuario.js"

const router = Router()

router.post('/register', validarUsuario, registrarUsuario)

export default router