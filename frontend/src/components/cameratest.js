import React, { useState, useRef, useEffect } from 'react';

const CameraAccessTest = () => {
    const [isCameraOn, setIsCameraOn] = useState(false);
    const videoRef = useRef(null);

    console.log(isCameraOn);

    const startCamera = async () => {
        try {
            setIsCameraOn(true);
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            
            console.log(isCameraOn);
        } catch (error) {
            console.error('Error accessing the camera:', error);
        }
    };
    useEffect(() => {
        console.log(isCameraOn);
    },[isCameraOn])

    return (
        <div>
            <h1>Camera Access Test</h1>
            <button onClick={startCamera} disabled={isCameraOn}>
                {isCameraOn ? 'Camera is On' : 'Start Camera'}
            </button>
            {isCameraOn && (
                <div>
                    <p>Camera is active:</p>
                    <video ref={videoRef} autoPlay playsInline style={{ width: '100%' }} />
                </div>
            )}
        </div>
    );
};

export default CameraAccessTest;
