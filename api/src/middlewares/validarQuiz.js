export function validarQuiz(req, res, next){
    const {titulo, mestreId} = req.body

    if(!titulo || titulo.trim() === ''){
        return res.status(400).json({mensagem: 'Titulo faltando ou inválido'})
    }
    if(!mestreId){
        return res.status(400).json({mensagem: 'Mestre do quiz não inforamado'})
    }

    next()
}