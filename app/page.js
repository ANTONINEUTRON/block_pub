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
              <div className='text-7xl'>ACCESS BOOKS ON BLOCKCHAIN</div>
              <div className='text-lg'>Publish/Read books through blockchain by utilizing the power of NFTs</div>
            </div>
          </div>
          <div className='hidden md:flex justify-center items-center'>
            <Image src="/homeillu.jpg" width={500} height={500} alt="My Image" />
          </div>
        </div>
      </section>
    </>
  );
}
