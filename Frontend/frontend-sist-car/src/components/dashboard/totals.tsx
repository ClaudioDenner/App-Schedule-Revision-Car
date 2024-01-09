'use client'
import { PersonIcon } from "@radix-ui/react-icons"
import { FaCar } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { useState, useEffect } from "react";
import { ImSpinner } from "react-icons/im";

export default function TotalsDashboard({iconName, nameComp}:any){


    const [isLoad, setLoad] = useState(true)
    const [data, setData]= useState(0)

    useEffect(()=>{
        async function query(){
            try{  
                await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${iconName}`,{
                    headers:{'Content-Type': 'application/json'}
                })
                .then((res)=> res.json())
                .then((obj)=> setData(obj.length) )
                .then(()=> setLoad(false))
    
            }catch(error){
                console.log(error)
            }
        }
        query()
    },[])

    return(
        <div className="w-full md:w-1/3 m-2 md:m-1 ">
            <div className="relative flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border rounded-xl overflow-hidden bg-gradient-to-tr from-blue-300 to-blue-500 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    { iconName == 'clients' && <PersonIcon /> }
                    { iconName == 'schedules' && <IoMdTime /> }
                    { iconName == 'vehicles' && <FaCar /> }
                </div>
                <div className="p-4 text-right">
                    <p className="block antialiased font-sans text-2xl leading-normal font-bold text-blue-gray-600">Total {nameComp}</p>
                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{isLoad ? <ImSpinner className="animate-spin text-blue-200 ml-auto" /> : data }</h4>
                </div>
            </div>
        </div>
    )
}