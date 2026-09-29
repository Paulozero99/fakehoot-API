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

        res.status(201).json(usuario)
    } 
    catch(error){
        console.error('Erro ao criar usuário:', error.stack);

        res.status(500).json({error: 'Erro ao criar usuário'});
    }
}