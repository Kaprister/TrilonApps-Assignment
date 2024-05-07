import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../store/userApiSlice';
import { toast } from 'react-toastify';
import { logout } from '../../store/authSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);
    const [logoutApi] = useLogoutMutation();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const logoutHandler = async () => {
        try {
            const userInfoString = localStorage.getItem('userInfo');
            const userInfo = JSON.parse(userInfoString); // Parse the userInfo string into an object
            const accessToken = userInfo.accessToken;
            await logoutApi({ accessToken }).unwrap();
            dispatch(logout());
            localStorage.removeItem('userInfo');
            navigate('/login');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
            console.error(err);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                {/* Brand */}
                <Link className="navbar-brand" to="/">
                    TrilonApps
                </Link>

                {/* Toggler/collapsible Button */}
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleNav}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar items */}
                <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {/* Players */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/players">
                                Players
                            </Link>
                        </li>
                    </ul>

                    {/* Login and Signup buttons */}
                    {userInfo ? (
                        <ul className="navbar-nav gap-3">
                            <li className="nav-item">
                                <button className="btn btn-primary btn-color" onClick={logoutHandler}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    ) : (
                        <ul className="navbar-nav gap-3">
                            <li className="nav-item">
                                <Link className="btn btn-primary btn-color" to="/login">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="btn btn-primary btn-color" to="/signup">
                                    Signup
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
