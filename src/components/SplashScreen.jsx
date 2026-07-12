import React, { useState, useEffect } from 'react';
import img from '../assets/logoDHP.png';

const SplashScreen = ({ onEnter }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleEnter = () => {
    setIsLoading(true);
    setProgress(0);
  };

  // Animasi progress bar
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2; // Tambah 2% setiap interval
        });
      }, 30); // Update setiap 30ms

      // Setelah progress mencapai 100%, panggil onEnter
      const timeout = setTimeout(() => {
        onEnter();
      }, 2000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isLoading, onEnter]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900/50 to-blue-950">
      <div className="text-center px-6 w-full max-w-md">
        <div className="mb-8">
          <img 
            src={img} 
            alt="Logo" 
            className="h-40 w-auto object-contain mx-auto" 
          />
        </div>

        {!isLoading ? (
          <button
            onClick={handleEnter}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg font-semibold rounded-full hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105"
          >
            Masuk Website
          </button>
        ) : (
          <div className="w-full">
            {/* ===== PROGRESS BAR LURUS ===== */}
            <div className="w-full h-2 bg-blue-900/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-blue-300 text-sm mt-3">
              Memuat... {progress}%
            </p>
          </div>
        )}

        <p className="text-white/50 text-sm mt-12">
          © {new Date().getFullYear()} Portfolio. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;