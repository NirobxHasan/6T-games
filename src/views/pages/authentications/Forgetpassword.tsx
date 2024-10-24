import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from './../../../hooks/useAuth';
const Forgatepassword = () => {
    const [number, setNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const {
        user,
        login,
        successSignup,
        allMsgStateClear,
        forgate,
        loginError
    } = useAuth();

    const handleForgate = () => {
        forgate(number);
    };

    const navigate = useNavigate();
    const location = useLocation();
    const handleLogin = () => {
        login(number, password, navigate, location);
    };
    useEffect(() => {
        allMsgStateClear();
        if (user?.msisdn) {
            navigate(-1);
        }
    }, [user]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);
    return (
        <div className="hero ">
            <div className="card w-full max-w-sm shadow-2xl bg-base-100 mt-5">
                <div className="text-2xl font-bold text-center pt-4">
                    <h1>Forget Password</h1>
                </div>

                <div className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Phone Number"
                            className="input input-bordered"
                            onBlur={(e) => setNumber(e.target.value)}
                        />
                    </div>
                    {successSignup && (
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                onBlur={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    )}

                    {successSignup ? (
                        <div className="form-control mt-6">
                            <button
                                className="btn btn-info"
                                onClick={handleLogin}
                            >
                                Login
                            </button>
                        </div>
                    ) : (
                        <div className="form-control mt-6">
                            <button
                                className="btn btn-info"
                                onClick={handleForgate}
                            >
                                submit
                            </button>
                        </div>
                    )}

                    {successSignup && (
                        <div
                            className="alert alert-success shadow-lg
                    mt-5"
                        >
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="stroke-current flex-shrink-0 h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>{successSignup}</span>
                            </div>
                        </div>
                    )}

                    {loginError && (
                        <div
                            className="alert alert-error  shadow-lg
                    mt-5"
                        >
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="stroke-current flex-shrink-0 h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>{loginError}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Forgatepassword;
