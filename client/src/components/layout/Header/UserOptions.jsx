import React, { useEffect, useState } from 'react';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { logout, clearErrors } from '../../../actions/userAction';
import { useAlert } from 'react-alert';

function UserOptions() {

    const { user, isAuthenticated, loading, error } = useSelector((state) => state.user);
    const [userImage, setUserImage] = useState("/profile.png");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();

    const handleLogout = () => {
        dispatch(logout());
        alert.success("Logged out successfully");
        navigate("/login");
    }

    useEffect(() => {

        if (isAuthenticated) {
            setUserImage(user.avatar.url);
        }
        else if (loading === false) {
            if (error) {
                alert.error(error);
                dispatch(clearErrors());
            }
            else {
                alert.error("Please login");
            }
            navigate("/login");
        }

    }, [dispatch, isAuthenticated, alert, error])


    return (
        loading || isAuthenticated === false ?
            <Loader /> :
            <>
                <div className="userOptions">
                    <div>
                        <img src={userImage} alt={user.name} />
                        {user.role === "admin" && <span className='text-danger'>admin</span>}
                        <div>
                            {user.role === "admin" &&
                                <Link to="/dashboard">
                                    Dashboard <IoIosArrowForward />
                                </Link>
                            }
                            <Link to="/user/profile">
                                Profile <IoIosArrowForward />
                            </Link>
                            <Link to="/orders">
                                Orders <IoIosArrowForward />
                            </Link>
                            <Link to="/security">
                                Privacy and Security <IoIosArrowForward />
                            </Link>
                            <div onClick={handleLogout}>
                                Logout <IoIosArrowForward />
                            </div>
                        </div>
                    </div>
                </div>
            </>
    )
}

export default UserOptions