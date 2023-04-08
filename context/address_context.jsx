"use client";
import { createContext, useRef } from "react"


export const AddressContext = createContext();

export default function AddressContextComp({children}){
    const address = useRef(null);

    return (
        <AddressContext.Provider value={address}>
            {children}
        </AddressContext.Provider>
    );
}