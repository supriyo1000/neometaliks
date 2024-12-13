import React, { useRef, useState } from 'react';
import RecordRTC from 'recordrtc';
import { saveAs } from 'file-saver';

const VideoRecorder = () => {
    const videoRef = useRef(null);
    const [recorder, setRecorder] = useState(null);
    const [isRecording, setIsRecording] = useState(false);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }

            // Create a new recorder instance
            const newRecorder = RecordRTC(stream, {
                type: 'video',
                mimeType: 'video/webm',
            });

            // Start recording
            newRecorder.startRecording();
            setRecorder(newRecorder);
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const stopRecording = () => {
        if (recorder) {
            recorder.stopRecording(() => {
                const blob = recorder.getBlob();
                saveAs(blob, 'recorded-video.webm'); // Save the recorded video as a file
                setIsRecording(false);
            });
        }
    };

    return (
        <div>
            <video ref={videoRef} autoPlay playsInline />
            <div>
                {!isRecording ? (
                    <button onClick={startRecording}>Start Recording</button>
                ) : (
                    <button onClick={stopRecording}>Stop Recording</button>
                )}
            </div>
        </div>
    );
};

export default VideoRecorder;
