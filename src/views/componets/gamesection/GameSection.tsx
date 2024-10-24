import { Fade } from 'react-awesome-reveal';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
// import game01 from '../../../assets/images/game01.png';
// import game02 from '../../../assets/images/game02.png';
// import game03 from '../../../assets/images/game03.png';
import GameSlider from '../custome/GameSlider';
const GameSection = ({ gameContent }: { gameContent: IGameSectonProps }) => {
    const navigate = useNavigate();

    return (
        <div className="max-w-screen-xl mx-auto mt-10 pl-3 md:px-5">
            <div className="flex justify-between items-center my-5 pr-4">
                <h5 className="text-base  md:text-2xl font-black ">
                    {gameContent.catname}
                </h5>

                <div
                    style={{ cursor: 'pointer' }}
                    className={gameContent.games.length < 7 ? 'lg:hidden' : ''}
                >
                    <AiOutlineArrowRight
                        size={20}
                        onClick={() =>
                            navigate(`/games/${gameContent.catname}`)
                        }
                    />
                </div>
            </div>
            <Fade>
                <GameSlider games={gameContent.games} />
            </Fade>
        </div>
    );
};

export default GameSection;

interface IGameSectonProps {
    catcode?: string;
    catname: string;
    itemtype?: string;
    contenttype?: string;
    games: Game[];
}

export interface Game {
    gameid: string;
    title: string;
    description: string;
    catcode: string;
    catname: string;
    image: string;
}
