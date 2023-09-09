import "./style.css";
import * as THREE from "three";

let renderer, camera, scene;
let cubes;

function makeInstance(geometry, color, x) {
  const material = new THREE.MeshPhongMaterial({ color });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  mesh.position.x = x;

  return mesh;
}

function main() {
  const canvas = document.getElementById("three-canvas");
  renderer = new THREE.WebGLRenderer({ canvas: canvas });
  
  scene = new THREE.Scene();
  scene.background = new THREE.Color("#ffb45a");

  const fov = 75;
  const aspect = 2;
  const near = 0.1;
  const far = 5;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;
  scene.add(camera);

  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);

  const radius = 1;
  const geometry = new THREE.SphereGeometry(radius);

  makeInstance(geometry, 0x5affb4, 0),

  render();
}

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function render(time) {
  time *= 0.001;

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

main();
