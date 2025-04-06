import { useState, useRef, useEffect } from 'react';
import { Button } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FileUploadIcon from '@mui/icons-material/FileUpload';

interface ImageCaptureProps {
  onImageCapture: (file: File, previewUrl: string) => void;
  buttonText: string;
}

const ImageCapture = ({ onImageCapture, buttonText }: ImageCaptureProps) => {
  const [showCamera, setShowCamera] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      setError(null);
      const constraints = {
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(err => {
            console.error('Error playing video:', err);
            setError('Error starting camera preview');
          });
        };
        streamRef.current = stream;
        setShowCamera(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setError('Unable to access camera. Please make sure you have granted camera permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
    setError(null);
  };

  const captureImage = () => {
    if (!videoRef.current) return;

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
          <div className="relative w-full h-[400px] bg-black rounded-2xl overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>
          {error && (
            <div className="mt-2 text-red-600 text-sm text-center">
              {error}
            </div>
          )}
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