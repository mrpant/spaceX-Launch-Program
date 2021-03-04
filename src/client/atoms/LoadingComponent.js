import React from 'react';

// TODO : Common Loading Component.
const LoadingComponent = ({ ...props }) => {
    return (
        <div className="loading">
            <div className='uil-ring-css' style={{ transform: 'scale(0.79)' }}>
                <div></div>
            </div>
        </div>
    )
}

export default LoadingComponent;