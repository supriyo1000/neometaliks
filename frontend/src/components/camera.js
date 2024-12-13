import React, { useRef } from 'react';

const PhotoCapture = ({ onCapture }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const aspectRatio = 1/1;

    const handleCapture = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };
    const handleClose = () => {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
    };

    const handleSave = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            // Calculate the aspect ratio of the video
            const videoAspectRatio = videoWidth / videoHeight;

            // Calculate the width and height of the photo with 16:9 aspect ratio
            let width = videoWidth;
            let height = Math.floor(videoWidth / aspectRatio);

            // If the height of the photo exceeds the video height, adjust the dimensions
            if (height > videoHeight) {
                height = videoHeight;
                width = Math.floor(videoHeight * aspectRatio);
            }

            // Calculate the centering offsets for the canvas
            const offsetX = (videoWidth - width) / 2;
            const offsetY = (videoHeight - height) / 2;

            // Set canvas dimensions to match the photo dimensions
            canvas.width = width;
            canvas.height = height;

            // Draw the video frame on the canvas with correct aspect ratio and centering
            context.drawImage(video, offsetX, offsetY, width, height, 0, 0, width, height);

            // Convert the canvas image to a Blob object
            canvas.toBlob((blob) => {
                // Call the onCapture function with the captured photo (blob)
                onCapture(blob);
            }, 'image/jpeg', 1.0);
        }
    };

    return (
        <div style={{display:"flex"}}>
            <div className='viewdis'>
                <video ref={videoRef} autoPlay playsInline style={{ width: "100%" }} />
                <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
            
            <div>
                <button onClick={handleCapture} className='btn btn-primary buttondis' style={{ border: "2px solid #6a4b4b" }}>Start Camera</button>
                <button onClick={handleSave} className='btn btn-success' style={{ border: "2px solid #6a4b4b" }}>Capture & Save</button>
            </div>
        </div>
    );
};

export default PhotoCapture;
