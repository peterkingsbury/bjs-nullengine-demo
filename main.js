'use strict';

global.Ammo = require('ammojs');
global.OIMO = require('oimo');
global.CANNON = require('cannon');

const BABYLON = require('babylonjs');
const LOADERS = require('babylonjs-loaders');
const {
  NullEngine,
  Scene,
  PointLight,
  Vector3,
  ArcRotateCamera,
  OimoJSPlugin,
  AmmoJSPlugin,
  CannonJSPlugin,
  SceneLoader: {
    ImportMeshAsync
  }
} = BABYLON;

global.XMLHttpRequest = require('xhr2').XMLHttpRequest;

(async () => {
  const engine = new NullEngine();
  const scene = new Scene(engine);
  const light = new PointLight("Omni", new Vector3(20, 20, 100), scene);
  const camera = new ArcRotateCamera("Camera", 0, 0.8, 100, BABYLON.Vector3.Zero(), scene);
  let result = null;
  let meshes = null;
  let physicsEngine = null;

  //try { physicsEngine = new OimoJSPlugin() } catch (e) { console.log(e) }
  try { physicsEngine = new AmmoJSPlugin() } catch (e) { console.log(e) }
  //try { physicsEngine = new CannonJSPlugin() } catch (e) { console.log(e) }

  if (physicsEngine) {
    scene.enablePhysics(undefined, physicsEngine);
  }

  try {
    result = await ImportMeshAsync("", "https://playground.babylonjs.com/scenes/", "skull.babylon", scene);
    meshes = result.meshes;
    camera.target = meshes[0];
    console.log("Meshes loaded from babylon file: " + meshes.length);
    for (const mesh of meshes) {
      console.log(mesh.toString());
    }
  } catch (e) {
    console.log(e);
  }

  try {
    result = await ImportMeshAsync("", "https://www.babylonjs.com/Assets/DamagedHelmet/glTF/", "DamagedHelmet.gltf", scene);
    meshes = result.meshes;
    console.log("Meshes loaded from gltf file: " + meshes.length);
    for (const mesh of meshes) {
      console.log(mesh.toString());
    }
  } catch (e) {
    console.log(e);
  }

  console.log("render started");
  engine.runRenderLoop(scene.render.bind(scene));
})();

