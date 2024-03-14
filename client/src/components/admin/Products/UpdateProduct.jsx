import React, { useState, useEffect } from 'react';
import './UpdateProduct.css';
import './NewProduct.css';
import '../../User/LoginSignup.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import MetaData from '../../layout/MetaData';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { clearErrors, getProductDetails, updateProduct } from '../../../actions/productAction';
import Loader from '../../layout/Loader/Loader';
import { UPDATE_PRODUCT_RESET } from '../../../constants/productContants';

function UpdateProduct() {
    const categories = ["Phone", "Laptop", "Clothes", "Kitchen"];

    const dispatch = useDispatch();
    const { isUpdated, loading, error } = useSelector(state => state.adminProduct);
    const { product, loading: productLoading } = useSelector(state => state.productDetails);
    const alert = useAlert();
    const navigate = useNavigate();
    const params = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("");
    const [productImagePreview, setProductImagePreview] = useState([]);
    const [productImages, setProductImages] = useState([]);
    const [imgUpdated, setImgUpdated] = useState(false);

    const submitProductForm = (e) => {
        e.preventDefault();

        if (!name) {
            alert.error("Product name cannot be empty");
            return;
        }

        if (!description) {
            alert.error("Product description cannot be empty");
            return;
        }

        if (price <= 0) {
            alert.error("Product price must be greater than zero");
            return;
        }

        if (stock <= 0) {
            alert.error("Product stock must be greater than zero");
            return;
        }

        if (productImages.length === 0) {
            alert.error("Product must have atleast one image");
            return;
        }

        const data = {
            name,
            description,
            price,
            stock,
            category,
            images: productImages,
            imgUpdated
        };
        dispatch(updateProduct(params.id, data));
    }

    const productImageChange = (e) => {
        const arr = Array.from(e.target.files);
        setProductImages([]);
        setProductImagePreview([]);

        arr.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImgUpdated(true);
                    setProductImages((old) => [...old, reader.result]);
                    setProductImagePreview((old) => [...old, reader.result]);
                }
            }

            reader.readAsDataURL(file);
        })
    }


    useEffect(() => {
        if (!loading) {
            if (error) {
                alert.error(error);
                dispatch(clearErrors());
            }
            if (isUpdated) {
                navigate("/admin/dashboard");
                alert.success("Product updated successfully");
                dispatch({ type: UPDATE_PRODUCT_RESET });
                dispatch(getProductDetails(params.id));
            }
        }

        if (!product || product._id !== params.id)
            dispatch(getProductDetails(params.id));

        if (product && product._id === params.id) {
            setProductImages([]);
            setProductImagePreview([]);
            setName(product.name);
            setCategory(product.category);
            setDescription(product.description);
            setPrice(product.price);
            setStock(product.stock);
            product.images.forEach((elem) => {
                setProductImages((old) => [...old, elem.url]);
                setProductImagePreview((old) => [...old, elem.url]);
            })
        }

    }, [dispatch, alert, error, isUpdated, product])


    return (
        productLoading || product._id !== params.id ?
            <Loader /> :
            <>
                < div className='loginSignupContainer' >
                    <MetaData title={`myStore Admin - New Product`} />
                    <div className="newProductBox">

                        <form className="newProductForm" encType='multipart/form-data' onSubmit={submitProductForm}>
                            <h3 className='text-center mb-5'>Create Product</h3>
                            <div className="signupName">
                                <DriveFileRenameOutlineRoundedIcon />
                                <input type="text" placeholder="Name" value={name} name="name" onChange={(e) => { setName(e.target.value) }} />
                            </div>
                            <div className="newProductDescription">
                                <DescriptionRoundedIcon />
                                <textarea type="text" rows={6} placeholder="Description" value={description} name="description" onChange={(e) => { setDescription(e.target.value) }} />
                            </div>
                            <div className="loginPassword">
                                <CurrencyRupeeRoundedIcon />
                                <input type="number" placeholder="Price" value={price} name="price" onChange={(e) => { setPrice(e.target.value) }} />
                            </div>
                            <div className="loginPassword">
                                <Inventory2RoundedIcon />
                                <input type="number" placeholder="Stock" value={stock} name="stock" onChange={(e) => { setStock(e.target.value) }} />
                            </div>
                            <div>
                                <FormControl sx={{ m: 1, width: "100%", maxWidth: "100%", margin: "0px" }}>
                                    <TextField
                                        value={category}
                                        onChange={(e) => { setCategory(e.target.value) }}
                                        select // tell TextField to render select
                                        label="Category"
                                        size='small'
                                    >
                                        {categories.map((elem, ind) => {
                                            return (
                                                <MenuItem value={elem} key={ind}>{elem}</MenuItem>
                                            )
                                        })}
                                    </TextField>
                                </FormControl>
                            </div>
                            <div className="registerImage">
                                <input type="file" multiple accept="image/*" name="productImage" onChange={productImageChange} />
                            </div>
                            <div className='newProductImagePreview'>
                                {productImagePreview.map((elem, ind) => {
                                    return (
                                        <img key={ind} className='newProductImage' src={elem} alt={elem} />
                                    )
                                })}
                            </div>
                            <div className='submitButtons'>
                                <button className="myStoreBtn" type='submit' disabled={loading ? true : false} >Update</button>
                                <button className="myStoreBtn2" type='reset' disabled={loading ? true : false} onClick={() => { navigate("/admin/dashboard") }} >Cancel</button>
                            </div>
                        </form>

                    </div>
                </div >
            </>
    )
}

export default UpdateProduct