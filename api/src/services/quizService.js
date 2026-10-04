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

    const quiz = await Quiz.create({
        ...dados,
        id
    })

    return quiz
}