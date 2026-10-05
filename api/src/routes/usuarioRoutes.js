import { Router } from "express"

import { atualizarInformacoesUsuario, buscarInformacoesUsuario } from "../controllers/usuarioController.js"
import { validarAtualizacaoUsuario } from "../middlewares/validarAtualizacaoUsuario.js"

const router = Router()

router.patch('/:id', validarAtualizacaoUsuario, atualizarInformacoesUsuario)
router.get('/buscar', buscarInformacoesUsuario)

export default router