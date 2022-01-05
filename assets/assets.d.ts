/* eslint @typescript-eslint/no-explicit-any: off */

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module "*.module.css";

// Images
declare module '*.env';

// 3D types
declare module '*.glb';
declare module '*.gltf';
declare module '*.stl';

declare module '*.mp4' {
  const value: any;
  export default value;
}

declare module '*.mp3' {
  const value: any;
  export default value;
}
