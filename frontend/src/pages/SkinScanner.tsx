import { useState, useRef } from 'react';
import TopBar from '../components/TopBar';
import ImageCapture from '../components/ImageCapture';
import SkinResults from '../components/SkinResults';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { mockSkinPredict } from '../utils/mockApi';

interface SkinAdvice {
  Info: string;
  "At-Home Treatment": string;
  "Clinical Treatment": string;
  Severity: string;
}

interface SkinResult {
  prediction: string;
  advice: SkinAdvice;
  confidence: number;
}

const PhotoGuidelines = () => (
  <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-2">
        <h3 className="text-3xl font-bold text-primary-900">Bad Example</h3>
        <img
          src="/assets/images/bad_skin_example.png"
          alt="Bad skin photo example"
          className="w-full h-auto rounded-lg shadow-sm"
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-3xl font-bold text-primary-900">Good Example</h3>
        <img
          src="/assets/images/skin_example.png"
          alt="Good skin photo example"
          className="w-full h-auto rounded-lg shadow-sm"
        />
      </div>
    </div>
    
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-4">
        <h3 className="text-3xl font-bold text-primary-900 mb-2">Photo Guide</h3>
        <div className="space-y-2">
          <div className="p-3 rounded-lg border bg-gradient-to-br from-blue-100 to-blue-50">
            Ensure good lighting
          </div>
          <div className="p-3 rounded-lg border bg-gradient-to-br from-blue-100 to-blue-50">
            Keep the area in focus
          </div>
          <div className="p-3 rounded-lg border bg-gradient-to-br from-blue-100 to-blue-50">
            Show the entire affected area
          </div>
          <div className="p-3 rounded-lg border bg-gradient-to-br from-blue-100 to-blue-50">
            Include some healthy skin for comparison
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-3xl font-bold text-primary-900 mb-2">Crop Guide</h3>
        <div className="space-y-2">
          <div className="p-3 rounded-lg border bg-gradient-to-br from-blue-100 to-blue-50">
            Focus on the affected area
          </div>
          <div className="p-3 rounded-lg border bg-gradient-to-br from-blue-100 to-blue-50">
            Include some surrounding skin
          </div>
          <div className="p-3 rounded-lg border bg-gradient-to-br from-blue-100 to-blue-50">
            Keep the image clear and sharp
          </div>
          <div className="p-3 rounded-lg border bg-gradient-to-br from-blue-100 to-blue-50">
            Adjust crop to highlight the area of concern
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SkinScanner = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SkinResult | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 99,
    height: 99,
    x: 0.5,
    y: 0.5
  });
  const [croppedImage, setCroppedImage] = useState<string>('');
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageCapture = (file: File, preview: string) => {
    setSelectedImage(file);
    setPreviewUrl(preview);
    setResult(null);
    setCroppedImage('');
  };

  const applyCrop = async () => {
    if (!imageRef.current) return;

    const isDefaultCrop = crop.width === 99 && crop.height === 99 && 
                         crop.x === 0.5 && crop.y === 0.5;

    if (isDefaultCrop) {
      setCroppedImage(previewUrl);
      return;
    }

    const canvas = document.createElement('canvas');
    const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
    const scaleY = imageRef.current.naturalHeight / imageRef.current.height;

    const cropWidth = crop.width;
    const cropHeight = crop.height;
    const cropX = crop.x;
    const cropY = crop.y;

    canvas.width = cropWidth;
    canvas.height = cropHeight;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.drawImage(
      imageRef.current,
      cropX * scaleX,
      cropY * scaleY,
      cropWidth * scaleX,
      cropHeight * scaleY,
      0,
      0,
      cropWidth,
      cropHeight
    );

    const croppedImageUrl = canvas.toDataURL('image/jpeg');
    setCroppedImage(croppedImageUrl);
  };

  const handleScan = async () => {
    if (!croppedImage) return;

    setIsLoading(true);
    try {
      const response = await fetch(croppedImage);
      const blob = await response.blob();
      const file = new File([blob], 'cropped-skin.jpg', { type: 'image/jpeg' });

      let data;
      if (import.meta.env.DEV) {
        data = await mockSkinPredict(file);
      } else {
        const formData = new FormData();
        formData.append('file', file);

        const apiResponse = await fetch(`${import.meta.env.VITE_API_URL}/skin-predict`, {
          method: 'POST',
          body: formData,
        });
        data = await apiResponse.json();
      }
      
      setResult(data);
    } catch (error) {
      console.error('Error scanning skin:', error);
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
              Skin Scanner
            </span>
          </h1>
          
          {result ? (
            <SkinResults result={result} onBack={handleBack} />
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
                        alt="Selected skin area"
                        className="w-full h-auto rounded-2xl shadow-card"
                      />
                    </ReactCrop>
                    <div className="flex flex-col items-center gap-2 mt-2">
                      <p className="text-sm text-gray-600 text-center">
                        Adjust the crop to focus on the area of concern
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
                      alt="Cropped skin area"
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
                      'Analyze Skin'
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

export default SkinScanner; 