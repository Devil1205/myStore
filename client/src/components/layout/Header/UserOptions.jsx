import React, { useEffect, useState } from 'react';
import './Header.css';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { logout, clearErrors } from '../../../actions/userAction';
import { useAlert } from 'react-alert';
import MetaData from '../MetaData';

function UserOptions() {

    const { user, error } = useSelector((state) => state.user);
    const [userImage, setUserImage] = useState(user.avatar.url);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();

    const handleLogout = () => {
        dispatch(logout());
        alert.success("Logged out successfully");
        navigate("/login");
    }

    return (
            <>
                <div className="userOptions">
                <MetaData title={`myStore - ${user.name}`} />
                    <div>
                        <img src={userImage} alt={user.name} />
                        {user.role === "admin" && <span className='text-danger'>admin</span>}
                        <div>
                            {user.role === "admin" &&
                                <Link to="/admin/dashboard">
                                    Dashboard <IoIosArrowForward />
                                </Link>
                            }
                            <Link to="/user/profile">
                                Profile <IoIosArrowForward />
                            </Link>
                            <Link to="/orders">
                                Orders <IoIosArrowForward />
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