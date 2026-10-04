import { criarQuiz } from "../services/quizService.js"

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
        if(error.message === 'ID inválido'){
            return res.status(404).json({mensagem: error.message})
        }
        if(error.message === "Usuário não é um mestre"){
            return res.status(403).json({mensagem: error.message})
        }

        console.error('Erro ao criar quiz:', error)

        res.status(500).json({mensagem: 'Erro ao criar quiz'})
    }
}