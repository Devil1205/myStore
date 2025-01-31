import React from 'react';
import './Loader.scss';
import LinearProgress from '@mui/material/LinearProgress';

function Loader() {
    return (
        <div class="loading">
            <div class="loading-text">
                <span class="loading-text-words">L</span>
                <span class="loading-text-words">O</span>
                <span class="loading-text-words">A</span>
                <span class="loading-text-words">D</span>
                <span class="loading-text-words">I</span>
                <span class="loading-text-words">N</span>
                <span class="loading-text-words">G</span>
            </div>
        </div>
    )
}

export default Loader