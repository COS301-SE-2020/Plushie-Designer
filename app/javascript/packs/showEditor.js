var THREE = require('three');
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

var head = $(".head").data("head");
var torso = $(".torso").data("torso");
var arms = $(".arms").data("arms");
var legs = $(".legs").data("legs");
var headposy = $(".headposy").data("headposy");
var headposx = $(".headposx").data("headposx");
var torsoposy = $(".torsoposy").data("torsoposy");
var torsoposx = $(".torsoposx").data("torsoposx");
var larmposy = $(".larmposy").data("larmposy");
var larmposx = $(".larmposx").data("larmposx");
var rarmposy = $(".rarmposy").data("rarmposy");
var rarmposx = $(".rarmposx").data("rarmposx");
var llegposy = $(".llegposy").data("llegposy");
var llegposx = $(".llegposx").data("llegposx");
var rlegposy = $(".rlegposy").data("rlegposy");
var rlegposx = $(".rlegposx").data("rlegposx");

var scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfd1e5);
scene.fog = new THREE.FogExp2(0xbfd1e5, 0.002);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 10);

var controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

controls.minDistance = 13;
controls.maxDistance = 13;

controls.maxPolarAngle = Math.PI / 2;

var loader = new GLTFLoader();

var hurl = '';
if(head==0){
	hurl = '/model/minecraft/steve_head.gltf';
}else if(head==1){
	hurl = '/model/chibi/chibi_head.gltf';
	loader.load( '/model/chibi/chibi_hair.gltf', function ( gltf ) {
		gltf.scene.position.setY(headposy);
		gltf.scene.position.setX(headposx);
		gltf.scene.castShadow = true;
		gltf.scene.name = "hair";
		scene.add( gltf.scene );

	}, undefined, function ( error ) {

		console.error( error );

	} );
}
loader.load( hurl, function ( gltf ) {
	gltf.scene.position.setY(headposy);
	gltf.scene.position.setX(headposx);
	gltf.scene.castShadow = true;
	gltf.scene.name = "head";
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

var hurl = '';
if(torso==0){
	hurl = '/model/minecraft/steve_body.gltf';
}else if(torso==1){
	hurl = '/model/chibi/chibi_body.gltf';
}
loader.load( hurl, function ( gltf ) {
	gltf.scene.position.setY(torsoposy);
	gltf.scene.position.setX(torsoposx);
	gltf.scene.castShadow = true;
	gltf.scene.name = "torso";
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

var hurl = '';
var hurl1 = '';
if(arms==0){
	hurl = '/model/minecraft/steve_l_arm.gltf';
	hurl1 = '/model/minecraft/steve_r_arm.gltf';
}else if(arms==1){
	hurl = '/model/chibi/chibi_l_arm.gltf';
	hurl1 = '/model/chibi/chibi_r_arm.gltf';
}
loader.load( hurl, function ( gltf ) {
	gltf.scene.position.setY(larmposy);
	gltf.scene.position.setX(larmposx);
	gltf.scene.castShadow = true;
	gltf.scene.name = "leftarm";
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );
loader.load( hurl1, function ( gltf ) {
	gltf.scene.position.setY(rarmposy);
	gltf.scene.position.setX(rarmposx);
	gltf.scene.castShadow = true;
	gltf.scene.name = "rightarm";
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

var hurl = '';
var hurl1 = '';
if(legs==0){
	hurl = '/model/minecraft/steve_l_leg.gltf';
	hurl1 = '/model/minecraft/steve_r_leg.gltf';
}else if(legs==1){
	hurl = '/model/chibi/chibi_l_leg.gltf';
	hurl1 = '/model/chibi/chibi_r_leg.gltf';
}
loader.load( hurl, function ( gltf ) {
	gltf.scene.position.setY(llegposy);
	gltf.scene.position.setX(llegposx);
	gltf.scene.castShadow = true;
	gltf.scene.name = "leftleg";
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );
loader.load( hurl1, function ( gltf ) {
	gltf.scene.position.setY(rlegposy);
	gltf.scene.position.setX(rlegposx);
	gltf.scene.castShadow = true;
	gltf.scene.name = "rightleg";
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

var geometry = new THREE.BoxBufferGeometry(1000, 0, 1000);
var material = new THREE.MeshPhongMaterial({ color: 0xA9A9A9 });
var plane = new THREE.Mesh(geometry, material);
plane.castShadow = false;
plane.receiveShadow = true;
plane.position.setY(-4);
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

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

var animate = function () {
	requestAnimationFrame(animate);
	
	controls.update();
	renderer.render(scene, camera);
};

animate();