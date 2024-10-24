import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from './../../../hooks/useAuth';
const Conformation = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [resultCode, setResultCode] = useState<any>(
        searchParams.get('resultCode')
    );
    const navigate = useNavigate();
    const { user, loginAgain } = useAuth();

    useEffect(() => {
        if (user?.msisdn && (resultCode === '0' || resultCode === '6')) {
            loginAgain();
            // navigate(0);
        }
    }, [user, resultCode]);

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div>
                {resultCode === '0' || resultCode === '6' ? (
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-green-600 ">
                            Successful
                        </h1>
                        <a href="/">Go to Home Page</a>
                    </div>
                ) : (
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-red-600">
                            Failure
                        </h1>
                        {/* <Link to="/">Go to Home Page</Link> */}
                        <a href="/">Go to Home Page</a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Conformation;
