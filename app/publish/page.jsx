"use client";
import MintForm from "./mint-form";

export default function Publish(){
    return (
        <div className="container dark:bg-gray-900 bg-gray-100 py-10 px-5 rounded-md md:w-2/3 md:mx-auto">
            <div className="text-2xl ">Publish Your Book </div>
            <MintForm />
        </div>
    );
}