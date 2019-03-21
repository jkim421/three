import * as THREE from './three.min.js';

document.addEventListener("DOMContentLoaded", () => {
  // Setup
  const [scene, camera, renderer] = setup();
  // Create world
  const world = createWorld();
  const player = createPlayer();
  const sun = createLight();

  scene.add( world );
  scene.add( player );
  scene.add( sun );

  camera.position.z = 20;

  function animate() {
    requestAnimationFrame( animate );

    world.rotation.x += 0.01;
    player.rotation.x -= 0.02;

    renderer.render( scene, camera );
  }

  animate();
});

function setup() {
  // Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  const renderer = new THREE.WebGLRenderer( { alpha: true } );

  renderer.shadowMap.enabled = true;//enable shadow
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize( window.innerWidth, window.innerHeight );

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
  const geometry = new THREE.DodecahedronGeometry( 12, 1 );
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

  const geometry = new THREE.DodecahedronGeometry( playerRadius, 1);
  const material = new THREE.MeshStandardMaterial( playerProps );
  const player = new THREE.Mesh( geometry, material );

  player.receiveShadow = true;
  player.castShadow = true;
  player.position.y = 0;
  player.position.z = 11.4;
  // currentLane = middleLane;
  // player.position.x = currentLane;
  return player;
}

function createLight() {
  const skyColor = 0xfffafa;
  const groundColor = 0x000000;
  const intensity = 0.9;

  const hemisphereLight = new THREE.HemisphereLight(skyColor, groundColor, intensity);
  const sun = new THREE.DirectionalLight( 0xcdc1c5, 0.9);
	sun.position.set(12, 6, -7 );
	sun.castShadow = true;
	//Set up shadow properties for the sun light
	sun.shadow.mapSize.width = 256;
	sun.shadow.mapSize.height = 256;
	sun.shadow.camera.near = 0.5;
	sun.shadow.camera.far = 50;

  return sun;
}
