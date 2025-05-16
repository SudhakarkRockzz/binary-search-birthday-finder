let min = 1;
let max = 31;
let guess;
let attempts = 0;

const startBtn = document.getElementById('start');
const yesBtn = document.getElementById('yes');
const noBtn = document.getElementById('no');
const resultDiv = document.getElementById('result');
const controlsDiv = document.getElementById('controls');
const canvas = document.getElementById('background-canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const birthdayImageContainer = document.getElementById('birthday-image-container');
const birthdayImage = document.getElementById('birthday-image');

// 3D scene setup
renderer.setClearColor(0xf0f0f0);
camera.position.z = 5;

// Create a simple cube for the background animation
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x3498db, wireframe: true });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Function to handle window resize
function resizeCanvas() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();

startBtn.addEventListener('click', startGame);
yesBtn.addEventListener('click', () => makeGuess('yes'));
noBtn.addEventListener('click', () => makeGuess('no'));

function startGame() {
    min = 1;
    max = 31;
    attempts = 0;
    startBtn.style.display = 'none';
    controlsDiv.style.display = 'block';
    birthdayImageContainer.style.display = 'none';
    makeGuess();
}

function makeGuess(response) {
    if (response === 'yes') {
        min = guess + 1;
    } else if (response === 'no') {
        max = guess - 1;
    }

    if (min === max) {
        resultDiv.innerHTML = `Happy Birthday! Your birthday must be on the ${min}${getOrdinal(min)}!<br>Found in ${attempts} guesses.`;
        controlsDiv.style.display = 'none';
        startBtn.style.display = 'inline-block';
        birthdayImage.src = "https://i.pinimg.com/originals/aa/fd/60/aafd603dfb06c7d547a7edd8f8d8d6e0.gif";
        birthdayImageContainer.style.display = 'block';
        startBtn.textContent = 'Play Again';
        return;
    }

    if (min > max) {
        resultDiv.textContent = "Hmm, something's wrong. Did you change your number?";
        controlsDiv.style.display = 'none';
        startBtn.style.display = 'inline-block';
        startBtn.textContent = 'Try Again';
        return;
    }

    guess = Math.floor((min + max) / 2);
    attempts++;
    resultDiv.textContent = `Is your birthday after the ${guess}${getOrdinal(guess)}?`;
}

function getOrdinal(n) {
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

