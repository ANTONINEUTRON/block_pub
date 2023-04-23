import { BooksContext } from "@/context/book_context";
import { useContext } from "react";
import { useEffect } from "react";
import BookUI from "./book_ui";

export default function RecentlyPublishedBooks(){
    const {books, setBooks} = useContext(BooksContext);


    useEffect(()=>console.log(books));

    return (
        <div>
            {
                books == null || books.length < 1
                ? (
                    <div className="flex justify-center">
                        <div>No Book Has Been Published</div>
                    </div>
                ):(
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1">
                        {
                            books.map((value, index)=>{
                                return (
                                    <BookUI 
                                        metaData={JSON.parse(value.metadata)}
                                        bookUrl={"/open/"+value.token_id}/>
                                );
                            })
                        }
                    </div>
                )
            }
        </div>
    );
}