import React, { useEffect, useState } from 'react';
import './Header.css';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';

function UserOptions() {

    const { user, isAuthenticated, loading } = useSelector((state) => state.user);
    const [userImage, setUserImage] = useState("/profile.png");

    useEffect(() => {
        if (isAuthenticated) {
            setUserImage(user.avatar.url);
        }
    }, [isAuthenticated])


    return (
        loading ?
            <Loader /> :
            <>
                <div className="userOptions">
                    <div>
                        <img src={userImage} alt={user.name} />
                        <div>
                            <Link to="/information">
                                Account <IoIosArrowForward />
                            </Link>
                            <Link to="/orders">
                                Orders <IoIosArrowForward />
                            </Link>
                            <Link to="/security">
                                Privacy and Security <IoIosArrowForward />
                            </Link>
                            <Link to="/logout">
                                Logout <IoIosArrowForward />
                            </Link>
                        </div>
                    </div>
                </div>
            </>
    )
}

export default UserOptions