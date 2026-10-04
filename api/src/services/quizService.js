import Quiz from "../models/Quiz.js";

export async function criarQuiz(dados){
    const quiz = await Quiz.create(dados)

    return quiz
}