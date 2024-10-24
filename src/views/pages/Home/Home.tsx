import BannerSlider from './../../componets/custome/BannerSlider';
import GameSection from './../../componets/gamesection/GameSection';
const Home = ({ home }: any) => {
    const content = (item: Ihome) => {
        if (item.itemtype === '5') {
            return <BannerSlider key={item.catname} banners={item.games} />;
        } else if (item.itemtype === '2' && item?.games?.length !== undefined) {
            return <GameSection key={item.catcode} gameContent={item} />;
        }
    };
    return (
        <div className="min-h-screen">
            {home?.map((item: Ihome) => content(item))}
        </div>
    );
};

export default Home;
