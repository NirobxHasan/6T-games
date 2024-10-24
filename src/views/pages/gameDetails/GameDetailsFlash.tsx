import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getgamedetails } from '../../../services/httpRequest';
import GameSection from '../../componets/gamesection/GameSection';
import useAuth from './../../../hooks/useAuth';

const GameDetailsFlash = () => {
    const { gameid } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [gameDetails, setGamedetails] = useState<GameDeatails | undefined>(
        undefined
    );

    const [related, setRelated] = useState<GameSection | undefined>(undefined);
    const [recomended, setRecomended] = useState<GameSection | undefined>(
        undefined
    );

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        const formData = {
            gameid: gameid || '',
            userid: ''
        };
        getgamedetails(formData).then((response) => {
            setGamedetails(response?.data.data);
            setRelated({
                catname: 'Related',
                games: response?.data?.data?.related
            });
            setRecomended({
                catname: 'Recomended',
                games: response?.data?.data?.recomended
            });
        });
    }, [gameid]);

    const handlePlay = (url: any) => {
        if (user?.virtualid) {
            if (user?.play === 1) {
                window.open(`${url}?msisdn=${user?.virtualid}`);
                return;
            } else {
                navigate('/subscription');
            }

            return;
        }
        navigate('/login');
    };
    return (
        <div className="max-w-screen-xl mx-auto mt-10  md:px-5">
            <div className="hero min-h-min bg-base-200 py-20">
                <div className="hero-content flex-col lg:flex-row">
                    <div>
                        <img
                            src={gameDetails?.image}
                            className="max-w-md rounded-lg shadow-2xl"
                            alt=""
                        />
                    </div>

                    <div className="lg:ml-10 text-center sm:text-center lg:text-left">
                        <h1 className="text-5xl font-bold">
                            {gameDetails?.title}
                        </h1>
                        <div className="badge badge-secondary mt-2">
                            {' '}
                            {gameDetails?.catname}
                        </div>
                        <p className="py-4">{gameDetails?.description}</p>

                        <button
                            className="btn btn-primary font-bold"
                            onClick={() => handlePlay(gameDetails?.url)}
                        >
                            Play Now
                        </button>
                    </div>
                </div>
            </div>
            {related ? <GameSection gameContent={related} /> : ''}
            {recomended ? <GameSection gameContent={recomended} /> : ''}
        </div>
    );
};

export default GameDetailsFlash;

interface GameDeatails {
    gameid: string;
    title: string;
    description: string;
    catcode: string;
    catname: string;
    image: string;
    url: string;
    shareurl: string;
    play: string;
    related: Game[];
    recomended: Game[];
}

interface GameSection {
    catname: string;
    games: Game[];
}
