import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import MusicPlayer from './components/MusicPlayer';
import { portfolioData } from './data/portfolioData'; // <-- IMPORT DATA
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  
  const [content, setContent] = useState({
    hero: {
      title: 'Creative Developer',
      subtitle: 'Building amazing digital experiences with modern web technologies'
    },
    about: {
      title: 'About Me',
      description: 'I am a creative developer dedicated to building amazing digital experiences.'
    },
    // 🔥 PAKAI DATA DARI FILE portfolioData.js
    portfolio: portfolioData,
    contact: {
      title: 'Contact Me',
      description: "Have a project in mind? Let's work together!"
    }
  });

  const handleEnter = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onEnter={handleEnter} />;
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <main>
                    <Hero data={content.hero} />
                    <About data={content.about} />
                    <Portfolio data={content.portfolio} />
                    <Contact data={content.contact} />
                  </main>
                  <Footer />
                  <MusicPlayer />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;