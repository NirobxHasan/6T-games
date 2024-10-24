import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import {
    getsdpurl,
    getsubschemes,
    loginApi,
    unsub
} from '../../../services/httpRequest';
import useAuth from './../../../hooks/useAuth';
const Subscription = () => {
    const [subData, setSubData] = useState<ISubsdata[] | []>([]);
    const [pack, setPack] = useState('');
    const { user, userSubscriptionChange, loginAgain } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.msisdn) {
            loginAgain();

            const formData = {
                msisdn: user?.msisdn,
                haspin: 'yes'
            };
            loginApi(formData).then((res) => {
                if (res?.data?.data.result === 'success') {
                    setPack(res?.data?.data.packcode);
                }
            });

            const formDataScheme = {
                msisdn: user?.msisdn || '',
                appname: '6T-games'
            };
            getsubschemes(formDataScheme).then((res) => {
                // console.log(res?.data);
                setSubData(res?.data.data);
            });
        } else {
            setPack('nopack');
        }
    }, [user]);

    const handleSubscriptionBtn = (packcode: string, autorenew: string) => {
        if (!user?.msisdn) {
            navigate('/login');
            return;
        }
        const formData = {
            msisdn: user?.msisdn,
            pack: packcode,
            renew: autorenew
        };
        // console.log(formData);
        getsdpurl(formData).then((res) => {
            if (res?.data.status.responseCode === '1') {
                // // console.log(req?.data.sdpurl);
                window.open(res?.data.data.sdpurl, '_self');
            }
        });
    };

    const [unsubText, setUnsubText] = useState<string>('');

    const handleUnsubBtn = (packcode: string) => {
        if (!user?.msisdn) {
            navigate('/login');
            return;
        }
        const formData = {
            msisdn: user?.msisdn,
            pack: packcode
        };
        unsub(formData).then((res) => {
            // console.log(res);
            setUnsubText(res?.data.data.message);
            if (res?.data.data.status === 'success') {
                // userSubscriptionChange('nopack');
                loginAgain();
                setPack('nopack');
            }
        });
    };
    return (
        <div className="max-w-screen-xl  mx-auto my-14  md:px-5 px-2">
            <div className="text-lg  text-center p-5">
                <h1>
                    Please use your{' '}
                    <span className="font-semibold text-primary">
                        Robi/Airtel{' '}
                    </span>
                    data connection while
                    <span className="font-semibold text-primary">
                        {' '}
                        Subscribe/Unsubscribe
                    </span>
                </h1>
            </div>
            <div className="flex  flex-wrap gap-10 justify-center mt-4">
                {/* card  */}
                {subData?.map((item: ISubsdata) => (
                    <div
                        key={item.packcode}
                        className={`card w-96 bg-neutral text-neutral-content  ${
                            item.packcode === pack ? 'bg-green-800' : ''
                        } `}
                    >
                        <div className="card-body items-center text-center border-b-4 border-red-500">
                            <h2 className="card-title text-4xl uppercase font-bold border-b-4 border-red-500 pb-2">
                                {item?.packname}
                            </h2>

                            <div className="card-actions mt-10  justify-center">
                                <p>
                                    {item.packcode === pack
                                        ? user?.packtext
                                        : item?.subtext}
                                </p>

                                {user?.msisdn ? (
                                    item.packcode === pack ? (
                                        <button
                                            className="btn btn-primary"
                                            onClick={() =>
                                                handleUnsubBtn(item?.packcode)
                                            }
                                        >
                                            Unsubscribe
                                        </button>
                                    ) : pack !== 'nopack' ? (
                                        <button
                                            className={`btn btn-primary `}
                                            disabled
                                            onClick={() =>
                                                handleSubscriptionBtn(
                                                    item?.packcode,
                                                    item?.autorenew
                                                )
                                            }
                                        >
                                            Subscribe
                                        </button>
                                    ) : (
                                        <button
                                            className={`btn btn-primary `}
                                            onClick={() =>
                                                handleSubscriptionBtn(
                                                    item?.packcode,
                                                    item?.autorenew
                                                )
                                            }
                                        >
                                            Subscribe
                                        </button>
                                    )
                                ) : (
                                    <button
                                        className={`btn btn-primary `}
                                        onClick={() =>
                                            handleSubscriptionBtn(
                                                item?.packcode,
                                                item?.autorenew
                                            )
                                        }
                                    >
                                        Subscribe
                                    </button>
                                )}

                                {/* {item.packcode === pack ? (
                                    <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                            handleUnsubBtn(item?.packcode)
                                        }
                                    >
                                        Unsubscribe
                                    </button>
                                ) : pack !== 'nopack' ? (
                                    <button
                                        className={`btn btn-primary `}
                                        disabled
                                        onClick={() =>
                                            handleSubscriptionBtn(
                                                item?.packcode,
                                                item?.autorenew
                                            )
                                        }
                                    >
                                        Subscribe
                                    </button>
                                ) : (
                                    <button
                                        className={`btn btn-primary `}
                                        onClick={() =>
                                            handleSubscriptionBtn(
                                                item?.packcode,
                                                item?.autorenew
                                            )
                                        }
                                    >
                                        Subscribe
                                    </button>
                                )} */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {unsubText && (
                <div className="mt-20 text-center ">
                    <h1 className="text-2xl ">{unsubText}</h1>
                    {/* <button
                        className="btn btn-primary mt-2"
                        onClick={() => navigate(0)}
                    >
                        Ok
                    </button> */}
                </div>
            )}
        </div>
    );
};

export default Subscription;

interface ISubsdata {
    packcode: string;
    packname: string;
    packduration: string;
    subtext: string;
    submsg: string;
    autorenew: string;
    isactive: string;
}
