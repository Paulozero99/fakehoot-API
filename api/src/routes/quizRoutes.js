import { Router } from 'express'

import { validarQuiz } from '../middlewares/validarQuiz.js'
import { resgistrarQuiz } from '../controllers/quizController.js'

const router = Router()

router.post('/', validarQuiz, resgistrarQuiz)

export default router