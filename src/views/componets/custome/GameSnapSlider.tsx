import { Swiper, SwiperSlide } from 'swiper/react';
import snap01 from '../../../assets/images/gameSnap01.jpg';
import snap02 from '../../../assets/images/gameSnap02.jpg';
import snap03 from '../../../assets/images/gameSnap03.jpg';
import snap04 from '../../../assets/images/gameSnap04.jpg';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
const GameSnapSlider = () => {
    return (
        <div className=" px-5 mt-10">
            <Swiper
                autoHeight={true}
                spaceBetween={10}
                slidesPerView={3}
                pagination={{
                    clickable: true
                }}
                className="mySwiper mt-10"
            >
                {[snap01, snap02, snap03, snap04].map((snap: any) => (
                    <SwiperSlide key={snap}>
                        <img src={snap} alt="" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default GameSnapSlider;
