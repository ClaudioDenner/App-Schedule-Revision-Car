'use client'
import { Dialog,Flex, Text, TextField } from "@radix-ui/themes"
import { CiEdit } from "react-icons/ci"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import Spinner from '../../../svg/spiner01.svg'
import Image from "next/image";
import { schemaFormSchedules } from "@/schemas/SchemaformSchedule"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"


export default function DialogEditSchedule({nId, clientId, clientName , vehicleId, date, service, detail, value}:any){

    const router = useRouter();

    const {register, handleSubmit, reset, formState:{errors}} = useForm({resolver:zodResolver(schemaFormSchedules)});
    const [statusSubmit, setStatusSubmit] = useState(false)
    
    const toastSuccess = () => {
        toast.info("Edição realizada com sucesso!", {
          position: toast.POSITION.BOTTOM_RIGHT,
          
          
        });

      };

      const toastError = (msg:string) => {
        toast.error(`Parece que algo deu errado: ${msg}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          
        });
      };

    const updateVehicle = async(form:any)=>{
        
        const data = {
            date: form.date,
            service: form.service,
            detail: form.detail,
            value: form.value,
        }
    
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/schedules/${nId}`,{
            method:'PATCH',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(data)
        })
        .then((res) => {
            if(res.status === 200 || res.status === 201) {
                toastSuccess()
                
                setTimeout(()=> reset(), 1000)
                setTimeout(()=> router.push('/fallback/schedules'), 1500)
            }else{
                return res.json()
            }
            
        } )
        .then((json)=>{ toastError(json.message) })
        .catch(error => console.log(error))
        .finally(()=> setStatusSubmit(false))

    }

    return(
        <>
        <Dialog.Root>
            <Dialog.Trigger>
            <button 
            type="button" 
            className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded inline-flex items-center m-1"
            >
                 
                <CiEdit />
            </button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>Edição Agendamento</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    {`Id: #${clientId},  cliente: ${clientName}, data: ${new Date(date).toLocaleString("pt-br")}`}
                </Dialog.Description>

            <form onSubmit={handleSubmit(updateVehicle)}>
                <Flex direction="column" gap="3">
                <label className="hidden">
                    <Text as="div" size="2" mb="1" weight="bold">
                    Client ID
                    </Text>
                    <TextField.Input
                    type="number"
                    defaultValue={clientId}
                    disabled={statusSubmit ? true : false}
                    {...register('client_id', {valueAsNumber:true})}
                    
                    />
                    <p className="text-grey-dark text-xs italic text-red-400">{errors.date?.message && `${errors.date?.message}`}</p>

                </label>
                <label className="hidden">
                    <Text as="div" size="2" mb="1" weight="bold">
                    Veículo ID
                    </Text>
                    <TextField.Input
                    type="number"
                    defaultValue={vehicleId}
                    disabled={statusSubmit ? true : false}
                    {...register('vehicle_id', {valueAsNumber:true})}
                    
                    />
                    <p className="text-grey-dark text-xs italic text-red-400">{errors.date?.message && `${errors.date?.message}`}</p>

                </label>
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                    Data
                    </Text>
                    <TextField.Input
                    type="datetime-local"
                    defaultValue={date}
                    disabled={statusSubmit ? true : false}
                    {...register('date', {valueAsDate:true})}
                    
                    />
                    <p className="text-grey-dark text-xs italic text-red-400">{errors.date?.message && `${errors.date?.message}`}</p>

                </label>
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                    Serviço
                    </Text>
                    <TextField.Input
                    {...register('service')}
                    defaultValue={service}
                    placeholder=""
                    disabled={statusSubmit ? true : false}
                     
                    />
                    
                    <p className="text-grey-dark text-xs italic text-red-400">{errors.service?.message && `${errors.service?.message}`}</p>

                </label>
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                    Descrição
                    </Text>
                    <TextField.Input
                    defaultValue={detail}
                    placeholder="-123"
                    disabled={statusSubmit ? true : false} 
                    {...register('detail')}
                    />

                    <p className="text-grey-dark text-xs italic text-red-400">{errors.plate?.message && `${errors.plate?.message}`}</p>

                </label>
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                    Valor
                    </Text>
                    <TextField.Input
                    type="number"
                    step="0.01"
                    min={0}
                    max={2000}
                    defaultValue={value}
                    disabled={statusSubmit ? true : false} 
                    {...register('value',{
                        valueAsNumber:true
                    })}
                    />

                    <p className="text-grey-dark text-xs italic text-red-400">{errors.year?.message && `${errors.year?.message}`}</p>

                </label>

                </Flex>

                <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                    <button
                    type="button"
                    className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                    onClick={()=>reset()}
                    disabled={statusSubmit ? true : false}
                    
                    >
                    Fechar
                    </button>
                </Dialog.Close>
                <button 
                    type="submit"
                    disabled={statusSubmit ? true : false}
                    className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded flex justify-center items-center"
                    onClick={()=>console.log(errors)}
                    >
                        {
                        statusSubmit && <Image src={Spinner} alt="spinner"  className="relative w-full h-full"/>
                        }                        
                        Editar
                        
                    </button>
                </Flex>
            </form>
            
            </Dialog.Content>
        </Dialog.Root>
        </>
    )
}