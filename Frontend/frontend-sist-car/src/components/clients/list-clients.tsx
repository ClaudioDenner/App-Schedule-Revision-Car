'use client'
import DialogAlert from "./dialogs/dialog-alert";
import DialogEditClient from "./dialogs/dialog-edit";
import { useEffect, useState } from "react";
import { IClient } from "@/types/IClient";
import Image from "next/image";
import SpinnerLoad from '../../svg/spiner01.svg'


export default function ListClients2(){
    const [isLoad, setLoad] = useState(true)
    const [data, setData] = useState<IClient[]>()

    const regexCPF = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
    const regexPhone = /^(\d{2})(\d{5})(\d{4})$/;



    useEffect(()=>{

        async function query(){
            try{  
                await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/clients`,{
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
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6 font-bold text-center">Id</th>
                                <th scope="col" className="py-3 px-6 text-center">Nome Completo</th>
                                <th scope="col" className="py-3 px-6 text-center">CPF</th>
                                <th scope="col" className="py-3 px-6 text-center">Telefone</th>
                                <th scope="col" className="py-3 px-6 text-center">Email</th>
                                <th scope="col" className="py-3 px-6 text-center">Gênero</th>
                                <th scope="col" className="py-3 px-6 text-center">Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                data?.map((client)=>
                                <tr  key={client.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 hover:cursor-text">
                                <td className="py-4 px-4 text-center font-bold">{client.id}</td>
                                <td className="py-4 px-2 uppercase text-center">{client.name_complete}</td>
                                <td className="py-4 px-2 text-center">{client.cpf.replace(regexCPF,`$1.$2.$3-$4`)}</td>
                                <td className="py-4 px-2 text-center">{client.phone.replace(regexPhone,`$1 $2-$3`)}</td>
                                <td className="py-4 px-2 w-1/5 lowercase text-center">{client.email}</td>
                                <td className="py-4 px-2 lowercase text-center">{client.gender}</td>
                                <td className="py-4 px-2 text-center">
                                    <DialogEditClient nId={client.id} fullName={client.name_complete} cpf={client.cpf} phone={client.phone} gender={client.gender} email={client.email}/>
                                    <DialogAlert nId={client.id} fullName={client.name_complete} />
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