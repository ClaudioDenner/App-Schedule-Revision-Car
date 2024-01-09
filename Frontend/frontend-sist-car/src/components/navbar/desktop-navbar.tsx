'use client'
import Link from "next/link"
import { DashboardIcon, PersonIcon } from "@radix-ui/react-icons"
import { FaCar } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { usePathname } from "next/navigation";

export default function DesktopNavbar() {

    const pathname = usePathname()
    


    
    return (
    <>
    <nav className= "relative w-full h-full" >
        <ul className=" flex-col justify-center items-center w-full text-lg font-medium text-slate-500 mt-20 px-4">
            <li className={pathname === '/' ? 'w-full pt-4 pb-4 mt-2 mb-2 bg-gradient-to-tr from-blue-300 to-blue-500 hover:bg-slate-100 hover:text-slate-500 text-white rounded-md' : 'w-full pt-4 pb-4 mt-2 mb-2 hover:bg-slate-100 rounded-md'}>
                <Link 
                href='/' 
                className="flex items-center justify-center gap-2"
                >
                    <DashboardIcon /> Home
                </Link>
            </li>
            <li className={pathname === '/clients' ? 'w-full pt-4 pb-4 bg-gradient-to-tr from-blue-300 to-blue-500 hover:bg-slate-100 hover:text-slate-500 text-white rounded-md mt-2 mb-2' : 'w-full mt-2 mb-2 pt-4 pb-4 hover:bg-slate-100 rounded-md'}>
                <Link 
                href='/clients' 
                className="flex items-center justify-center gap-2"
                >
                    <PersonIcon /> Clientes
                </Link>
            </li>
            <li className={pathname === '/vehicles' ? 'w-full pt-4 pb-4 bg-gradient-to-tr from-blue-300 to-blue-500 hover:bg-slate-100 hover:text-slate-500 text-white rounded-md mt-2 mb-2' : 'w-full pt-4 pb-4 mt-2 mb-2 hover:bg-slate-100 rounded-md'}>
                <Link 
                href='/vehicles' 
                className="flex items-center justify-center gap-2"
                >
                    <FaCar /> Veículos
                </Link>
            </li>
            <li className={pathname === '/schedules' ? 'w-full pt-4 pb-4 bg-gradient-to-tr from-blue-300 to-blue-500 hover:bg-slate-100 hover:text-slate-500 text-white rounded-md mt-2 mb-2' : 'w-full mt-2 mb-2 pt-4 pb-4 hover:bg-slate-100 rounded-md'}>
                <Link 
                href='/schedules' 
                className="flex items-center justify-center gap-2"
                >
                    <IoMdTime /> Agendamentos
                </Link>
            </li>
        </ul>
    </nav>
    </>
    )
  }