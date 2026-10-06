import { Router } from 'express'

import { validarQuiz } from '../middlewares/validarQuiz.js'
import { 
    atualizarInformacoesQuiz, 
    resgistrarQuiz, 
    mostrarTodosQuizzes 
} from '../controllers/quizController.js'
import { validarAtualizacaoQuiz } from '../middlewares/validarAtualizacaoQuiz.js'

const router = Router()

router.post('/', validarQuiz, resgistrarQuiz)
router.patch('/:id', validarAtualizacaoQuiz, atualizarInformacoesQuiz)
router.get('/', mostrarTodosQuizzes)

export default router