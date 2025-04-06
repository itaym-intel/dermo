import { useAuth } from '../contexts/AuthContext';
import { Button, Container, TextField, Box, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignInGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate('/diagnosis');
    } catch (error) {
      console.error('Error signing in:', error);
      setError('Failed to sign in with Google. Please try again.');
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      navigate('/diagnosis');
    } catch (error: any) {
      console.error('Error with email auth:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError('Invalid email or password.');
      } else {
        setError('Failed to authenticate. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-white"></div>
      </div>
      
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ p: 4 }}>
          <div className="flex items-center justify-center mb-4">
            <div className="px-3 py-1.5 bg-blue-600 text-white border-2 border-blue-600 rounded-full text-center">
              <span className="text-2xl logo select-none">Dermo</span>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2 text-center">
              {isSignUp ? 'Start your journey' : 'Welcome back'}
            </h1>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                E-mail
              </label>
              <TextField
                fullWidth
                placeholder="example@email.com"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: 'white',
                  }
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                Password
              </label>
              <TextField
                fullWidth
                placeholder="••••••••"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: 'white',
                  }
                }}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: '8px',
                backgroundColor: '#1c7ed6',
                textTransform: 'none',
                fontSize: '1rem',
                '&:hover': {
                  backgroundColor: '#1864ab',
                },
              }}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>

          <div className="relative mb-6">
            <Divider>
              <span className="px-2 text-sm text-gray-500">or sign {isSignUp ? 'up' : 'in'} with</span>
            </Divider>
          </div>

          <div className="grid grid-cols-1 gap-3 mb-6">
            <Button
              variant="contained"
              onClick={handleSignInGoogle}
              startIcon={<GoogleIcon />}
              fullWidth
              sx={{
                py: 2.0,
                borderRadius: '8px',
                backgroundColor: '#DB4437',
                color: 'white',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#C33326',
                },
              }}
            />
          </div>

          <div className="text-center text-sm text-gray-600">
            {isSignUp ? 'Have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
              }}
              className="text-blue-600 font-medium hover:text-blue-700 bg-transparent border-none"
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default Login; 