interface Igame {
    appId: number;
    img: string;
    name: string;
    size: number;
    price: number;
}

interface IgamesProps {
    games: Game[];
}

interface BannerInfo {
    bannerId: number;
    title: string;
    img: string;
}

interface Category {
    catcode: string;
    catname: string;
}

interface IGameBanner {
    title: string;
    type: string;
    code: string;
    image: string;
}
interface IBannerGames {
    games: IGameBanner[];
}
interface Ihome {
    catcode?: string;
    catname: string;
    itemtype: string;
    contenttype: string;
    games: any[];
}

interface Game {
    gameid: string;
    title: string;
    description: string;
    catcode: string;
    catname: string;
    image: string;
}
