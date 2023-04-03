import './globals.css';
import Sidebar from '../components/sidebar';
import ToastCont from '@/components/toast_cont';
import Head from 'next/head';
import { usePathname } from 'next/navigation';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en" className='text-black bg-gray-200 dark:text-white dark:bg-[#111010]'>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <body className="antialiased max-w-4xl mb-40 flex flex-col md:flex-row mx-4 mt-8 md:mt-20 lg:mt-32 lg:mx-auto">
        <ToastCont />
        <Sidebar />
        <main className="flex-auto min-w-0 mt-6 md:mt-0 flex flex-col px-2 md:px-0">
          {children}
        </main>
      </body>
    </html>
  )
}