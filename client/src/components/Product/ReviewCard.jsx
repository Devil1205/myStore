import React from 'react';
import profile from '../../Images/profile.png';
import { Rating } from '@mui/material';

function Review({ review }) {

    return (
        <div className='review'>
            <div>
                <img src={profile} alt={review.name} />
                <div className="name">{review.name}</div>
            </div>
            <Rating name="read-only" value={review.rating} readOnly sx={{color: "tomato"}}/>
            <p className='my-1'>{review.comment}</p>
        </div>
    )
}

export default Review