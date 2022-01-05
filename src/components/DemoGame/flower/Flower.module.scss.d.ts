declare namespace FlowerModuleScssNamespace {
  export interface IFlowerModuleScss {
    wrapper: string;
  }
}

declare const FlowerModuleScssModule: FlowerModuleScssNamespace.IFlowerModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: FlowerModuleScssNamespace.IFlowerModuleScss;
};

export = FlowerModuleScssModule;
