import React, { useEffect, useRef, useState } from 'react';
import './ForgotPassword.css';
import './LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Loader from '../layout/Loader/Loader';
import { FORGOT_PASSWORD_RESET } from '../../constants/userConstants';

function ForgotPassword() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { isAuthenticated } = useSelector((state) => state.user);
    const { loading, error, message } = useSelector((state) => state.forgotPassword);
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const submitSignupForm = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (message) {
            alert.success(message);
            dispatch({ type: FORGOT_PASSWORD_RESET })
            navigate("/home");
        }

        if (isAuthenticated)
            navigate("/user");

    }, [dispatch, error, alert, message, isAuthenticated])

    return (
        loading ? <Loader /> :
            <>
                < div className='loginSignupContainer' >
                    <MetaData title={`myStore - Forgot Password`} />
                    <div className="loginSignupBox forgotPasswordBox">
                        <form className="loginForm" encType='multipart/form-data' onSubmit={submitSignupForm}>
                            <h3 className='text-center mb-5'>Forgot Password</h3>
                            <div className="signupEmail">
                                <EmailOutlinedIcon />
                                <input type="email" placeholder="Email" value={email} name="email" onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <button className="signupSubmit" type='submit' >Reset Password</button>
                        </form>
                    </div>
                </div >
            </>
    )
}

export default ForgotPassword