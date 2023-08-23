// Create the scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lights
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// Create particles for each concept
function createParticles(color) {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  for (let i = 0; i < 200; i++) {
    vertices.push((Math.random() - 0.5) * 6);
    vertices.push((Math.random() - 0.5) * 6);
    vertices.push((Math.random() - 0.5) * 6);
  }
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  const material = new THREE.PointsMaterial({ color: color, size: 0.1 });
  return new THREE.Points(geometry, material);
}

const nutrientParticles = createParticles(0xff0000);
nutrientParticles.position.x = -1;
scene.add(nutrientParticles);

const diseaseParticles = createParticles(0x00ff00);
scene.add(diseaseParticles);

const soilParticles = createParticles(0x0000ff);
soilParticles.position.x = 1;
scene.add(soilParticles);

let time = 0;

// Counters for carbon, nitrogen, and phosphorus
let carbonCounter = 0;
let nitrogenCounter = 0;
let phosphorusCounter = 0;

// Function to update counters and display in the legend
function updateCounters() {
  carbonCounter += 0.1;
  nitrogenCounter += 0.2;
  phosphorusCounter += 0.15;

  document.getElementById('carbon-counter').innerText = `Carbon: ${carbonCounter.toFixed(2)}`;
  document.getElementById('nitrogen-counter').innerText = `Nitrogen: ${nitrogenCounter.toFixed(2)}`;
  document.getElementById('phosphorus-counter').innerText = `Phosphorus: ${phosphorusCounter.toFixed(2)}`;
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Nutrient Cycling Animation
  nutrientParticles.rotation.x += 0.01;
  nutrientParticles.rotation.y += 0.01;

  // Disease Suppression Animation
  diseaseParticles.scale.x = 1 + 0.3 * Math.sin(time * 2);
  diseaseParticles.scale.y = 1 + 0.3 * Math.sin(time * 2);
  diseaseParticles.scale.z = 1 + 0.3 * Math.sin(time * 2);

  // Soil Structure Formation Animation
  soilParticles.position.y = 0.6 * Math.sin(time * 3);

  renderer.render(scene, camera);
  time += 0.01;

  updateCounters(); // Call the updateCounters function in the animation loop
}

animate();
