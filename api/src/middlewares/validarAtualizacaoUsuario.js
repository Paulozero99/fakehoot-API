export function validarAtualizacaoUsuario(req, res, next){
    const {nome, email} = req.body ?? {}

    const erros = []

    if(nome !== undefined){
        if(typeof nome !== 'string' || nome.trim() === ''){
            erros.push('O nome não pode ser vazio')
        }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(email !== undefined){
        if(typeof email !== 'string' || !emailRegex.test(email.trim())){
            erros.push('Informe um email válido')
        }
    }

    if (nome === undefined && email === undefined) {
        erros.push('Informe pelo menos um campo para atualizar');
    }

    if(erros.length > 0){
        return res.status(400).json({
            mensagem: 'Erro de validação',
            erros
        })
    }
    
    next()
}