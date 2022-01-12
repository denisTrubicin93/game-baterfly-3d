import * as BABYLON from '@babylonjs/core';
import "@babylonjs/loaders"
import "@babylonjs/gui"
import { Flowers } from './Flowers'
import { gsap } from 'gsap'
import { startPosition, randomVector } from '../../../../utils/funcs'
import flowersModel from '../../assets/models/flowersBranch-v2.glb'
import groundFlowerModel from '../../assets/models/groundFlower-v2.glb'
import buterflyModel from '../../assets/models/buterfly3.glb'
import roundModel from '../../assets/models/round.glb'
import redTex from '../../assets/red_tex.png'
import violetTex from '../../assets/violet_tex.png'
import orangeTex from '../../assets/orange_tex.png'
import lightblueTex from '../../assets/lightblue_tex.png'
import whiteTex from '../../assets/white_tex.png'
// import LoaderManager from "./LoaderManager";
import { MeshBuilder } from '@babylonjs/core';
import { randomVector } from 'utils/funcs';

export default class StudioSceneManager {
  constructor(game) {

    this.game = game;
    //Main Props
    this.scene = null;
    this.studioGui = null;
    this.mainCamera = null;
    this.flowers = Flowers

    this.catchButerfly = null
    this.disableButerfly = false
    this.currentButerfly = 0
    this.buterflyActive = null
    this.buterflyList = []
    this.points = 0
    this.sound = null
    this.round = 1
    this.buterflyTextures = [
      { color: 'red', tex: redTex },
      { color: 'violet', tex: violetTex },
      { color: 'lightblue', tex: lightblueTex },
      { color: 'orange', tex: orangeTex },
      { color: 'white', tex: whiteTex },
    ]
    this.flowersList = ['violet', 'red', 'white', 'lightblue', 'orange']

    this.typeScene = null
    this.maxAnchorFlower = 0


    this.hla = null;
    this.hra = null;

  }

