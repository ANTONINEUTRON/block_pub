"use client";
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { Modal } from '@mui/joy';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <>
      <section>
        <div className='w-full h-screen grid grid-cols-1 md:grid-cols-2 gap-2 bg-[#16145d]'>
          <div className='flex flex-col justify-center items-center'>
            <div className='ml-14 text-white'>
              <div className='text-5xl'>CREATE AND CONSUME BOOKS LIKE NEVER BEFORE</div>
              <div className='text-lg'>Revolutionize Your Reading Experience with Blockchain-Backed Book Creation and Reading Platform </div>
            </div>
          </div>
          <div className='hidden md:flex justify-center items-center'>
            <Image src="/homeillu.jpg" width={500} height={500} alt="My Image" />
          </div>
        </div>
      </section>

      <section className='flex my-10 justify-center container dark:bg-gray-900 bg-gray-100 py-10 px-5 rounded-md md:w-2/3 md:mx-auto'>
        <h1 className='text-4xl'>HOW IT WORKS</h1>
        
      </section>
      
      <section className='flex mb-10 justify-center container dark:bg-gray-900 bg-gray-100 py-10 px-5 rounded-md md:w-2/3 md:mx-auto'>
        <h1 className='text-4xl'>RECENTLY PUBLISHED WORKS</h1>
        
      </section>
    </>
  );
}
