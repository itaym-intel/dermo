import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';

const LandingPage = () => {
  const navigate = useNavigate();

  const scanners = [
    {
      title: 'Skin Scanner',
      description: 'Get a comprehensive analysis of your skin condition with our advanced AI technology.',
      icon: '🔬',
      path: '/skin-scanner'
    },
    {
      title: 'Mole Scanner',
      description: 'Monitor and analyze your moles for any concerning changes or patterns.',
      icon: '🔍',
      path: '/mole-scanner'
    },
    {
      title: 'Full Diagnosis',
      description: 'Get a complete assessment of your skin health with our comprehensive diagnosis tool.',
      icon: '📋',
      path: '/diagnosis'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      
      {/* Hero Section */}
      <section className="pt-40 pb-32 px-6 bg-gradient-to-b from-white to-primary-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 animate-slide-up">
              <h1 className="text-5xl md:text-6xl font-display font-bold text-primary-900 mb-8 leading-tight">
                Your Personal <span className="logo text-blue-600">Dermatology</span> Assistant
              </h1>
              <p className="text-xl text-primary-700 mb-12 leading-relaxed">
                Experience the future of skin health with our AI-powered dermatology platform. Get instant, accurate assessments and professional guidance from the comfort of your home.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={() => navigate('/diagnosis')}
                  className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium text-lg shadow-card hover:shadow-hover"
                >
                  Start Diagnosis
                </button>
                <button className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-full hover:bg-blue-50 transition-colors font-medium text-lg">
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2 animate-slide-up">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-100 rounded-3xl transform rotate-3"></div>
                <div className="relative bg-white rounded-3xl shadow-card p-8 overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-primary-100 to-blue-100 rounded-2xl mb-6"></div>
                  <div className="space-y-4">
                    <div className="h-4 bg-primary-100 rounded-full w-3/4"></div>
                    <div className="h-4 bg-primary-100 rounded-full w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scanners Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-6">
              Our Diagnostic Tools
            </h2>
            <p className="text-xl text-primary-700 max-w-2xl mx-auto">
              Choose the right tool for your needs and get started with your skin health journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {scanners.map((scanner, index) => (
              <div 
                key={index} 
                className="card p-8 rounded-2xl bg-white shadow-card hover:shadow-hover transition-all duration-300"
              >
                <div className="text-5xl mb-6">{scanner.icon}</div>
                <h3 className="text-2xl font-display font-semibold text-primary-900 mb-4">
                  {scanner.title}
                </h3>
                <p className="text-primary-700 leading-relaxed mb-8">
                  {scanner.description}
                </p>
                <button 
                  onClick={() => navigate(scanner.path)}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium shadow-card hover:shadow-hover"
                >
                  Start {scanner.title}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-b from-primary-50 to-white">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-display font-bold text-primary-900 mb-6">
            Ready to Take Control of Your Skin Health?
          </h2>
          <p className="text-xl text-primary-700 mb-12">
            Join thousands of users who trust Dermo for their skin health needs.
          </p>
          <button 
            onClick={() => navigate('/diagnosis')}
            className="px-12 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium text-lg shadow-card hover:shadow-hover"
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;