// Subject: Geometry

import './main.scss';
import * as THREE from 'three';
import { MeshStandardMaterial } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


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
// camera.position.y = 2;
camera.position.z = 10;
scene.add(camera);


// Controls
const controls = new OrbitControls(camera, renderer.domElement);

//5. Mesh
const geometry = new THREE.SphereGeometry(5, 64, 64);
const material = new THREE.MeshStandardMaterial({
    color: 'orangered',
    side: THREE.DoubleSide,
    flatShading: true
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const bufferAttribute = geometry.attributes.position;
const randNums:number[] = [];

for (let i = 0; i < bufferAttribute.count; i++) {
    const randNum = randNums[i] = (Math.random() - 0.5) * 0.2;
    
    const randX = bufferAttribute.getX(i) + randNum;
    const randY = bufferAttribute.getY(i) + randNum;
    const randZ = bufferAttribute.getZ(i) + randNum;
    bufferAttribute.setXYZ(i, randX, randY, randZ);
}

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
    const time = clock.getElapsedTime() * 3;

    for (let i = 0; i < bufferAttribute.count; i++) {
        const offset = Math.sin(time + randNums[i] * 100) * 0.001;
        
        const randX = bufferAttribute.getX(i) + offset;
        const randY = bufferAttribute.getY(i) + offset;
        const randZ = bufferAttribute.getZ(i) + offset;
        bufferAttribute.setXYZ(i, randX, randY, randZ);
    }

    bufferAttribute.needsUpdate = true;

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