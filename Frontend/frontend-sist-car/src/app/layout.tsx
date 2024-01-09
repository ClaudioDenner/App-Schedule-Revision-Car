import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import MobileNavbar from '../components/navbar/mobile-navbar'
import DesktopNavbar from '../components/navbar/desktop-navbar'

import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: 'Revisão Veicular',
  description: '...',
  
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  

  return (
    <html lang="pt-br" >
      <body className={inter.className}>
      <Theme>
        <ToastContainer />
        <MobileNavbar />
        <main className='w-full h-auto flex justify-center items-start max-w-screen-3xl m-auto overflow-hidden'>
          <div className='hidden md:block md:w-1/5 md:h-full'>
            <DesktopNavbar />
          </div>

          <div className='w-full md:w-4/5  md:h-auto bg-white overflow-auto'>
            {children}
          </div>
          
        </main>
      </Theme>
      </body>
    </html>
  )
}
