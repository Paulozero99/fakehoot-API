import { atualizarUsuario } from "../services/usuarioService.js"

export async function atualizarInformacoesUsuario(req, res){
    try{
        const {nome, email} = req.body
        const {id} = req.params

        const usuarioAtualizado = await atualizarUsuario(
            id,
            {
                nome,
                email
            }
        )

        res.json({
            nome: usuarioAtualizado.nome,
            email: usuarioAtualizado.email
        })
    } 
    catch(error){
        if(error.message === "Um usuário já usa esse email"){
            return res.status(409).json({mensagem: error.message})
        }
        if(error.message === "Usuário não encontrado"){
            return res.status(404).json({mensagem: error.message})
        }

        console.error('Erro ao atualizar usuário:', error.stack);

        res.status(500).json({mensagem: 'Erro ao atualizar usuário'});
    }
}