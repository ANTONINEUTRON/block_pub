import { AddressContext } from "@/context/address_context";
import { useEffect } from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { connectWallet } from "@/utils/wallet_helpers";

/**onClick={(event)=>!walletAddress ? connectWallet : disconnectWallet}>
 * 
 * @returns button - when clicked toggles between connecting and disconnecting wallet
 */
export default function WalletButton(){
    const {address, setAddress} = useContext(AddressContext);

    useEffect(()=>{
        console.log(address);
    }, [address]);

    const connectUserWallet = (event)=>{
        if(address == null){
            connectWallet(setAddress);
        }else{ 
            toast("Wallet is already connected");
        }
    }

    return (
        <button className="inline-flex items-center bg-[#12104e] border-2 py-1 px-3 focus:outline-none rounded hover:opacity-50 text-green-100 md:ml-10 mt-4 md:mt-0"
            onClick={connectUserWallet}>
            {address == null ? (
                <>
                CONNECT WALLET
                </>
            )
            :
            (
                <>
                {truncate(address)}
                </>
            )}
        </button>
    );
}

const truncate = (str)=>{
    return str.slice(0,6)+"......"+str.slice(str.length-3);
}
