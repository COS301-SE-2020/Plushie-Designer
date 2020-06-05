var THREE = require('three');
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


var scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);
scene.fog = new THREE.FogExp2(0xbfd1e5, 0.002);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight-100);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 10);
// camera.position.set( 400, 200, 0 );

var controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

// controls.screenSpacePanning = false;

controls.minDistance = 20;
controls.maxDistance = 40;

controls.maxPolarAngle = Math.PI / 2;


// var geometry = new THREE.ConeBufferGeometry(20, 100, 3);
// geometry.translate(0, 50, 0);
// geometry.rotateX(Math.PI / 2);
// helper = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial());
// scene.add(helper);

// var loader = new GLTFLoader();

// loader.load( 'https://stefanswebgl.herokuapp.com/scifigirl/scene.gltf', function ( gltf ) {
// 	gltf.scene.position.setY(1.5);
// 	gltf.scene.castShadow = true;
// 	scene.add( gltf.scene );

// }, undefined, function ( error ) {

// 	console.error( error );

// } );

var geometry = new THREE.BoxBufferGeometry(5, 5, 5);
var material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.receiveShadow = true;
cube.position.setY(3);
// cube.position.setZ(5);
scene.add(cube);

// camera.lookAt(0, 20, 0);

var geometry = new THREE.BoxBufferGeometry(1000, 0, 1000);
// var material = new THREE.MeshPhongMaterial({ color: 0x8B4513});
var material = new THREE.MeshPhongMaterial({ color: 0xA9A9A9 });
var plane = new THREE.Mesh(geometry, material);
plane.castShadow = false;
plane.receiveShadow = true;
plane.position.setY(-0.23);
// plane.position.setZ(5);
scene.add(plane);

var light = new THREE.AmbientLight(0x222222);
scene.add(light);

var light = new THREE.DirectionalLight( 0xffffff, 0.5, 100 );
light.position.set( -5, 2, 10); 			//default; light shining from top
light.castShadow = true;            // default false
scene.add( light );

light.shadow.mapSize.width = 512;  // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5;    // default
light.shadow.camera.far = 500;

var size = 1000;
var divisions = 1000;

// var gridHelper = new THREE.GridHelper( size, divisions );
// gridHelper.receiveShadow = true;
// scene.add( gridHelper );

// var helper = new THREE.CameraHelper( light.shadow.camera );
// scene.add( helper );
// controls.update();

// camera.position.z = 5;

var animate = function () {
	requestAnimationFrame(animate);

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
	controls.update();
	renderer.render(scene, camera);
};

animate();