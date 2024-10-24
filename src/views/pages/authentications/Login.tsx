import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from './../../../hooks/useAuth';

type Props = {
    loginError: string;
};
const Login = () => {
    const [number, setNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { loginError, login, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogin = () => {
        login(number, password, navigate, location);
    };
    // useEffect(() => {
    //     console.log(location);
    //     if (user?.msisdn) {
    //         navigate(-1);
    //     }
    // }, [user]);
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);

    return (
        <div className="hero ">
            <div className="card  w-full max-w-sm shadow-2xl bg-base-100 mt-5">
                <div className="text-2xl font-bold text-center pt-4">
                    <h1>Login</h1>
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
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="password"
                            className="input input-bordered"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="label">
                            <Link
                                to={'/forgatepassword'}
                                className="label-text-alt link link-hover"
                            >
                                Forgot password?
                            </Link>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button
                            className="btn btn-info"
                            onClick={() => handleLogin()}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>

            {loginError && (
                <div className="toast toast-end">
                    <div className="alert alert-error ">
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
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{loginError}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
