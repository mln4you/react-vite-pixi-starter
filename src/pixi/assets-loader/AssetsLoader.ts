import {Assets} from 'pixi.js';

class AssetsLoader {

  async loadAssets(assets: string []): Promise<Record<string, any>> {
    return await Assets.load(assets);
  }
}

export default AssetsLoader;