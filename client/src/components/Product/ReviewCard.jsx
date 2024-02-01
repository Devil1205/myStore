import React from 'react';
import profile from '../../Images/profile.png';
import ReactStars from 'react-rating-stars-component';

function Review({ review }) {

    const options = {
        edit: false,
        color: "rgb(20,20,20,0.1)",
        activeColor: "tomato",
        value: review.rating,
        isHalf: true,
        size: 25
    };

    return (
        <div className='review'>
            <div>
                <img src={profile} alt={review.name} />
                <div className="name">{review.name}</div>
            </div>
            <ReactStars {...options} />
            <p className='my-1'>{review.comment}</p>
        </div>
    )
}

export default Review