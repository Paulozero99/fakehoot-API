import { atualizarQuiz, buscarQuizPorTitulo, criarQuiz, mostrarQuizzes } from "../services/quizService.js"

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

        console.error('Erro ao atualizar quiz:', error.stack)

        res.status(500).json({mensagem: 'Erro ao atualizar quiz'})
    }
}

export async function mostrarTodosQuizzes(req, res){
    try{
        const quizzes = await mostrarQuizzes()

        res.json(quizzes)
    }
    catch(error){
        if(error.message === "Nenhum quiz encontrado"){
            return res.status(404).json({mensagem: error.message})
        }

        console.error('Erro ao exibir quizzes:', error.stack)

        res.status(500).json({mensagem: 'Erroa ao exibir quizzes'})
    }
}

export async function buscarQuizzesPorTitulo(req, res){
    try{
        const {titulo} = req.query

        const quizzesEncontrados = await buscarQuizPorTitulo(titulo)
        const quantidadeQuizzes = quizzesEncontrados.length

        const mensagem = quantidadeQuizzes === 1 ? 'Foi encontrado apenas 1 quiz' : `Foram encontrados ${quantidadeQuizzes} quizzes`

        res.json({
            mensagem,
            quizzesEncontrados
        })
    } 
    catch(error){
        if(error.message === 'Nenhum quiz encontrado com esse titulo'){
            return res.status(404).json({mensagem: error.message})
        }

        console.error('Erro ao buscar quiz:', error.stack)

        res.status(500).json({mensagem: 'Erro ao buscar quiz'})
    }
}