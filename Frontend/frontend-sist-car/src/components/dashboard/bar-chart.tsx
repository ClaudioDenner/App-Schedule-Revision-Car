'use client'
import { BarChart, Card, Title } from "@tremor/react";
import { useState, useEffect } from "react";
import Spinner from '../../svg/spiner01.svg'
import Image from "next/image";


  
  export default function BarChartComponent(){
    
    const [isLoad, setLoad] = useState(true)
    const [data, setData] = useState<any | undefined>()
    
    useEffect(()=>{
      async function query(){
          try{  
              await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/schedules`,{
                  headers:{'Content-Type': 'application/json'}
                })
                .then((res)=> res.json())
                .then((obj)=> setData(obj) )
                .then(()=> setLoad(false))
                
              }catch(error){
                console.log(error)
              }
            }
            query()
          },[])
          
    const valueFormatter = (number:any) => `R$ ${new Intl.NumberFormat("us").format(number).toString()}`;
          
    if(isLoad) return <Image src={Spinner} alt="spinner"  className="m-auto w-1/3 h-1/3" priority/>
          
    return(
        <div className="w-full  p-8">
            <Card>
                <Title>Faturamento por tipo de revisão</Title>
                <BarChart
                className="mt-6"
                data={data}
                index="service"
                categories={["value"]}
                colors={["blue"]}
                valueFormatter={valueFormatter}
                yAxisWidth={48}
                />
            </Card>
        </div>
    )
}