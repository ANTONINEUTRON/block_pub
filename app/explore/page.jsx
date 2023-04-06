"use client";
import BookUI from "@/components/book_ui";
import contract_interface from "@/contract/contract_interface";
import { CircularProgress } from "@mui/joy";
import { useState } from "react";
import { useEffect } from "react";
import Web3 from "web3";

export default function OpenPage(){
    const [tokens, setTokens] = useState(null);

    useEffect(()=>{
        getTokensId();        
    },[]);

    const getTokensId = ()=>{
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contract_interface.contractAbi, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

        contract.getPastEvents('Transfer', {
            filter: {
                _from: '0x0000000000000000000000000000000000000000'
            },
            fromBlock: 0
        }).then((events) => {
            let tokens = [];
            for (let event of events) {
                console.log(event);
                tokens.push(event.returnValues.tokenId);
            }
            console.log(tokens.length);
            setTokens(tokens);
        });
    }

    return (
        <>
            <div className="container dark:bg-gray-900 bg-gray-100 py-10 px-5 rounded-md mx-auto">
                <div className="flex justify-between">
                    <div className="text-2xl mb-10">Explore Books</div>
                    <input type='text' placeholder="Go to book id" className="h-11 rounded-lg textfield"/>
                </div>
                
                {
                    tokens == null
                    ? (<CircularProgress />)
                    : 
                    tokens.length == 0
                    ? (
                        <div>Book has not been published yet</div>
                    )
                    : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                            <BookUI
                                imgUrl="https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
                                bookAuthor="James Jan"
                                bookTitle="The Love of God"
                                bookAbstract="The book abstract"
                            />
                        </div>
                    )
                }
            </div>
        </>
    );
}