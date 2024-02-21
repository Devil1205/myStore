import React from 'react';
import './Profile.css';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import { useNavigate, Link } from 'react-router-dom';

function Profile() {

    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();

    return (
        <div className='profileContainer'>
            <MetaData title={`${user.name} - Profile`} />
            <div>
                <div className="profileSection-1">
                    <img src={user.avatar.url} alt={user.name} />
                    <button className='myStoreBtn' onClick={()=>{navigate("/user/profile/update")}}>Edit Profile</button>

                </div>
                <div className="profileSection-2">
                    <div>
                        <h3>Full Name</h3>
                        <p>{user.name}</p>
                    </div>
                    <div>
                        <h3>Email</h3>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <h3>Date Joined</h3>
                        <p>{new Date(user.createdAt).toLocaleDateString("en-GB").replace(/\//g, '-')}</p>
                    </div>
                    <div>
                        <Link to="/user/password/update" className='myStoreBtn2'>Change Password</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile