import { Router } from 'express'

import { validarQuiz } from '../middlewares/validarQuiz'
import { resgistrarQuiz } from '../controllers/quizController'

const router = Router()

router.post('/', validarQuiz, resgistrarQuiz)

export default router