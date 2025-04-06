import { useState, useRef } from 'react';
import TopBar from '../components/TopBar';
import ImageCapture from '../components/ImageCapture';
import MoleResults from '../components/MoleResults';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface ScanResult {
  diagnosis: string;
  positive: number;
  recommendations: string[];
}

const PhotoGuidelines = () => (
  <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-primary-900">Good Example</h3>
        <img
          src="/assets/images/mole_example.jpg"
          alt="Good mole photo example"
          className="w-full h-auto rounded-lg shadow-sm"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-primary-900">Bad Example</h3>
        <img
          src="/assets/images/bad_mole_example.jpg"
          alt="Bad mole photo example"
          className="w-full h-auto rounded-lg shadow-sm"
        />
      </div>
    </div>
    
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-primary-900 mb-2">📸 Photo Guide</h3>
        <div className="space-y-2">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-600">
            Center the mole in frame
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-600">
            Use good lighting
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-600">
            Keep background simple
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-600">
            Show entire mole
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-primary-900 mb-2">✂️ Crop Guide</h3>
        <div className="space-y-2">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-600">
            Include some healthy skin
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-600">
            Keep mole centered
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-600">
            Make it clear and sharp
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-600">
            Adjust crop to focus on the mole
          </div>
        </div>
      </div>
    </div>
  </div>
);

const MoleScanner = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5
  });
  const [croppedImage, setCroppedImage] = useState<string>('');
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageCapture = (file: File, preview: string) => {
    selectedImage;
    setSelectedImage(file);
    setPreviewUrl(preview);
    setResult(null);
    setCroppedImage('');
  };

  const applyCrop = async () => {
    if (!imageRef.current || !crop.width || !crop.height) return;

    const canvas = document.createElement('canvas');
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.drawImage(
      imageRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const croppedImageUrl = canvas.toDataURL('image/jpeg');
    setCroppedImage(croppedImageUrl);
  };

  const handleScan = async () => {
    if (!croppedImage) return;

    setIsLoading(true);
    try {
      // Convert base64 to blob
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      const file = new File([blob], 'cropped-mole.jpg', { type: 'image/jpeg' });

      const formData = new FormData();
      formData.append('file', file);

      const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      const data = await apiResponse.json();
      setResult(data);
    } catch (error) {
      console.error('Error scanning mole:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setResult(null);
    setCroppedImage('');
    setPreviewUrl('');
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <div className="pt-40 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-display mb-8 text-center">
            <span className="px-6 py-2 bg-blue-600 text-white rounded-lg">
              Mole Scanner
            </span>
          </h1>
          
          {result ? (
            <MoleResults result={result} onBack={handleBack} />
          ) : (
            <>
              <PhotoGuidelines />
              
              <div className="flex flex-col items-center gap-6">
                {previewUrl && !croppedImage && (
                  <div className="w-full max-w-md mb-4">
                    <ReactCrop
                      crop={crop}
                      onChange={(c: Crop) => setCrop(c)}
                    >
                      <img
                        ref={imageRef}
                        src={previewUrl}
                        alt="Selected mole"
                        className="w-full h-auto rounded-2xl shadow-card"
                      />
                    </ReactCrop>
                    <div className="flex flex-col items-center gap-2 mt-2">
                      <p className="text-sm text-gray-600 text-center">
                        Adjust the crop to focus on the mole
                      </p>
                      <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
                        onClick={applyCrop}
                      >
                        Apply Crop
                      </button>
                    </div>
                  </div>
                )}

                {croppedImage && (
                  <div className="w-full max-w-md mb-4">
                    <img
                      src={croppedImage}
                      alt="Cropped mole"
                      className="w-full h-auto rounded-2xl shadow-card"
                    />
                  </div>
                )}

                <ImageCapture
                  onImageCapture={handleImageCapture}
                  buttonText="Upload Image"
                />

                {croppedImage && (
                  <button
                    className="w-full max-w-md px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium shadow-card hover:shadow-hover disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleScan}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Analyzing...
                      </div>
                    ) : (
                      'Analyze Mole'
                    )}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoleScanner; 