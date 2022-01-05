declare namespace BaterflyModuleScssNamespace {
  export interface IBaterflyModuleScss {
    baterfly: string;
    demoWrapper: string;
    hand: string;
    handMove: string;
    wrapper: string;
  }
}

declare const BaterflyModuleScssModule: BaterflyModuleScssNamespace.IBaterflyModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: BaterflyModuleScssNamespace.IBaterflyModuleScss;
};

export = BaterflyModuleScssModule;
