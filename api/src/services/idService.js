import Contador from "../models/Contador.js"

export async function gerarId(prefixo){
    const contador = await Contador.findOneAndUpdate(
        {_id: prefixo},
        {$inc: {sequencia: 1}},
        {
            returnDocument: 'after',
            upsert: true
        }
    )

    return `${prefixo}-${String(contador.sequencia).padStart(6, '0')}`
}