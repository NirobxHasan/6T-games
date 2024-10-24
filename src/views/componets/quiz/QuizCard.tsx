import { Zoom } from 'react-awesome-reveal';

type Props = {
    seconds: number;
    selected: number | null;
    setSelected: React.Dispatch<React.SetStateAction<number | null>>;
    handleSubmit: () => void;
    question: any;
    todays_score: number;
};

function QuizCard({
    seconds,
    setSelected,
    selected,
    handleSubmit,
    question,
    todays_score
}: Props) {
    function calculatePercentage(seconds: number) {
        seconds = Math.max(0, Math.min(60, seconds));
        return (seconds / 60) * 100;
    }
    const spanStyle = {
        '--value': seconds
    } as React.CSSProperties;
    const progressStyle = {
        '--value': calculatePercentage(seconds),
        '--size': '100px'
    } as React.CSSProperties;

    const options = [
        {
            code: 1,
            name: 'নজরুল ইসলাম'
        },
        {
            code: 2,
            name: 'জাফর ইকবাল'
        },
        {
            code: 3,
            name: 'রবীন্দ্রনাথ ঠাকুর'
        },
        {
            code: 4,
            name: 'ইমদাদুল হক'
        }
    ];

    return (
        <div className="my-12 md:my-5 ">
            <div className="flex flex-wrap justify-between items-center pb-2">
                <div className="flex items-center gap-2">
                    <h1 className=" text-3xl text-sky-300 ">স্কোর :</h1>
                    <p className="text-5xl text-amber-300">{todays_score}</p>
                </div>
                <div
                    className="radial-progress text-sky-300"
                    style={progressStyle}
                    role="progressbar"
                >
                    <span className="countdown font-mono text-4xl p-2 text-amber-300">
                        <span style={spanStyle}>{seconds}</span>
                    </span>
                </div>
            </div>

            <Zoom>
                <div className="w-[330px] md:w-[500px] border-4 border-sky-700 rounded-2xl px-2 py-4 md:px-6 md:py-10 bg-sky-500">
                    <h1 className="text-2xl font-medium text-center text-slate-100 select-none">
                        {question.title}
                    </h1>
                    <div className="px-6 md:px-12">
                        <div className="mt-8  space-y-3">
                            {question.options.map((item: any) => (
                                <button
                                    key={item.code}
                                    onClick={() => setSelected(item.code)}
                                    className={`${
                                        selected === item.code
                                            ? 'bg-amber-300 transition delay-75'
                                            : 'bg-sky-100'
                                    }  font-semibold text-slate-700 py-2 w-full rounded-full select-none`}
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                        <div className="mt-8">
                            <button
                                onClick={handleSubmit}
                                className="py-2 border-2 border-sky-300 bg-purple-600 rounded-full text-white  font-bold w-full"
                            >
                                SUBMIT
                            </button>
                        </div>
                    </div>
                </div>
            </Zoom>
        </div>
    );
}

export default QuizCard;
