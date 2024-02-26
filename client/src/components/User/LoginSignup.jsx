import React, { useEffect, useRef, useState } from 'react';
import './LoginSignup.css';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Link, useNavigate } from 'react-router-dom';
import profile from '../../Images/profile.png';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, clearErrors } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';

function LoginSignup() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, isAuthenticated } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const registerTab = useRef(null);
    const loginTab = useRef(null);
    const toggleTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(profile);

    const switchTab = (type) => {
        if (type === "Login") {
            toggleTab.current.classList.remove("switchToRight");
            registerTab.current.classList.remove("switchToLeft");
            loginTab.current.classList.remove("switchToRight");
        }
        else {
            toggleTab.current.classList.add("switchToRight");
            registerTab.current.classList.add("switchToLeft");
            loginTab.current.classList.add("switchToRight");
        }
    }

    const submitLoginForm = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    }

    const submitSignupForm = (e) => {
        e.preventDefault();
        const data = { ...signupData, avatar };
        dispatch(register(data));
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

        if (isAuthenticated)
            navigate("/user");

    }, [dispatch, error, alert, isAuthenticated])


    return (

        loading ? <Loader /> :
            <>
                < div className='loginSignupContainer' >
                <MetaData title={`myStore - Login`} />
                    <div className="loginSignupBox">
                        <div>
                            <div className="loginSignupToggle">
                                <div className="loginButton" onClick={() => { switchTab("Login") }}>Login</div>
                                <div className="signupButton" onClick={() => { switchTab("Signup") }}>Signup</div>
                            </div>
                            <div className="toggleBar toggleBarToRight" ref={toggleTab}></div>
                        </div>
                        <form className="loginForm" ref={loginTab} onSubmit={submitLoginForm}>
                            <div className="loginEmail">
                                <EmailOutlinedIcon />
                                <input type="email" placeholder="Email" required value={loginEmail} onChange={(e) => { setLoginEmail(e.target.value) }} />
                            </div>
                            <div className="loginPassword">
                                <LockOpenOutlinedIcon />
                                <input type="password" placeholder="Password" required value={loginPassword} onChange={(e) => { setLoginPassword(e.target.value) }} />
                            </div>
                            <Link to="/password/forgot" className='forgotPassword'>Forgot Password</Link>
                            <button className="loginSubmit" type='submit'>Login</button>
                        </form>

                        <form className="signupForm" encType='multipart/form-data' ref={registerTab} onSubmit={submitSignupForm}>
                            <div className="signupName">
                                <AccountCircleOutlinedIcon />
                                <input type="text" placeholder="Name" value={signupData.name} name="name" onChange={signupDataChange} />
                            </div>
                            <div className="signupEmail">
                                <EmailOutlinedIcon />
                                <input type="email" placeholder="Email" value={signupData.email} name="email" onChange={signupDataChange} />
                            </div>
                            <div className="loginPassword">
                                <LockOpenOutlinedIcon />
                                <input type="password" placeholder="Password" value={signupData.password} name="password" onChange={signupDataChange} />
                            </div>
                            <div className="registerImage">
                                <img src={avatarPreview} alt="Avatar Preview" />
                                <input type="file" accept="image/*" name="avatar" onChange={signupDataChange} />
                            </div>
                            <button className="signupSubmit" type='submit' >Signup</button>
                        </form>
                    </div>
                </div >
            </>
    )
}

export default LoginSignup