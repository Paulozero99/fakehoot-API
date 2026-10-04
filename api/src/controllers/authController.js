import { criarUsuario } from "../services/usuarioService.js"

export async function registrar(req, res){
    try{
        const {nome, email, senha, role} = req.body

        const usuario = await criarUsuario({
            nome,
            email,
            senha,
            role
        })

        res.status(201).json({
            mensagem: `Usuário ${usuario.nome} cadastrado com sucesso`,
        })
    } 
    catch(error){
        if(error.message === 'Email já cadastrado'){
            return res.status(409).json({mensagem: error.message})
        }

        console.error('Erro ao criar usuário:', error.stack);

        res.status(500).json({mensagem: 'Erro ao criar usuário'});
    }
}