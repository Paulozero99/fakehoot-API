import { 
    atualizarUsuario, 
    buscarUsuarioPorNome, 
    deletarUsuarioPorId
} from "../services/usuarioService.js"

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

export async function buscarUsuariosPorNome(req, res){
    try{
        const {nome} = req.query

        const usuariosEncontrados = await buscarUsuarioPorNome(nome)
        const quantidadeUsuarios = usuariosEncontrados.length

        const mensagem = quantidadeUsuarios === 1 ? 'Foi encontrado apenas 1 usuário' : `Foram encotrados ${quantidadeUsuarios} usuários`

        res.json({
            mensagem,
            usuariosEncontrados
        })
    }
    catch(error){
        if(error.message === 'Nenhum usuário registrado com esse nome'){
            return res.status(404).json({mensagem: error.message})
        }

        console.error('Erro ao buscar usuário:', error.stack)

        res.status(500).json({mensagem: 'Erro ao buscar usuário'})
    }
}

export async function deletarUsuario(req, res){
    try{
        const {id} = req.params

        const usuarioDeletado = await deletarUsuarioPorId(id)

        res.json({mensagem: `Usuário ${usuarioDeletado.nome} deletado`})
    } 
    catch(error){
        if(error.message === 'Nenhum usuário registrado com esse id'){
            return res.status(404).json({mensagem: error.message})
        }

        console.log('Erro ao deletar usuário:', error.stack)

        res.status(500).json({mensagem: 'Erro ao deletar usuário'})
    }
}