const DIAMETER_SCALE = 0.001;
const DISTANCE_SCALE = 2;
const FIRST_PLANETS_DIAMETER_SCALE = 2.5;
const SUN_DIAMETER_SCALE = 0.5;
const STARTING_DISTANCE = 1000;
const STARS_SPHERE_DIAMETER = 20000;
const N_ASTEROIDS = 500;
const ASTEROID_MIN_DISTANCE = STARTING_DISTANCE + (228 * DISTANCE_SCALE) + 125;
const ASTEROID_MAX_DISTANCE = STARTING_DISTANCE + (779 * DISTANCE_SCALE) - 250;
const ASTEROID_SPEED = 0.0075;
const ASTEROID_SIZE = 6;

const mainAstrosNames = ["sun","mercury","venus","earth","mars","jupiter","saturn","uranus","neptune"]
const diameters =  [1400000 * SUN_DIAMETER_SCALE,4879,12104,12756,6792,142984,120536,51118,49528]
const distances =  [0      ,58  ,108  ,150  ,228 ,779   ,1433  ,2872 ,4495 ]
const daysToYear = [1      ,88  ,225  ,365  ,687 ,4331  ,10747 ,30589,59800]
const mainAstrosTextures = []
const mainAstros = [];
const asteroids = [];
let starsTexture;
let moonTexture;
let comet;

let camera;
let focusCamera = false;
let targetedAstro;

function preload() {
    for (const astro of mainAstrosNames)
        mainAstrosTextures.push(loadImage(`../textures/${astro}.jpg`))

    starsTexture = loadImage("../textures/stars.jpg");
    moonTexture = loadImage("../textures/moon.jpg");  
}

function setup() {
    buildAstros();
    buildAsteroids();
    comet = new Comet(6000,2500,150,300);
    mainAstros.push(comet);
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();
    
    camera = createCamera();
    perspective(2 * atan(height/2/800), width/height, 0.01, 100000);

    cursor('grab');
}

function draw() {
    background(0);
    orbitControl();

    drawStars();
    drawAllMainAstros();
    drawAsteroids();

    if(focusCamera){
        const cameraTarget = mainAstros[targetedAstro].getCoords();
        camera.lookAt(cameraTarget.x,cameraTarget.y,cameraTarget.z);
    }
}

function drawAllMainAstros() {
    for (const astro of mainAstros) {
        astro.update();
        astro.draw();
    }
}

function drawAsteroids() {
    for (const asteroid of asteroids) {
        asteroid.update();
        asteroid.draw();
    }
}

function drawStars() {
    push();
    texture(starsTexture);
    sphere(STARS_SPHERE_DIAMETER);
    pop();
}

function buildAstros(){
    for (let i = 0; i < mainAstrosNames.length; i++) {
        const name = mainAstrosNames[i];
        const distanceFromSun = (name === "sun" ? 0 : STARTING_DISTANCE) + distances[i] * DISTANCE_SCALE;
        const diameter = (0 < i && i < 5 ? FIRST_PLANETS_DIAMETER_SCALE : 1) * diameters[i] * DIAMETER_SCALE;
        const days2Year = daysToYear[i];
        const texture = mainAstrosTextures[i];
        mainAstros.push(new Astro(name, diameter, distanceFromSun, days2Year, texture));
    }
}

function buildAsteroids() {
    for (let i = 0; i < N_ASTEROIDS; i++) {
        const distanceFromSun = random(ASTEROID_MIN_DISTANCE, ASTEROID_MAX_DISTANCE);
        asteroids.push(new Asteroid(ASTEROID_SIZE, distanceFromSun, ASTEROID_SPEED, mainAstrosTextures[4]));
    }
}

function keyPressed() {
    if(key === 'o'){
        toggleOrbit();
    } else if (!isNaN(key) && 0 <= parseInt(key) && parseInt(key) <= 9) {
        if (parseInt(key) === targetedAstro && focusCamera){
            focusCamera = false;
        } else {
            focusCamera = true;
            targetedAstro = parseInt(key);
        }
    }
}

function toggleOrbit() {
    for (const astro of mainAstros) {
        astro.toggleOrbit();
    }
}
