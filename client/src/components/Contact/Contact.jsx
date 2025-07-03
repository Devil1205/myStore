import React from 'react';
import './Contact.css';
import contactBanner from '../../Images/contactBanner.jpeg';
import Typewriter from 'typewriter-effect';
import navbarLogo from '../../Images/navbarLogo.png';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';

function Contact() {

    const aboutMessages = ["We are myStore", "We value our customers", "Kindly mail us your issues", "We'll get back to you soon"];

    return (
        <div className='contactContainer'>
            <div className="aboutBanner">
                <img src={contactBanner} alt="About Us" />
                <div>
                    <img src={navbarLogo} alt="About Us" />
                    <div>Contact Us</div>
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
            <div>
                <div className="contactCard">
                    <h3>Contact Us</h3>
                    <div>
                        <div><PhoneRoundedIcon /> <span>+91 8470-950-994</span></div>
                        <div><EmailRoundedIcon /> <a className='text-dark' href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSHvnwfqvHxmJHTJzpMwlknLtLgWKlVHMzKXMvkpkrrsrfrjVFxbNtnKlrNBcNsBTNkWQwJJ" target='_blank'>myStore.org.0109@gmail.com</a></div>
                        <div><BusinessRoundedIcon /> <span>New Delhi, Delhi</span></div>
                        <div><LanguageRoundedIcon /> <a className='text-dark' href="https://pulkit1205.netlify.app" target='_blank'>https://portfoliopulkit.vercel.app</a></div>
                    </div>
                </div>
                <div>
                    <p>Kindly mail us your queries, we'll try to get back to you as soon as possible.</p>
                </div>
            </div>
        </div>
    )
}

export default Contact