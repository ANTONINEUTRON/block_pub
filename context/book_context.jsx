"use client";

import { useRef } from "react";
import { useEffect, useState } from "react";
import { createContext } from "react";
const Moralis = require("moralis").default;

export const BooksContext = createContext();

export default function BooksContextComp({children}){
    const [books, setBooks] = useState(null);
    const hasModuleStarted = useRef(false);

    useEffect(()=>{
        fetchNftsMetadata(setBooks);
    }, []);

    const fetchNftsMetadata = async (setBooksFunc)=>{
        try {
            if(!hasModuleStarted.current){
                hasModuleStarted.current = true;

                await Moralis.start({
                    apiKey: process.env.NEXT_PUBLIC_MORALIS_KEY
                });
            }
            
            const response = await Moralis.EvmApi.nft.getContractNFTs({
                "chain": "0xaa36a7",//sepolia chain
                "format": "decimal",
                "mediaItems": false,
                "address": process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
            });
            
            // console.log(response.raw);
            setBooksFunc(response.raw.result);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <BooksContext.Provider value={{books, setBooks}}>
            {children}
        </BooksContext.Provider>
    );
}