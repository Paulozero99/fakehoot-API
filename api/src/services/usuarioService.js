import Usuario from "../models/Usuario.js"

export async function criarUsuario(dados){
    const usuarioExistente = await Usuario.findOne({email: dados.email})

    if(usuarioExistente){
        throw new Error('Email já cadastrado')
    }

    const usuario = await Usuario.create(dados)

    return usuario
}
