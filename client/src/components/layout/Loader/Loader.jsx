import React from 'react';
import 'ldrs/lineWobble';
import './Loader.css';

function Loader() {
    return (
        <div className="loader">
            <l-line-wobble
                size="80"
                stroke="5"
                bg-opacity="0.1"
                speed="1.75"
                color="black"
            ></l-line-wobble>
        </div>
    )
}

export default Loader