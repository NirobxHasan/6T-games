const GameCard = ({ game }: { game: Game }) => {
    return (
        <div className="">
            {/* <img className="w-[200px]" src={game.image} alt="" />
            <div className="mt-2 pl-1">
                <p className="text-sm text-gray-900">{game.title}</p>
            </div> */}
            <div className="block overflow-hidden rounded-lg">
                <img
                    alt="Office"
                    src={game.image}
                    className="object-cover w-full "
                />
            </div>

            <div className="mt-2 pl-1">
                <p className="text-sm font-semibold  ">{game.title}</p>
            </div>

            {/* <div className="p-4 bg-red-00 h-16">
                <h5 className="text-base ">{game.title}</h5>

            </div> */}
        </div>
    );
};

export default GameCard;
