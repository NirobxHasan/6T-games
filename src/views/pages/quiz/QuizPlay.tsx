import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { fetchQuestion } from '../../../services/httpRequest';
import CustomModal from '../../componets/common/CustomModal';
import Loading from '../../componets/common/Loading';
import QuizCard from '../../componets/quiz/QuizCard';
function QuizPlay() {
    const { user, isLoading: authLoading } = useAuth();
    const [seconds, setSeconds] = useState(60);
    const [selected, setSelected] = useState<number | null>(null);
    const [apiLoading, setApiLoading] = useState(true);
    const [questionContent, setQuestionContent] = useState<any>(null);
    const [intervalId, setIntervalId] = useState<any>();
    const navigate = useNavigate();

    const [isCompleteModal, setIsCompleteModal] = useState(false);
    const handleCloseCompleteModal = () => {
        navigate('/');
        setIsCompleteModal(false);
    };

    const timeCount = () => {
        setSeconds(60);
        const intervalId = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds === 0) {
                    clearInterval(intervalId);
                    return 0;
                } else {
                    return prevSeconds - 1;
                }
            });
        }, 1000);
        setIntervalId(intervalId);

        return () => clearInterval(intervalId);
    };

    useEffect(() => {
        questionFetch(true);
    }, [user.msisdn]);

    //@ts-ignore
    const questionFetch = async (
        is_start: boolean,
        question_id?: number,
        selected_option?: number,
        answer_in_ms?: number
    ) => {
        setIsCompleteModal(false);
        setApiLoading(true);
        if (user.msisdn && !authLoading) {
            let data: any = {
                msisdn: user.msisdn,
                is_start
            };

            if (!is_start) {
                data = {
                    ...data,
                    question_id,
                    selected_option,
                    answer_in_ms
                };
            }
            const res = await fetchQuestion(data);
            console.log(res);

            if (res.status === 200) {
                setQuestionContent(res.data.content);

                if (res.data.content.is_complete) {
                    setIsCompleteModal(true);
                } else {
                    timeCount();
                }
            }
        }
        setApiLoading(false);
    };

    //Auto API Call
    useEffect(() => {
        if (seconds === 0) {
            clearInterval(intervalId);
            setSelected(null);
            questionFetch(true);
        }
    }, [seconds]);

    const handleSubmit = () => {
        if (selected) {
            const data = {
                is_start: false,
                question_id: questionContent.question.id,
                selected_option: selected,
                answer_in_ms: (60 - seconds) * 1000
            };
            clearInterval(intervalId);
            questionFetch(
                data.is_start,
                data.question_id,
                data.selected_option,
                data.answer_in_ms
            );
            setSelected(null);
        }
    };

    if (apiLoading || authLoading) {
        return <Loading />;
    }

    return (
        <div className="max-w-screen-xl mx-auto mt-10 px-6 md:px-10 min-h-[85vh]">
            <div className="flex justify-center items-center">
                {!isCompleteModal && questionContent && (
                    <QuizCard
                        seconds={seconds}
                        selected={selected}
                        setSelected={setSelected}
                        handleSubmit={handleSubmit}
                        question={questionContent?.question}
                        todays_score={questionContent.todays_score}
                    />
                )}
            </div>
            <div>
                <CustomModal
                    isOpen={isCompleteModal}
                    onClose={handleCloseCompleteModal}
                >
                    <h2 className="text-3xl text-center font-semibold mb-2 text-white mt-2">
                        {questionContent?.todays_score >= 300
                            ? 'আপনি আজকে ইতিমধ্যে বেঞ্চমার্ক নম্বর: 300 🤩 অর্জন করে ফেলেছেন। মেগা উইনার হতে আগামীকাল আবার খেলুন। 🎊🎉'
                            : 'আজকের জন্য আপনার কুইজ খেলার চান্স শেষ হয়ে গেছে। মেগা উইনার হতে আগামীকাল আবার খেলুন। 😁'}
                    </h2>

                    <div className="stat my-10 flex flex-col items-center">
                        <div className="stat-title">আজ আপনার মোট স্কোর</div>
                        <div className="text-sky-300 text-6xl font-bold pt-1 ">
                            {questionContent?.todays_score} 🥳
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Link to={'/'} className="btn btn-primary btn-sm">
                            Go to Home Page
                        </Link>
                    </div>
                </CustomModal>
            </div>

            <div>
                {questionContent?.previous_answer === 'Wrong' && (
                    <div className="toast toast-top mt-20">
                        <div className="alert alert-error ">
                            <div>
                                <span>আপনার পূর্ববর্তী উত্তরটি ভুল 😩😪</span>
                            </div>
                        </div>
                    </div>
                )}
                {questionContent?.previous_answer === 'Correct' && (
                    <div className="toast toast-top mt-20">
                        <div className="alert alert-success ">
                            <div>
                                <span>আপনার পূর্ববর্তী উত্তরটি সঠিক 😍🥳</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuizPlay;
