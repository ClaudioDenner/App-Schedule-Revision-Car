'use client'
import DialogAlertSchedule from "./dialogs/dialog-alert";
import DialogEditSchedule from "./dialogs/dialog-edit";
import { useEffect, useState } from "react";
import { ISchedule } from "@/types/ISchedule";
import Image from "next/image";
import SpinnerLoad from '../../svg/spiner01.svg'


export default function ListSchedules(){
    const [isLoad, setLoad] = useState(true)
    const [data, setData] = useState<ISchedule[]>()

    const regexCPF = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
    const regexPhone = /^(\d{2})(\d{5})(\d{4})$/;



    useEffect(()=>{

        async function query(){
            try{  
                await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/schedules`,{
                    headers:{'Content-Type': 'application/json'}
                })
                .then((res)=> res.json())
                .then((json)=> setData(json))
                .then(()=> setLoad(false))
    
            }catch(error){
                console.log(error)
            }
        }
        query()
    },[])

    if(isLoad) return(
        <>
        <div className="w-full h-screen flex items-center justify-center">
        <Image src={SpinnerLoad} alt="spinner load"   width={200} height={200} priority />
        </div>
        </>
    )

    return(
        <>

            <div className="flex items-center justify-center w-full p-2">
                <div className="overflow-x-auto relative shadow-md sm:rounded-lg w-full">
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6 font-bold text-center">Id</th>
                                <th scope="col" className="py-3 px-6 text-center">Data</th>
                                <th scope="col" className="py-3 px-6 text-center">Serviço</th>
                                <th scope="col" className="py-3 px-6 text-center">Descrição</th>
                                <th scope="col" className="py-3 px-6 text-center">Valor</th>
                                <th scope="col" className="py-3 px-6 text-center">Veículo</th>
                                <th scope="col" className="py-3 px-6 text-center">Proprietário</th>
                                <th scope="col" className="py-3 px-6 text-center">Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data?.map((schedule)=>
                                <tr  key={schedule.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 hover:cursor-text">
                                <td className="py-4 px-4 text-center font-bold">{schedule.id}</td>
                                <td className="py-4 px-2 uppercase text-center">{new Date(schedule.date).toLocaleString('pt-br')}</td>
                                <td className="py-4 px-2 uppercase text-center">{schedule.service}</td>
                                <td className="py-4 px-2 text-center">{schedule.detail}</td>
                                <td className="py-4 px-2 text-center">{parseInt(schedule.value).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</td>
                                <td className="py-4 px-2 w-2/5 uppercase text-center">{`${schedule.vehicle_id.model} | placa:${schedule.vehicle_id.plate}`}</td>
                                <td className="py-4 px-2 w-2/5 uppercase text-center">{`${schedule.client_id.name_complete} | CPF:${schedule.client_id.cpf}`}</td>
                                <td className="py-4 px-2 text-center">
                                    <DialogEditSchedule nId={schedule.id} detail={schedule.detail} service={schedule.service} clientId={schedule.client_id.id} date={schedule.date.replace('.000Z','')} clientName={schedule.client_id.name_complete} value={schedule.value} vehicleId={schedule.vehicle_id.id} />
                                    <DialogAlertSchedule nId={schedule.id} />
                                </td>
                                </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
    
            </div>

        </>
    )
}