import React from 'react';
import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';

const LandingPage = () => {
  const navigate = useNavigate();

  const stats = [
    { title: 'Undiagnosed Skin Conditions', value: '40%' },
    { title: 'Early Detection Success Rate', value: '95%' },
    { title: 'Annual Skin Cancer Cases', value: '5.4M' }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <TopBar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Welcome to Dermo
          </Typography>
          <Typography variant="body1" paragraph>
            Dermo is your personal dermatology assistant, helping you monitor and understand your skin health.
            Our advanced AI technology analyzes your skin conditions and provides preliminary assessments
            to help you make informed decisions about your health.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/diagnosis')}
            sx={{ mb: 4 }}
          >
            Diagnose
          </Button>
        </Paper>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {stats.map((stat, index) => (
            <Paper
              key={index}
              elevation={2}
              sx={{ p: 2, flex: 1, minWidth: '200px', textAlign: 'center' }}
            >
              <Typography variant="h4" color="primary">
                {stat.value}
              </Typography>
              <Typography variant="subtitle1">
                {stat.title}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;