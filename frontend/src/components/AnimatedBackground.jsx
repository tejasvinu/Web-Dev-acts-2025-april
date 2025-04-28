import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Create particles
    const particlesArray = [];
    // Adjust density based on screen size
    const numberOfParticles = Math.floor(canvas.width * canvas.height / 15000);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5; // Slightly smaller particles
        this.speedX = Math.random() * 0.2 - 0.1; // Slower movement
        this.speedY = Math.random() * 0.2 - 0.1;
        // More subtle colors within a blue/purple range, lower opacity
        this.color = `rgba(${Math.random() * 50 + 50}, ${Math.random() * 50 + 100}, ${Math.random() * 50 + 150}, ${Math.random() * 0.1 + 0.02})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap particles around the screen edges
        if (this.x > canvas.width + this.size) this.x = -this.size;
        else if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
        else if (this.y < -this.size) this.y = canvas.height + this.size;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function createParticles() {
      particlesArray.length = 0; // Clear existing particles on resize
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add a subtle dark gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(15, 15, 20, 0.98)'); // Slightly darker top
      gradient.addColorStop(1, 'rgba(10, 10, 15, 0.98)'); // Slightly darker bottom
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add very subtle grid lines
      ctx.strokeStyle = 'rgba(50, 50, 70, 0.04)'; // More transparent grid
      ctx.lineWidth = 0.5;
      const gridSize = 60; // Larger grid size

      for (let i = 0; i < canvas.width; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }

      for (let i = 0; i < canvas.height; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }

      // Connect nearby particles with very faint lines
      connectParticles();

      animationFrameId = requestAnimationFrame(animateParticles);
    }

    function connectParticles() {
      const maxDistance = 120; // Slightly larger connection distance
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) { // Start b from a + 1
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            // Very faint connection lines
            ctx.strokeStyle = `rgba(100, 150, 200, ${opacity * 0.03})`;
            ctx.lineWidth = 0.3; // Thinner lines
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    // Debounce resize handler
    let resizeTimeout;
    const debouncedResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            handleResize();
            createParticles(); // Recreate particles on resize
        }, 250);
    };

    window.addEventListener('resize', debouncedResize);
    handleResize(); // Initial size set
    createParticles(); // Initial particle creation
    animateParticles(); // Start animation

    return () => {
      window.removeEventListener('resize', debouncedResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0" // Use fixed positioning
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default AnimatedBackground;
