import ToastCont from '@/components/toast_cont';
import contract_interface from '@/contract/contract_interface';
import { CircularProgress } from '@mui/joy';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import Web3 from 'web3';
import "./id.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import Head from 'next/head';
import { connectWallet } from '@/utils/wallet_helpers';


export default function OpenBookWithId(){
    const router = useRouter();
    const { id } = router.query;
    const [metadata, setMetadata] = useState(null);
    const [grantAccess, setGrantAccess] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [address, setAddress] = useState();

    useEffect(()=>{
        if(id==null)return;
        getTokenUri();
    },[id]);

    useEffect(()=>{
        if(metadata==null)return;
        if(grantAccess)return;
        // validate if user will/has pay
        if(metadata.price > 0){
            //debit user wallet
            debitUserWallet();
        }else{
            setGrantAccess(true);
        }
    },[metadata]);

    //call get tokenUri method
    const getTokenUri = async ()=>{
        console.log("got in TO FETCH TOKEN ")
        toast("Loading The Book");
        connectWallet(setAddress);

        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contract_interface.contractAbi, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

        await contract.methods.tokenURI(id)
            .call()
            .then((uri) => {
                fetchMetadata(uri);
                console.log(uri); // logs the URI of the token with ID tokenId
            })
            .catch((error) => {
                toast(error.message);
                console.log(JSON.stringify(error)); // logs any errors that occurred during the call
            });
    }

    const fetchMetadata = (uri)=>{
        axios.get(uri)
            .then((response) => {
                console.log(response.data);
                setMetadata(response.data);
            })
            .catch((error) => {
                console.log(error);
                toast(error.message);
            });
    }
    
    const debitUserWallet = async ()=>{
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contract_interface.contractAbi, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

        await contract.getPastEvents('paymentMade',{
            fromBlock: 0,
            toBlock: 'latest'
        }, async function(error, events){
            console.log("Past events:", events);
            hasUserPaidBefore(events)
            .then((value)=>{
                console.log(value);
                //debit user
                if(!value){
                    // contract.methods.makePaymentToAuthor(metadata.authorAddress, web3.utils.toWei(metadata.price, "ether"), id)
                    // .send({from: address, value: web3.utils.toWei(metadata.price, "ether")})
                    // .then((receipt) => {
                    //     console.log(receipt); // logs the URI of the token with ID tokenId
                    //     setGrantAccess(true);
                    // })
                    // .catch((error) => {
                    //     toast(error.message);
                    //     console.log(JSON.stringify(error)); // logs any errors that occurred during the call
                    // });
                }else{
                    setGrantAccess(true);
                }
            });
        });

    }

    const hasUserPaidBefore = async (events)=>{
        for(var event of events){
            let payerA = event.returnValues.payer.toLowerCase();
            let payerB = address.toLowerCase();
            if(payerA == payerB){
                // setGrantAccess(true);
                return true;
            }
        }
        return false;
    }

        //get user address
        // await connectWallet(userAddress);
        
    // }

    // const userHasPaidBefore = async ()=>{
    //     let toReturn = false;
    //     //get payment events
    //     //if events contains current address u have paid
    //     /////loop through to check if an event has the curent user wallet address
    //     //access chain and get events
    //     const web3 = new Web3(window.ethereum);
    //     const contract = new web3.eth.Contract(contract_interface.contractAbi, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

    //     await contract.getPastEvents('paymentMade',{
    //         fromBlock: 0,
    //         toBlock: 'latest'
    //     }, function(error, events){
    //         console.log("Past events:", events);
    //         for(var event of events){
    //             if(event.returnValues.payer == address){
    //                 toReturn = true;
    //                 return;
    //             }
    //         }
    //     })

    //     return toReturn;
    // }

    return (
        <div >
            <Head>
                <title>
                    {grantAccess ? metadata.name : "Loading ..."}
                </title>
            </Head>
            <ToastCont />
            <div className='flex h-screen w-screen justify-center'>
                {
                    !grantAccess ? 
                    (
                        <div className="mx-auto">
                            <CircularProgress  variant="solid" size="lg"/>
                        </div>
                    ): (
                        <div className=''>
                            <embed
                                src={metadata.book_url + "#toolbar=0"}
                                type="application/pdf"
                                height="100%"
                                className='w-screen'
                                onContextMenu={(e) => e.preventDefault()}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    );
}