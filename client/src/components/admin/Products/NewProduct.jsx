import React, { useEffect, useState } from 'react';
import './NewProduct.css';
import '../../User/LoginSignup.css';
import { useNavigate } from 'react-router-dom';
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
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { createProduct, clearErrors } from '../../../actions/productAction';
import { CREATE_PRODUCT_RESET } from '../../../constants/productContants';
import Loader from '../../layout/Loader/Loader';

function NewProduct() {

    const categories = ["Phone", "Laptop", "Clothes", "Kitchen"];

    const dispatch = useDispatch();
    const { success, loading, error } = useSelector(state => state.newProduct);
    const alert = useAlert();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("");
    const [productImagePreview, setProductImagePreview] = useState([]);
    const [productImages, setProductImages] = useState([]);

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
        };
        dispatch(createProduct(data));
    }

    const productImageChange = (e) => {
        const arr = Array.from(e.target.files);
        setProductImages([]);
        setProductImagePreview([]);

        arr.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setProductImages((old) => [...old, reader.result]);
                    setProductImagePreview((old) => [...old, reader.result]);
                }
            }

            reader.readAsDataURL(file);
        })
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            navigate("/admin/dashboard");
            alert.success("Product created successfully");
            dispatch({ type: CREATE_PRODUCT_RESET });
        }
    }, [dispatch, alert, error, success])


    return (
        loading ?
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
                                <textarea type="text" rows={4} placeholder="Description" value={description} name="description" onChange={(e) => { setDescription(e.target.value) }} />
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
                                <Carousel
                                    showArrows={false}
                                    showStatus={false}
                                    dynamicHeight
                                >
                                    {productImagePreview.map((elem, ind) => {
                                        return (
                                            <img key={ind} className='newProductImage' src={elem} alt={elem} />
                                        )
                                    })}
                                </Carousel>
                            </div>
                            <button className="signupSubmit" type='submit' disabled={loading ? true : false} >Create</button>
                        </form>

                    </div>
                </div >
            </>
    )
}

export default NewProduct