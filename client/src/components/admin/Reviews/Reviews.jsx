import React, { useEffect, useState } from 'react';
import './Reviews.css';
import '../Users/Users.css';
import '../Products/Products.css';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../layout/Loader/Loader';
import { useAlert } from 'react-alert';
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
import { allReviews, deleteReview, clearErrors } from '../../../actions/productAction';
import { DELETE_REVIEW_RESET } from '../../../constants/productContants';
import { Rating } from '@mui/material';

function Reviews() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { reviews, loading } = useSelector(state => state.allReviews);
    const { isDeleted, loading: deleteReviewLoading, error } = useSelector(state => state.adminReview);
    const [open, setOpen] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState("");
    const [reviewProduct, setReviewProduct] = useState("");

    const toggleDialog = () => {
        if (open)
            setOpen(false);
        else
            setOpen(true);
    }

    const columns = [
        {
            field: "id",
            headerName: "Review ID",
            minWidth: 220,
            flex: 1,
            sortable: false,
            cellClassName: "orderFont",
            headerClassName: "orderHeaderFont"
        },
        {
            field: "uid",
            headerName: "User",
            minWidth: 230,
            flex: 1,
            sortable: false,
            cellClassName: "orderFont",
            headerClassName: "orderHeaderFont"
        },
        {
            field: "pid",
            headerName: "Product",
            minWidth: 230,
            flex: 1,
            sortable: false,
            cellClassName: "orderFont",
            headerClassName: "orderHeaderFont"
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 170,
            flex: 1,
            cellClassName: "orderFont",
            headerClassName: "orderHeaderFont"
        },
        {
            field: "review",
            headerName: "Review",
            minWidth: 200,
            flex: 1,
            sortable: false,
            cellClassName: "orderFont",
            headerClassName: "orderHeaderFont",
            renderCell: (params) => {
                return (
                    <div style={{ padding: "10px 0px" }}>
                        <Rating name="read-only" value={params.row.review.rating} readOnly sx={{ color: "tomato" }} />
                        <p className='my-1'>{params.row.review.comment}</p>
                    </div>
                )
            }
        },
        {
            field: "action",
            headerName: "Actions",
            minWidth: 120,
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
                        <IconButton color='error' aria-label="Delete User" disabled={reviewToDelete === params.id} onClick={() => { setReviewToDelete(params.id); setReviewProduct(params.row.pid); toggleDialog(); }}>
                            <DeleteRoundedIcon />
                        </IconButton>
                    </>
                )
            }
        }
    ];

    const rows = [];

    reviews && reviews.forEach(elem => {
        rows.push({
            id: elem._id,
            uid: elem.user,
            pid: elem.product,
            name: elem.name,
            review: { rating: elem.rating, comment: elem.comment }
        })
    })

    const handleDeleteReview = (pid, rid) => {
        dispatch(deleteReview(pid, rid));
        toggleDialog();
    }

    useEffect(() => {
        if (!deleteReviewLoading) {
            if (isDeleted) {
                alert.success("Review deleted successfully");
                dispatch({ type: DELETE_REVIEW_RESET });
                dispatch(allReviews());
                setReviewToDelete("");
                setReviewProduct("");
            }
            if (error) {
                setReviewToDelete("");
                setReviewProduct("");
                alert.error(error);
                dispatch(clearErrors());
            }
        }
        dispatch(allReviews());
    }, [dispatch, error, isDeleted, alert])

    return (
        loading ? <Loader /> :
            <div className='dashboard'>
                <Sidebar />
                <MetaData title={`myStore Admin - Reviews`} />
                <div className='dashboardContainer adminProducts'>
                    <h3>All Reviews</h3>
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
                            getRowHeight={() => 'auto'}
                        />
                    </div>
                    <Dialog
                        open={open}
                        onClose={toggleDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">

                        <DialogTitle id="alert-dialog-title"><div className='confirmDialog'>Delete Review</div></DialogTitle>

                        <DialogContent>
                            <p>Are you sure to delte review { }</p>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={() => { setReviewToDelete(""); setReviewProduct(""); toggleDialog(); }} color='error'>Cancel</Button>
                            <Button onClick={() => { handleDeleteReview(reviewProduct, reviewToDelete); }} color='success'>Delete</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
    )
}

export default Reviews