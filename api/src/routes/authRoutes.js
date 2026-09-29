import { Router } from "express"

import { registrar } from "../controllers/authController.js"

const router = Router()

router.post('/register', registrar)

export default router