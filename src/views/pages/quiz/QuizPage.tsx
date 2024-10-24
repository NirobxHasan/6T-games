import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import {
    checkEligibility,
    getQuizTerm,
    quizTermAccept
} from '../../../services/httpRequest';
import CustomModal from '../../componets/common/CustomModal';
import Loading from '../../componets/common/Loading';

type Props = {};

function QuizPage({}: Props) {
    const { user, isLoading: authLoading } = useAuth();
    console.log(user.msisdn);
    const navigate = useNavigate();
    console.log(authLoading);
    const [quizContent, setQuizContent] = useState<any>(null);
    const [terms, setTerms] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [loginModalOpen, setLoginModalOpen] = useState(false);

    const [subscribeModal, setSubscribeModal] = useState(false);
    const [acceptTermModal, setAcceptTermModal] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getQuizTerm({ msisdn: user.msisdn }).then((res) => {
            setTerms(res.data.content.quiz_policy);
            setIsLoading(false);
        });

        if (user.msisdn && !authLoading) {
            checkEligibility({ msisdn: user?.msisdn }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    setQuizContent(res.data.content);
                }
            });
        } else {
            setQuizContent(null);
        }
    }, [user?.msisdn]);

    if (isLoading) {
        return <Loading />;
    }

    const handleAcceptButton = () => {
        if (!user?.msisdn) {
            setLoginModalOpen(true);
            return;
        }
        setSubscribeModal(false);
        const data = {
            msisdn: user.msisdn,
            is_accept: true
        };

        quizTermAccept(data)
            .then((res) => {
                if (res.status === 200) {
                    navigate('/play-quiz');
                    return;
                }
            })
            .catch((res) => {
                console.log(res.status);
                setSubscribeModal(true);
            });
    };

    const handleQuizStartButton = () => {
        if (!user?.msisdn) {
            setLoginModalOpen(true);
            return;
        }

        if (!quizContent?.is_subscribed) {
            setSubscribeModal(true);
            return;
        }
        if (!quizContent?.has_quiz_terms_accept) {
            console.log('first');
            setAcceptTermModal(true);
            return;
        }
        navigate('/play-quiz');
    };

    const handleCloseLoginModal = () => {
        setLoginModalOpen(false);
    };
    const handleCloseAcceptTermModal = () => {
        setAcceptTermModal(false);
    };
    const handleCloseSubscribeModal = () => {
        setSubscribeModal(false);
    };

    const redirectLeaderboard = () => {
        if (!user?.msisdn) {
            setLoginModalOpen(true);
            return;
        }
        if (!quizContent?.is_subscribed) {
            setSubscribeModal(true);
            return;
        }

        navigate('/quiz/leaderboard');
    };

    return (
        <div className="max-w-screen-xl mx-auto mt-10 px-6 md:px-10 mb-20">
            <div>
                <div>
                    <img
                        src="/images/quiz/banner_2.jpeg"
                        alt=""
                        className="w-full rounded-lg md:rounded-[20px] mb-10"
                    />
                </div>

                {quizContent?.is_subscribed && (
                    <div className="flex justify-center items-center flex-col">
                        <div className="flex items-center gap-2">
                            <h1 className="text-6xl font-bold text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-yellow-600 bg-clip-text animate-pulse">
                                {quizContent?.todays_score}
                            </h1>

                            <p className="text-3xl animate-spin">🎲</p>
                        </div>

                        <p className="text-white text-sm ">
                            Your Today's Score
                        </p>
                    </div>
                )}

                <PlayButtonSet
                    handleQuizStartButton={handleQuizStartButton}
                    redirectLeaderboard={redirectLeaderboard}
                />

                <div
                    dangerouslySetInnerHTML={{ __html: terms ? terms : '' }}
                ></div>
                <PlayButtonSet
                    handleQuizStartButton={handleQuizStartButton}
                    redirectLeaderboard={redirectLeaderboard}
                />

                {/* <div className="flex justify-center mt-10">
                    {quizContent?.has_quiz_terms_accept ? (
                        <>
                            {quizContent?.todays_eligibility ? (
                                <button
                                    onClick={handleQuizStartButton}
                                    className="hover:opacity-90"
                                >
                                    <img src="/images/button/play.svg" alt="" />
                                </button>
                            ) : (
                                <div className="">
                                    <h2 className="text-3xl font-semibold mb-2 text-red-500 mt-2">
                                        আপনি আজকের কুইজের সীমা অতিক্রম করেছেন।
                                    </h2>
                                    <p className="text-center">
                                        আগামীকাল আপনি আবার কুইজে অংশগ্রহণ করতে
                                        পারবেন| 😃
                                    </p>
                                </div>
                            )}
                        </>
                    ) : (
                        <button
                            onClick={handleAcceptButton}
                            className="hover:opacity-90"
                        >
                            <img src="/images/button/accept.svg" alt="" />
                        </button>
                    )}
                </div> */}
            </div>
            <CustomModal
                isOpen={loginModalOpen}
                onClose={handleCloseLoginModal}
            >
                <h2 className="text-3xl font-semibold mb-10 text-white text-center ">
                    Please log in to your account!
                </h2>
                <div className="flex justify-center">
                    <Link to={'/login'} className="btn btn-primary btn-sm">
                        Login
                    </Link>
                </div>
            </CustomModal>

            {subscribeModal && (
                <CustomModal
                    isOpen={subscribeModal}
                    onClose={handleCloseSubscribeModal}
                >
                    <h2 className="text-3xl font-semibold mb-10 text-white text-center">
                        কুইজে অংশগ্রহণ করতে সাবস্ক্রিপশন করুন
                    </h2>
                    <div className="flex justify-center">
                        <Link
                            to={'/subscription'}
                            className="btn btn-primary btn-sm"
                        >
                            Subscription Page
                        </Link>
                    </div>
                </CustomModal>
            )}

            {acceptTermModal && (
                <CustomModal
                    isOpen={acceptTermModal}
                    onClose={handleCloseAcceptTermModal}
                >
                    <h2 className="text-3xl font-semibold mb-10 text-white text-center">
                        Do you agree to Terms and conditions?
                    </h2>
                    <div className="flex justify-center gap-5">
                        <button
                            onClick={handleAcceptButton}
                            className="btn btn-info btn-sm"
                        >
                            Accept
                        </button>
                        <button
                            onClick={handleCloseAcceptTermModal}
                            className="btn btn-warning btn-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </CustomModal>
            )}
        </div>
    );
}

export default QuizPage;

type PlaybuttonSet = {
    handleQuizStartButton: () => void;
    redirectLeaderboard: () => void;
};
const PlayButtonSet = ({
    handleQuizStartButton,
    redirectLeaderboard
}: PlaybuttonSet) => {
    return (
        <div className="flex justify-between items-center my-10">
            <button
                onClick={handleQuizStartButton}
                className="hover:opacity-90"
            >
                <img src="/images/button/play.svg" alt="" />
            </button>
            <button onClick={redirectLeaderboard} className="hover:opacity-90">
                <img src="/images/button/leaderboard.svg" alt="" />
            </button>
        </div>
    );
};
