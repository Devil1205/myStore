import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { MDBIcon } from 'mdb-react-ui-kit';
import "@fortawesome/fontawesome-free/css/all.min.css";
import googlePlay from '../../../Images/Google-Play.png';
import appStore from '../../../Images/App-Store.png';

function Footer() {
    return (
        <div className="footerContainer">
            <div className='footer'>
                <div className='footerColumn'>
                    <div className='footerColumnHeader'>Availabe On</div>
                    <Link className='my-2 downloadImage' to='/'><img src={googlePlay} alt="" width={150} /></Link>
                    <Link className='my-2 downloadImage' to='/'><img src={appStore} alt="" width={150} /></Link>
                </div>
                <div className='footerColumn'>
                    <div className='footerColumnHeader'>Contact</div>
                    <div><span>Phone : </span> <span>847095xxxx</span></div>
                    <div><span>Email : </span> <span>mystore.org.0109@gmail.com</span></div>
                    <div><span>Address : </span> <span>Delhi</span></div>
                </div>
                <div className='footerColumn'>
                    <div className='footerColumnHeader'>About</div>
                    <Link to='/' className='text-reset'>
                        Privacy
                    </Link>
                    <Link to='/' className='text-reset'>
                        Shipping
                    </Link>
                    <Link to='/' className='text-reset'>
                        Contact Us
                    </Link>
                    <Link to='/' className='text-reset'>
                        About Us
                    </Link>
                </div>
                <div className='footerColumn'>
                    <div className='footerColumnHeader'>Social Media</div>
                    <div>
                        <Link to='/' className='me-4 text-reset'>
                            <MDBIcon className='facebook' size='2x' fab icon="facebook-f" />
                        </Link>
                        <Link to='/' className='me-4 text-reset'>
                            <MDBIcon className='twitter' size='2x' fab icon="twitter" />
                        </Link>
                        <Link to='/' className='me-4 text-reset'>
                            <MDBIcon className='insta' size='2x' fab icon="instagram" />
                        </Link>
                    </div>
                </div>
            </div>
            <div className='text-center'>Copyrights © 2023-2024 myStore</div>
        </div>
    )
}

export default Footer