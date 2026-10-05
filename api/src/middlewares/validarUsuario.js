export function validarUsuario(req, res, next){
    const {nome, email, senha} = req.body ?? {}

    let erros = []

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if(typeof email !== 'string' || !emailRegex.test(email.trim())){
        erros.push('Informe um email válido')
    }

    if(typeof nome !== 'string' || nome.trim() === ''){
        erros.push('O nome é obrigatório')
    }

    if(typeof senha !== 'string' || senha.trim().length < 8){
        erros.push('A senha deve ter pelo menos 8 caracteres')
    }

    if (senha !== senha.trim()) {
        erros.push("A senha não pode começar ou terminar com espaços")
    }

    if(erros.length > 0){
        return res.status(400).json({mensagem: 'Erro de validação', erros})
    }

    next()
}