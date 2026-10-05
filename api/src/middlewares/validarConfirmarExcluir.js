export function validarConfirmarExcluir(req, res, next){
    const {confirmar} = req.body

    if(typeof confirmar !== 'string' || confirmar.trim() !== "EXCLUIR"){
        return res.status(400).json({mensagem: "Exclusão cancelada"})
    }

    next()
}