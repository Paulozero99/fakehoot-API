import { Router } from 'express'

import { validarQuiz } from '../middlewares/validarQuiz.js'
import { 
    atualizarInformacoesQuiz, 
    resgistrarQuiz, 
    mostrarTodosQuizzes, 
    buscarQuizzesPorTitulo
} from '../controllers/quizController.js'
import { validarAtualizacaoQuiz } from '../middlewares/validarAtualizacaoQuiz.js'
import { validarTituloBusca } from '../middlewares/validarTituloBusca.js'

const router = Router()

router.post('/', validarQuiz, resgistrarQuiz)
router.patch('/:id', validarAtualizacaoQuiz, atualizarInformacoesQuiz)
router.get('/', mostrarTodosQuizzes)
router.get('/buscar', validarTituloBusca, buscarQuizzesPorTitulo)

export default router