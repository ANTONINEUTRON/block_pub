import { toast } from "react-toastify";

export const connectWallet = async (setAddress)=>{//accountAddress is a useRef
    if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAddress(accounts[0]);
          //   setAccounts(accounts);
        } catch (error) {
          if (error.code === 4001) {
            // User rejected request
            toast("You need to specify an account in order to complete this process")
          }

          toast("An error occured "+error.message);
        }
      }
}