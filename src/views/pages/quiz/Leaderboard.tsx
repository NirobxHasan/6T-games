import { useEffect, useState } from 'react';
import { Zoom } from 'react-awesome-reveal';
import useAuth from '../../../hooks/useAuth';
import { leaderboard } from '../../../services/httpRequest';
import Loading from '../../componets/common/Loading';

function Leaderboard() {
    const [dailyLeaderBoard, setDailyLeaderboard] = useState(true);

    const [leaderboardData, setLeaderboardData] = useState<any>(null);

    const { user, isLoading: authLoading } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (user.msisdn && !authLoading) {
            let data: any = { msisdn: user?.msisdn, date: '' };
            if (dailyLeaderBoard) {
                data = { ...data, date: getTodayDate() };
            }
            console.log(data);
            leaderboard(data)
                .then((res) => {
                    if (res.status === 200) {
                        setLeaderboardData(res.data.content);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [user.msisdn, dailyLeaderBoard]);

    function getTodayDate() {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const filledClaass = `h-10 bg-sky-600 text-sky-200 border-2 rounded-lg border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]`;
    const nonFilledClaass = `h-10   text-sky-200 border-2 rounded-lg border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]`;

    if (loading || authLoading) {
        return <Loading />;
    }
    return (
        <div className="max-w-screen-xl mx-auto mt-10 px-6 md:px-10 min-h-[85vh]">
            <div className="flex flex-col items-center ">
                <div className="">
                    <img src="/images/quiz/leaderboard.png" alt="" />
                </div>

                <div className="grid grid-cols-2 gap-2 my-10 max-w-xl w-full">
                    <button
                        onClick={() => setDailyLeaderboard(true)}
                        className={
                            dailyLeaderBoard ? filledClaass : nonFilledClaass
                        }
                    >
                        Daily
                    </button>

                    <button
                        onClick={() => setDailyLeaderboard(false)}
                        className={
                            dailyLeaderBoard ? nonFilledClaass : filledClaass
                        }
                    >
                        Mega
                    </button>
                </div>

                {/* Leader Board Table  */}

                <Zoom className="w-full max-w-xl">
                    <div className="w-full max-w-xl bg-sky-700  rounded-lg overflow-hidden border-2  border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
                        <table className="w-full">
                            <thead>
                                <tr className="text-lg">
                                    <th className="py-4 px-4 text-center  text-yellow-200">
                                        👑 Rank
                                    </th>
                                    <th className="py-4 px-4  text-yellow-200 text-center">
                                        📱 Phone
                                    </th>
                                    <th className="py-4 px-4 text-yellow-200 text-ceenter">
                                        🎖 Score
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboardData?.leaderboard.map(
                                    (player: any, index: number) => (
                                        <tr
                                            key={index}
                                            className={`${
                                                index % 2 === 0
                                                    ? 'bg-sky-900'
                                                    : 'bg-sky-900'
                                            } border-b-2  border-sky-200 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_5px_#08f,0_0_10px_#08f]`}
                                        >
                                            <td className="py-4 px-4 text-white text-center">
                                                {index + 1}
                                            </td>
                                            <td className="py-4 px-4 text-white text-center">
                                                {player.msisdn}
                                            </td>
                                            <td className="py-4 px-4 text-white text-center">
                                                {player.total_score}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </Zoom>
            </div>
        </div>
    );
}

export default Leaderboard;
