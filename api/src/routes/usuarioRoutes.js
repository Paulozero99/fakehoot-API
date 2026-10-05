import { Router } from "express"

import { atualizarInformacoesUsuario } from "../controllers/usuarioController.js"
import { validarAtualizacaoUsuario } from "../middlewares/validarAtualizacaoUsuario.js"

const router = Router()

router.patch('/:id', validarAtualizacaoUsuario, atualizarInformacoesUsuario)

export default router