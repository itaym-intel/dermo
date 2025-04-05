import React from 'react';
import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';

const DiagnosisPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <TopBar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center">
            Choose Your Scanner
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 4,
              justifyContent: 'center',
              mt: 4,
              flexWrap: 'wrap'
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/mole-scanner')}
              sx={{
                width: 200,
                height: 200,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="h6">Mole Scanner</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Analyze moles for potential concerns
              </Typography>
            </Button>

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/skin-scanner')}
              sx={{
                width: 200,
                height: 200,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography variant="h6">Skin Scanner</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Analyze general skin conditions
              </Typography>
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default DiagnosisPage; 