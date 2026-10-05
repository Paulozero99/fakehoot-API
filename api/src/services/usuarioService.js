import bcrypt from 'bcrypt'
import Usuario from "../models/Usuario.js"
import { gerarId } from './idService.js'

export async function criarUsuario(dados){
    const usuarioExistente = await Usuario.findOne({email: dados.email})

    if(usuarioExistente){
        throw new Error('Email já cadastrado')
    }

    const id = await gerarId('USR')
    const senhaHash = await bcrypt.hash(dados.senha, 10)

    const usuario = await Usuario.create({
        ...dados,
        id,
        senha: senhaHash
    })

    return usuario
}

export async function atualizarUsuario(id, dados){
    const campos = {}

    if(dados.nome !== undefined){
        campos.nome = dados.nome
    }

    if(dados.email !== undefined){ 
        const emailExistente = await Usuario.findOne(
            {
                email: dados.email,
                id: {$ne: id}
            }
        )

        if(emailExistente){
            throw new Error("Um usuário já usa esse email")
        }

        campos.email = dados.email
    }

    const usuarioAtualizado = await Usuario.findOneAndUpdate(
        {id: id},
        {
            $set: campos
        },
        {
            returnDocument: 'after'
        }
    )

    if(!usuarioAtualizado){
        throw new Error("Usuário não encontrado")
    }

    return usuarioAtualizado
}

export async function buscarUsuarioPorNome(nome){
    const usuariosComTalNome = await Usuario.find({nome: new RegExp(nome, 'i')}).select('id nome email -_id')

    if(usuariosComTalNome.length === 0){
        throw new Error('Nenhum usuário registrado com esse nome')
    }

    return usuariosComTalNome
}

export async function deletarUsuarioPorId(id){
    const usuario = await Usuario.findOneAndDelete({id: id})

    if(!usuario){
        throw new Error('Nenhum usuário registrado com esse id');
    }

    return usuario
}   