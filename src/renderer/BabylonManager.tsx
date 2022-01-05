import * as BABYLON from '@babylonjs/core';
import GameManger from 'components/DemoGame/babylon/GameManager';

export default function BabylonManager(canvasRef) {
  if (!canvasRef) {
    throw new Error("Canvas is not provided!");
  }
  const engine = new BABYLON.Engine(
    canvasRef,
    true,
    // this.props.engineOptions,
    // this.props.adaptToDeviceRatio
  );

  const GManger = new GameManger(canvasRef, engine);

  return {
    GManger,
  };
}