import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../../features/actions/authActions';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {

    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const [notification, setNotification] = useState(false);
    const [IsAuthenticated, setIsAuthenticated] = useState(false)
    const [query, setQuery] = useState('');
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    useEffect(() => {
        setIsAuthenticated(isAuthenticated);
    }, [dispatch])

    const Signout = () => {
        dispatch(signout());
        localStorage.clear();
        window.location.reload()
        Navigate('/')
    }
    
    const Search = () =>{
        Navigate(`/product/search/${query}`);
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(true);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    useEffect(() => {
        // Burger menus
        const burger = document.querySelectorAll('.navbar-burger');
        const menu = document.querySelectorAll('.navbar-menu');

        if (burger.length && menu.length) {
            for (let i = 0; i < burger.length; i++) {
                burger[i].addEventListener('click', function () {
                    for (let j = 0; j < menu.length; j++) {
                        menu[j].classList.toggle('hidden');
                    }
                });
            }
        }

        // close
        const close = document.querySelectorAll('.navbar-close');
        const backdrop = document.querySelectorAll('.navbar-backdrop');

        if (close.length) {
            for (let i = 0; i < close.length; i++) {
                close[i].addEventListener('click', function () {
                    for (let j = 0; j < menu.length; j++) {
                        menu[j].classList.toggle('hidden');
                    }
                });
            }
        }

        if (backdrop.length) {
            for (let i = 0; i < backdrop.length; i++) {
                backdrop[i].addEventListener('click', function () {
                    for (let j = 0; j < menu.length; j++) {
                        menu[j].classList.toggle('hidden');
                    }
                });
            }
        }

        // Cleanup event listeners on component unmount
        return () => {
            if (burger.length && menu.length) {
                for (let i = 0; i < burger.length; i++) {
                    burger[i].removeEventListener('click', function () {
                        for (let j = 0; j < menu.length; j++) {
                            menu[j].classList.toggle('hidden');
                        }
                    });
                }
            }

            if (close.length) {
                for (let i = 0; i < close.length; i++) {
                    close[i].removeEventListener('click', function () {
                        for (let j = 0; j < menu.length; j++) {
                            menu[j].classList.toggle('hidden');
                        }
                    });
                }
            }

            if (backdrop.length) {
                for (let i = 0; i < backdrop.length; i++) {
                    backdrop[i].removeEventListener('click', function () {
                        for (let j = 0; j < menu.length; j++) {
                            menu[j].classList.toggle('hidden');
                        }
                    });
                }
            }
        };

    }, [toggleMenu, closeMenu, toggleDropdown]);

    useEffect(() => {
        const handleDocumentClick = (e) => {
            // Check if the clicked element is outside of the menu
            const menu = document.querySelectorAll('.navbar-menu');
            if (!menu[0].contains(e.target)) {
                closeMenu();
            }
        };

        document.addEventListener('click', handleDocumentClick);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [toggleMenu, closeMenu, toggleDropdown]);
    return (
        <div className='mb-10'>
            <div className='fixed top-0 left-0 w-full shadow-lg overflow-hidden z-50 '>
                <nav className="bg-slate-800 align-middle h-12 md:block">
                    <div className="flex items-center justify-between">
                        {/* Brand logo */}
                        <div className='logo mx-5  md:items-center mb-4'>
                            <a href="/" className="text-red-600 start-0 font-bold text-2xl md:mr-6 logo ">
                                Bewra
                            </a>

                        </div>


                        {/* Search bar 1 */}

                        <form className="w-4/5 mt-1 mx-16  hidden md:block flex-grow md:mr-12 mb-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    className="w-full bg-white-900 text-gray-700 rounded-md pl-8 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                                    placeholder="Search product name, category..."
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <button type="submit" className="absolute search-btn right-0 bottom-0 top-0 bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-md text-sm px-4 py-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-blue-800"
                                onClick={Search}
                                >
                                    Search
                                </button>
                            </div>
                        </form>


                        {/* links */}
                        <div className='flex justify-end md:flex-grow md:ml-6 mx-2 mt-2'>
                            <ul className="flex shrink-0 space-x-8 md:flex">
                                <li className='mb-4'>
                                    <a href="/" className="text-white hover:text-white hover:underline">
                                        {notification ?
                                            <span className="material-symbols-outlined text-blue-400 hover:text-blue-700">
                                                notification_add
                                            </span>
                                            :
                                            <span className="material-symbols-outlined text-blue-400 hover:text-blue-700">
                                                notifications
                                            </span>
                                        }

                                    </a>
                                </li>
                                <li>
                                    <Link to={'/user/cart'} className="hover:underline">
                                        <span className="material-symbols-outlined text-orange-400 hover:text-orange-700">
                                            shopping_cart
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/user/wishlist`} className="hover:underline">
                                        <span className="material-symbols-outlined text-red-400 hover:text-red-700 hover:fill-current">
                                            favorite
                                        </span>
                                    </Link>
                                </li>
                                {
                                    !IsAuthenticated ?
                                        (<> <li className='hidden lg:inline'>
                                            <a href="/signin" className="px-4 py-2 mb-2 leading-loose text-sm text-center text-white focus:outline  outline-orange-500 hover:bg-orange-700 rounded-xl">
                                                Signin
                                            </a>
                                        </li>
                                            <li className='hidden lg:inline'>
                                                <a href="/signup" className="px-4 py-2 mb-2 leading-loose text-sm text-center text-white  bg-orange-500 group hover:bg-orange-700 hover:outline-2 rounded-xl">
                                                    Signup
                                                </a>
                                            </li>
                                        </>)
                                        :
                                        (<>
                                            <li className='hidden lg:inline'>
                                                <div className=''>
                                                    <div>
                                                        <button
                                                            onClick={toggleMenu}
                                                            className="hover:text-white navbar-burger">
                                                            <img src="logo192.png" alt="pro" className='w-8 h-8 rounded-full ring-1 color text-white focus:outline-orange-500 hover:outline' />
                                                        </button>
                                                    </div>


                                                </div>

                                            </li>
                                            <button type='button' onClick={Signout} className="hidden lg:inline p-1 mb-4 leading-loose text-center  text-white  bg-orange-500 text-sm hover:bg-orange-700  rounded-2xl px-4">
                                                Sign Out
                                            </button>
                                        </>)
                                }
                            </ul>
                        </div>

                        {/* Hamburger menu for mobile */}
                        <div className="lg:hidden mb-4">
                            <button
                                onClick={toggleMenu}
                                className="text-white focus:outline-none p-3 navbar-burger"
                            >
                                <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <title>Mobile menu</title>
                                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </nav>
                {/* Mobile Menu */}

                <div className="navbar-menu relative hidden z-30">
                    <div className="navbar-backdrop inset-0 bg-gray-800 opacity-25"></div>
                    <nav className="fixed right-0 sm:mt-4 md:top-14 md:mt-1 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-slate-900 border-r rounded">
                        <div className="flex items-center mb-8">
                            <a className="mr-auto text-3xl font-bold leading-none" href="#">
                                <img src="logo192.png" className='h-10 w-10' alt="logo" />
                            </a>
                            <button className="navbar-close">
                                <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div>
                            <ul>
                                <li className="mb-1">
                                    <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-orange-50 hover:text-orange-600 rounded" href="/user/profile">Account</a>
                                </li>
                                <li className="mb-1">
                                    <Link to={'/user/orders'} className="block p-4 text-sm font-semibold text-gray-400 hover:bg-orange-50 hover:text-orange-600 rounded" >Orders</Link>
                                </li>
                                <li className="mb-1">
                                    <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-orange-50 hover:text-orange-600 rounded" href='/account/settings'>Settings</a>
                                </li>
                                {user.is_vendor ?
                                    (
                                        <>
                                            <li className="mb-1">
                                                <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-orange-50 hover:text-orange-600 rounded " href="/user/seller/dashboard">Seller Dashboard</a>
                                            </li>
                                            <li className="mb-1">
                                                <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-orange-50 hover:text-orange-600 rounded " href="/user/seller/sells">Sells</a>
                                            </li>
                                        </>
                                    )
                                    :
                                    user.is_delivery_boy ?
                                        <>
                                            <li className="mb-1">
                                                <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-orange-50 hover:text-orange-600 rounded " href="/user/seller/dashboard">Dashboard</a>
                                            </li>
                                            <li className="mb-1">
                                                <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-orange-50 hover:text-orange-600 rounded " href="/user/seller/sells">Parcels</a>
                                            </li>
                                        </>
                                        :
                                        (" ")
                                }
                            </ul>
                        </div>
                        <div className="mt-auto">
                            <div className="pt-6">
                                {!IsAuthenticated ? (
                                    <>
                                        <a className="block px-4 py-2 mb-2 leading-loose text-center text-sm bg-gray-50 hover:bg-orange-200 rounded-xl" href="/signin">Sign in</a>
                                        <a className="block px-4 py-2 mb-2 leading-loose text-center text-white text-sm bg-orange-600 hover:bg-orange-700  rounded-xl" href="signup">Sign Up</a>
                                    </>

                                ) :
                                    (
                                        <a onClick={Signout} className="block px-4 py-2 mb-2 leading-loose text-center text-sm bg-orange-600 hover:bg-orange-700 rounded-xl" href="/signin">Sign Out</a>
                                    )

                                }
                            </div>
                            <p className="my-4 text-xs text-center text-gray-500">
                                <span>Copyright © 2024</span>
                            </p>
                        </div>
                    </nav>
                </div>

                <div className='md:hidden md:block lg:hidden lg:block bg-gray-800 mb-1' >
                    <form className="w-full flex-grow ">
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="w-full bg-white-900 text-gray-700 rounded-md pl-8 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-white"
                                placeholder="Search product name, category..."
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button type="submit" className="absolute search-btn right-0 bottom-0 top-0 bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-md text-sm px-4 py-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-blue-800"
                            onClick={Search}
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    );
};

export default Navbar;
