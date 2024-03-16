import React from 'react';
import './About.css';
import aboutBanner from '../../Images/aboutBanner.jpg';
import Typewriter from 'typewriter-effect';
import navbarLogo from '../../Images/navbarLogo.png';

function About() {

    const aboutMessages = ["We are myStore", "We offer best prices", "We offer promising quality goods", "We offer customer satisfaction"]

    return (
        <div className='aboutContainer'>
            <div className="aboutBanner">
                
                <span><img src={navbarLogo} alt="About Us" /><span>About Us</span></span>
                <img src={aboutBanner} alt="About Us" />
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
    )
}

export default About