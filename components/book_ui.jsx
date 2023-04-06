
export default function BookUI({imgUrl, bookTitle, bookAuthor, bookAbstract}){

    return (
        <div className="flex flex-col lg:flex-row font-sans ">
            <div className="flex-none relative">
                    <img src={imgUrl} alt="Book image"
                        className="inset-0 w-60 h-60 object-cover rounded-lg" loading="lazy" />
            </div>
            <div className="flex-auto p-6">
                <div className="flex flex-wrap">
                    <h2 className="flex-auto text-2xl">
                        {bookTitle}
                    </h2>
                </div>
                <p className="text-sm">
                    {bookAuthor} 
                </p>
                <p className="text-sm">
                    {bookAbstract}
                </p>
            </div>
        </div>
    );
}