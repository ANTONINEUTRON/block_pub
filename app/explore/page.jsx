"use client";
import BookUI from "@/components/book_ui";
import { BooksContext } from "@/context/book_context";
import { CircularProgress } from "@mui/joy";
import { useContext } from "react";

export default function OpenPage(){
    const {books, setBooks} = useContext(BooksContext);

    return (
        <>
            <div className="container dark:bg-gray-900 bg-gray-100 py-10 px-5 rounded-md mx-auto h-screen">
                <div className="flex justify-between">
                    <div className="text-2xl mb-10">Explore Books</div>
                    <input type='text' placeholder="Search" className="h-11 rounded-lg textfield p-2"/>
                </div>
                
                {
                    books == null
                    ? (
                        <div className="flex justify-center my-auto">
                            <CircularProgress />
                        </div>
                    )
                    : (<div>
                        {
                            books.length > 0
                            ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                                    {
                                        books.map(
                                            (value, index)=>{
                                                // let metaData = value.metadata;
                                                return (
                                                    <BookUI 
                                                        key={value.token_id}
                                                        metaData={JSON.parse(value.metadata)}
                                                        bookUrl={"/open/"+value.token_id}/>
                                                )
                                            }
                                        )
                                    }
                                    
                                    
                                </div>
                            ):(
                                <div>
                                    No Book Has Been Published
                                </div>
                            )
                        }
                        </div>
                    )
                }
            </div>
        </>
    );
}