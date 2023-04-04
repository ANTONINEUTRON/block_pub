
export const connectWallet = async (accountAddress)=>{//accountAddress is a useRef
    if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          accountAddress.current = accounts[0];
          //   setAccounts(accounts);
        } catch (error) {
          if (error.code === 4001) {
            // User rejected request
            showError("You need to specify an account in order to complete this process")
          }

          showError("An error occured "+error.message);
        }
      }
}