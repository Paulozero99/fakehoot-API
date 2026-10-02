import { Router } from "express"

import { registrar } from "../controllers/authController.js"
import { validarUsuario } from "../middlewares/validarUsuario.js"

const router = Router()

router.post('/register', validarUsuario, registrar)

export default router