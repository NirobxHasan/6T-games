import { useState } from 'react';
import img from '../../../assets/images/banner02.png';
const GameBanner = () => {
    const [bannerInfos, setBannerInfos] = useState<BannerInfo[]>([
        {
            bannerId: 1,
            img: img,
            title: 'Reference site about Lorem Ipsum'
        },
        {
            bannerId: 2,
            img: img,
            title: 'Reference site about Lorem Ipsum'
        }
    ]);
    return (
        <div className="max-w-screen-lg mx-auto mt-10 px-2 ">
            <div className="flex justify-around">
                {bannerInfos.map((banner, i) => (
                    <div key={i}>
                        <img className="rounded-xl p-1" src={img} alt="" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameBanner;
