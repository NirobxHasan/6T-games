import loadable from '@loadable/component';
import 'animate.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import { gethomedata } from './services/httpRequest';
import Layout from './views/pages/Layout/Layout';
import Leaderboard from './views/pages/quiz/Leaderboard';
import QuizPage from './views/pages/quiz/QuizPage';
import QuizPlay from './views/pages/quiz/QuizPlay';

const Home = loadable(() => import('./views/pages/Home/Home'));

const GameDetailsFlash = loadable(
    () => import('./views/pages/gameDetails/GameDetailsFlash')
);
const CategoryWiseGames = loadable(
    () => import('./views/pages/CategoryWiseGames/CategoryWiseGames')
);
const Registration = loadable(
    () => import('./views/pages/authentications/Registration')
);
const Login = loadable(() => import('./views/pages/authentications/Login'));

const Forgatepassword = loadable(
    () => import('./views/pages/authentications/Forgetpassword')
);
const Conformation = loadable(
    () => import('./views/pages/conformation/Conformation')
);
const LegalInfo = loadable(() => import('./views/pages/legalInfo/LegalInfo'));
const NotFound = loadable(() => import('./views/pages/notfound/NotFound'));
const Search = loadable(() => import('./views/pages/search/Search'));
const Subscription = loadable(
    () => import('./views/pages/subscription/Subscription')
);

const App = () => {
    const [homeDate, setHomeData] = useState<any>({});
    const [searchResult, setSearchresult] = useState<any>([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        gethomedata().then((response) => {
            const { data } = response.data;
            setHomeData(data);
            const el = document.querySelector('.loader-container');
            if (el) {
                console.log(el);
                el.remove();
                setLoading(!isLoading);
            }
        });
    }, []);

    if (isLoading) {
        return null;
    }

    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Layout
                        categories={homeDate?.categories}
                        setSearchresult={setSearchresult}
                    >
                        <Routes>
                            <Route
                                path="/"
                                element={<Home home={homeDate?.home} />}
                            />
                            <Route
                                path="search/"
                                element={<Search searchResult={searchResult} />}
                            />

                            <Route
                                path="gamedetailsflash/:gameid"
                                element={<GameDetailsFlash />}
                            />
                            <Route
                                path="games/:catcode"
                                element={<CategoryWiseGames />}
                            />

                            <Route
                                path="subscription/"
                                element={<Subscription />}
                            />
                            <Route path="login/" element={<Login />} />
                            <Route
                                path="registration/"
                                element={<Registration />}
                            />
                            <Route
                                path="forgatepassword/"
                                element={<Forgatepassword />}
                            />
                            <Route
                                path="confirmation/"
                                element={<Conformation />}
                            />
                            <Route
                                path="info/:keyword"
                                element={<LegalInfo />}
                            />
                            <Route path="/quiz" element={<QuizPage />} />
                            <Route
                                path="/quiz/leaderboard"
                                element={<Leaderboard />}
                            />
                            <Route path="/play-quiz" element={<QuizPlay />} />
                            <Route path="*" element={<NotFound />} />
                            <Route path="/notfound" element={<NotFound />} />
                        </Routes>
                    </Layout>
                </BrowserRouter>
            </AuthProvider>
        </>
    );
};

export default App;
