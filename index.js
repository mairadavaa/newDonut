import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);
window.innerWidth = 300;
window.innerHeight = 300;
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 1);
scene.add(directionalLight);

const loader = new GLTFLoader();
loader.load(
    './donut2blend.glb',
    function (gltf) {
        gltf.scene.scale.set(0.9, 0.9, 0.9); // Scale down the model
        scene.add(gltf.scene);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    function (error) {
        console.error(error);
    }
);

let mouseX = 0,
    mouseY = 0;
document.addEventListener('mousemove', onDocumentMouseMove);
function onDocumentMouseMove(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

function animate() {
    requestAnimationFrame(animate);
    // Move the camera based on the mouse position
    camera.position.x = mouseX * 10;
    camera.position.y = mouseY * 10;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}
animate();
