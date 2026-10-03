import Quiz from "../models/Quiz";

export async function criarQuiz(dados){
    const quiz = await Quiz.create(dados)

    return quiz
}