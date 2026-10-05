import { Router } from 'express'

import { validarQuiz } from '../middlewares/validarQuiz.js'
import { atualizarInformacoesQuiz, resgistrarQuiz } from '../controllers/quizController.js'
import { validarAtualizacaoQuiz } from '../middlewares/validarAtualizacaoQuiz.js'

const router = Router()

router.post('/', validarQuiz, resgistrarQuiz)
router.patch('/:id', validarAtualizacaoQuiz, atualizarInformacoesQuiz)

export default router