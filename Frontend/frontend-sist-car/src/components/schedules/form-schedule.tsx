'use client'
import { useState, useEffect } from "react"
import {useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { schemaFormSchedules } from "@/schemas/SchemaformSchedule"
import Spinner from '../../svg/spiner01.svg'
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify';
import { IClientFull } from "@/types/IClientFull"



export default function FormSchedule(){

    const router = useRouter();
    const {register, handleSubmit, reset, formState:{errors}, getValues} = useForm({resolver:zodResolver(schemaFormSchedules)});
    const [statusSubmit, setStatusSubmit] = useState(true)

    const [data, setData] = useState<IClientFull[]>()
    const [clientSelected, setClientSelected] = useState<string | undefined>()

    


    

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
            client_id: form.client_id,
            vehicle_id: form.vehicle_id,
            date: form.date,
            service: form.service,
            detail: form.detail,
            value: form.value,
        }

         fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/schedules`, {
              method:'POST',
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
    
    return (
        <>
        <div className="flex-col  items-start justify-center min-h-screen p-4 w-full">
            <form onSubmit={handleSubmit(submitForm)}>
                <div className=" shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">

                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-client_id">
                            Proprietário
                        </label>
                        <div className="relative mb-5">
                            <select 
                            className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" 
                            id="grid-client_id" 
                            disabled={statusSubmit ? true : false}
                            {...register('client_id',{
                                valueAsNumber:true
                            })}
                            onChange={(e)=>setClientSelected(e.target.value as string | undefined)}
                            >
                            <option value="">Selecione o proprietário</option>
                            {
                                data?.map((client)=>
                                <option className="uppercase" key={client.id} value={client.id}>{`${client.name_complete} | CPF:${client.cpf}`}</option>
                                )
                            }

                            </select>
                            <p className="text-grey-dark text-xs italic text-red-400">{errors.client_id?.message && `${errors.client_id?.message}`}</p>

                            <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>

                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-client_id">
                            Veículo
                        </label>
                        <div className="relative mb-5">
                            <select 
                            className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" 
                            id="grid-client_id" 
                            disabled={statusSubmit ? true : false}
                            {...register('vehicle_id',{
                                valueAsNumber:true
                            })}
                            >
                            <option value="">Selecione o veículo</option>
                            {
                                (data?.find((client)=> (client.id).toString() == clientSelected))?.vehicles.map((vehicles)=>
                                <option key={vehicles.id} value={vehicles.id} className="upp">{`${vehicles.model} | Placa ${vehicles.plate}`}</option>
                                )
                            }

                            </select>
                            <p className="text-grey-dark text-xs italic text-red-400">{errors.vehicle_id?.message && `${errors.vehicle_id?.message}`}</p>

                            <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>

                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-client_id">
                            SERVIÇO
                        </label>
                        <div className="relative mb-5">
                            <select 
                            className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" 
                            id="grid-client_id" 
                            disabled={statusSubmit ? true : false}
                            {...register('service')}
                            >
                            <option value="">Selecione o serviço</option>
                            <option>Revisão Completa</option>
                            <option>Revisão Parcial</option>

                            </select>
                            <p className="text-grey-dark text-xs italic text-red-400">{errors.service?.message && `${errors.service?.message}`}</p>

                            <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>

                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-client_id">
                            DESCRIÇÃO
                        </label>
                        <div className="relative mb-5">
                            <input
                            className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" 
                            placeholder="Alinhamento, balanceamento, troca de óleo, etc."
                            {...register('detail')}

                            />
                            <p className="text-grey-dark text-xs italic text-red-400">{errors.detail?.message && `${errors.detail?.message}`}</p>

                            <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                            </div>
                        </div>

                        <div className="-mx-3 md:flex mb-2">
                            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-date">
                                DATA
                            </label>
                            <input 
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                            id="grid-date" 
                            type="datetime-local" 
                            disabled={statusSubmit ? true : false}
                            {...register('date', {valueAsDate: true})}
                            />
                            <p className="text-grey-dark text-xs italic text-red-400">{errors.date?.message && `${errors.date?.message}`}</p>
                        </div>

                        <div className="md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-year">
                            VALOR
                        </label>
                        <input 
                        className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                        id="grid-year" 
                        type="number" 
                        step="0.01"
                        min={0}
                        max={2000}
                        placeholder="100.00"
                        disabled={statusSubmit ? true : false} 
                        {...register('value', {
                            valueAsNumber:true
                        })}
                        />
                        <p className="text-grey-dark text-xs italic text-red-400">{errors.value?.message && `${errors.value?.message}`}</p>

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
                        onClick={()=> console.log(getValues('client_id'))}
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