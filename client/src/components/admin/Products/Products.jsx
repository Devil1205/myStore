import React, { useEffect } from 'react';
import './Products.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProductAdmin } from '../../../actions/productAction';
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

function Products() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { products, loading } = useSelector(state => state.products);
    const sortAmount = (a, b) => convertBackToNumber(a) - convertBackToNumber(b);

    const columns = [
        {
            field: "id",
            headerName: "Product ID",
            minWidth: 300,
            flex: 1,
            sortable: false,
            filterable: false,
            cellClassName: "orderFont",
            headerClassName: "orderHeaderFont"
        },
        {
            field: "name",
            headerName: "Product Name",
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
                console.log(params);
                return (
                    `orderFont ${params.row.quantity > 0 ? "successColor" : "failColor"}`
                )
            },
            headerClassName: "orderHeaderFont"
        },
        {
            field: "quantity",
            headerName: "Qty",
            type: "number",
            minWidth: 120,
            flex: 0.5,
            cellClassName: "orderFont",
            headerClassName: "orderHeaderFont"
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 150,
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
                        <IconButton color='success' aria-label="Edit Product" onClick={() => { navigate("/admin/product/" + params.id) }}>
                            <EditRoundedIcon />
                        </IconButton>
                        <IconButton color='error' aria-label="Edit Product">
                            <DeleteRoundedIcon />
                        </IconButton>
                    </>
                )
            }
        }
    ];

    const rows = [];

    products && products.forEach(elem => {
        rows.push({
            id: elem._id,
            name: elem.name,
            status: elem.stock > 0 ? "In Stock" : "Out of Stock",
            quantity: elem.stock,
            price: "₹" + formatNumber(elem.price),
        })
    })

    useEffect(() => {
        dispatch(getProductAdmin());
    }, [dispatch])


    return (
        loading ? <Loader /> :
            <div className='dashboard'>
                <Sidebar />
                <MetaData title={`myStore Admin - Products`} />
                <div className='dashboardContainer adminProducts'>
                    <h3>All Products</h3>
                    <div style={{ width: "100%" }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 8 },
                                },
                            }}
                            pageSizeOptions={[5]}
                            disableRowSelectionOnClick
                            autoHeight
                        />
                    </div>
                </div>
            </div>
    )
}

export default Products