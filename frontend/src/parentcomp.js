// Parent component that renders both PhotoCapture and Mentor
import React, { useRef } from 'react';
import PhotoCapture from './components/camera';
import Mentor from './components/mentor';

const ParentComponent = () => {
    const canvasRef = useRef(null); // Initialize canvasRef here or wherever appropriate

    return (
        <div>
            {/* Render the PhotoCapture component and pass the canvasRef */}
            <PhotoCapture canvasRef={canvasRef} />

            {/* Render the Mentor component and pass the canvasRef and imgSrc */}
            <Mentor canvasRef={canvasRef} imgSrc={'path/to/your/image.jpg'} />
        </div>
    );
};

export default ParentComponent;
