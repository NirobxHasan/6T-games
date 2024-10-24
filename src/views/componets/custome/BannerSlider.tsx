// Import Swiper React components
import { Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const BannerSlider = ({ banners }: { banners: IGameBanner[] }) => {
    console.log(banners);
    return (
        <div className="p-2 md:p-5 mx-auto">
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 5000
                }}
                centeredSlides={true}
                pagination={{ clickable: true }}
            >
                {banners.map((banner: IGameBanner) => (
                    <SwiperSlide key={banner.code}>
                        <Link
                            to={`${
                                banner.type === 'quiz'
                                    ? '/quiz'
                                    : `/games/${banner.code}`
                            }  `}
                        >
                            <img
                                className="rounded-lg md:rounded-[20px]"
                                src={banner.image}
                                alt={banner.title}
                            />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BannerSlider;
