import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen mx-auto flex justify-center items-center mt-[-20px] ">
            <div className="text-center  ">
                <h1 className="text-4xl font-extrabold py-3">
                    404 Page Not Found
                </h1>
                <p className="">The page you requested was not found.</p>

                <Link to="/" style={{ display: 'block', marginTop: '40px' }}>
                    <button className="btn btn-primary">
                        Go to the home page
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
