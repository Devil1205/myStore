import React from 'react';
import './Profile.css';
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';

function Profile() {

    const { user } = useSelector(state => state.user);

    return (
        <div className='profileContainer'>
            <MetaData title={`myStore - ${user.name}`} />
            <div>
                <div className="profileSection-1">
                    <img src={user.avatar.url} alt={user.name} />
                    <button className='myStoreBtn'>Edit Profile</button>

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
                        <p>{user.createdAt}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile