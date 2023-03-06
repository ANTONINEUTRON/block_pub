import { useState } from "react";

export default function MintForm(){
    const [bookTitle, setBookTitle] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const [file, setFile] = useState(null);
    const [authorName, setAuthorName] = useState(null);
    const [price, setPrice] = useState(null);


    const handleSubmission = (event)=>{
        event.preventDefault();
        alert("submission clicked");
    };


    return (
        <>
            <div>
                <form onSubmit={handleSubmission} className="my-5">
                    <input type="text" placeholder="Book Title" className="w-full p-2 rounded-md mt-2"/>
                    
                    <input type="text" placeholder="Author's Name" className="w-full p-2 rounded-md mt-2"/>
                    
                    <input type="text" placeholder="Book Price" className="w-full p-2 rounded-md mt-2"/>
                    
                    <div className="mt-5">
                    <label className="text-sm font-semibold">upload cover image</label>
                    <input type="file" placeholder="Cover Image" className="w-full p-2 rounded-md"/>
                    </div>

                    <div className="mt-5">
                    <label className="text-sm font-semibold">upload book </label>
                    <input type="file" placeholder="Book Title" className="w-full p-2 rounded-md"/>
                    </div>

                    <div className="flex justify-center mt-10">
                    <input type="submit" value="Publish" className="text-xl font-bold bg-neutral-200 dark:bg-neutral-700 px-5 py-2 rounded-xl hover:bg-neutral-500 hover:text-gray-900"/>
                    </div>
                </form>
            </div>
        </>
    );
}