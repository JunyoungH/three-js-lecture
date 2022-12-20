// Subject: Camera

import './main.scss';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { KeyController } from './KeyController';

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

//4. Mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
let mesh;
let material;

// for DragControls
const meshes = [];

for (let i = 0; i < 20; i++) {
    material = new THREE.MeshStandardMaterial({
        color: `rgb(
            ${ 50 + Math.floor(Math.random() * 205) },
            ${ 50 + Math.floor(Math.random() * 205) },
            ${ 50 + Math.floor(Math.random() * 205) }
        )`
    });

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 5;
    mesh.position.y = (Math.random() - 0.5) * 5;
    mesh.position.z = (Math.random() - 0.5) * 5;
    scene.add(mesh);

    // for DragControls
    mesh.name = `box-${i}`
    meshes.push(mesh);
}

// 5. Set Camera Position
//camera.position.x = 1;
// camera.position.y = 2;
camera.position.z = 10;
scene.add(camera);

// Controls
// a. OrbitControls
// const controls = new OrbitControls(camera, renderer.domElement);

// b. TrackballControls (default daming enabled, update required)
// const controls = new TrackballControls(camera, renderer.domElement);

// controls.enableDamping = true;
// controls.enableZoom = false;
// controls.maxDistance = 10;
// controls.minDistance = 3;
// controls.minPolarAngle = Math.PI / 4 ; // 45 degree
// controls.minPolarAngle = THREE.MathUtils.degToRad(45);
// controls.maxPolarAngle = THREE.MathUtils.degToRad(135);
// controls.target.set(2, 2, 2)
// controls.autoRotate = true;
// controls.autoRotateSpeed = 5;

// c. FlyControls (update required with =frequency parameter)
// const controls = new FlyControls(camera, renderer.domElement);

// controls.rollSpeed = 0.05;
// controls.movementSpeed = 3;
// controls.dragToLook = true;

// d. FirstPersonControls (flyControls enhancement)
// const controls = new FirstPersonControls(camera, renderer.domElement);
// controls.activeLook = false;
// controls.lookSpeed = 0.1;
// controls.autoForward = true;

// e. PointerLockControls (user gesture (event) required)
const controls = new PointerLockControls(camera, renderer.domElement);
controls.domElement.addEventListener('click', () => {
    controls.lock();
});

controls.addEventListener('lock', () => {
    console.log('locked!')
});

controls.addEventListener('unlock', () => {
    console.log('unlocked!')
});

// keyboard input control
const keyContoller = new KeyController();
const walk = () => {    
    if (keyContoller.isDirection('forward')) {
        controls.moveForward(0.02);
    }

    if (keyContoller.isDirection('backward')) {
        controls.moveForward(-0.02);
    }

    if (keyContoller.isDirection('right')) {
        controls.moveRight(0.02);
    }

    if (keyContoller.isDirection('left')) {
        controls.moveRight(-0.02);
    }
}

// f. DragControls (meshes required)
// const dragControls = new DragControls(meshes, camera, renderer.domElement);
// dragControls.addEventListener('dragstart', e => {
//     controls.enabled = false;
// });

// dragControls.addEventListener('dragend', e => {
//     controls.enabled = true;
// });


// 8. Light
// AmbientLight - 은은하게 전체적으로 조명 비춤
const ambientLight = new THREE.AmbientLight('white', 0.5)
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('white', 1);
directionalLight.position.y = 1;
directionalLight.position.z = 2;
scene.add(directionalLight);

// 6. Draw
renderer.render(scene, camera);

// 9. Animation
const clock = new THREE.Clock();
const draw = () => {
    const delta = clock.getDelta();
    // controls.update();
    // controls.update(delta);

    walk();

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