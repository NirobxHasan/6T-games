import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/autoplay';
import GameCard from '../gamesection/GameCard';

const GameSlider: React.FC<IgamesProps> = ({ games }) => {
    return (
        <div>
            <Swiper
                spaceBetween={20}
                breakpoints={{
                    300: {
                        slidesPerView: 2.5,
                        spaceBetween: 15
                    },
                    360: {
                        slidesPerView: 2.5,
                        spaceBetween: 15
                    },
                    768: {
                        slidesPerView: 4.5,
                        spaceBetween: 20
                    },
                    1024: {
                        slidesPerView: 5.5,
                        spaceBetween: 25
                    }
                }}
            >
                {games?.map((game: Game) => (
                    <SwiperSlide key={game.gameid}>
                        <Link to={`/gamedetailsflash/${game.gameid}`}>
                            <GameCard game={game} />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default GameSlider;
