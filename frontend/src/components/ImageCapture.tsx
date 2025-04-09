import { useState, useRef, useCallback } from 'react';
import { Button } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Webcam from 'react-webcam';

interface ImageCaptureProps {
  onImageCapture: (file: File, previewUrl: string) => void;
  buttonText: string;
  hideButtons?: boolean;
}

const ImageCapture = ({ onImageCapture, buttonText, hideButtons = false }: ImageCaptureProps) => {
  const [showCamera, setShowCamera] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasCapturedPhoto, setHasCapturedPhoto] = useState(false);
  const [hasUploadedPhoto, setHasUploadedPhoto] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      onImageCapture(file, previewUrl);
      setHasUploadedPhoto(true);
      setHasCapturedPhoto(false);
    }
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        // Convert base64 to blob
        fetch(imageSrc)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
            // Flip the image data before creating the preview URL
            const img = new Image();
            img.src = imageSrc;
            img.onload = () => {
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.scale(-1, 1);
                ctx.drawImage(img, -img.width, 0);
                const flippedImageSrc = canvas.toDataURL('image/jpeg');
                onImageCapture(file, flippedImageSrc);
              }
            };
            setShowCamera(false);
            setHasCapturedPhoto(true);
            setHasUploadedPhoto(false);
          });
      }
    }
  }, [onImageCapture]);

  const startCamera = () => {
    setError(null);
    setShowCamera(true);
    setHasCapturedPhoto(false);
    setHasUploadedPhoto(false);
  };

  const stopCamera = () => {
    setShowCamera(false);
    setError(null);
  };

  const resetPhotoState = () => {
    setHasCapturedPhoto(false);
    setHasUploadedPhoto(false);
    // Clear the previous image by calling onImageCapture with null values
    onImageCapture(new File([], ''), '');
  };

  return (
    <div className="w-full max-w-md">
      {showCamera ? (
        <div className="relative">
          <div className="relative w-full h-[400px] bg-black rounded-2xl overflow-hidden">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: 'environment',
                width: { ideal: 1920 },
                height: { ideal: 1080 }
              }}
              className="w-full h-full object-cover scale-x-[-1]"
              onUserMediaError={() => {
                setError('Unable to access camera. Please make sure you have granted camera permissions.');
              }}
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
              onClick={capture}
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
          {!hideButtons && (
            <>
              <Button
                variant="contained"
                startIcon={<CameraAltIcon />}
                onClick={() => {
                  resetPhotoState();
                  startCamera();
                }}
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: '8px',
                  backgroundColor: '#60a5fa',
                  textTransform: 'none',
                  fontSize: '1rem',
                  '&:hover': {
                    backgroundColor: '#3b82f6',
                  },
                }}
              >
                {hasCapturedPhoto ? 'Retake Photo' : 'Take Photo'}
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<FileUploadIcon />}
                onClick={() => {
                  resetPhotoState();
                  document.getElementById('file-upload')?.click();
                }}
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
                {hasUploadedPhoto ? 'Reupload Photo' : buttonText}
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageCapture; 