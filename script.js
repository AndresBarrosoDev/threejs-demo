import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Select the canvas element
const canvas = document.querySelector('canvas.webgl');

// Create a new scene and set its background color
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x2a0d45); // Darkish purple color

// Create a cube with geometry and material
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x8b0000}); // Dark red color
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(-1, 0, 0); // Move the cube to the left
scene.add(cube);

// Create a sphere with geometry and material
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x00008b}); // Dark blue color
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(1, 0, 0); // Move the sphere to the right
scene.add(sphere);

// Set up scene sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// Create and position the camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.lookAt(new THREE.Vector3(0, 0, 0)); // Look at the center of the scene
scene.add(camera);

// Create the renderer and set its size
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true; // Enable shadow maps

// Add point light and ambient light to the scene with increased intensity
const pointLight = new THREE.PointLight(0xffffff, 50); // Increased intensity to 2
pointLight.position.set(5, 5, 5);
pointLight.castShadow = true; // Enable shadows for the point light
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0x404040, 2); // Increased intensity to 1.5
scene.add(ambientLight);

// Enable shadows for objects
cube.castShadow = true;
cube.receiveShadow = true;
sphere.castShadow = true;
sphere.receiveShadow = true;

// Add orbit controls for interactive navigation
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Generate a star field
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

const starVertices = [];
for (let i = 0; i < 10000; i++) {
    const x = THREE.MathUtils.randFloatSpread(2000);
    const y = THREE.MathUtils.randFloatSpread(2000);
    const z = THREE.MathUtils.randFloatSpread(2000);
    starVertices.push(x, y, z);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// Animation loop to render the scene and animate the cube
function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    controls.update();
    renderer.render(scene, camera);
}
animate();

// Resize event listener to make the scene responsive
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

console.log('Esto es una escena 3D interactiva creada con Three.js.')
console.log('En el centro de la escena, se encuentran un cubo de color rojo y una esfera de color azul, iluminados por una luz ambiental y una luz puntual. El fondo de la escena simula el universo, con un color púrpura oscuro y numerosas estrellas dispersas. Además, los controles de navegación permiten rotar y acercar la vista de la escena, proporcionando una experiencia inmersiva. Algo curioso es que podemos alejarnos y visualizar el espacio fuera del campo de estrellas.')


