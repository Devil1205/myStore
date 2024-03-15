import React, { useEffect, useState } from 'react';
import './Users.css';
import '../Products/Products.css';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import MetaData from '../../layout/MetaData';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import '../../Order/MyOrders.css';
import Sidebar from '../Dashboard/Sidebar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { allUsers, deleteUser, clearErrors } from '../../../actions/userAction';
import { DELETE_USER_RESET } from '../../../constants/userConstants';

function Users() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { users, loading } = useSelector(state => state.allUsers);
    const { isDeleted, loading: deleteUserLoading, error } = useSelector(state => state.adminUser);
    const [open, setOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState("");

    const toggleDialog = () => {
        if (open)
            setOpen(false);
        else
            setOpen(true);
    }

    const columns = [
        {
            field: "id",
            headerName: "User ID",
            minWidth: 300,
            flex: 1,
            sortable: false,
            cellClassName: "orderFont",
            headerClassName: "orderHeaderFont"
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 300,
            flex: 1,
            sortable: false,
            cellClassName: "orderFont",
            headerClassName: "orderHeaderFont"
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 200,
            flex: 1,
            cellClassName: "orderFont",
            headerClassName: "orderHeaderFont"
        },
        {
            field: "role",
            headerName: "Role",
            minWidth: 130,
            flex: 0.5,
            cellClassName: (params) => {
                return (
                    `orderFont ${params.row.role === "admin" ? "successColor" : "failColor"}`
                )
            },
            headerClassName: "orderHeaderFont"
        },
        {
            field: "action",
            headerName: "Actions",
            minWidth: 150,
            flex: 0.25,
            headerAlign: "right",
            align: "right",
            sortable: false,
            filterable: false,
            cellClassName: "orderFont",
            headerClassName: "orderHeaderFont",
            renderCell: (params) => {
                return (
                    <>
                        <IconButton color='success' aria-label="Edit User" disabled={userToDelete === params.id} onClick={() => { navigate("/admin/user/" + params.id) }}>
                            <EditRoundedIcon />
                        </IconButton>
                        <IconButton color='error' aria-label="Delete User" disabled={userToDelete === params.id} onClick={() => { setUserToDelete(params.id); toggleDialog(); }}>
                            <DeleteRoundedIcon />
                        </IconButton>
                    </>
                )
            }
        }
    ];

    const rows = [];

    users && users.forEach(elem => {
        rows.push({
            id: elem._id,
            email: elem.email,
            name: elem.name,
            role: elem.role,
        })
    })

    const handleDeleteUser = (id) => {
        dispatch(deleteUser(id));
        toggleDialog();
    }

    useEffect(() => {
        if (!deleteUserLoading) {
            if (isDeleted) {
                alert.success("User deleted successfully");
                dispatch({ type: DELETE_USER_RESET });
                dispatch(allUsers());
                setUserToDelete("");
            }
            if (error) {
                setUserToDelete("");
                alert.error(error);
                dispatch(clearErrors());
            }
        }
        dispatch(allUsers());
    }, [dispatch, error, isDeleted, alert])

    return (
        loading ? <Loader /> :
            <div className='dashboard'>
                <Sidebar />
                <MetaData title={`myStore Admin - Users`} />
                <div className='dashboardContainer adminProducts'>
                    <h3>All Users</h3>
                    <div style={{ width: "100%" }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 8 },
                                },
                            }}
                            pageSizeOptions={[8]}
                            disableRowSelectionOnClick
                            autoHeight
                        />
                    </div>
                    <Dialog
                        open={open}
                        onClose={toggleDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">

                        <DialogTitle id="alert-dialog-title"><div className='confirmDialog'>Delete User</div></DialogTitle>

                        <DialogContent>
                            <p>Are you sure to delte user { }</p>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={() => { setUserToDelete(""); toggleDialog(); }} color='error'>Cancel</Button>
                            <Button onClick={() => { handleDeleteUser(userToDelete); }} color='success'>Delete</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
    )
}

export default Users