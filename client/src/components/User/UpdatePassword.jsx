import React, { useEffect, useRef, useState } from 'react';
import './UpdatePassword.css';
import './LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updatePassword } from '../../actions/profileAction';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import { loadUser } from '../../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

function UpdatePassword() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { user } = useSelector((state) => state.user);
    const { isUpdated, error } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const submitSignupForm = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert.error("Confirm password must match with the new password");
            return false;
        }
        else {
            dispatch(updatePassword({oldPassword, newPassword, confirmPassword}));
        }
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Password Updated Successfully");
            navigate("/user/profile");
            dispatch(loadUser())
            dispatch({ type: UPDATE_PASSWORD_RESET });
        }

    }, [dispatch, error, alert, isUpdated])

    return (
        < div className='loginSignupContainer' >
            <div className="loginSignupBox">
                <MetaData title={`${user.name} - Change Password`} />


                <form className="loginForm" encType='multipart/form-data' onSubmit={submitSignupForm}>
                    <h3 className='text-center mb-5'>Change Password</h3>
                    <div className="loginPassword">
                        <VpnKeyIcon />
                        <input type="password" placeholder="Old Password" value={oldPassword} name="password" onChange={(e) => { setOldPassword(e.target.value) }} />
                    </div>
                    <div className="loginPassword">
                        <LockOpenOutlinedIcon />
                        <input type="password" placeholder="New Password" value={newPassword} name="password" onChange={(e) => { setNewPassword(e.target.value) }} />
                    </div>
                    <div className="loginPassword">
                        <LockOutlinedIcon />
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} name="password" onChange={(e) => { setConfirmPassword(e.target.value) }} />
                    </div>
                    <button className="signupSubmit" type='submit' >Change Password</button>
                </form>
            </div>
        </div >
    )
}

export default UpdatePassword