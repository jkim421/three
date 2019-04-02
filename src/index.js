import * as THREE from './three.min.js';

// Setup
// Create world

// const leftLane = -2;
// const rightLane = -2;
// const middleLane = 0;

const width = window.innerWidth;
const height = window.innerHeight;

let currentLane = 0;
const laneSize = 3;

document.addEventListener("DOMContentLoaded", () => {
  const [scene, camera, renderer] = setup();

  const clock = new THREE.Clock();
  const world = createWorld();
  const player = createPlayer();
  const [hemisphereLight, sun] = createLight();
  const lightHelper = new THREE.DirectionalLightHelper( sun, 5 );

  clock.start();

  scene.add( hemisphereLight );
  scene.add( sun );
  scene.add( world );
  scene.add( player );

  // Camera/Light helpers
  // scene.add( new THREE.CameraHelper( sun.shadow.camera ) );
  // scene.add( lightHelper );

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
  const worldRadius = 14;
  const worldWidth = 32;
  const worldHeight = 32;

  const materialProps = {
    color: 0x38A653,
    flatShading: true,
    wireframe: false,
  };

  const geometry = new THREE.SphereGeometry( worldRadius, worldWidth, worldHeight );
  // const geometry = new THREE.DodecahedronBufferGeometry( worldRadius, 1 );
  const material = new THREE.MeshStandardMaterial( materialProps );
  const world = new THREE.Mesh( geometry, material );

  world.receiveShadow = true;
	world.castShadow = false;

	world.rotation.z = -Math.PI / 2;
	world.position.y = -8;
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
  player.position.z = 13.6;

  return player;
}

function createLight() {
  const skyColor = 0xfffafa;
  const groundColor = 0x000000;
  const intensity = 0.9;

  const hemisphereLight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
  const sun = new THREE.DirectionalLight( 0xCDC1C5, 1);
	sun.position.set( 12, 6, 5 );
	sun.castShadow = true;
	//Set up shadow properties for the sun light
	sun.shadow.mapSize.width = 1024;
	sun.shadow.mapSize.height = 1024;
	sun.shadow.camera.near = 1;
	sun.shadow.camera.far = 10;
	sun.shadow.camera.right = width/2;
	sun.shadow.camera.left = -width/2;
	sun.shadow.camera.top = height/2;
	sun.shadow.camera.bottom = -height/2;

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
  if (currentLane === -laneSize) {
    return;
  } else {
    currentLane -= laneSize;
  }
}

function updateLaneRight() {
  if (currentLane === laneSize) {
    return;
  } else {
    currentLane += laneSize;
  }
}

function addBoards() {
  const boardGeometry = THREE.BoxBufferGeometry(4, 6, 1);


}
