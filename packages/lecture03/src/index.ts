// Subject 
// I. AxesHelper, GridHelper
// II. FPS View (Stats)
// III. GUI Control

import './main.scss';
import * as THREE from 'three';
import { MeshStandardMaterial } from 'three';
import * as Stats from 'stats.js';
import { GUI } from 'dat.gui';

// 1. Create Renderer Dynamically
const canvas = document.querySelector('#three-canvas') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias: true, // Anti-Aliasing option
    alpha: false // opacity option
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Apply Pixel Ratio
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

// 2. Create Scene
const scene = new THREE.Scene();

//3. Create Camera
// Perspective Camera, Orthographic Camera

const aspect = window.innerWidth / window.innerHeight;

// Perspective Camera (원근 카메라)
// 원근감이 있기 때문에 절두체 모양
// - fov: 시야각
// - aspect: 종횡비 (가로,세로 비율 = width / height)
// - near: 절두체 앞면 거리 (거리 넘어가면 안보임)
// - far: 절두체 뒷면 거리 (거리 넘어가면 안보임)
const camera = new THREE.PerspectiveCamera(
    75,
    aspect,
    0.1,
    1000
);

// 4. Set Camera Position
//camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 5;

scene.add(camera);

// 5. Create Mesh (Geometry + Material)
const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new MeshStandardMaterial({
    color: 'seagreen'
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 12. Stats
const stats = new Stats();
document.body.append(stats.dom);

// 13. Dat GUI
const gui = new GUI();
gui.add(mesh.position, 'y', -5, 5, 0.01).name('Mesh Z Position');
gui.add(camera.position, 'x', -10, 10, 0.01).name('Camera X Position');

camera.lookAt(mesh.position);

// gui
//     .add(mesh.position, 'z')
//     .min(-10)
//     .max(3)
//     .step(0.01)
//     .name('Mesh Z Position');

// 8. Light

// AmbientLight - 은은하게 전체적으로 조명 비춤
const ambientLight = new THREE.AmbientLight('white', 0.5)
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('white', 1);
directionalLight.position.y = 1;
directionalLight.position.z = 2;
scene.add(directionalLight);

// 10. AxesHelper
// const axesHelper = new THREE.AxesHelper(3);
// scene.add(axesHelper);

// 11. GridHelpder 
// const gridHelper = new THREE.GridHelper(5);
// scene.add(gridHelper);

// camera.lookAt(mesh.position);
// camera.zoom = 1;
// camera.updateProjectionMatrix();

// 6. Draw
renderer.render(scene, camera);

// 9. Animation
const clock = new THREE.Clock();
const draw = () => {
    // Animation Optimization with Clock Elapsed Time (경과 시간)
    const time = clock.getElapsedTime();

    // Show Stats
    stats.update();

    mesh.rotation.y = time;

    camera.lookAt(mesh.position);

    renderer.render(scene, camera)
    renderer.setAnimationLoop(draw);
};

draw();

// 7. Window Resize Event
const setSize = () => {
    const { 
        innerWidth: width, 
        innerHeight: height 
    } = window;
    
    // Camera reset
    camera.aspect = width / height
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.render(scene, camera);
};

window.addEventListener('resize', setSize);