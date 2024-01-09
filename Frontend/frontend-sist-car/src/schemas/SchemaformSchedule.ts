import { z } from 'zod'

const regexNumber = /\d|,/g

export const schemaFormSchedules = z.object({
    client_id: z.number().int({message:'Selecione um cliente'}),
    vehicle_id: z.number().int({message:'Selecione um veículo'}),
    date: z.date().min(new Date(),{message:'A data não pode ser inferior a atual'}),
    service: z.string().min(5,{message:'Descrição muito curta'}).max(50,{message:'Descrição muito longa'}),
    detail: z.string().min(5,{message:'Descrição muito curta'}).max(80,{message:'Descrição muito longa'}),    
    value: z.number(),    
})