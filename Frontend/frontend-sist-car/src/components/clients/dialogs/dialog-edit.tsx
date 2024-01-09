'use client'
import { Dialog,Flex, Text, TextField } from "@radix-ui/themes"
import { CiEdit } from "react-icons/ci"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import Spinner from '../../../svg/spiner01.svg'
import Image from "next/image";
import { schemaFormClient } from "@/schemas/SchemaformClient"
import {useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Cross2Icon } from "@radix-ui/react-icons"

export default function DialogEditClient({nId, fullName, cpf, gender, phone, email}:any){

    const router = useRouter();

    const {register, handleSubmit, reset, formState:{errors}} = useForm({resolver:zodResolver(schemaFormClient)});
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

    const update = async(form:any)=>{
        
        const data = {
            name_complete: form.name_complete,
            cpf: form.cpf,
            phone: form.phone,
            gender: form.gender,
            email: form.email
        }
    
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/clients/${nId}`,{
            method:'PATCH',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(data)
        })
        .then((res) => {
            if(res.status === 200 || res.status === 201) {
                toastSuccess()
                
                setTimeout(()=> reset(), 1000)
                setTimeout(()=> router.push('/fallback/clients'), 1500)
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
                <Dialog.Title>Edição de cadastro de cliente</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                 Make changes to your profile.
                </Dialog.Description>
            <form onSubmit={handleSubmit(update)}>
                <Flex direction="column" gap="3">
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                    Nome Completo
                    </Text>
                    <TextField.Input
                    defaultValue={fullName}
                    placeholder="Nome completo"
                    disabled={statusSubmit ? true : false}
                    {...register('name_complete')}
                     
                    />
                    
                    <p className="text-grey-dark text-xs italic text-red-400">{errors.name_complete?.message && `${errors.name_complete?.message}`}</p>

                </label>
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                    CPF
                    </Text>
                    <TextField.Input
                    defaultValue={cpf}
                    placeholder="CPF"
                    disabled={statusSubmit ? true : false} 
                    {...register('cpf')}
                    />

                    <p className="text-grey-dark text-xs italic text-red-400">{errors.cpf?.message && `${errors.cpf?.message}`}</p>

                </label>
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                    Telefone
                    </Text>
                    <TextField.Input
                    defaultValue={phone}
                    placeholder="Telefone"
                    disabled={statusSubmit ? true : false} 
                    {...register('phone')}
                    />

                    <p className="text-grey-dark text-xs italic text-red-400">{errors.phone?.message && `${errors.phone?.message}`}</p>

                </label>
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                    Email
                    </Text>
                    <TextField.Input
                    defaultValue={email}
                    placeholder="Email"
                    disabled={statusSubmit ? true : false} 
                    {...register('email')}
                    />

                    <p className="text-grey-dark text-xs italic text-red-400">{errors.email?.message && `${errors.email?.message}`}</p>

                </label>
                <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                    Gênero
                    </Text>
                    <TextField.Input
                    defaultValue={gender}
                    placeholder="Gênero"
                    {...register('gender')}

                    />

                    <p className="text-grey-dark text-xs italic text-red-400">{errors.gender?.message && `${errors.gender?.message}`}</p>

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