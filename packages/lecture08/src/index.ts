// Subject: Light

import './main.scss';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { GUI } from 'dat.gui';

// 1. Create Renderer Dynamically
const canvas = document.querySelector('#three-canvas') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias: true, // Anti-Aliasing option
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Apply Pixel Ratio
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
// renderer.shadowMap.type = THREE.BasicShadowMap;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// 2. Create Scene
const scene = new THREE.Scene();

//3. Create Camera
// Perspective Camera, Orthographic Camera

// Perspective Camera (원근 카메라)
// 원근감이 있기 때문에 절두체 모양
// - fov: 시야각
// - aspect: 종횡비 (가로,세로 비율 = width / height)
// - near: 절두체 앞면 거리 (거리 넘어가면 안보임)
// - far: 절두체 뒷면 거리 (거리 넘어가면 안보임)
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// 4. Set Camera Position
camera.position.y = 1.5;
camera.position.z = 4;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

//5. Mesh
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.7, 16, 16);
const planeGeometry = new THREE.PlaneGeometry(10, 10);

const boxMaterial = new THREE.MeshStandardMaterial({
    color: 'white'
});

const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 'white'
});

const planeMaterial = new THREE.MeshStandardMaterial({
    color: 'white'
});

const box = new THREE.Mesh(boxGeometry, boxMaterial);
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

box.castShadow = true;
box.receiveShadow = true;
sphere.castShadow = true;
sphere.receiveShadow = true;
plane.receiveShadow = true;

box.position.set(1, 1, 0);
sphere.position.set(-1, 1, 0);
plane.rotation.x = -Math.PI * 0.5;

scene.add(box, sphere, plane);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

// 8. Light
// AmbientLight - 은은하게 전체적으로 조명 비춤
const ambientLight = new THREE.AmbientLight('white', 0.3);
scene.add(ambientLight);

// DirectionalLight
// const light = new THREE.DirectionalLight('pink', 0.5);

// PointLight
// const light = new THREE.PointLight('white', 1, 100, 2);

// SpotLight
// const light = new THREE.SpotLight('white', 1, 10, Math.PI / 6);

// HemisphereLight
// const light = new THREE.HemisphereLight('pink', 'lime', 1);

// RectAreaLight
const light = new THREE.RectAreaLight('orange', 10, 2, 2);

// light.position.x = -5;
light.position.y = 2;
// light.castShadow = true;
// light.shadow.mapSize.width = 1024;
// light.shadow.mapSize.height = 1024;
// light.shadow.camera.far = 1;
// light.shadow.camera.near = 5;

scene.add(light);

// const lightHelper = new THREE.DirectionalLightHelper(light);
// const lightHelper = new THREE.PointLightHelper(light);
// const lightHelper = new THREE.SpotLightHelper(light);
// const lightHelper = new THREE.HemisphereLightHelper(light, 1);
const lightHelper = new RectAreaLightHelper(light);
scene.add(lightHelper);

const gui = new GUI();
gui.add(light.position, 'x', -10, 10);
gui.add(light.position, 'y', -10, 10);
gui.add(light.position, 'z', -10, 10);

// 6. Draw
renderer.render(scene, camera);

// 9. Animation
const clock = new THREE.Clock();
const draw = () => {
    const time = clock.getElapsedTime();

    // light.position.x = Math.sin(time) * 5;
    // light.position.z = Math.cos(time) * 5;

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