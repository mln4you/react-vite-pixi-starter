import { Application, Renderer } from "pixi.js";

class MainScene {
  private app: Application<Renderer>;

  constructor(app: Application<Renderer>) {
    this.app = app;
  }

  public start(): void {
    
  }

  public render(): void {
    // this.app.ticker.add((ticker) => {
    //   //
    // });
  }

  public resize(): void {
    //
  }

}

export default MainScene;
