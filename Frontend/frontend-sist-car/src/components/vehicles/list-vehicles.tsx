'use client'
import DialogAlertVehicle from "./dialogs/dialog-alert";
import DialogEditVehicle from "./dialogs/dialog-edit";
import { useEffect, useState } from "react";
import { IVehicles } from "@/types/IVehicles";
import Image from "next/image";
import SpinnerLoad from '../../svg/spiner01.svg'


export default function ListVehicles(){
    const [isLoad, setLoad] = useState(true)
    const [data, setData] = useState<IVehicles[]>()

    const regexCPF = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
    const regexPhone = /^(\d{2})(\d{5})(\d{4})$/;



    useEffect(()=>{

        async function query(){
            try{  
                await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/vehicles`,{
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
                                <th scope="col" className="py-3 px-6 text-center">Modelo</th>
                                <th scope="col" className="py-3 px-6 text-center">Placa</th>
                                <th scope="col" className="py-3 px-6 text-center">Ano</th>
                                <th scope="col" className="py-3 px-6 text-center">Proprietário</th>
                                <th scope="col" className="py-3 px-6 text-center">Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data?.map((vehicle)=>
                                <tr  key={vehicle.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 hover:cursor-text">
                                <td className="py-4 px-4 text-center font-bold">{vehicle.id}</td>
                                <td className="py-4 px-2 uppercase text-center">{vehicle.model}</td>
                                <td className="py-4 px-2 uppercase text-center">{vehicle.plate}</td>
                                <td className="py-4 px-2 text-center">{vehicle.year}</td>
                                <td className="py-4 px-2 w-2/5 uppercase text-center">{vehicle.client_id.name_complete}</td>
                                <td className="py-4 px-2 text-center">
                                    <DialogEditVehicle nId={vehicle.id} model={vehicle.model} year={vehicle.year} clientId={vehicle.client_id.id} plate={vehicle.plate} clientName={vehicle.client_id.name_complete}  />
                                    <DialogAlertVehicle nId={vehicle.id} model={vehicle.model} plate={vehicle.plate} clientName={vehicle.client_id.name_complete} />
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