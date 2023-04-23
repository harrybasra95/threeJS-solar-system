import * as THREE from 'three';
const { innerWidth, innerHeight } = window;
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import sunImage from './img/sun.jpg';
import mercuryImage from './img/mercury.jpg';
import venusImage from './img/venus.jpg';
import earthImage from './img/earth.jpg';
import marsImage from './img/mars.jpg';
import jupiterImage from './img/jupiter.jpg';
import saturnImage from './img/saturn.jpg';
import saturnRingImage from './img/saturn_ring.png';
import uranusRingImage from './img/uranus_ring.png';
import uranusImage from './img/uranus.jpg';
import starsTexture from './img/stars.jpg';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
     75,
     innerWidth / innerHeight,
     0.1,
     1000
);

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

scene.background = cubeTextureLoader.load([
     starsTexture,
     starsTexture,
     starsTexture,
     starsTexture,
     starsTexture,
     starsTexture,
]);

const sunGeometry = new THREE.SphereGeometry(3);
const sunMaterial = new THREE.MeshStandardMaterial({
     map: textureLoader.load(sunImage),
});
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sunMesh);
sunMesh.position.set(0, 0, 0);
sunMesh.castShadow = true;

const getPlanetMesh = (planetImage, planetSize = 1, distance) => {
     const planetParentGeometry = new THREE.SphereGeometry();
     const planetParentMaterial = new THREE.MeshStandardMaterial();
     const planetParentMesh = new THREE.Mesh(
          planetParentGeometry,
          planetParentMaterial
     );
     const planetGeometry = new THREE.SphereGeometry(planetSize);
     const planetMaterial = new THREE.MeshStandardMaterial({
          map: textureLoader.load(planetImage),
     });
     const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
     planetParentMesh.add(planetMesh);
     planetMesh.position.set(0, 0, distance);
     planetMesh.castShadow = true;
     planetMesh.rotation.y += 0.01;
     return [planetParentMesh, planetMesh];
};
const getRingMesh = (planetImage, planetSize = 1, distance) => {
     const planetParentGeometry = new THREE.SphereGeometry();
     const planetParentMaterial = new THREE.MeshStandardMaterial({
          side: THREE.DoubleSide,
     });
     const planetParentMesh = new THREE.Mesh(
          planetParentGeometry,
          planetParentMaterial
     );
     const planetGeometry = new THREE.RingGeometry(planetSize, planetSize + 1);
     const planetMaterial = new THREE.MeshStandardMaterial({
          map: textureLoader.load(planetImage),
          side: THREE.DoubleSide,
     });
     const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
     planetParentMesh.add(planetMesh);
     planetMesh.position.set(0, 0, distance);
     planetMesh.castShadow = true;
     planetMesh.rotation.y += 0.01;
     return [planetParentMesh, planetMesh];
};

const [mercuryParentMesh, mercuryMesh] = getPlanetMesh(mercuryImage, 1, 6);
const [venusParentMesh, venusMesh] = getPlanetMesh(venusImage, 1, 10);
const [earthParentMesh, earthMesh] = getPlanetMesh(earthImage, 1, 12);
const [marsParentMesh, marsMesh] = getPlanetMesh(marsImage, 1, 15);
const [jupiterParentMesh, jupiterMesh] = getPlanetMesh(jupiterImage, 1, 20);
const [saturnParentMesh, saturnMesh] = getPlanetMesh(saturnImage, 1, 25);
const [saturnRingParentMesh, saturnRingMesh] = getRingMesh(
     saturnRingImage,
     1.5,
     25
);
saturnRingMesh.rotation.y = 3.1;
saturnRingMesh.rotation.x = 1;

const [uranusParentMesh, uranusMesh] = getPlanetMesh(uranusImage, 1, 30);
const [uranusRingParentMesh, uranusRingMesh] = getRingMesh(
     uranusRingImage,
     1.5,
     30
);

uranusRingMesh.rotation.y = 0.5;
uranusRingMesh.rotation.x = 2;

scene.add(mercuryParentMesh);
scene.add(venusParentMesh);
scene.add(earthParentMesh);
scene.add(marsParentMesh);
scene.add(jupiterParentMesh);
scene.add(saturnParentMesh);
scene.add(saturnRingParentMesh);
scene.add(uranusParentMesh);
scene.add(uranusRingParentMesh);

mercuryParentMesh.rotation.y = 1;
venusParentMesh.rotation.y = 7;
earthParentMesh.rotation.y = 5;
marsParentMesh.rotation.y = 3;
jupiterParentMesh.rotation.y = 1;
saturnParentMesh.rotation.y = 7;
saturnRingParentMesh.rotation.y = 7;
uranusParentMesh.rotation.y = 9;
uranusRingParentMesh.rotation.y = 9;

const pointLight = new THREE.PointLight(0xffff00, 1, 10000);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
scene.add(lightHelper);

const ambientLight = new THREE.AmbientLight(0x404040, 5);
scene.add(ambientLight);

camera.position.z = 60;
controls.update();

function animate() {
     requestAnimationFrame(animate);

     mercuryParentMesh.rotation.y += 0.01;
     venusParentMesh.rotation.y += 0.007;
     earthParentMesh.rotation.y += 0.005;
     marsParentMesh.rotation.y += 0.003;
     jupiterParentMesh.rotation.y += 0.001;
     saturnParentMesh.rotation.y += 0.0007;
     saturnRingParentMesh.rotation.y += 0.0007;
     uranusParentMesh.rotation.y += 0.0004;
     uranusRingParentMesh.rotation.y += 0.0004;

     mercuryMesh.rotation.y += 0.001;
     venusMesh.rotation.y += 0.001;
     earthMesh.rotation.y += 0.001;
     marsMesh.rotation.y += 0.001;
     jupiterMesh.rotation.y += 0.001;
     saturnMesh.rotation.y += 0.001;
     uranusMesh.rotation.y += 0.001;

     controls.update();
     renderer.render(scene, camera);
}
animate();
