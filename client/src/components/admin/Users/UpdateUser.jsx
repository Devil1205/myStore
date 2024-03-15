import React, { useState, useEffect } from 'react';
import './UpdateUser.css';
import '../Products/UpdateProduct.css';
import '../Products/NewProduct.css';
import '../../User/LoginSignup.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import MetaData from '../../layout/MetaData';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Loader from '../../layout/Loader/Loader';
import { updateUser, userDetails, clearErrors } from '../../../actions/userAction';
import { UPDATE_USER_RESET } from '../../../constants/userConstants';

function UpdateUser() {

    const roles = ["user", "admin"];

    const dispatch = useDispatch();
    const { isUpdated, loading, error } = useSelector(state => state.adminUser);
    const { user } = useSelector(state => state.userDetails);
    const alert = useAlert();
    const navigate = useNavigate();
    const params = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const submitUserForm = (e) => {
        e.preventDefault();

        if (!name) {
            alert.error("User name cannot be empty");
            return;
        }

        if (!email) {
            alert.error("User email cannot be empty");
            return;
        }

        if (roles.indexOf(role) === -1) {
            alert.error("Invalid role");
            return;
        }

        const data = {
            name,
            email,
            role
        };
        dispatch(updateUser(params.id, data));
    }

    useEffect(() => {
        if (!loading) {
            if (error) {
                alert.error(error);
                dispatch(clearErrors());
            }
            if (isUpdated) {
                navigate("/admin/users");
                alert.success("User updated successfully");
                dispatch({ type: UPDATE_USER_RESET });
                dispatch(userDetails(params.id));
            }
        }

        if (!user || user._id !== params.id)
            dispatch(userDetails(params.id));

        if (user && user._id === params.id) {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }

    }, [dispatch, alert, error, isUpdated, user])


    return (
        !user || user._id !== params.id ?
            <Loader /> :
            <>
                < div className='loginSignupContainer' >
                    <MetaData title={`myStore Admin - Update User`} />
                    <div className="newProductBox">

                        <form className="newProductForm updateUserForm" encType='multipart/form-data' onSubmit={submitUserForm}>
                            <h3 className='text-center mb-5'>Update User</h3>
                            <div className="signupName">
                                <AccountCircleRoundedIcon />
                                <input type="text" placeholder="Name" value={name} name="name" onChange={(e) => { setName(e.target.value) }} />
                            </div>
                            <div className="newProductDescription">
                                <EmailRoundedIcon />
                                <input type="email" placeholder="Email" value={email} name="email" onChange={(e) => { setEmail(e.target.value) }} />
                            </div>
                            <div>
                                <FormControl sx={{ m: 1, width: "100%", maxWidth: "100%", margin: "0px" }}>
                                    <TextField
                                        value={role}
                                        onChange={(e) => { setRole(e.target.value) }}
                                        select // tell TextField to render select
                                        label="Role"
                                        size='small'
                                    >
                                        {roles.map((elem, ind) => {
                                            return (
                                                <MenuItem value={elem} key={ind}>{elem}</MenuItem>
                                            )
                                        })}
                                    </TextField>
                                </FormControl>
                            </div>
                            <div className='submitButtons'>
                                <button className="myStoreBtn" type='submit' disabled={loading ? true : false} >Update</button>
                                <button className="myStoreBtn2" type='reset' disabled={loading ? true : false} onClick={() => { navigate("/admin/users") }} >Cancel</button>
                            </div>
                        </form>

                    </div>
                </div >
            </>
    )
}

export default UpdateUser