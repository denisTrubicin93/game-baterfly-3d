import { Engine, Scene } from "@babylonjs/core";
import React, { useEffect, useRef } from "react";

export default (props) => {
    const reactCanvas = useRef(null);
    const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest } = props;

    useEffect(() => {
        if (reactCanvas.current) {
            const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
            const scene = new Scene(engine, sceneOptions);
            // scene.clearColor = Color3.Blue();
            if (scene.isReady()) {
                props.onSceneReady(scene, props.coords);
            } else {
                scene.onReadyObservable.addOnce((scene) => props.onSceneReady(scene, props.coords));
            }

            engine.runRenderLoop(() => {
                if (typeof onRender === "function") {
                    onRender(scene);
                }
                scene.render();
            });

            const resize = () => {
                scene.getEngine().resize();
            };

            if (window) {
                window.addEventListener("resize", resize);
            }

            return () => {
                scene.getEngine().dispose();

                if (window) {
                    window.removeEventListener("resize", resize);
                }
            };
        }
    }, [reactCanvas]);

    return <canvas ref={reactCanvas} {...rest} style={{ position: 'absolute', bottom: '0', width: '100%', height: '810px' }} />;
};