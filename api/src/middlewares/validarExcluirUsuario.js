export function validarExclusao(req, res, next){
    const {id} = req.params

    if(typeof id !== 'string' || id.trim() === ''){
        return res.status(400).json({mensagem: 'Passe um id váldio para realizar uma exclusão'})
    }

    next()
}