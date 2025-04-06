import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Avatar, Menu, MenuItem, IconButton } from '@mui/material';

const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await signOut();
    handleClose();
    navigate('/');
  };

  return (
    <nav className="bg-white fixed w-full top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="flex items-center space-x-3 select-none">
            <div className="px-3 py-1.5 bg-blue-600 text-white border-2 border-blue-600 rounded-full hover:bg-blue-50 transition-colors select-none">
              <span className="text-2xl logo select-none">Dermo</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/" className="text-primary-700 hover:text-blue-600 transition-colors font-medium">Home</Link>
            <Link to="/diagnosis" className="text-primary-700 hover:text-blue-600 transition-colors font-medium">Diagnosis</Link>
            <Link to="/about" className="text-primary-700 hover:text-blue-600 transition-colors font-medium">About</Link>
            {user ? (
              <>
                <IconButton
                  onClick={handleMenu}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={anchorEl ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={anchorEl ? 'true' : undefined}
                >
                  <Avatar 
                    src={user.photoURL || undefined} 
                    alt={user.displayName || 'User'} 
                    sx={{ width: 32, height: 32 }}
                  />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  onClick={handleClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                </Menu>
              </>
            ) : (
              <Link to="/login" className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium">
                Sign In
              </Link>
            )}
          </div>

          <button 
            className="md:hidden text-primary-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <Link to="/" className="block text-primary-700 hover:text-blue-600 transition-colors font-medium">Home</Link>
            <Link to="/diagnosis" className="block text-primary-700 hover:text-blue-600 transition-colors font-medium">Diagnosis</Link>
            <Link to="/about" className="block text-primary-700 hover:text-blue-600 transition-colors font-medium">About</Link>
            {user ? (
              <button 
                onClick={handleSignOut}
                className="w-full px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
              >
                Sign Out
              </button>
            ) : (
              <Link to="/login" className="block w-full px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium text-center">
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopBar;