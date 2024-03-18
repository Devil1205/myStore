import React, { useEffect, useState } from 'react';
import './MyOrders.css';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, myOrders } from '../../actions/orderAction';
import MetaData from '../layout/MetaData';
import { convertBackToNumber, formatNumber } from '../../App';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Loader from '../layout/Loader/Loader';

function MyOrders() {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const { loading, error, orders } = useSelector(state => state.myOrders);
    const alert = useAlert();
    const navigate = useNavigate();

    const sortAmount = (a, b) => convertBackToNumber(a) - convertBackToNumber(b);

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
            minWidth: 225,
            flex: 0.75,
            sortComparator: sortAmount,
            cellClassName: "orderFont",
            headerClassName: "orderHeaderFont"
        },
        {
            field: "action",
            headerName: "View",
            minWidth: 100,
            flex: 0.25,
            headerAlign: "right",
            align: "right",
            sortable: false,
            filterable: false,
            cellClassName: "orderFont",
            headerClassName: "orderHeaderFont",
            renderCell: (params) => {
                return (
                    <IconButton color="primary" aria-label="view order" onClick={() => { navigate("/order/" + params.id) }}>
                        <LaunchRoundedIcon />
                    </IconButton>
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

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [alert, dispatch, error])


    return (
        loading ?
            <Loader /> :
            <div className="myOrders">
                <MetaData title={`${user.name} - Orders`} />
                <h3>My Orders</h3>
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
            </div>
    )
}

export default MyOrders