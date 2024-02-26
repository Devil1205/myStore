import React, { useEffect, useState } from 'react';
import './ResetPassword.css';
import './LoginSignup.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../../actions/profileAction';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { loadUser } from '../../actions/userAction';
import { RESET_PASSWORD_RESET } from '../../constants/userConstants';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Loader from '../layout/Loader/Loader';

function ResetPassword() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams();
    const { isAuthenticated } = useSelector((state) => state.user);
    const { isUpdated, error, loading } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const submitSignupForm = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert.error("Passwords does not match");
            return false;
        }
        else {
            dispatch(resetPassword({ password, confirmPassword }, params.token));
        }
    }

    useEffect(() => {

        if (isAuthenticated)
            navigate("/user");

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Password Reset Successfully");
            navigate("/user/profile");
            dispatch(loadUser())
            dispatch({ type: RESET_PASSWORD_RESET });
        }

    }, [dispatch, error, alert, isUpdated])

    return (
        loading ? <Loader /> :
            <>
                < div className='loginSignupContainer' >
                    <div className="loginSignupBox resetPasswordBox">
                        <MetaData title={`myStore - Reset Password`} />

                        <form className="loginForm" encType='multipart/form-data' onSubmit={submitSignupForm}>
                            <h3 className='text-center mb-5'>Reset Password</h3>
                            <div className="loginPassword">
                                <LockOpenOutlinedIcon />
                                <input type="password" placeholder="New Password" value={password} name="password" onChange={(e) => { setPassword(e.target.value) }} />
                            </div>
                            <div className="loginPassword">
                                <LockOutlinedIcon />
                                <input type="password" placeholder="Confirm Password" value={confirmPassword} name="password" onChange={(e) => { setConfirmPassword(e.target.value) }} />
                            </div>
                            <button className="signupSubmit" type='submit' >Reset Password</button>
                        </form>
                        
                    </div>
                </div >
            </>
    )
}

export default ResetPassword