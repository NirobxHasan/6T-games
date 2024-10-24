import { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import { AiOutlineClose } from 'react-icons/ai';
import { BiArrowBack, BiSearch } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getsearchresult } from '../../../../services/httpRequest';
import useAuth from './../../../../hooks/useAuth';
const Header = ({ categories, setSearchresult }: HeaderProps) => {
    const [searchClick, setSearchClick] = useState<boolean>(false);
    const [hoverMenu, setHoverMenu] = useState<boolean>(false);
    const [menu, setMenu] = useState<boolean>(false);
    const [showCategory, setShowCategory] = useState<boolean>(false);
    const navigate = useNavigate();

    // const [searchResult, setSearchresult] = useState<any>([]);
    const handleSearch = (searchkey: string) => {
        if (searchkey.length < 2) {
            setSearchresult([]);
            return;
        }
        const formData = {
            keyword: searchkey
        };
        getsearchresult(formData).then((res) => {
            if (res?.data.status.responseCode === '1') {
                setSearchresult(res.data.data.games);
            }
        });
    };

    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/search') {
            setSearchClick(true);
        } else {
            setSearchClick(false);
        }
    }, [location]);
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, []);

    //Check auth
    const { user, logout } = useAuth();

    return (
        <div>
            <div className="navbar bg-base-300 border-b-4 border-red-600">
                <div className="flex-1">
                    <div className="pl-3 md:pl-10 ">
                        {searchClick ? (
                            <button
                                className="mr-2 md:mr-5"
                                onClick={() => {
                                    setSearchClick(false);
                                    navigate(-1);
                                }}
                            >
                                <BiArrowBack size={30} />{' '}
                            </button>
                        ) : (
                            <Link to="/">
                                <img
                                    width={200}
                                    src="/images/logo/175x30_White.png"
                                    alt=""
                                />
                            </Link>
                        )}
                    </div>
                </div>
                <div className="flex-none hidden md:block">
                    <ul
                        className={`${
                            searchClick ? 'hidden' : ''
                        } menu menu-horizontal p-0`}
                    >
                        <li className="text-2xl font-semibold mx-2 px-2">
                            <Link to={'/'}>Home</Link>
                        </li>
                        <li
                            tabIndex={0}
                            className="text-2xl font-semibold mx-2 px-2"
                        >
                            <a>
                                Games
                                <svg
                                    className="fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                                </svg>
                            </a>
                            <ul className="bg-base-200 z-50 text-center">
                                {categories?.map((category: Category) => (
                                    <Link
                                        to={`/games/${category.catcode}`}
                                        key={category.catcode}
                                    >
                                        <li className="text-lg p-2 px-5 hover:bg-red-600 ">
                                            {category.catname}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        </li>
                        <li className="text-2xl font-semibold mx-2 px-2">
                            {/* <Link to={'/subscription'}>Subscription</Link> */}
                            <a href="/subscription">Subscription</a>
                        </li>
                        {user?.result === 'success' ? (
                            <button
                                className="text-2xl font-semibold mx-2 px-2"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <li className="text-2xl font-semibold mx-2 px-2">
                                    <Link to={'/login'}>Login</Link>
                                </li>
                                <li className="text-2xl font-semibold mx-2 px-2">
                                    <Link to={'/registration'}>
                                        Registration
                                    </Link>
                                </li>
                            </>
                        )}

                        <li className="text-2xl font-semibold mx-2 px-2">
                            <button
                                onClick={() => {
                                    setSearchClick(true);

                                    navigate('/search');
                                }}
                            >
                                <BiSearch size={25} />
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="flex-none md:hidden">
                    {!searchClick && (
                        <ul className="menu menu-horizontal p-0">
                            <li className="text-2xl font-semibold  px-2">
                                <button
                                    onClick={() => {
                                        setSearchClick(true);
                                        setMenu(false);
                                        navigate('/search');
                                    }}
                                >
                                    <BiSearch size={25} />
                                </button>
                            </li>
                            <button
                                className="flex justify-end p-4 md:hidden"
                                onClick={() => setMenu(!menu)}
                            >
                                {menu ? (
                                    <AiOutlineClose size={25} />
                                ) : (
                                    <GiHamburgerMenu size={25} />
                                )}
                            </button>
                        </ul>
                    )}
                </div>

                <div
                    className={`${
                        searchClick ? '' : 'hidden'
                    } relative w-full my-2`}
                >
                    <Fade className="w-full">
                        <input
                            placeholder="Search"
                            type="text"
                            className={`border text-gray-800 rounded-full focus:border-red-400  focus:outline-none  p-2 w-full `}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </Fade>
                </div>
            </div>

            <div
                className={`${
                    menu ? '' : 'hidden'
                } lg:hidden list-none bg-base-300 absolute top-15 right-0 z-10 w-full py-3 px-5`}
            >
                <li
                    className="text-lg font-semibold  py-3 list-none"
                    onClick={() => setMenu(false)}
                >
                    <Link to="/">Home</Link>
                </li>
                <li className="text-lg font-semibold  py-3 list-none">
                    <button onClick={() => setShowCategory(!showCategory)}>
                        Games
                    </button>{' '}
                    <div
                        className={`ml-5 mb-3 ${showCategory ? '' : 'hidden'}`}
                    >
                        <ul className="p-2  list-none">
                            {categories?.map((category: Category) => (
                                <Link
                                    to={`/games/${category.catcode}`}
                                    key={category.catcode}
                                    onClick={() => setMenu(false)}
                                >
                                    <li className="text-lg py-2 list-none">
                                        {category.catname}
                                    </li>
                                    <hr />
                                </Link>
                            ))}
                        </ul>
                    </div>
                </li>

                <li
                    className="text-lg font-semibold  py-3 list-none"
                    onClick={() => setMenu(false)}
                >
                    <a href="/subscription">Subscription</a>
                </li>
                {user?.result === 'success' ? (
                    <li
                        className="text-lg font-semibold  py-3 list-none"
                        onClick={() => {
                            logout();
                            setMenu(false);
                        }}
                    >
                        Logout
                    </li>
                ) : (
                    <>
                        <li
                            className="text-lg font-semibold  py-3 list-none"
                            onClick={() => setMenu(false)}
                        >
                            <Link to="/login">Login</Link>
                        </li>
                        <li
                            className="text-lg font-semibold py-3 list-none"
                            onClick={() => setMenu(false)}
                        >
                            <Link to={'/registration'}>Registration</Link>
                        </li>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;

interface HeaderProps {
    categories: Category[];
    setSearchresult: any;
}
