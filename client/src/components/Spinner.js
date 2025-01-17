const Spinner = () => {

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-sky-900 to-cyan-900 flex items-center justify-center flex-col">
            <div className="w-40 h-10 text-center text-xs">
                <div className="bg-white h-full w-1.5 inline-block animate-bounce rounded mr-1.5"></div>
                <div className="bg-white h-5/6 w-1.5 inline-block animate-bounce rounded mr-1.5"></div>
                <div className="bg-white h-4/6 w-1.5 inline-block animate-bounce rounded mr-1.5"></div>
                <div className="bg-white h-3/6 w-1.5 inline-block animate-bounce rounded mr-1.5"></div>
                <div className="bg-white h-2/6 w-1.5 inline-block animate-bounce rounded mr-1.5"></div>
                <div className="bg-white h-1/6 w-1.5 inline-block animate-bounce rounded mr-1.5"></div>
                <div className="bg-white h-2/6 w-1.5 inline-block animate-bounce rounded mr-1.5"></div>
                <div className="bg-white h-3/6 w-1.5 inline-block animate-bounce rounded mr-1.5"></div>
                <div className="bg-white h-4/6 w-1.5 inline-block animate-bounce rounded mr-1.5"></div>
                <div className="bg-white h-5/6 w-1.5 inline-block animate-bounce rounded mr-1.5"></div>
                <div className="bg-white h-full w-1.5 inline-block animate-bounce rounded mr-0"></div>
            </div>
            <p className="font-bold italic text-white text-lg animate-bounce mt-5">Loading...</p>
        </div>
    );
};

export default Spinner
