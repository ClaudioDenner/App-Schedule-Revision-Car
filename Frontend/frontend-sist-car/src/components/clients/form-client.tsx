'use client'
import { useState } from "react"
import {useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { schemaFormClient } from "@/schemas/SchemaformClient"
import Spinner from '../../svg/spiner01.svg'
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';


export default function FormClient(){

    const router = useRouter();
    const {register, handleSubmit, reset, formState:{errors}} = useForm({resolver:zodResolver(schemaFormClient)});
    
    const [statusSubmit, setStatusSubmit] = useState(false)
    
    const toastSuccess = () => {
        toast.success("Cadastro realizado sucesso", {
          position: toast.POSITION.BOTTOM_RIGHT,
          
          
        });
      };

      const toastError = (msg:string) => {
        toast.error(`Parece que algo deu errado: ${msg}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
          
        });
      };
      

  

    const submitForm = async (form:any)=>{

        setStatusSubmit(true)

        const data = {
            name_complete: form.name_complete,
            cpf: form.cpf,
            phone: form.phone,
            gender: form.gender,
            email: form.email
        }

         fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/clients`, {
              method:'POST',
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
    
    return (
        <>
        <div className="flex-col  items-start justify-center min-h-screen p-4 w-full">
        <form onSubmit={handleSubmit(submitForm)}>
            <div className=" shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
                
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-fullName">
                        Nome Completo
                    </label>
                    <input 
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" 
                    id="grid-fullName" 
                    type="text" 
                    placeholder="Claudio D S Nascimento" 
                    disabled={statusSubmit ? true : false} 
                    {...register('name_complete')}
                    />
                    <p className="text-grey-dark text-xs italic text-red-400">{errors.name_complete?.message && `${errors.name_complete?.message}`}</p>
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-email">
                        Email
                    </label>
                    <input 
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" 
                    id="grid-email" 
                    type="email" 
                    placeholder="claudio@exemplo.com" 
                    disabled={statusSubmit ? true : false}
                    {...register('email')}
                    />
                    <p className="text-grey-dark text-xs italic text-red-400">{errors.email?.message && `${errors.email?.message}`}</p>
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-2">
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-cpf">
                        CPF
                    </label>
                    <input 
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                    id="grid-cpf" 
                    type="text" 
                    placeholder="###########" 
                    disabled={statusSubmit ? true : false}
                    {...register('cpf')}
                    />
                    <p className="text-grey-dark text-xs italic">apenas números</p>
                    <p className="text-grey-dark text-xs italic text-red-400">{errors.cpf?.message && `${errors.cpf?.message}`}</p>

                    </div>
                    <div className="md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-gender">
                        Gênero
                    </label>
                    <div className="relative">
                        <select 
                        className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" 
                        id="grid-gender" 
                        disabled={statusSubmit ? true : false}
                        {...register('gender')}
                        defaultValue="..."
                        >
                        <option disabled>...</option>
                        <option>Masculino</option>
                        <option>Feminino</option>
                        </select>
                        <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        <p className="text-grey-dark text-xs italic text-red-400">{errors.gender?.message && `${errors.gender?.message}`}</p>
                        </div>
                    </div>
                    </div>
                    <div className="md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-telefone">
                        Telefone
                    </label>
                    <input 
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                    id="grid-telefone" 
                    type="text" 
                    placeholder="###########" 
                    disabled={statusSubmit ? true : false} 
                    {...register('phone')}
                    />
                    <p className="text-grey-dark text-xs italic text-red-400">{errors.phone?.message && `${errors.phone?.message}`}</p>

                    </div>
                    
                </div>
            </div>
            <div className="flex justify-end items-center gap-4">
            <button 
            type="button"
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
            onClick={()=>reset()}
            >
            Limpar formulário
            </button>

            <button
            type="submit" 
            disabled={statusSubmit ? true : false} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center "
            >
            {
                statusSubmit && <Image src={Spinner} alt="spinner"  className="relative w-12/12"/>
            }
            
            Cadastrar</button>

            </div>
        </form>
        </div>



        </>
    )
}