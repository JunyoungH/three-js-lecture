import './main.scss';
import * as THREE from 'three';
import { render } from 'sass';

// 1. Create Renderer Dynamically
const canvas = document.querySelector('#three-canvas') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias: true // Anti-Aliasing option
});
renderer.setSize(window.innerWidth, window.innerHeight);

// 2. Create Scene
const scene = new THREE.Scene();

/* 
 * 3. Create Camera
 * - fov: 시야각
 * - aspect: 종횡비 (가로,세로 비율 = width / height)
 * - near: 가까운 거리 한계치 (한계치 넘어가면 안보임)
 * - far: 먼거리 한계치 (한계치 넘어가면 안보임)
*/ 
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// 4. Set Camera Position
camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// 5. Create Mesh (Geometry + Material)
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: '#ff0000'
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 6. Draw
renderer.render(scene, camera);