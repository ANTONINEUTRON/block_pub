import { CircularProgress } from "@mui/joy";
import axios from "axios";
import { useRef, useState } from "react";
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { toast } from "react-toastify";
const Web3 = require('web3');
import contract_interface from "../../contract/contract_interface";
import { connectWallet } from "@/utils/wallet_helpers";
import Link from "next/link";

export default function MintForm(){
    const [open, setOpen] = useState(false);

    const [bookTitle, setBookTitle] = useState('');
    const [abstract, setAbstract] = useState('');
    const [authorName, setAuthorName] = useState(null);
    const [price, setPrice] = useState(0);
    const [coverImage, setCoverImage] = useState(null);
    const [bookFile, setBookFile] = useState(null);
    const [submitClicked, setSubmitClicked] = useState(false);
    const bookId = useRef(null);
    const coverImageIpfsUrl = useRef(null);
    const bookFileIpfsUrl = useRef(null);
    const metadataUrl = useRef(null);
    const accountAddress = useRef(null);
    const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

    var bookObj = {};
    const formRef = useRef(null);

    const handleSubmission = async (event)=>{
        event.preventDefault();
        setSubmitClicked(true);
        //connect wallet to get user address
        await connectWallet(accountAddress);
        if(accountAddress.current){
            try {
                //upload book
                await uploadBook();
                //upload image
                await uploadCover();
                //upload metadata
                await createAndUploadMetadata();
                await publishBook();
            } catch (error) {
                console.log(error);
                toast(error.message);
                return;
            }
        }
        
        resetValues();
    }

    const createAndUploadMetadata = async ()=>{
        bookObj = {
            name: bookTitle,
            description: abstract,
            author: authorName,
            external_url: "blockpub.com",
            authorAddress: accountAddress.current,//deployer address
            image: coverImageIpfsUrl.current,
            book_url: bookFileIpfsUrl.current,
            price: price
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

        const hash = `https://ipfs.io/ipfs/${resFile.data.IpfsHash}`;
        console.log(hash);
        urlRef.current = hash;
    }

    const publishBook = async() => {
        // console.log("got in price is "+price);
        const web3 = new Web3(window.ethereum);//"https://sepolia.infura.io/v3/4ad42ae08eda4cf1a111f06ce98fd8ea");//

        const contract = new web3.eth.Contract(contract_interface.contractAbi, contractAddress);

        await contract.methods
            .publishBook(metadataUrl.current, web3.utils.toWei(String(price), 'ether'))
            .send({from: accountAddress.current})
            .then(txHash => {
                console.log(txHash);
                let eventValues = txHash.events.bookPublished.returnValues;
                bookId.current = eventValues.bookId;
                
                setOpen(true);
            })
            .catch(error => {
                showError(error);
            });
    }

    const showError = (message)=>{
        toast(message);
        setSubmitClicked(false);
    }

    const resetValues = ()=>{
        formRef.current.reset();
        setSubmitClicked(false);
    }

    return (
        <>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                variant="outlined"
                sx={{
                    maxWidth: 500,
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                }}
                >
                <ModalClose
                    variant="outlined"
                    sx={{
                    top: 'calc(-1/4 * var(--IconButton-size))',
                    right: 'calc(-1/4 * var(--IconButton-size))',
                    boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                    borderRadius: '50%',
                    bgcolor: 'background.body',
                    }}
                />
                <Typography
                    component="h2"
                    id="modal-title"
                    level="h4"
                    textColor="inherit"
                    fontWeight="lg"
                    mb={1}
                >
                    Your book titled "{bookTitle}" has been published successfully!
                </Typography>
                <Typography id="modal-desc" textColor="text.tertiary">
                    <strong>The Book ID is: {bookId.current}</strong> <b></b>
                    <br/>
                    <br/>
                </Typography>
                <div className="flex justify-center">
                    <Link href={'/open/'+bookId.current}>
                    <button className="text-xl font-bold bg-neutral-200 px-5 py-2 rounded-xl hover:bg-neutral-500">Open Book</button>
                    </Link>
                </div>
                </Sheet>
            </Modal>
            <div>
                <form ref={formRef} onSubmit={handleSubmission} className="my-5">
                    <input type="text" onChange={(e)=>setBookTitle(e.target.value)} placeholder="Book Title" className="textfield w-full p-2 rounded-md mt-2" required/>
                    
                    <input type="text" placeholder="Author's Name"  onChange={(e)=>setAuthorName(e.target.value)} className="textfield w-full p-2 rounded-md mt-2" required/>
                    
                    <input type="number" placeholder="Book Price in Ether [optional]" min="0.0000000001"  onChange={(e)=>setPrice(e.target.value)} step=".0000000001" className="textfield w-full p-2 rounded-md mt-2" />
                    
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