import { criarQuiz } from "../services/quizService"

export async function resgistrarQuiz(req, res){
    try{
        const {titulo, descricao, mestreId} = req.body

        const quiz = await criarQuiz({
            titulo,
            descricao,
            mestreId
        })

        res.status(201).json(quiz)
    } 
    catch(error){
        console.error('Erro ao criar quiz:', error)

        res.status(500).json({mensagem: 'Erro ao criar quiz'})
    }
}