import { useState, useRef } from 'react';
import { Button } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FileUploadIcon from '@mui/icons-material/FileUpload';

interface ImageCaptureProps {
  onImageCapture: (file: File, previewUrl: string) => void;
  buttonText: string;
}

const ImageCapture = ({ onImageCapture, buttonText }: ImageCaptureProps) => {
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      setShowCamera(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please make sure you have granted camera permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
            const previewUrl = URL.createObjectURL(blob);
            onImageCapture(file, previewUrl);
            stopCamera();
          }
        }, 'image/jpeg');
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      onImageCapture(file, previewUrl);
    }
  };

  return (
    <div className="w-full max-w-md">
      {showCamera ? (
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-[400px] object-cover rounded-2xl shadow-card"
          />
          <div className="flex justify-center gap-4 mt-4">
            <Button
              variant="contained"
              onClick={captureImage}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Take Photo
            </Button>
            <Button
              variant="outlined"
              onClick={stopCamera}
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Button
            variant="contained"
            startIcon={<CameraAltIcon />}
            onClick={startCamera}
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: '8px',
              backgroundColor: '#2563eb',
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: '#1d4ed8',
              },
            }}
          >
            Take Photo
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<FileUploadIcon />}
            onClick={() => document.getElementById('file-upload')?.click()}
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: '8px',
              borderColor: '#1c7ed6',
              color: '#1c7ed6',
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                borderColor: '#1864ab',
                backgroundColor: '#f8f9fa',
              },
            }}
          >
            {buttonText}
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileUpload}
            />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageCapture; 