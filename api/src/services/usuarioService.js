import bcrypt from 'bcrypt'
import Usuario from "../models/Usuario.js"

export async function criarUsuario(dados){
    const usuarioExistente = await Usuario.findOne({email: dados.email})

    if(usuarioExistente){
        throw new Error('Email já cadastrado')
    }

    const senhaHash = await bcrypt.hash(dados.senha, 10)
    const id = "uuid-1234"

    const usuario = await Usuario.create({
        ...dados,
        senha: senhaHash
    })

    return usuario
}
