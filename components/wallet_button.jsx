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
    const addressRef = useContext(AddressContext);

    useEffect(()=>{
        console.log(addressRef.current);
    }, [addressRef.current]);

    const connectUserWallet = (event)=>{
        if(addressRef.current == null){
            connectWallet(addressRef);
        }else{
            toast("Wallet is already connected");
        }
    }

    return (
        <button className="inline-flex items-center bg-[#12104e] border-2 py-1 px-3 focus:outline-none rounded text-green-100 md:ml-10 mt-4 md:mt-0"
            onClick={connectUserWallet}>
            {addressRef.current == null ? (
                <>
                CONNECT WALLET
                </>
            )
            :
            (
                <>
                {truncate(addressRef.current)}
                </>
            )}
        </button>
    );
}

const truncate = (str)=>{
    return str.slice(0,4)+"......"+str.slice(str.length-4);
}
