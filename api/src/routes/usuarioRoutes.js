import { Router } from "express"

import { atualizarInformacoesUsuario, buscarUsuariosPorNome } from "../controllers/usuarioController.js"
import { validarAtualizacaoUsuario } from "../middlewares/validarAtualizacaoUsuario.js"
import { validarNomeBusca } from "../middlewares/validarNomeBusca.js"

const router = Router()

router.patch('/:id', validarAtualizacaoUsuario, atualizarInformacoesUsuario)
router.get('/buscar', validarNomeBusca, buscarUsuariosPorNome)

export default router