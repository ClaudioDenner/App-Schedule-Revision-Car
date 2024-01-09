'use client'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { useState } from "react"
import Link from "next/link"
import { DashboardIcon, PersonIcon } from "@radix-ui/react-icons"
import { usePathname } from "next/navigation";
import { FaCar } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { IoIosClose } from "react-icons/io";


export default function MobileNavbar() {

    const [active, isActive] = useState(false)
    const pathname = usePathname()


    return (
    <>
    <div className= "fixed right-3 top-3 md:hidden z-10 " onClick={()=> isActive(!active)} >
        <IconButton>
            {active ? <IoIosClose /> : <HamburgerMenuIcon /> }
        </IconButton>
    </div>

    {
    active &&
    <nav className= " w-3/5 md:hidden flex justify-center items-center h-full z-10 fixed top-0 left-0 bg-slate-50" >
        <ul className=" relative flex-col justify-center items-center text-lg font-medium text-slate-500 w-4/5">
            
            <li className={pathname === '/' ? 'w-full pt-4 pb-4 bg-blue-300 hover:bg-slate-100 hover:text-slate-500 text-white rounded-md' : 'w-full pt-4 pb-4 hover:bg-slate-100 rounded-md'}>
                <Link 
                href='/' 
                className="flex items-center justify-center gap-2"
                >
                    <DashboardIcon /> Home
                </Link>
            </li>
            <li className={pathname === '/clients' ? 'w-full pt-4 pb-4 bg-blue-300 hover:bg-slate-100 hover:text-slate-500 text-white rounded-md' : 'w-full pt-4 pb-4 hover:bg-slate-100 rounded-md'}>
                <Link 
                href='/clients' 
                className="flex items-center justify-center gap-2"
                >
                    <PersonIcon /> Clientes
                </Link>
            </li>
            <li className={pathname === '/vehicles' ? 'w-full pt-4 pb-4 bg-blue-300 hover:bg-slate-100 hover:text-slate-500 text-white rounded-md ' : 'w-full pt-4 pb-4 hover:bg-slate-100 rounded-md'}>
                <Link 
                href='/vehicles' 
                className="flex items-center justify-center gap-2"
                >
                    <FaCar /> Veículos
                </Link>
            </li>
            <li className={pathname === '/schedules' ? 'w-full pt-4 pb-4 bg-blue-300 hover:bg-slate-100 hover:text-slate-500 text-white rounded-md ' : 'w-full pt-4 pb-4 hover:bg-slate-100 rounded-md'}>
                <Link 
                href='/schedules' 
                className="flex items-center justify-center gap-2"
                >
                    <IoMdTime /> Agendamentos
                </Link>
            </li>
        </ul>
    </nav>
    }

    </>
    )
  }