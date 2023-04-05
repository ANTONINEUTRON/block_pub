import { useState } from "react";

/**
 * 
 * @returns button - when clicked toggles between connecting and disconnecting wallet
 */
export default function WalletHandler(){
    const [walletAddress,setWalletAddress] = useState("");

    return (
        <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded  mt-4 md:mt-0"
            onClick={(event)=>!walletAddress ? connectWallet : disconnectWallet}>
            {!walletAddress ? (
                <>
                CONNECT WALLET
                </>
            )
            :
            (
                <>
                {truncate(wallet)}
                </>
            )}
        </button>
    );
}


const connectWallet = (event)=>{
    event.preventDefault();

}

const disconnectWallet = (event)=>{
    event.preventDefault();

}

const truncate = (str)=>{
    return str.slice(0,4)+"......"+str.slice(str.length-4);
}
