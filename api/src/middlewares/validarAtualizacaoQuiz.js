export function validarAtualizacaoQuiz(req, res, next){
    const {titulo, descricao} = req.body ?? {}

    const erros = []

    if(titulo !== undefined){
        if(typeof titulo !== 'string' || titulo.trim() === ''){
            erros.push('O campo título não pode ser vazio')
        }
    }

    if(descricao !== undefined){
        if(typeof descricao !== 'string' || descricao.trim() === ''){
            erros.push('O campo descrição deve conter ao menos um caractere')
        }
    }

    if(erros.length > 0){
        return res.status(400).json({
            mensagem: 'Erro de validação',
            erros
        })
    }

    next()
}