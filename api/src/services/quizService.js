import Quiz from "../models/Quiz.js";
import Usuario from "../models/Usuario.js";

export async function criarQuiz(dados){
    const mestreExiste = await Usuario.findOne({_id: dados.mestreId})  

    if(!mestreExiste){
        throw new Error('ID inválido')
    }
    if(mestreExiste.role !== 'MESTRE'){
        throw new Error("Usuário não é um mestre");
    }

    const quiz = await Quiz.create(dados)

    return quiz
}