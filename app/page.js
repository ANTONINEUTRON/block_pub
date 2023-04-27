"use client";
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { Modal } from '@mui/joy';
import RecentlyPublishedBooks from '@/components/recently_published_books';
import Link from 'next/link';
import { FaAngleRight } from 'react-icons/fa';
import { useEffect } from 'react';
import Web3 from 'web3';
import contract_interface from '@/contract/contract_interface';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  useEffect(
    ()=>{
      
    }
  );

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
            <img src="/homeillu.jpg" width={500} height={500} alt="My Image" />
          </div>
        </div>
      </section>

      <section className='relative my-10 justify-center container dark:bg-gray-900 bg-gray-100 py-10 px-5 rounded-md md:w-2/3 md:mx-auto'>
        <h1 className='text-4xl'>HOW IT WORKS</h1><hr className='w-10 bg-slate-800'/><br/>
        <div className='flex flex-col md:flex-row justify-around'>
          {/* <div className='flex justify-center'>
            <Image src="/homeillu.jpg" width={200} height={200} alt="My Image" />
          </div> */}
          <div className='flex flex-col m-4'>
            <h2 className='text-2xl font-mono'>Publishing</h2>
            <ul className='mt-5 list-disc font-light'>
              <li>Fill in the book details</li>
              <li>Mint/Publish the book to the blockchain</li>
              <li>Verify your book signature on the blockchain</li>
            </ul>
          </div>
          {/* <div className='flex justify-center'>
            <Image src="/homeillu.jpg" width={300} height={300} alt="My Image" />
          </div> */}
          <div className='flex flex-col m-4'>
            <h2 className='text-2xl font-mono'>Reading</h2>
            <ul className='mt-5 list-disc font-light'>
              <li>Explore our catalog of published books</li>
              <li>Click on the &#39Read&#39 button</li>
              <li>Pay (if needed) and access the book</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section className='relative mb-10 container dark:bg-gray-900 bg-gray-100 py-10 px-5 rounded-md md:w-5/6 md:mx-auto'>
        <div className='flex justify-between align-middle'>
          <div>
            <h1 className='text-4xl'>RECENTLY PUBLISHED WORKS</h1><hr className='w-10' />
          </div>
          <div>
            <Link href="/explore" className='flex justify-center align-middle'>More <FaAngleRight className='ml-2 my-auto'/> </Link>
          </div>
        </div>
        <br/>
        <RecentlyPublishedBooks />
      </section>
    </>
  );
}
