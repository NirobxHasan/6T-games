import { BiArrowBack } from 'react-icons/bi';

const GameSearch = () => {
    return (
        <div>
            <header className="p-4 bg-red-600 text-gray-100 ">
                <div className="container flex justify-between items-center h-10 mx-auto px-2">
                    <div className="pr-5">
                        <button>
                            <BiArrowBack size={25} />{' '}
                        </button>
                    </div>

                    <div className={`relative w-full`}>
                        <input
                            placeholder="Search"
                            type="text"
                            className={`border  rounded-full focus:border-red-400  focus:outline-none  p-2 w-full`}
                        />
                    </div>
                </div>
            </header>
            <div className="h-screen"></div>
        </div>
    );
};

export default GameSearch;
