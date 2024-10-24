import { useEffect, useState } from 'react';
import { Zoom } from 'react-awesome-reveal';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getgamesbycategory } from './../../../services/httpRequest';
const CategoryWiseGames = () => {
    const { catcode } = useParams();
    const [gamesInfo, setGamesInfo] = useState<any>({});
    const [page, setPage] = useState<number>(1);
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);

    useEffect(() => {
        setPage(1);
        if (catcode) {
            const formData = {
                catcode: catcode,
                page: 1
            };
            getgamesbycategory(formData).then((res) => {
                if (res?.data.status.responseCode === '1') {
                    setGamesInfo(res?.data.data);
                } else {
                    navigate('/notfound');
                }
            });
        }
    }, [catcode]);

    const handlePage = (page: number) => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        setPage(page);
        if (catcode) {
            const formData = {
                catcode: catcode,
                page: page
            };
            getgamesbycategory(formData).then((res) => {
                // console.log(res);
                if (res?.data.status.responseCode === '1') {
                    setGamesInfo(res?.data.data);
                }
            });
        }
    };

    return (
        <div className="max-w-screen-xl mx-auto mt-10  md:px-5 px-2 ">
            <Zoom direction="up">
                <h1 className="text-5xl font-black racking-widest uppercase text-center ">
                    <span className="text-red-500 ">{catcode} </span> games
                </h1>
            </Zoom>
            <div className="flex  flex-wrap gap-10 justify-center  mt-10 ">
                {gamesInfo?.games?.map((game: Game) => (
                    <Link
                        key={game.gameid}
                        to={`/gamedetailsflash/${game.gameid}`}
                    >
                        <div>
                            {/* <img src={game.image} alt="" /> */}
                            <div className="card w-auto glass">
                                <figure>
                                    <img
                                        src={game.image}
                                        width={260}
                                        alt="car!"
                                    />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title text-xl font-bold my-[-10px]">
                                        {game.title}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            {gamesInfo?.pagelimit > 1 && (
                <div className="flex justify-center mt-10">
                    <div className="btn-group ">
                        {[...Array(gamesInfo?.pagelimit).keys()].map(
                            (i: number) => (
                                <button
                                    onClick={() => handlePage(i + 1)}
                                    className={`btn ${
                                        page === i + 1 ? 'btn-active' : ''
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryWiseGames;
