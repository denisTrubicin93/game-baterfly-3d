import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { RootState } from 'features';
import * as BABYLON from '@babylonjs/core';

// import { FreeCamera, Vector3, HemisphericLight, MeshBuilder, Color4, StandardMaterial, Texture, SceneLoader } from "@babylonjs/core";
import "@babylonjs/loaders"
import "@babylonjs/gui"
import SceneComponent from "./SceneComponent"; // uses above component in same directory
// import grassTex from './assets/grass2.jpg'
import flowersModel from './assets/models/garden-bed.glb'
import baterflyModel from './assets/models/buterfly.glb'
// import flowerYellowTexture from './assets/models/flower-blue/Base_Material_baseColor.png'
// import { PBRMaterial } from "babylonjs/Materials/PBR/pbrMaterial";

// console.log(flowerYellow)
// import SceneComponent from 'babylonjs-hook'; // if you install 'babylonjs-hook' NPM.
// let box;


const GameManager = (scene) => {
    const { coords } = useSelector(
        (state: RootState) => state.arcade
    );
    // const [rotations, setRotations] = useState({ leftRot: 0, rightRot: 0 });
    const onSceneReady = async (scene) => {
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 0)
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
        camera.setPosition(new BABYLON.Vector3(0, 0, 900));
        camera.upperBetaLimit = (Math.PI / 2) * 0.99;

        const canvas = scene.getEngine().getRenderingCanvas();
        camera.attachControl(canvas, true)
        camera.fov = 0.1;
        // new BABYLON.PointLight("omni", new BABYLON.Vector3(50, 100, 100), scene);
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 100, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 3;
        var blueMat = new BABYLON.StandardMaterial("ground", scene);
        blueMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
        blueMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
        blueMat.emissiveColor = BABYLON.Color3.Blue();
        // box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
        // box.position.y = 1;
        var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
        groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        groundMaterial.alpha = 0
        var ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 980, height: 710 }, scene);
        ground.rotation.x = Math.PI / 2
        ground.position.z = -20
        ground.material = groundMaterial;

        // let startingPoint;
        // const factorWidth = 1.6875;
        // const [leftHand, rightHand] = coordsScene.result;
        // const [[xl1, yl1], [xl2, yl2]] = leftHand;
        // const [[xr1, yr1], [xr2, yr2]] = rightHand;

        // const hla = {
        //     xMin: xl1 * factorWidth,
        //     xMax: xl2 * factorWidth,
        //     yMin: yl1 * factorWidth,
        //     yMax: yl2 * factorWidth,
        // };
        // const hra = {
        //     xMin: xr1 * factorWidth,
        //     xMax: xr2 * factorWidth,
        //     yMin: yr1 * factorWidth,
        //     yMax: yr2 * factorWidth,
        // };
        // console.log(hla, hra)
        // let getGroundPosition = function () {
        //     var pickinfo = scene.pick(hra.xMin, hra.yMin, function (mesh) { return mesh == ground; });
        //     // console.log(scene.pointerX)
        //     if (pickinfo.hit) {
        //         return pickinfo.pickedPoint;
        //     }

        //     return null;
        // }

        // var pointerDown = function (model) {
        //     console.log('coordsScene', coordsScene)
        //     // currentMesh = mesh;
        //     startingPoint = getGroundPosition();

        //     model.position.x = startingPoint.x - 25
        //     // if (startingPoint.x >= blueBox.position.x - 20 && startingPoint.x <= blueBox.position.x + 20)
        //     //     console.log(startingPoint, blueBox)
        //     if (startingPoint) { // we need to disconnect camera from canvas
        //         setTimeout(function () {
        //             camera.detachControl(canvas);
        //         }, 0);
        //     }
        // }



        const flowers = await BABYLON.SceneLoader.ImportMeshAsync(
            "",
            flowersModel,
            "",
            scene,
            undefined,
        );
        const baterfly = await BABYLON.SceneLoader.ImportMeshAsync(
            "",
            baterflyModel,
            '',
            scene,
            undefined,
        );
        baterfly.meshes[0].scaling = new BABYLON.Vector3(8, 8, 8)
        flowers.meshes[0].scaling = new BABYLON.Vector3(8, 8, 8)
        flowers.meshes[0].position = new BABYLON.Vector3(0, -40, -1)
        // importResult.meshes[0].rotation = new BABYLON.Vector3(0, -180, 0)
        console.log(flowers.meshes[0], baterfly)

        // pointerDown(baterfly)
    };


    const onRender = (scene) => {
        console.log(scene)
        // if (box !== undefined) {
        //     var deltaTimeInMillis = scene.getEngine().getDeltaTime();
        //     const rpm = 10;
        //     box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
        // }
    };

    useEffect(() => {
        if (coords)
            console.log(scene)
    }, [coords])
    return (
        <div >
            <SceneComponent
                antialias
                onSceneReady={onSceneReady}
                coords={coords}
                onRender={onRender}
                id="my-canvas" />
        </div>
    )
}

export default GameManager