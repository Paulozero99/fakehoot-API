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
