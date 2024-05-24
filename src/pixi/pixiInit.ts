import * as PIXI from 'pixi.js';
import AssetsLoader from './assets-loader/AssetsLoader';
import { ASSETS } from './assets-loader';
import MainScene from './MainScene';

export const initializePixiApp = async (canvas: HTMLCanvasElement) => {
  const app = new PIXI.Application();
  await app.init({
    view: canvas,
    backgroundColor: 0x2e7dd9,
    width: canvas.parentElement?.clientWidth || 1024,
    height: canvas.parentElement?.clientHeight || 800,
    resizeTo: canvas.parentElement || window,
    autoDensity: true
  });

  // if needed for animations when tab is not active
  // document.addEventListener('visibilitychange', () => {
  //   if (document.hidden) {
  //     console.log("Tab is not active (minimized or switched)");
  //     // Handle tab becoming inactive
  //   } else {
  //     console.log("Tab is active");
  //     // Handle tab becoming active
  //   }
  // });

  // Load the texture
  const assetsLoader = new AssetsLoader();
  await assetsLoader.loadAssets(ASSETS);
  const scene = new MainScene(app);
  scene.start();

  // uncomment for chrome pixi degub plugin 
  //globalThis.__PIXI_APP__ = app;

 
  const aspectRatio = 16 / 9;
  const resizeCanvas = () => {
    if (canvas && app) {
      const parent = canvas.parentElement as HTMLElement;
      const newWidth = parent.clientWidth;
      const newHeight = parent.clientHeight;
      // call draw scene resize canvas
      scene.resize();

      let scaleFactor;
      if (newWidth / newHeight >= aspectRatio) {
          scaleFactor = newHeight / (app.renderer.height / app.stage.scale.y);
      } else {
          scaleFactor = newWidth / (app.renderer.width / app.stage.scale.x);
      }

      // resizing stage and renderer with new dimensions
      app.stage.scale.set(scaleFactor);
      app.renderer.resize(newWidth, newHeight);

      app.render();
    }
  };

   window.addEventListener('resize', resizeCanvas); // Listen for window resize
   resizeCanvas(); // Call initially to set size

  // Return the app and resizeCanvas function for cleanup
  return { app, resizeCanvas };
};
