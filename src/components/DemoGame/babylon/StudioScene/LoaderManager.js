import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import { Categories } from "../../Config.json";

export default class LoaderManager {
  constructor(sceneManager) {

    this.game = sceneManager.game;
    this.scene = sceneManager.scene;
    this.sceneManager = sceneManager;
    // this.skeleton

  }
  headAnchorBone(itemMesh, skeleton, baseRoot, coord) {
    let anchorBone = skeleton.find((bone) => bone.name === "head-anchor")
    itemMesh.attachToBone(anchorBone, baseRoot);
    itemMesh.position = new BABYLON.Vector3(coord.x, coord.y, coord.z)
  }

  loadItemById(type, name, onLoad = null, skeleton, base) {
    //Load Sock Model
    // this.skeleton = skeleton
    // this.baseRoot = base
    console.log("type", type, "-__-", name);
    let loadingOpts = {
      path: `./models/${type}/`,
      name: `${name}.glb`,
    };
    let anchorBone
    let baseRoot = base.find((mesh) => mesh.name === "__root__");
    let baseShoes = base[5];
    let assetsManager = new BABYLON.AssetsManager(this.scene);
    let itemTask = assetsManager.addMeshTask(
      "itemTask",
      "",
      loadingOpts.path,
      loadingOpts.name
    );
    itemTask.onSuccess = (task) => {
      // let itemSceleton = task.loadedSceletons[0]
      let itemMesh = task.loadedMeshes.find((mesh) => mesh.name === "__root__");
      this.sceneManager.charcterProps[type] = itemMesh;
      this.sceneManager.charcterProps[type].myId = name;
      if (name !== "base_mix-anim2") {
        this.sceneManager.charcterProps[type].price =
          Categories[type][name].price;

        this.sceneManager.charcterProps[type].itemName =
          Categories[type][name].name;
      }

      for (let j = 0; j < task.loadedMeshes.length; j++) {
        let mesh = task.loadedMeshes[j];
        if (mesh.getTotalVertices() > 0) {
          //if it's mesh
          this.sceneManager.mirror.renderList.push(mesh);
          // this.sceneManager.shadowGenerator
          //   .getShadowMap()
          //   .renderList.push(mesh);
          // this.sceneManager.shadowGenerator.addShadowCaster(mesh, true);
        }
      }
      switch (type) {
        case 'accessories':
          this.headAnchorBone(itemMesh, skeleton, baseRoot, { x: 0, y: -0.95, z: 0 })
          break
        case 'beard':
          this.headAnchorBone(itemMesh, skeleton, baseRoot, { x: 0, y: -0.95, z: 0 })
          break
        case 'clothes_bottom':
          anchorBone = skeleton.find((bone) => bone.name === "spine")
          itemMesh.attachToBone(anchorBone, baseRoot);
          itemMesh.position = new BABYLON.Vector3(0, 0.2, -0.07)
          itemMesh.scaling = new BABYLON.Vector3(1.09, 1.09, 1.09)
          itemMesh.rotation = new BABYLON.Vector3(-0.1, 0, 0)
          break
        case 'clothes_full':
          anchorBone = skeleton.find((bone) => bone.name === "spine")
          itemMesh.attachToBone(anchorBone, baseRoot);
          itemMesh.position = new BABYLON.Vector3(0, 0.2, -0.07)
          itemMesh.scaling = new BABYLON.Vector3(1.03, 1.03, 1.03)
          itemMesh.rotation = new BABYLON.Vector3(-0.1, 0, 0)
          break
        case 'clothes_top':
          anchorBone = skeleton.find((bone) => bone.name === "spine")
          itemMesh.attachToBone(anchorBone, baseRoot);
          itemMesh.position = new BABYLON.Vector3(0, 0.2, -0.07)
          itemMesh.scaling = new BABYLON.Vector3(1.09, 1.09, 1.09)
          itemMesh.rotation = new BABYLON.Vector3(-0.1, 0, 0)
          break
        case 'eye':
          this.headAnchorBone(itemMesh, skeleton, baseRoot, { x: 0, y: -0.95, z: 0 })
          break
        case 'hair':
          this.headAnchorBone(itemMesh, skeleton, baseRoot, { x: 0, y: -0.9, z: -0.05 })
          break
        case 'hairclip':
          this.headAnchorBone(itemMesh, skeleton, baseRoot, { x: 0, y: -0.9, z: -0.05 })
          break
        case 'hand':

          let oldMeshHand = this.scene.meshes.find((mesh) => mesh.name === "right-hand")
          if (oldMeshHand)
            oldMeshHand.dispose()
          let anchorBoneR = skeleton.find((bone) => bone.name === "hand.L")
          let anchorBoneL = skeleton.find((bone) => bone.name === "hand.R")

          if (itemMesh.itemName === 'Gloves') {
            let itemMeshHand = itemMesh.clone('right-hand')
            itemMeshHand.scaling.x = -1
            itemMeshHand.attachToBone(anchorBoneR, baseRoot);
            itemMesh.attachToBone(anchorBoneL, baseRoot);
            itemMesh.position.y = itemMeshHand.position.y = 0.15
          } else
            itemMesh.attachToBone(anchorBoneR, baseRoot);



          break
        case 'leg':
          let oldMesh = this.scene.meshes.find((mesh) => mesh.name === "right-shoes")
          if (oldMesh)
            oldMesh.dispose()
          let itemMeshR = itemMesh.clone('right-shoes')
          itemMeshR.scaling.x = -1
          baseShoes.isVisible = false
          let anchorBoneLShoes = skeleton.find((bone) => bone.name === "foot.L")
          let anchorBoneRShoes = skeleton.find((bone) => bone.name === "foot.R")

          itemMesh.attachToBone(anchorBoneLShoes, baseRoot);
          itemMeshR.attachToBone(anchorBoneRShoes, baseRoot);

          break
        case 'mask':
          this.headAnchorBone(itemMesh, skeleton, baseRoot, { x: 0, y: -0.9, z: 0.01 })
          break
        case 'mouth':
          this.headAnchorBone(itemMesh, skeleton, baseRoot, { x: 0, y: -0.9, z: 0.02 })
          break
        case 'spectacies':
          this.headAnchorBone(itemMesh, skeleton, baseRoot, { x: 0, y: -0.9, z: 0.01 })
          break
        case 'wrinkles':
          this.headAnchorBone(itemMesh, skeleton, baseRoot, { x: 0, y: -0.9, z: 0.01 })
          break
        default:
          break
      }
      if (type === 'accessories') {

      }
      if (type === "pet") {
        const { opt } = Categories[type][name];

        itemMesh.position = new BABYLON.Vector3(opt.x, opt.y, 0);
        itemMesh.scaling = new BABYLON.Vector3(opt.scale, opt.scale, opt.scale);
      } else {
        // itemMesh.scaling = new BABYLON.Vector3(5, 5, 5);
      }
      if (name === "baloon") itemMesh.position.x = -7;

      onLoad({
        data: this.sceneManager.getCharcterSummary(),
        totalPrice: this.sceneManager.getTotatlPrice(),
      });
    };

    assetsManager.onProgress = (
      remainingCount,
      totalCount,
      lastFinishedTask
    ) => {
      this.game.engine.loadingUIText =
        "loading Assets " +
        remainingCount +
        " out of " +
        totalCount +
        " items still need to be loaded.";
    };

    assetsManager.onFinish = (tasks) => {
      // console.log("disable Loading bar");
    };
    // Start loading
    assetsManager.useDefaultLoadingScreen = false;
    assetsManager.load();
  }
}