  //#region  MainSceneProperties
  CreateScene() {
    // let this_ = this
    //Create Bts Scene
    //Create Scene
    this.scene = new BABYLON.Scene(this.game.engine);
    // this.scene.useRightHandedSystem = true
    this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    this.scene.imageProcessingConfiguration.colorCurvesEnabled = true;
    this.scene.imageProcessingConfiguration.colorCurves = new BABYLON.ColorCurves();
    this.scene.imageProcessingConfiguration.colorCurves.globalSaturation = 0;
    this.scene.imageProcessingConfiguration.contrast = 2.5;
    this.scene.imageProcessingConfiguration.vignetteEnabled = true;

    this.createCamera();
    this.setUpEnvironMent();


    return this.scene;
  }
  createCamera() {
    this.camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), this.scene);
    this.camera.setPosition(new BABYLON.Vector3(0, 0, 1600));
    this.camera.upperBetaLimit = (Math.PI / 2) * 0.99;

    // const canvas = scene.getEngine().getRenderingCanvas();
    this.camera.attachControl(this.game.canvas, true)
    this.camera.fov = 0.1;
  }
  async setUpEnvironMent() {
    let this_ = this
    let hemiLight = new BABYLON.HemisphericLight(
      "HemiLight",
      new BABYLON.Vector3(0, 100, -0),
      this.scene
    );
    hemiLight.intensity = 6.5;

    // var blueMat = new BABYLON.StandardMaterial("ground", this.scene);
    // blueMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    // blueMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    // blueMat.emissiveColor = BABYLON.Color3.Blue()
    var groundMaterial = new BABYLON.StandardMaterial("ground", this.scene);
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    groundMaterial.alpha = 0
    this.ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 100, height: 200 }, this.scene);
    this.ground.rotation.x = Math.PI / 2
    // this.ground.position.z = -20
    this.ground.material = groundMaterial;
    // let sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 5 }, this.scene)
    // sphere.position = new BABYLON.Vector3(-15, -67, 20)
    this.roundMesh = await BABYLON.SceneLoader.ImportMeshAsync(
      "",
      roundModel,
      "",
      this.scene,
      undefined
    );

    this.changeRoundNum(1)
    this.roundAnim = this.scene.getAnimationGroupByName('round')
    this.roundAnim.stop()

    // flowers.meshes[0].scaling = new BABYLON.Vector3(8, 8, 8)
    // flowers.meshes[0].position = new BABYLON.Vector3(0, -65, -1)
    // this.scene.getTransformNodeByName('leftBranch').position.x = -120
    // this.scene.getTransformNodeByName('rightBranch').position.x = 120
    // console.log(flowers)
  }

  changeRoundNum(num) {
    for (let i = 0; i < 3; i++) {
      let roundNum = this.roundMesh.meshes.find((el) => el.name === `${i + 1}`)
      // console.log(roundNum)
      if (num === i + 1) roundNum.isVisible = true
      else roundNum.isVisible = false
    }
  }

  moveButerfly() {
    if (this.catchButerfly) return
    let randomPos = randomVector(30)
    if (this.buterflyActive) {
      gsap.to(this.buterflyActive.meshes[0].position, 4, {
        x: randomPos.x, y: randomPos.y, onComplete: () => {
          if (!this.catchButerfly)
            this.moveButerfly()
        }
      })
    }
  }

  changePositionFlower() {
    let rnd1 = Math.round(Math.random() * (this.flowersList.length - 1))
    let rnd2 = Math.round(Math.random() * (this.flowersList.length - 1))
    while (rnd1 === rnd2) {
      rnd2 = Math.round(Math.random() * (this.flowersList.length - 1))
    }
    console.log(rnd1, rnd2)
    // let flower1 = this.scene.getTransformNodeByName(`Flower_${this.flowersList[rnd1]}`)
    // let flower2 = this.scene.getTransformNodeByName(`Flower_${this.flowersList[rnd2]}`)
    let root1 = this.scene.getTransformNodeByName(`root_${this.flowersList[rnd1]}`)
    let root2 = this.scene.getTransformNodeByName(`root_${this.flowersList[rnd2]}`)
    let flower1 = root1.getChildTransformNodes()[0]
    let flower2 = root2.getChildTransformNodes()[0]
    console.log(root1, root2)
    let pos1 = root1.getAbsolutePosition()
    let pos2 = root2.getAbsolutePosition()
    gsap.to(flower1.scaling, 0.5, { x: 0, y: 0, z: 0 })
    gsap.to(flower2.scaling, 0.5, {
      x: 0, y: 0, z: 0, onComplete: () => {
        flower1.setAbsolutePosition(pos2.x, pos2.y, pos2.z)
        flower2.setAbsolutePosition(pos1.x, pos1.y, pos1.z)
        flower1.setParent(root2)
        flower2.setParent(root1)
        // flower1.rotationQuaternion = this.scene.getMeshByName(`flower_${this.flowersList[rnd2]}`).rotationQuaternion
        // flower2.rotationQuaternion = root1.rotationQuaternion
        gsap.to(flower1.scaling, 0.5, { x: 1, y: 1, z: 1 })
        gsap.to(flower2.scaling, 0.5, {
          x: 1, y: 1, z: 1, onComplete: () => {
            setTimeout(() => {
              this.changePositionFlower()
            }, 2000);
          }
        })
      }
    })
  }

  async loadButerflyModel() {
    let buterfly = await BABYLON.SceneLoader.ImportMeshAsync(
      "",
      buterflyModel,
      '',
      this.scene,
      undefined,
    );

    buterfly.meshes[0].name = `buterfly${this.currentButerfly}`
    // buterfly.meshes[0].scaling = new BABYLON.Vector3(-8, -8, -8)
    // buterfly.meshes[0].position.z = 20
    buterfly.meshes[0].rotation.x = Math.PI / 4
    buterfly.meshes[0].rotation.y = Math.PI / 1.3
    buterfly.meshes[0].rotationQuaternion = undefined
    buterfly.meshes[1].isVisible = false
    if (this.round >= 2 && this.buterflyTextures.length > 0) {
      let random = Math.round(Math.random() * (this.buterflyTextures.length - 1))
      let randomTexture = this.buterflyTextures[random].tex
      buterfly.meshes[1].material.albedoTexture.updateURL(randomTexture)
      buterfly.color = this.buterflyTextures[random].color
      // let newButerfly = this.buterfly.clone('buterfly1')
    }

    this.buterflyList.push(buterfly)
    this.buterflyActive = this.buterflyList[this.currentButerfly]
    console.log(this.buterflyActive)
    this.initPosButerfly = this.typeScene === 'adult' ? startPosition(60) : startPosition(-60)
    this.buterflyActive.meshes[0].position = new BABYLON.Vector3(this.initPosButerfly.x, this.initPosButerfly.y, 20)
    // this.buterflyActive.meshes[0].position = new BABYLON.Vector3(0, 0, 20)
    // let parentNode = this.scene.getTransformNodeByName(`orange`)
    // let parentNode2 = this.scene.getMeshByName(`flower_orange`)
    // this.buterflyActive.meshes[0].rotation = new BABYLON.Vector3(0, Math.PI, 0)
    // this.buterflyActive.meshes[0].position = new BABYLON.Vector3(0, 0, 0)
    // this.buterflyActive.meshes[0].parent = parentNode
    setTimeout(() => {
      this.moveButerfly()
    }, 1000);
  }

  getGroundPosition(handCoord) {
    let pickinfo = this.scene.pick(handCoord.xMin, handCoord.yMin, (mesh) => true);
    // console.log(scene.pointerX)
    if (pickinfo.hit) {
      return pickinfo.pickedPoint;
    }
    return null;
  }

  detectButerfly(posButerfly, hand) {
    if (this.startingPoint.x < posButerfly.x + 10 &&
      this.startingPoint.x > posButerfly.x - 10 &&
      this.startingPoint.y < posButerfly.y + 10 &&
      this.startingPoint.y > posButerfly.y - 10) {
      this.sound = 'catch'
      this.catchButerfly = hand
    }
  }

  detectFlowers(posButerfly, flower) {
    let centerFlower = this.typeScene === 'adult' ?
      this.scene.getTransformNodeByName(`${flower.color}-center-g`).getAbsolutePosition() :
      this.scene.getTransformNodeByName(`${flower.color}-center`).getAbsolutePosition();
    let xMin = (centerFlower.x - 7);
    let xMax = (centerFlower.x + 7);
    let yMax = (centerFlower.y + 7);
    let yMin = (centerFlower.y - 7);
    if (posButerfly.x < xMax &&
      posButerfly.x > xMin &&
      posButerfly.y < yMax &&
      posButerfly.y > yMin &&
      this.buterflyActive.meshes[0].name !== 'disable') {
      // let flowerB = this.scene.getTransformNodeByName('Flower_red')
      // gsap.to(flowerB.scaling, 5, { x: 0, y: 0, z: 0 })
      this.buterflyActive.meshes[0].name = 'disable'
      let parentNode = this.scene.getMeshByName(`anchor-${flower.color}-${flower.currentAnchor}`)
      this.buterflyActive.meshes[0].rotation = new BABYLON.Vector3(0, Math.PI, 0)
      this.buterflyActive.meshes[0].position = new BABYLON.Vector3(0, 0, 0)
      this.buterflyActive.meshes[0].parent = parentNode

      this.catchButerfly = null
      if (flower.currentAnchor < this.maxAnchorFlower)
        flower.currentAnchor++
      else {
        flower.isActive = true
        if (this.round >= 2) {
          // this.buterflyTextures.
          let index = this.buterflyTextures.findIndex((el) => el.color === flower.color)
          console.log('index', index)
          this.buterflyTextures.splice(index, 1)
          console.log(this.buterflyTextures)
        }
      }

      this.currentButerfly++
      this.points++
      this.sound = 'success'
      this.loadButerflyModel()
    }
  }

  endRound() {
    let this_ = this
    for (let i = 0; i < this.flowers.length; i++) {
      this.flowers[i].isActive = false
    }
    gsap.to(this.scene.getTransformNodeByName('left').position, 2, { x: -120 })
    gsap.to(this.scene.getTransformNodeByName('right').position, 2, {
      x: 120, onComplete: () => {
        this_.buterflyList.forEach((el) => {
          el.meshes[0].dispose()
          el.meshes[0] = null
        })
        this_.buterflyActive = null
        this_.buterflyList = []
        this_.catchButerfly = null
        this_.currentButerfly = 0
        for (let i = 0; i < this_.flowers.length; i++) {
          this_.flowers[i].currentAnchor = 1
        }
      }
    })
  }

  startGame(type, round) {
    this.changeRoundNum(round)
    this.round = round
    let model
    this.typeScene = type
    if (type === 'adult') model = groundFlowerModel
    else model = flowersModel

    this.maxAnchorFlower = type === 'adult' ? 3 : 2
    const flowers = BABYLON.SceneLoader.ImportMesh(
      "",
      model,
      "",
      this.scene,
      () => {
        gsap.to(this.scene.getTransformNodeByName('left').position, 2, { x: -50 })
        gsap.to(this.scene.getTransformNodeByName('right').position, 2, {
          x: 50, onComplete: () => {
            this.loadButerflyModel()
            if (this.round === 3) {
              setTimeout(() => {
                this.changePositionFlower()
              }, 2000);
            }
          }
        })
      }
    );
    this.roundAnim.start(false, 1.0, this.roundAnim.from, this.roundAnim.to, false);
  }

  endGame() {
    // this.scene.dispose()
    // this.game.engine.dispose()
  }

  pointerDown(model, handCoord, hand) {
    let this_ = this
    let canvasCoord = this.getGroundPosition(handCoord)
    if (!canvasCoord) return
    this.startingPoint = {
      x: canvasCoord.x,
      y: canvasCoord.y
    };
    // if (hand === 'left')


    this.buterflyActive.meshes[1].isVisible = true

    let posButerfly = this.buterflyActive.meshes[0].position

    if (posButerfly && this.buterflyActive.meshes[0].name !== 'disable') {
      // console.log(this.scene)
      // // this.buterflyActive.meshes[0].scaling = new BABYLON.Vector3(-1, -1, -1)

      // // this.buterflyActive.meshes[0].rotation.y = Math.PI
      // this.buterflyActive.meshes[0].position = parentNode.getAbsolutePosition()
      // console.log(parentMesh)
      // this.buterflyActive.transformNodes[12].position.x = -10

      if (this.catchButerfly === hand) {
        gsap.to(model.meshes[0].position, 0.5, { x: this.startingPoint.x, y: this.startingPoint.y })
        // model.meshes[0].position.x = this.startingPoint.x
        // model.meshes[0].position.y = this.startingPoint.y

        for (let i = 0; i < this.flowers.length; i++) {
          if (this.round === 1 && !this.flowers[i].isActive)
            this.detectFlowers(posButerfly, this.flowers[i])
          if (this.round >= 2 && !this.flowers[i].isActive && this.buterflyActive.color === this.flowers[i].color) {
            this.detectFlowers(posButerfly, this.flowers[i])
          }
        }
      } else {
        this.detectButerfly(posButerfly, hand)
      }
    }
    // console.log('Detect', this.startingPoint.y)
    // if (startingPoint.x >= blueBox.position.x - 20 && startingPoint.x <= blueBox.position.x + 20)
    //     console.log(startingPoint, blueBox)
    if (this.startingPoint) { // we need to disconnect camera from canvas
      setTimeout(() => {
        this_.camera.detachControl(this_.game.canvas);
      }, 0);
    }
  }

  handlePoints(onCheckpoints) {
    onCheckpoints(this.points)
  }
  handleSound(onCheckSound) {
    onCheckSound(this.sound)
    this.sound = null
  }

  handlerCoord(hla, hra) {

    this.hla = hla;
    this.hra = hra;
    if (this.buterflyActive) {
      this.pointerDown(this.buterflyActive, this.hla, 'left')
      this.pointerDown(this.buterflyActive, this.hra, 'right')
    }
  }
}
