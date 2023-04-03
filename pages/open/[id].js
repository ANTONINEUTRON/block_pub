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
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export default function OpenBookWithId(){
    const router = useRouter();
    // var id = 9;
    const { id } = router.query;
    const [metadata, setMetadata] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);


    //call get tokenUri method
    const getTokenUri = async ()=>{
        toast("Loading The Book");
        const web3 = new Web3(window.ethereum);//"https://sepolia.infura.io/v3/4ad42ae08eda4cf1a111f06ce98fd8ea");//

        const contract = new web3.eth.Contract(contract_interface.contractAbi, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

        let a = await contract.methods.tokenURI(id).call()
            .then((uri) => {
                fetchMetadata(uri);
                console.log(uri); // logs the URI of the token with ID tokenId
            })
            .catch((error) => {
                toast(error.message);
                console.log(JSON.stringify(error)); // logs any errors that occurred during the call
            });
    }

    useEffect(()=>{
        if(!id) return;
        getTokenUri();
    },[id]);

    const fetchMetadata = (uri)=>{
        axios.get(uri)
            .then((response) => {
                console.log(response.data);
                setMetadata(response.data)
            })
            .catch((error) => {
                console.log(error);
                toast(error.message);
            });
    }
    //decode the object
    //check price
    //if price is > 0 
    ////check if user is part of payers
    //debit reader through value sent to contract if not part of payers
    //else give access

    function onDocumentLoadSuccess({ numPages }) {
       setNumPages(numPages);
    }

    return (
        <div >
            <ToastCont />
            <div className='flex h-screen justify-center'>
                {
                    metadata == null ? 
                    (
                        <div className="mx-auto">
                            <CircularProgress  variant="solid" size="lg"/>
                        </div>
                    ): (
                        <div className=''>
                        <Document  
                            onLoadSuccess={onDocumentLoadSuccess}
                            file={metadata.book_url}  
                            onContextMenu={(e) => e.preventDefault()}
                            className="pdf-container">
                            <Page pageNumber={4}/>
                        </Document>
                        <
                        </div>
                    )
                }
            </div>
        </div>
    );
}