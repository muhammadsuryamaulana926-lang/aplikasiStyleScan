declare module 'three/examples/jsm/loaders/OBJLoader' {
  import { Loader, LoadingManager, Group } from 'three';
  import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
  export class OBJLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(url: string, onLoad: (group: Group) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;
    parse(data: string): Group;
    setMaterials(materials: MTLLoader.MaterialCreator): this;
  }
}

declare module 'three/examples/jsm/loaders/MTLLoader' {
  import { Loader, LoadingManager, Material, Texture } from 'three';
  export class MTLLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(url: string, onLoad: (materialCreator: MTLLoader.MaterialCreator) => void, onProgress?: (event: ProgressEvent) => void, onError?: (event: ErrorEvent) => void): void;
    parse(text: string, path: string): MTLLoader.MaterialCreator;
    setMaterialOptions(value: MTLLoader.MaterialOptions): this;
  }
  export namespace MTLLoader {
    export interface MaterialOptions {
      side?: number;
      wrap?: number;
      normalizeRGB?: boolean;
      ignoreZeroRGBs?: boolean;
      invertTrProperty?: boolean;
    }
    export class MaterialCreator {
      constructor(baseUrl?: string, options?: MaterialOptions);
      materials: { [key: string]: Material };
      preload(): void;
      getAsArray(): Material[];
      create(name: string): Material;
    }
  }
}
