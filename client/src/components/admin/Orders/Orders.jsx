import React, { useEffect, useState } from 'react';
import './Orders.css';
import '../Products/Products.css';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { formatNumber } from '../../../App';
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
import { allOrders, deleteOrder } from '../../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../../constants/orderConstants';

function Orders() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { orders, loading } = useSelector(state => state.allOrders);
    const { isDeleted, loading: deleteOrderLoading, error } = useSelector(state => state.adminOrder);
    const [open, setOpen] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState("");

    const sortAmount = (a, b) => convertBackToNumber(a) - convertBackToNumber(b);

    const toggleDialog = () => {
        if (open)
            setOpen(false);
        else
            setOpen(true);
    }

    const columns = [
        {
            field: "date",
            headerName: "Date",
            minWidth: 150,
            flex: 0.5,
            cellClassName: "orderFont",
            headerClassName: "orderHeaderFont"
        },
        {
            field: "id",
            headerName: "Order ID",
            minWidth: 300,
            flex: 1,
            sortable: false,
            filterable: false,
            cellClassName: "orderFont",
            headerClassName: "orderHeaderFont"
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return (
                    `orderFont ${params.row.status === "Delivered" ? "successColor" : "failColor"}`
                )
            },
            headerClassName: "orderHeaderFont"
        },
        {
            field: "quantity",
            headerName: "Items",
            type: "number",
            minWidth: 150,
            flex: 0.5,
            cellClassName: "orderFont",
            headerClassName: "orderHeaderFont"
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 170,
            flex: 0.75,
            sortComparator: sortAmount,
            cellClassName: "orderFont",
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
                        <IconButton color='success' aria-label="Edit Order" disabled={orderToDelete === params.id} onClick={() => { navigate("/admin/order/" + params.id) }}>
                            <EditRoundedIcon />
                        </IconButton>
                        <IconButton color='error' aria-label="Delete Order" disabled={(orderToDelete === params.id)||(params.row.status!=="Processing")} onClick={() => { setOrderToDelete(params.id); toggleDialog(); }}>
                            <DeleteRoundedIcon />
                        </IconButton>
                    </>
                )
            }
        }
    ];

    const rows = [];


    orders && orders.forEach(elem => {
        rows.push({
            date: new Date(elem.paidAt).toLocaleDateString() + ", " + new Date(elem.paidAt).toTimeString().substr(0, 5),
            id: elem._id,
            status: elem.orderStatus,
            quantity: elem.orderItems.length,
            amount: "₹" + formatNumber(elem.totalPrice),
        })
    })

    const handleDeleteOrder = (id) => {
        dispatch(deleteOrder(id));
        toggleDialog();
    }

    useEffect(() => {
        if (!deleteOrderLoading) {
            if (isDeleted) {
                alert.success("Order deleted successfully");
                dispatch({ type: DELETE_ORDER_RESET });
                setOrderToDelete("");
            }
            if (error) {
                setOrderToDelete("");
                alert.error(error);
                dispatch(clearErrors());
            }
        }
        dispatch(allOrders());
    }, [dispatch, error, alert, isDeleted])


    return (
        loading ? <Loader /> :
            <div className='dashboard'>
                <Sidebar />
                <MetaData title={`myStore Admin - Orders`} />
                <div className='dashboardContainer adminProducts'>
                    <h3>All Orders</h3>
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

                        <DialogTitle id="alert-dialog-title"><div className='confirmDialog'>Delete Order</div></DialogTitle>

                        <DialogContent>
                            <p>Are you sure to delete order { }</p>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={() => { setOrderToDelete(""); toggleDialog(); }} color='error'>Cancel</Button>
                            <Button onClick={() => { handleDeleteOrder(orderToDelete); }} color='success'>Delete</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
    )
}

export default Orders