import React, { useEffect, useRef, useState } from 'react';
import './UpdateProfile.css';
import './LoginSignup.css';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, clearErrors } from '../../actions/profileAction';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { loadUser } from '../../actions/userAction';
import { UPDATE_PROFILE_RESET } from '../../constants/profileContstants';

function UpdateProfile() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { user } = useSelector((state) => state.user);
    const { isUpdated, error } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [signupData, setSignupData] = useState({ name, email });
    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);

    const submitSignupForm = (e) => {
        e.preventDefault();
        const data = { ...signupData, avatar };
        // console.log(data);
        dispatch(updateProfile(data));
    }

    const signupDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        else {
            setSignupData({ ...signupData, [e.target.name]: e.target.value })
        }
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            navigate("/user/profile");
            dispatch(loadUser())
            dispatch({ type: UPDATE_PROFILE_RESET });
        }

    }, [dispatch, error, alert, isUpdated])

    return (
        < div className='loginSignupContainer' >
            <div className="loginSignupBox">
                <MetaData title={`${user.name} - Update Profile`} />


                <form className="loginForm" encType='multipart/form-data' onSubmit={submitSignupForm}>
                    <h3 className='text-center mb-5'>Update Profile</h3>
                    <div className="signupName">
                        <AccountCircleOutlinedIcon />
                        <input type="text" placeholder="Name" value={signupData.name} name="name" onChange={signupDataChange} />
                    </div>
                    <div className="signupEmail">
                        <EmailOutlinedIcon />
                        <input type="email" placeholder="Email" value={signupData.email} name="email" onChange={signupDataChange} />
                    </div>

                    <div className="registerImage">
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input type="file" accept="image/*" name="avatar" onChange={signupDataChange} />
                    </div>
                    <button className="signupSubmit" type='submit' >Update</button>
                </form>
            </div>
        </div >
    )
}

export default UpdateProfile