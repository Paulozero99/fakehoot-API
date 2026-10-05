export function validarNomeBusca(req, res, next){
    const {nome} = req.query
    
    if(!nome || nome.trim() === ''){
        return res.status(400).json({mensagem: 'Passe um nome para realizar uma busca'})
    }
    
    next()
}