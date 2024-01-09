import { z } from 'zod'

const phoneRegex: RegExp = /^(?:[0-9] ?){6,14}[0-9]$/;
const cpfRegex: RegExp = /^([0-9]{3}){2}[0-9]{3}[0-9]{2}$/;


export const schemaFormClient = z.object({
    name_complete: z.string({required_error:'Este campo é obrigatório'}).min(5,{message:'Nome muito curto'}),
    cpf: z.string().regex(cpfRegex,{message:'Insira um CPF válido!'}).length(11,{message:'CPF deve possuir 11 digitos numéricos'}),
    phone: z.string().regex(phoneRegex,{message:'Insira um número de telefone válido!'}).max(11,{message:'Deve conter no máximo 11 dígitos'}),
    gender: z.literal('Masculino', {errorMap: () => ({ message: "Escolha entre Masculino | Feminino" })}).or(z.literal("Feminino")).describe('bau'),
    email: z.string().email({message:'Insira um email válido!'})
})