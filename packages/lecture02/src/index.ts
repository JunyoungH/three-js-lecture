import './main.scss';
import * as THREE from 'three';
import gsap from 'gsap';
import { MeshStandardMaterial } from 'three';

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
//renderer.setClearAlpha(0.5); // set density

// Set Renderer Background Color
// renderer.setClearColor('#00ff00'); 
// renderer.setClearAlpha(0.5);

// 2. Create Scene
const scene = new THREE.Scene();

// priority Scene > Renderer
// Renderer Color will be overriden by Scene Color Setting
//scene.background = new THREE.Color('blue')

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
// camera.position.x = 2;
camera.position.y = 1;
camera.position.z = 5;

// 원점: 0, 0, 0
camera.lookAt(0, 0, 0);
camera.zoom = 1;

// zoom 반영
camera.updateProjectionMatrix();
scene.add(camera);

// 5. Create Mesh (Geometry + Material)
const geometry = new THREE.BoxGeometry(1, 1, 1);

// No lighting effect with MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial({
//     color: '#ff0000'
// });

const material = new MeshStandardMaterial({
    color: '#ff0000'
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// const meshes = Array.from({ length: 10 }, () => {
//     const newMesh = new THREE.Mesh(geometry, material);
//     newMesh.position.x = Math.random() * 5 - 2.5;
//     newMesh.position.z = Math.random() * 5 - 2.5;
//     scene.add(newMesh);
//     return newMesh;
// });

// 8. Light
const light = new THREE.DirectionalLight('#ffffff', 1);
light.position.y = 3;
light.position.z = 10;
scene.add(light);

// 10. Fog
scene.fog = new THREE.Fog('#000000', 3, 7);


// 6. Draw
renderer.render(scene, camera);

// 9. Animation
let direction = 1;
//const clock = new THREE.Clock();

let oldTime = Date.now();
const draw = () => {
    // rotate y axis
    // radian
    // 360deg = 2PI
    //mesh.rotation.y += 0.01;

    // Use MathUtils
    //mesh.rotation.y += THREE.MathUtils.degToRad(1);

    // Animation Optimization with Clock Elapsed Time (경과 시간)
    // const time = clock.getElapsedTime();

    // mesh.rotation.y += 2 * time;
    // mesh.position.y += 0.05; ===> getElapsedTime() not working!

    // Animation Optimization with Clock Delta (Draw 간 시간 차)
    // getElapsedTime() 하고 같이 못씀
    // const delta = clock.getDelta();

    // mesh.rotation.y += 2 * delta;
    // mesh.position.y += (3 * delta) * direction;

    // Animation Optimization with JS Date (calculate delta)
    const newTime = Date.now();
    const deltaTime = newTime - oldTime;
    oldTime = newTime;
    
    // mesh.rotation.y += deltaTime * 0.005;
    // mesh.position.y += (deltaTime * 0.002) * direction;

    // if (mesh.position.y > 3) direction = -1;
    // if (mesh.position.y < -3) direction = 1;


    // meshes.forEach(mesh => {
    //     mesh.rotateY(deltaTime * 0.001);
    // });

    renderer.render(scene, camera)
    //window.requestAnimationFrame(draw);

    // Optimized for WebXR
    renderer.setAnimationLoop(draw);

};

draw();

// 11. gsap (Animation with external library)
gsap.to(
    mesh.position,
    {
        duration: 1,
        y: 2,
        z: 3
    }
)

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