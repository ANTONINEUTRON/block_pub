"use client";
import { createContext, useRef, useState } from "react"


export const AddressContext = createContext();

export default function AddressContextComp({children}){
    const [address,setAddress] = useState(null);

    return (
        <AddressContext.Provider value={{address, setAddress}}>
            {children}
        </AddressContext.Provider>
    );
}