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
import { Document, Page, pdfjs } from "react-pdf";
import { useRef } from 'react';
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import Head from 'next/head';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export default function OpenBookWithId(){
    const router = useRouter();
    const { id } = router.query;
    const [metadata, setMetadata] = useState(null);
    const [grantAccess, setGrantAccess] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    // const [web3, setWeb3] = useState(null);
    // const [contract, setContract] = useState(null);
    const userAddress = useRef(null);
    // var web3 = null;
    // var contract = null;

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
        //get user address
        // await connectWallet(userAddress);
        // const web3 = new Web3(window.ethereum);
        // const contract = new web3.eth.Contract(contract_interface.contractAbi, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
        // //call on web3 to debit
        // await contract.methods.makePaymentToAuthor(metadata.authorAddress, web3.utils.toWei(metadata.price, "ether"), id)
        //     .send({from: userAddress.current, value: web3.utils.toWei(metadata.price, "ether")})
        //     .then((receipt) => {
        //         console.log(receipt); // logs the URI of the token with ID tokenId
        //         setGrantAccess(true)
        //     })
        //     .catch((error) => {
        //         toast(error.message);
        //         console.log(JSON.stringify(error)); // logs any errors that occurred during the call
        //     });

        setGrantAccess(true);
    }

    function onDocumentLoadSuccess({ numPages }) {
       setNumPages(numPages);
    }

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
                            {/* <embed
                                src={metadata.book_url + "#toolbar=0"}
                                type="application/pdf"
                                height="100%"
                                width="660"
                                onContextMenu={(e) => e.preventDefault()}
                            /> */}
                        <Document  
                            onLoadSuccess={onDocumentLoadSuccess}
                            file={metadata.book_url}  
                            onContextMenu={(e) => e.preventDefault()}
                            className="pdf-container"
                            renderMode="svg"
                            renderTextLayer={false} >
                            {Array.apply(null, Array(numPages))
                            .map((x, i)=>i+1)
                            .map(page => <Page pageNumber={page}/>)}
                        </Document>
                        </div>
                    )
                }
            </div>
        </div>
    );
}