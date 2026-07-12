import React, { useEffect, useRef } from 'react';
import profileImage from '../assets/daffa.png';

const Hero = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let bubbles = [];

    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    // Warna-warna untuk bubbles
    const colors = [
      'rgba(255, 107, 107, ',   // Merah
      'rgba(255, 159, 67, ',    // Orange
      'rgba(254, 202, 87, ',    // Kuning
      'rgba(108, 213, 140, ',   // Hijau
      'rgba(69, 170, 242, ',    // Biru
      'rgba(150, 111, 214, ',   // Ungu
      'rgba(255, 107, 181, ',   // Pink
      'rgba(0, 206, 201, ',     // Cyan
      'rgba(255, 159, 243, ',   // Pink muda
      'rgba(159, 222, 255, ',   // Biru muda
    ];

    // Bubble class
    class Bubble {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.radius = Math.random() * 18 + 4;
        this.speed = Math.random() * 0.3 + 0.15;
        this.opacity = Math.random() * 0.25 + 0.08;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.015 + 0.005;
        this.wobbleAmount = Math.random() * 0.5 + 0.3;
        this.colorIndex = Math.floor(Math.random() * colors.length);
        this.hue = Math.random() * 360; // Untuk variasi warna
      }

      update() {
        this.y -= this.speed;
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * this.wobbleAmount;
        
        // Rotasi warna perlahan
        this.hue = (this.hue + 0.2) % 360;

        // Reset bubble when it goes off screen
        if (this.y < -this.radius * 2) {
          this.y = canvas.height + this.radius;
          this.x = Math.random() * canvas.width;
          this.radius = Math.random() * 18 + 4;
          this.speed = Math.random() * 0.3 + 0.15;
          this.opacity = Math.random() * 0.25 + 0.08;
          this.colorIndex = Math.floor(Math.random() * colors.length);
          this.hue = Math.random() * 360;
        }
      }

      draw() {
        // Gunakan warna dari array dengan opacity
        const colorBase = colors[this.colorIndex];
        const colorWithOpacity = colorBase + this.opacity + ')';
        
        // Gradient fill untuk efek lebih cantik
        const gradient = ctx.createRadialGradient(
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          0,
          this.x,
          this.y,
          this.radius
        );
        
        // Warna utama
        gradient.addColorStop(0, colors[this.colorIndex] + (this.opacity * 0.8) + ')');
        gradient.addColorStop(0.7, colors[this.colorIndex] + (this.opacity * 0.3) + ')');
        gradient.addColorStop(1, colors[this.colorIndex] + (this.opacity * 0.1) + ')');
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Border dengan warna yang sama
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = colors[this.colorIndex] + (this.opacity * 0.5) + ')';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Shine effect dengan warna putih
        ctx.beginPath();
        ctx.arc(
          this.x - this.radius * 0.3,
          this.y - this.radius * 0.3,
          this.radius * 0.2,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.6})`;
        ctx.fill();

        // Shine effect kedua (lebih kecil)
        ctx.beginPath();
        ctx.arc(
          this.x - this.radius * 0.5,
          this.y - this.radius * 0.5,
          this.radius * 0.08,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`;
        ctx.fill();
      }
    }

    // Initialize bubbles
    const initBubbles = () => {
      const numberOfBubbles = Math.floor((canvas.width * canvas.height) / 35000);
      bubbles = [];
      for (let i = 0; i < Math.min(numberOfBubbles, 25); i++) {
        const bubble = new Bubble();
        bubble.y = Math.random() * canvas.height;
        bubbles.push(bubble);
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      bubbles.forEach(bubble => {
        bubble.update();
        bubble.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Setup
    resizeCanvas();
    initBubbles();
    animate();

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
      initBubbles();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative pt-32 pb-20 px-4 min-h-screen flex items-center bg-blue-50/50 dark:bg-blue-950/30 transition-colors duration-300 overflow-hidden">
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </div>
      
      <div className="relative z-20 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/50 rounded-full border border-blue-200 dark:border-blue-800 backdrop-blur-sm">
              <span className="text-blue-700 dark:text-blue-300 font-semibold text-sm">Hello World !!</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-bold leading-tight gradient-text">
              Saya Daffa <br></br> Web Developer Junior
            </h1>
            <p className="text-1xl text-gray-700 dark:text-blue-200 max-w-lg">
              Saya suka ngoding dan bikin pengalaman digital
              yang keren. Bukan sekadar ngetik kode, tapi
              menciptakan sesuatu yang bermanfaat.
              Belajar setiap hari, dan nggak pernah puas
              berkembang!
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#portfolio" className="btn-primary">
                Lihat Karya Saya
              </a>
              <a href="#contact" className="btn-secondary">
                Hubungi Saya
              </a>
            </div>
          </div>
          
          <div className="flex justify-center animate-float">
            <div className="relative">
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-blue-200 to-cyan-200 dark:from-blue-800/50 dark:to-cyan-800/50 animate-pulse-slow border-4 border-blue-200 dark:border-blue-700/50 backdrop-blur-sm overflow-hidden">
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;