import { Link } from 'react-router-dom';

const Search = ({ searchResult }: IsearchProps) => {
    return (
        <div className="min-h-screen ">
            <div className="max-w-screen-lg mx-auto px-2">
                {searchResult?.map((game: Game) => (
                    <Link
                        key={game.gameid}
                        to={`/gamedetailsflash/${game.gameid}`}
                    >
                        <div className="flex flex-row gap-4 my-3 align-top items-center hover:bg-base-200">
                            <img width={80} src={game.image} alt="" />
                            <div>
                                <h1 className=" text-lg">{game.title}</h1>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Search;

interface IsearchProps {
    searchResult: any;
}
