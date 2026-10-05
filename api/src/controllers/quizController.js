import { atualizarQuiz, criarQuiz } from "../services/quizService.js"

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

        console.error('Erro ao criar quiz:', error.stack)

        res.status(500).json({mensagem: 'Erro ao criar quiz'})
    }
}

export async function atualizarInformacoesQuiz(req, res){
    try{
        const {titulo, descricao} = req.body
        const {id} = req.params

        const quizAtualizado = await atualizarQuiz(
            id,
            {
                titulo,
                descricao
            }
        )

        res.json({
            titulo: quizAtualizado.titulo,
            descricao: quizAtualizado.descricao
        })
    }
    catch(error){
        if(error.message === 'Nenhum quiz registrado com esse id'){
            return res.status(404).json({mensagem: error.message})
        }

        console.error('Error ao atualizar quiz:', error.stack)

        res.status(500).json({mensagem: 'Erro ao atualizar quiz'})
    }
}