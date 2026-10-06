import Quiz from "../models/Quiz.js";
import Usuario from "../models/Usuario.js";
import { gerarId } from "./idService.js";

export async function criarQuiz(dados){
    const mestreExiste = await Usuario.findOne({id: dados.mestreId})  

    if(!mestreExiste){
        throw new Error('ID inválido')
    }
    if(mestreExiste.role !== 'MESTRE'){
        throw new Error("Usuário não é um mestre");
    }

    const id = await gerarId('QZ')

    if(dados.descricao === undefined){
        dados.descricao = ''
    }

    const quiz = await Quiz.create({
        ...dados,
        id
    })

    return quiz
}

export async function atualizarQuiz(id, dados){
    const campos = {}

    if(dados.titulo !== undefined){
        campos.titulo = dados.titulo
    }

    if(dados.descricao !== undefined){
        campos.descricao = dados.descricao
    }

    const quizAtualizado = await Quiz.findOneAndUpdate(
        {id: id},
        {
            $set: campos
        },
        {
            returnDocument: 'after'
        }
    )

    if(!quizAtualizado){
        throw new Error('Nenhum quiz registrado com esse id')
    }

    return quizAtualizado
}

export async function mostrarQuizzes(){
    const quizzesEncotrados = await Quiz.find()
        .select('titulo descricao mestreId -_id')
        .populate({
            path: 'mestreId',
            select: 'nome -_id',
            model: 'Usuario',
            foreignField: 'id'
        }).lean()

    if(quizzesEncotrados.length === 0){
        throw new Error('Nenhum quiz encontrado');
    }

    const quizzes = quizzesEncotrados.map(quiz => ({
        titulo: quiz.titulo,
        descricao: quiz.descricao,
        dono: quiz.mestreId?.nome || 'Sem um mestre vinculado'
    }))

    return quizzes
}

export async function buscarQuizPorTitulo(titulo){
    const tituloEscapado = titulo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    const quizzesComTalNome = await Quiz.find({titulo: new RegExp(`^${tituloEscapado}`, 'i')}).select('id titulo descricao -_id')

    if(quizzesComTalNome.length === 0){
        throw new Error('Nenhum quiz encontrado com esse titulo')
    }

    return quizzesComTalNome
}