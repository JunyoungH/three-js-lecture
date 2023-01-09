// Subject: Material

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
camera.position.x = 5;
camera.position.y = 1;
camera.position.z = 1;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

//5. Mesh
const geometry = new THREE.BoxGeometry(3, 3, 3);

const loadingManager = new THREE.LoadingManager();

loadingManager.onLoad = () => {
    console.log('Loaded');
};

loadingManager.onProgress = (imgUrl) => {
    console.log(`${imgUrl} is on loading`);
};

loadingManager.onError = (imgUrl) => {
    console.log(`${imgUrl} has error!`);
};

// Texture Load
// const textureLoader = new THREE.TextureLoader(loadingManager);

// Set Matirals
// const blockPanels = ['right', 'left', 'top', 'bottom', 'front', 'back'];
// const materials = blockPanels.map(panel => {
//     const texture = textureLoader.load(`/textures/mcstyle/${panel}.png`);
//     texture.magFilter = THREE.NearestFilter;

//     return new THREE.MeshBasicMaterial({ 
//         map: texture,
//         side: THREE.DoubleSide
//     });
// });

// const getBrickPath = (img: string) => `/textures/bricks/Brick_Wall_019_${img}.jpg`;

// const ambientOcclusionTexture = textureLoader.load(getBrickPath('ambientOcclusion'));
// const baseColorTexture = textureLoader.load(getBrickPath('basecolor'));
// const heightTexture = textureLoader.load(getBrickPath('height'));
// const normalTexture = textureLoader.load(getBrickPath('normal'));
// const roughnessTexture = textureLoader.load(getBrickPath('roughness'));

// const material = new THREE.MeshStandardMaterial({
//     map: baseColorTexture,
//     normalMap: normalTexture,
//     metalness: 0.3,
//     roughness: 0.3,
//     roughnessMap: roughnessTexture,
//     aoMap: ambientOcclusionTexture,
//     aoMapIntensity: 5
// })

// CubeTexture load
const envTexture = new THREE.CubeTextureLoader(loadingManager)
    .setPath('/textures/cubemap/')
    .load([
        // order:  + -> - 
        'px.png', 'nx.png',
        'py.png', 'ny.png',
        'pz.png', 'nz.png'
    ]);

const material = new THREE.MeshBasicMaterial({
    envMap: envTexture, 
});

// Material Setting
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

scene.background = envTexture;

// 7. Light
// AmbientLight - 은은하게 전체적으로 조명 비춤
const ambientLight = new THREE.AmbientLight('white', 0.5)
const directionalLight = new THREE.DirectionalLight('white', 1);
directionalLight.position.set(1, 1, 2);

scene.add(ambientLight, directionalLight);

// 8. Animation
const clock = new THREE.Clock();
const draw = () => {
    const delta = clock.getDelta();

    renderer.render(scene, camera)
    renderer.setAnimationLoop(draw);
};

draw();

// 6. Window Resize Event
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