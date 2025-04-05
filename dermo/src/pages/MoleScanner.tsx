import React, { useState } from 'react';
import { Box, Button, Container, Typography, Paper, CircularProgress } from '@mui/material';
import TopBar from '../components/TopBar';

interface ScanResult {
  diagnosis: string;
  confidence: number;
  recommendations: string[];
}

const MoleScanner = () => {
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
      const response = await fetch('http://localhost:8000/analyze-mole', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error scanning mole:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <TopBar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Mole Scanner
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            {previewUrl && (
              <Box sx={{ width: '100%', maxWidth: 400, mb: 2 }}>
                <img
                  src={previewUrl}
                  alt="Selected mole"
                  style={{ width: '100%', height: 'auto', borderRadius: 8 }}
                />
              </Box>
            )}

            <Button
              variant="contained"
              component="label"
              sx={{ width: '100%', maxWidth: 400 }}
            >
              Upload Mole Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>

            {selectedImage && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleScan}
                disabled={isLoading}
                sx={{ width: '100%', maxWidth: 400 }}
              >
                {isLoading ? <CircularProgress size={24} /> : 'Analyze Mole'}
              </Button>
            )}

            {result && (
              <Paper elevation={2} sx={{ p: 3, width: '100%', maxWidth: 400 }}>
                <Typography variant="h6" gutterBottom>
                  Analysis Results
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Diagnosis: {result.diagnosis}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Confidence: {(result.confidence * 100).toFixed(1)}%
                </Typography>
                <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
                  Recommendations:
                </Typography>
                <ul>
                  {result.recommendations.map((rec, index) => (
                    <li key={index}>
                      <Typography variant="body1">{rec}</Typography>
                    </li>
                  ))}
                </ul>
              </Paper>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default MoleScanner; 