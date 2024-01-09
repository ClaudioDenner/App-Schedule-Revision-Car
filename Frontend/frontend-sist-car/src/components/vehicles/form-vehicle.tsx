'use client'
import { useState, useEffect } from "react"
import {useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { schemaFormVehicle } from "@/schemas/SchemaformVehicle"
import Spinner from '../../svg/spiner01.svg'
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import { IClient } from "@/types/IClient"


export default function FormVehicle(){

    const [data, setData] = useState<IClient[]>()
    
    const router = useRouter();
    const {register, handleSubmit, reset, formState:{errors}} = useForm({resolver:zodResolver(schemaFormVehicle)});
    const [statusSubmit, setStatusSubmit] = useState(true)


    useEffect(()=>{

        async function query(){
            try{  
                await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/clients`,{
                    headers:{'Content-Type': 'application/json'}
                })
                .then((res)=> res.json())
                .then((json)=> setData(json))
                .then(()=> setStatusSubmit(false))
    
            }catch(error){
                console.log(error)
            }
        }
        query()
    },[])
    
    
    
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
            client_id: parseInt(form.client_id),
            model: form.model,
            plate: form.plate,
            year: parseInt(form.year),
        }

         fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/vehicles`, {
              method:'POST',
              headers:{'Content-Type': 'application/json'},
              body:JSON.stringify(data)
            })
            .then((res) => {
                if(res.status === 200 || res.status === 201) {
                    toastSuccess()
                    
                    setTimeout(()=> reset(), 1000)
                    setTimeout(()=> router.push('/fallback/vehicles'), 1500)
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

                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-client_id">
                            Selecione o proprietário
                        </label>
                        <div className="relative mb-5">
                            <select 
                            className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" 
                            id="grid-client_id" 
                            disabled={statusSubmit ? true : false}
                            {...register('client_id')}
                            defaultValue="..."
                            >
                            <option value="">Selecione um Proprietário</option>
                            {
                                data?.map((client)=>
                                <option className="uppercase" key={client.id} value={client.id}>{`${client.name_complete} | CPF:${client.cpf}`}</option>
                                )
                            }

                            </select>
                            <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>

                        <div className="-mx-3 md:flex mb-2">
                            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-model">
                                MODELO
                            </label>
                            <input 
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                            id="grid-model" 
                            type="text" 
                            placeholder="HB20" 
                            disabled={statusSubmit ? true : false}
                            {...register('model')}
                            required
                            />
                            <p className="text-grey-dark text-xs italic text-red-400">{errors.model?.message && `${errors.model?.message}`}</p>
                        </div>

                        <div className="md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-plate">
                            PLACA
                        </label>
                        <input 
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                        id="grid-plate" 
                        type="text" 
                        placeholder="####"
                        disabled={statusSubmit ? true : false} 
                        {...register('plate')}
                        />
                        <p className="text-grey-dark text-xs italic text-red-400">{errors.phone?.message && `${errors.phone?.message}`}</p>

                        </div>

                        <div className="md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-year">
                            ANO
                        </label>
                        <input 
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                        id="grid-year" 
                        type="number" 
                        min={1980}
                        max={2024}
                        placeholder="####"
                        disabled={statusSubmit ? true : false} 
                        {...register('year')}
                        />
                        <p className="text-grey-dark text-xs italic text-red-400">{errors.year?.message && `${errors.year?.message}`}</p>

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
                        onClick={()=>console.log(errors)}
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