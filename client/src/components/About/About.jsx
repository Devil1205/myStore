import React from 'react';
import './About.css';
import aboutBanner from '../../Images/aboutBanner.jpg';
import Typewriter from 'typewriter-effect';
import navbarLogo from '../../Images/navbarLogo.png';
import aboutCreator from '../../Images/aboutCreator.jpg';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';
import { MDBIcon } from 'mdb-react-ui-kit';

function About() {

    const aboutMessages = ["We are myStore", "We offer best prices", "We offer promising quality goods", "We offer customer satisfaction"]

    return (
        <div className='aboutContainer'>
            <div className="aboutBanner">
                <img src={aboutBanner} alt="About Us" />
                <div>
                    <img src={navbarLogo} alt="About Us" />
                    <div>About Us</div>
                    <Typewriter
                        options={{
                            strings: aboutMessages,
                            autoStart: true,
                            delay: 45,
                            deleteSpeed: 25,
                            loop: true,
                            pauseFor: 2500
                        }}

                    />
                </div>
            </div>
            <div className="aboutContent">
                <div>
                    <h3>Idea behind myStore</h3>
                    <p>myStore is an online e-commerce platform created in 2024 which aims to bring customer satisfaction and improve customer experience. Our vision is to offer our customers the best offer prices, better quality goods and fast delivery.</p>
                </div>
                <div>
                    <h3>Creator</h3>
                    <img src={aboutCreator} alt="Pulkit Sachdeva" />
                    <div>Pulkit Sachdeva</div>
                    <div className="socialMedia">
                        <Link to="https://github.com/Devil1205">
                            <GitHubIcon className='github' />
                        </Link>
                        <Link to='https://www.instagram.com/_im_pulkit'>
                            <MDBIcon className='insta' size='2x' fab icon="instagram" />
                        </Link>
                        <Link to='https://www.linkedin.com/in/pulkit-sachdeva-8a72a7121'>
                            <i class="fab fa-linkedin-in linkedIn"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About