// src/components/PixiComponent.tsx
import React, { useRef, useEffect } from 'react';
import { initializePixiApp } from '../pixi/pixiInit';
import * as PIXI from 'pixi.js';

const PixiComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let app: PIXI.Application | null = null;
    let resizeCanvas: (() => void) | null = null;

    const setupPixi = async () => {
      if (canvasRef.current) {
        const result = await initializePixiApp(canvasRef.current);
        app = result.app;
        resizeCanvas = result.resizeCanvas;
      }
    };

    setupPixi();

    // Cleanup function to release resources when the component unmounts
    return () => {
      window.removeEventListener('resize', resizeCanvas!);
      if (app) {
        app.destroy(true); // Destroy the PixiJS application
      }
    };
  }, []);

  return (
    <div id="game" style={{ width: '100%', height: '100vh' }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default PixiComponent;