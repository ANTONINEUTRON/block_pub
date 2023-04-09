import Link from "next/link";
import { useEffect } from "react";

export default function BookUI({metaData, bookUrl}){
    // useEffect(()=>{
    //     console.log("From Book UI");
    //     console.log(metaData);
    // }, [metaData]);

    return (
        <div className="flex flex-col items-center lg:items-start lg:flex-row font-sans ">
            <div className="flex-none relative">
                    <img src={metaData.image} alt="Book image"
                        className="inset-0 w-60 h-60 object-cover rounded-lg" loading="lazy" />
            </div>
            <div className="flex-auto p-6">
                <div className="flex flex-wrap">
                    <h2 className="flex-auto text-2xl">
                        {metaData.name}
                    </h2>
                </div>
                <p className="text-sm">
                    {metaData.author} 
                </p>
                <p className="text-sm">
                    {metaData.price} Ether
                </p>
                <div className="mt-5">
                    <Link href={bookUrl} className="hover:opacity-50" target="_blank">
                        <button className="bg-blue-700 py-2 w-full px-10 rounded-xl">Read</button>
                    </Link>
                </div>
                {/*  */}
            </div>
        </div>
    );
}