import Usuario from "../models/Usuario.js"

export async function criarUsuario(dados){
    const usuario = await Usuario.create(dados)

    return usuario
}
