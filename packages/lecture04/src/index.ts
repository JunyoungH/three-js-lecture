// Subject: Transform
// 1. Distance
// 2. Scale
// 3. Rotation
// 4. Grouping

import './main.scss';
import * as THREE from 'three';
import { MeshStandardMaterial } from 'three';
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

camera.lookAt(mesh.position);
scene.add(mesh);

// 8. Light

// AmbientLight - 은은하게 전체적으로 조명 비춤
const ambientLight = new THREE.AmbientLight('white', 0.5)
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('white', 1);
directionalLight.position.y = 1;
directionalLight.position.z = 2;
scene.add(directionalLight);

// Add AxisHelper
const axisHelper = new THREE.AxesHelper(5);
scene.add(axisHelper);

// Add GUI Control Panel
const dat = new GUI();
dat.add(camera.position, 'x', -5, 5, 0.01).name('Camera X');
dat.add(camera.position, 'y', -5, 5, 0.01).name('Camera Y');
dat.add(camera.position, 'z', 2, 10, 0.01).name('Camera Z');

// 6. Draw
renderer.render(scene, camera);

// CAUTION : Mesh Rotation Common Issue 
// Scenario : The character changes of view 60 degrees to the right and 20 degrees up
// Issue : The character look at wrong direction since AXIS is static 
// Solution : Update AXIS along with rotation
mesh.rotation.reorder('YXZ');
mesh.rotation.y = THREE.MathUtils.degToRad(45);
mesh.rotation.x = THREE.MathUtils.degToRad(20);

// 9. Animation
const clock = new THREE.Clock();
const draw = () => {
    // Animation Optimization with Clock Elapsed Time (경과 시간)
    const delta = clock.getDelta();

    //mesh.position.set(-1, 0, 0);

    // Get Vector Length 
    // console.log(mesh.position.length());

    // Set Position Distance
    // console.log(mesh.position.distanceTo(new THREE.Vector3(1, 2, 0)));
    // console.log(mesh.position.distanceTo(camera.position));

    // Set Scale
    // mesh.scale.x = 2;
    // mesh.scale.y = 0.5;
    //mesh.scale.set(0.5, 1, 2);

    // Set Rotation

    // Degree To Radian
    // mesh.rotation.x = 45 * Math.PI / 180;

    // 360 deg = 2 * Math.PI
    // mesh.rotation.x = Math.PI / 3; // 60 deg - close to 1
    // mesh.rotation.x = 1 // Almost same result as Math.PI / 3 

    // With MathUtils
    // mesh.rotation.x = THREE.MathUtils.degToRad(60);

    //mesh.rotation.z += delta;

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