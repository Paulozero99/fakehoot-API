import { Router } from "express"

import { atualizarInformacoesUsuario, buscarUsuariosPorNome, deletarUsuario } from "../controllers/usuarioController.js"
import { validarAtualizacaoUsuario } from "../middlewares/validarAtualizacaoUsuario.js"
import { validarNomeBusca } from "../middlewares/validarNomeBusca.js"
import { validarExclusao } from "../middlewares/validarExcluirUsuario.js"
import { validarConfirmarExcluir } from "../middlewares/validarConfirmarExcluir.js"

const router = Router()

router.patch('/:id', validarAtualizacaoUsuario, atualizarInformacoesUsuario)
router.get('/buscar', validarNomeBusca, buscarUsuariosPorNome)
router.delete('/deletar/:id', [validarExclusao, validarConfirmarExcluir], deletarUsuario)

export default router