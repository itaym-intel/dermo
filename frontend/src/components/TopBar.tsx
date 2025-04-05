import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white fixed w-full top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-3xl font-display font-bold text-primary-800">Dermo</span>
            <span className="text-sm text-primary-600 font-medium">AI Dermatology</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-10">
            <Link to="/" className="text-primary-700 hover:text-secondary-600 transition-colors font-medium">Home</Link>
            <Link to="/diagnosis" className="text-primary-700 hover:text-secondary-600 transition-colors font-medium">Diagnosis</Link>
            <Link to="/about" className="text-primary-700 hover:text-secondary-600 transition-colors font-medium">About</Link>
            <button className="px-6 py-2 bg-secondary-600 text-white rounded-full hover:bg-secondary-700 transition-colors font-medium">
              Get Started
            </button>
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
            <Link to="/" className="block text-primary-700 hover:text-secondary-600 transition-colors font-medium">Home</Link>
            <Link to="/diagnosis" className="block text-primary-700 hover:text-secondary-600 transition-colors font-medium">Diagnosis</Link>
            <Link to="/about" className="block text-primary-700 hover:text-secondary-600 transition-colors font-medium">About</Link>
            <button className="w-full px-6 py-2 bg-secondary-600 text-white rounded-full hover:bg-secondary-700 transition-colors font-medium">
              Get Started
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopBar;