import { z } from 'zod'

const regexNumber = /\d|,/g

export const schemaFormVehicle = z.object({
    model: z.string({required_error:'Este campo é obrigatório'}).max(15,{message:'Modelo inválido para os padrões aceitos'}),
    plate: z.string().min(7,{message:'este não parece ser um modelo de placa válido'}).max(12, {message:'este não parece ser um modelo de placa válido'}),
    year: z.string().length(4,{message:'Insira o ano e fabricação com 4 digitos'}),
    client_id: z.string()
})