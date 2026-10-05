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