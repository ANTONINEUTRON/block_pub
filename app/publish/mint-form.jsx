import { CircularProgress } from "@mui/joy";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
const Web3 = require('web3');
import contract_interface from "../../contract/contract_interface";

export default function MintForm(){
    const [bookTitle, setBookTitle] = useState('');
    const [abstract, setAbstract] = useState('');
    const [authorName, setAuthorName] = useState(null);
    const [price, setPrice] = useState(0);
    const [coverImage, setCoverImage] = useState(null);
    const [bookFile, setBookFile] = useState(null);
    const [submitClicked, setSubmitClicked] = useState(false);
    const coverImageIpfsUrl = useRef(null);
    const bookFileIpfsUrl = useRef(null);
    const metadataUrl = useRef(null);
    const accountAddress = useRef(null);

    var bookObj = {};


    const handleSubmission = async (event)=>{
        event.preventDefault();
        setSubmitClicked(true);
        //connect wallet to get user address
        await connectWallet();
        if(accountAddress.current){
            //upload book
            await uploadBook();
            //upload image
            await uploadCover();
            //upload metadata
            await createAndUploadMetadata();
            await publishBook();
        }
        
        
        // 

        // 

        //get file url and append to SC
        //show processing modal
        //connect wallet
        //deploy SC
        //once everything is done setSubmitClicked to false
        setSubmitClicked(false);
    }

    const createAndUploadMetadata = async ()=>{
        bookObj = {
            name: bookTitle,
            description: abstract,
            author: authorName,
            external_url: "blockpub.com",
            authorAddress: accountAddress.current,//deployer address
            image: coverImageIpfsUrl.current,
            book_url: bookFileIpfsUrl.current
        };
        
        console.log(bookObj);

        const blob = new Blob([JSON.stringify(bookObj)],{type: 'application/json'});

        const file = new File([blob], bookTitle+'_metadata.json', { type: 'application/json' });

        try{
            await uploadToPinata(file, metadataUrl);
        }catch(error){
            console.log(error);
        }
    }

    const uploadBook = async ()=>{
        if(bookFile){
            try{
                await uploadToPinata(bookFile, bookFileIpfsUrl);
            }catch(error){
                console.log(error);
            }
        }
    }

    const uploadCover = async ()=>{
        if(coverImage){
            try{
                await uploadToPinata(coverImage, coverImageIpfsUrl);
            }catch(error){
                console.log(error);
            }
        }
    }

    const uploadToPinata = async (fileToUpload, urlRef)=> {
        const formData = new FormData();
        formData.append("file", fileToUpload);
        const metadata = JSON.stringify({
            name: bookTitle+"by"+authorName,
        });
        formData.append('pinataMetadata', metadata);

        const resFile = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS",formData,{
            maxBodyLength: "Infinity",
            headers: {
                "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                Authorization: process.env.NEXT_PUBLIC_PINATA_JWT
            }
        });

        const hash = `ipfs://${resFile.data.IpfsHash}`;
        console.log(hash);
        urlRef.current = hash;
    }

    const connectWallet = async ()=>{
        if (window.ethereum) {
            try {
              const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
              console.log(accounts);
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

    const publishBook = async ()=>{
        console.log("got in price is "+price);
        const web3 = new Web3(window.ethereum);//"https://sepolia.infura.io/v3/4ad42ae08eda4cf1a111f06ce98fd8ea");//

        const contractAddress = "0x8f7AC1B737313cED8c63abd39541f9a621a6D38b";

        const contract = new web3.eth.Contract(contract_interface.contractAbi, contractAddress);

        // contract.deploy({
        //         data: contract_interface.contractBytecode, 
        //         arguments: [bookTitle, authorName, coverImageIpfsUrl, bookFileIpfsUrl, price]
        //     }).send({gas: '4000000', from: accountAddress.current})
        //     .on('error',(error)=>showError("An Error Occured "+error.message))
        //     .then((newContract)=>{
        //         const address = newContract.options.address;  
        //         console.log('address:', address);
        //         console.log(newContract);
        //     });

        await contract.methods
            .publishBook(metadataUrl.current, web3.utils.toWei(price, 'ether'))
            .send({from: accountAddress.current})
            .then(txHash => {
                console.log(txHash);
            })
            .catch(error => {
                showError(error);
            });
    }

    const showError = (message)=>{
        toast(message);
        setSubmitClicked(false);
    }


    return (
        <>
            <div>
                <form onSubmit={handleSubmission} className="my-5">
                    <input type="text" onChange={(e)=>setBookTitle(e.target.value)} placeholder="Book Title" className="textfield w-full p-2 rounded-md mt-2" required/>
                    
                    <input type="text" placeholder="Author's Name"  onChange={(e)=>setAuthorName(e.target.value)} className="textfield w-full p-2 rounded-md mt-2" required/>
                    
                    <input type="number" placeholder="Book Price in Ether [optional]"  onChange={(e)=>setPrice(e.target.value)} step=".01" className="textfield w-full p-2 rounded-md mt-2" />
                    
                    <div className="mt-5">
                    <label className="text-sm font-semibold">Book Abstract</label>
                    <textarea rows="4" className="textfield w-full p-2 rounded-md mt-2" placeholder="Enter Book Abstract Here" onChange={(e)=>setAbstract(e.target.value)}></textarea>
                    </div>
                    
                    <div className="mt-5">
                    <label className="text-sm font-semibold">upload cover image</label>
                    <input type="file" onChange={(e)=>setCoverImage(e.target.files[0])} placeholder="Cover Image" accept="image/png, image/jpeg" className="w-full p-2 rounded-md" required/>
                    </div>

                    <div className="mt-5">
                    <label className="text-sm font-semibold">upload book </label>
                    <input type="file" onChange={(e)=>setBookFile(e.target.files[0])} placeholder="Book Title" accept="application/pdf" className="w-full p-2 rounded-md" required/>
                    </div>

                    <div className="flex justify-center mt-10">
                    {submitClicked 
                        ? (<CircularProgress variant="solid" />) 
                        : (<input type="submit" value="Publish" className="text-xl font-bold bg-neutral-200 dark:bg-neutral-700 px-5 py-2 rounded-xl hover:bg-neutral-500 hover:text-gray-900"/>)}
                    </div>
                </form>
            </div>
        </>
    );
}