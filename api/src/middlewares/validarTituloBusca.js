export function validarTituloBusca(req, res, next){
    const {titulo} = req.query
    
    if(!titulo || titulo.trim() === ''){
        return res.status(400).json({mensagem: 'Passe um nome para realizar uma busca'})
    }
    
    next()
}