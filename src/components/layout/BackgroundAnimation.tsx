import React, { useEffect, useRef } from 'react';

const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Train properties
    const train = {
      x: -200,
      y: canvas.height * 0.8,
      width: 180,
      height: 50,
      speed: 0.5
    };

    // Cloud properties
    const clouds: { x: number; y: number; width: number; height: number; speed: number }[] = [];
    
    // Generate 5 clouds
    for (let i = 0; i < 5; i++) {
      clouds.push({
        x: Math.random() * canvas.width,
        y: 50 + Math.random() * 150,
        width: 60 + Math.random() * 100,
        height: 30 + Math.random() * 40,
        speed: 0.1 + Math.random() * 0.2
      });
    }

    // Draw functions
    const drawTrain = () => {
      if (!ctx) return;
      
      // Engine
      ctx.fillStyle = '#2563EB'; // Blue
      ctx.fillRect(train.x, train.y, 70, train.height);
      
      // Cabin
      ctx.fillStyle = '#1E40AF'; // Darker blue
      ctx.fillRect(train.x + 70, train.y + 10, 50, train.height - 10);
      
      // Windows
      ctx.fillStyle = '#BFDBFE'; // Light blue
      ctx.fillRect(train.x + 10, train.y + 10, 20, 15);
      ctx.fillRect(train.x + 80, train.y + 15, 10, 10);
      ctx.fillRect(train.x + 100, train.y + 15, 10, 10);
      
      // Wheels
      ctx.fillStyle = '#1F2937'; // Dark gray
      ctx.beginPath();
      ctx.arc(train.x + 20, train.y + train.height, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(train.x + 50, train.y + train.height, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(train.x + 100, train.y + train.height, 10, 0, Math.PI * 2);
      ctx.fill();
      
      // Smokestack
      ctx.fillStyle = '#1F2937'; // Dark gray
      ctx.fillRect(train.x + 10, train.y - 20, 10, 20);
    };

    const drawCloud = (cloud: typeof clouds[0]) => {
      if (!ctx) return;
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.arc(cloud.x, cloud.y, cloud.height / 2, 0, Math.PI * 2);
      ctx.arc(cloud.x + cloud.width * 0.3, cloud.y - cloud.height * 0.1, cloud.height / 1.5, 0, Math.PI * 2);
      ctx.arc(cloud.x + cloud.width * 0.6, cloud.y, cloud.height / 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawTrack = () => {
      if (!ctx) return;
      
      ctx.fillStyle = '#6B7280'; // Gray
      ctx.fillRect(0, train.y + train.height + 10, canvas.width, 5);
      
      // Ties
      ctx.fillStyle = '#78350F'; // Brown
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.fillRect(x, train.y + train.height + 5, 20, 5);
      }
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background elements
      drawTrack();
      
      // Update and draw clouds
      clouds.forEach(cloud => {
        cloud.x += cloud.speed;
        if (cloud.x > canvas.width + cloud.width) {
          cloud.x = -cloud.width;
        }
        drawCloud(cloud);
      });
      
      // Update train position
      train.x += train.speed;
      if (train.x > canvas.width) {
        train.x = -train.width;
      }
      
      // Draw train
      drawTrain();
      
      // Continue animation
      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-20"
    />
  );
};

export default BackgroundAnimation;