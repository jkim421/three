import * as THREE from './three.min.js';

// Setup
// Create world

// const leftLane = -2;
// const rightLane = -2;
// const middleLane = 0;


let currentLane = 0;

document.addEventListener("DOMContentLoaded", () => {
  const [scene, camera, renderer] = setup();

  const clock = new THREE.Clock();
  const world = createWorld();
  const player = createPlayer();
  const [hemisphereLight, sun] = createLight();

  clock.start();

  scene.add( world );
  scene.add( player );
  scene.add( hemisphereLight );
  scene.add( sun );

  camera.position.z = 20;

  document.onkeydown = handleKeyDown;

  function animate() {

    world.rotation.x += 0.01;
    player.rotation.x -= 0.02;

    player.position.x = THREE.Math.lerp(player.position.x, currentLane, 10 * clock.getDelta());

    renderer.render( scene, camera );

    requestAnimationFrame( animate );
  }

  animate();
});

function setup() {
  // Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  const renderer = new THREE.WebGLRenderer( { alpha: true } );

  renderer.shadowMap.enabled = true; //enable shadow
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize( window.innerWidth - 100, window.innerHeight );

  document.body.appendChild( renderer.domElement );

  return [scene, camera, renderer];
}

function createWorld() {
  const worldRadius = 12;
  const worldWidth = 32;
  const worldHeight = 32;

  const materialProps = {
    color: 0x38A653,
    flatShading: true,
    wireframe: false,
  };

  // const geometry = new THREE.SphereGeometry( worldRadius, worldWidth, worldHeight );
  const geometry = new THREE.DodecahedronBufferGeometry( worldRadius, 1 );
  const material = new THREE.MeshBasicMaterial( materialProps );
  const world = new THREE.Mesh( geometry, material );

  world.receiveShadow = true;
	world.castShadow = false;

	world.rotation.z = -Math.PI / 2;
	world.position.y = -6;
	world.position.z = 0;

  return world;
}

function createPlayer() {
  const playerRadius = 1;
  const playerDetail = 1;

  const playerProps = {
    color: 0xe5f2f2,
    flatShading: true,
    wireframe: false,
  };

  const geometry = new THREE.DodecahedronBufferGeometry( playerRadius, 1);
  const material = new THREE.MeshStandardMaterial( playerProps );
  const player = new THREE.Mesh( geometry, material );

  player.receiveShadow = true;
  player.castShadow = true;

  player.position.x = currentLane;
  player.position.y = -2;
  player.position.z = 11.4;

  return player;
}

function createLight() {
  const skyColor = 0xfffafa;
  const groundColor = 0x000000;
  const intensity = 0.9;

  const hemisphereLight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
  const sun = new THREE.DirectionalLight( 0xCDC1C5, 1);
	sun.position.set(12, 6, -7 );
	sun.castShadow = true;
	//Set up shadow properties for the sun light
	sun.shadow.mapSize.width = 256;
	sun.shadow.mapSize.height = 256;
	sun.shadow.camera.near = 0.5;
	sun.shadow.camera.far = 50;

  return [hemisphereLight, sun];
}

function handleKeyDown(e) {
  if ( e.keyCode === 37) { //left
    updateLaneLeft();
  } else if ( e.keyCode === 39) { //right
    updateLaneRight();
  }
}

function updateLaneLeft() {
  if (currentLane === -2) {
    return;
  } else {
    currentLane -= 2;
  }
}

function updateLaneRight() {
  if (currentLane === 2) {
    return;
  } else {
    currentLane += 2;
  }
}
