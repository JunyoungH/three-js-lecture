import './main.scss';
import * as THREE from 'three';
import { render } from 'sass';

// 1. Create Renderer Dynamically
const canvas = document.querySelector('#three-canvas') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({ 
    canvas,
    antialias: true, // Anti-Aliasing option
    alpha: true // opacity option
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Apply Pixel Ratio
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
//renderer.setClearAlpha(0.5); // set density

// Set Renderer Background Color
renderer.setClearColor('#00ff00'); 
renderer.setClearAlpha(0.5);

// 2. Create Scene
const scene = new THREE.Scene();

// priority Scene > Renderer
// Renderer Color will be overriden by Scene Color Setting
scene.background = new THREE.Color('blue')

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

// Orthographic Camera (직교 카메라)
// 예: TRPG, 쿼터뷰 게임들 카메라
// 원근감 없기 때문에 직육면체 모양
// - left: 직육면체 왼쪽 
// - right: 직육면체 오른쪽
// - top: 직육면체 위쪽
// - bottom: 직육면체 아래쪽 
// - near: 직육면체 앞면 거리
// - far: 직육면체 뒷면 거리
// const camera = new THREE.OrthographicCamera(
//     -(aspect),
//     aspect,
//     1,
//     -1,
//     0.1,
//     1000
// );

// 4. Set Camera Position
camera.position.x = 1;
camera.position.y = 2;
camera.position.z = 5;

// 원점: 0, 0, 0
camera.lookAt(0, 0, 0);
camera.zoom = 1;

// zoom 반영
camera.updateProjectionMatrix();
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