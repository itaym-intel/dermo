import React, { useState } from 'react';
import { Box, Button, Container, Typography, Paper, CircularProgress } from '@mui/material';
import TopBar from '../components/TopBar';

interface ScanResult {
  diagnosis: string;
  confidence: number;
  recommendations: string[];
}

const SkinScanner = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleScan = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      // TODO: Replace with your actual FastAPI endpoint
      const response = await fetch('http://localhost:8000/analyze-skin', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error scanning skin:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="card p-8">
            <h1 className="text-4xl font-display font-bold text-primary-900 mb-8 text-center">
              Skin Scanner
            </h1>
            
            <div className="flex flex-col items-center gap-6">
              {previewUrl && (
                <div className="w-full max-w-md mb-4">
                  <img
                    src={previewUrl}
                    alt="Selected skin condition"
                    className="w-full h-auto rounded-2xl shadow-card"
                  />
                </div>
              )}

              <button
                className="w-full max-w-md px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium shadow-card hover:shadow-hover"
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                Upload Skin Image
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </button>

              {selectedImage && (
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

              {result && (
                <div className="w-full max-w-md card p-6">
                  <h2 className="text-2xl font-display font-semibold text-primary-900 mb-4">
                    Analysis Results
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-primary-700">Diagnosis</h3>
                      <p className="text-primary-800">{result.diagnosis}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-primary-700">Confidence</h3>
                      <p className="text-primary-800">{(result.confidence * 100).toFixed(1)}%</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-primary-700 mb-2">Recommendations</h3>
                      <ul className="list-disc list-inside space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <li key={index} className="text-primary-800">
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinScanner; 