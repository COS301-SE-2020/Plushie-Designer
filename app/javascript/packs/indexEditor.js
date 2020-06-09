var THREE = require('three');
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

var headchange = false;
var torsochange = false;
var armschange = false; 
var legschange = false;

var head = 0;
var torso = 0;
var arms = 0;
var legs = 0;

var ihead = 7;
var itorso = 8;
var ilarm = 3;
var irarm = 4;
var illeg = 5;
var irleg = 6;
var ihair = 99;

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
	hurl = 'http://127.0.0.1:3000/model/minecraft/minecraft_steve_head.gltf';
}else if(head==1){
	hurl = 'http://127.0.0.1:3000/model/chibi/chibi_head.gltf';
	loader.load( 'http://127.0.0.1:3000/model/chibi/chibi_hair.gltf', function ( gltf ) {
		gltf.scene.position.setY(1.5);
		gltf.scene.castShadow = true;
		gltf.scene.name = "hair";
		scene.add( gltf.scene );

	}, undefined, function ( error ) {

		console.error( error );

	} );
}
loader.load( hurl, function ( gltf ) {
	gltf.scene.position.setY(1.5);
	gltf.scene.castShadow = true;
	gltf.scene.name = "head";
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

var hurl = '';
if(torso==0){
	hurl = 'http://127.0.0.1:3000/model/minecraft/minecraft_steve_Body.gltf';
}else if(torso==1){
	hurl = 'http://127.0.0.1:3000/model/chibi/chibi_body.gltf';
}
loader.load( hurl, function ( gltf ) {
	gltf.scene.position.setY(1.5);
	gltf.scene.castShadow = true;
	gltf.scene.name = "torso";
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

var hurl = '';
var hurl1 = '';
if(arms==0){
	hurl = 'http://127.0.0.1:3000/model/minecraft/minecraft_steve_LeftArm.gltf';
	hurl1 = 'http://127.0.0.1:3000/model/minecraft/minecraft_steve_RightArm.gltf';
}else if(arms==1){
	hurl = 'http://127.0.0.1:3000/model/chibi/chibi_leftArm.gltf';
	hurl1 = 'http://127.0.0.1:3000/model/chibi/chibi_rightArm.gltf';
}
loader.load( hurl, function ( gltf ) {
	gltf.scene.position.setY(1.5);
	gltf.scene.castShadow = true;
	gltf.scene.name = "leftarm";
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );
loader.load( hurl1, function ( gltf ) {
	gltf.scene.position.setY(1.5);
	gltf.scene.castShadow = true;
	gltf.scene.name = "rightarm";
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

var hurl = '';
var hurl1 = '';
if(legs==0){
	hurl = 'http://127.0.0.1:3000/model/minecraft/minecraft_steve_LeftLeg.gltf';
	hurl1 = 'http://127.0.0.1:3000/model/minecraft/minecraft_steve_RightLeg.gltf';
}else if(legs==1){
	hurl = 'http://127.0.0.1:3000/model/chibi/chibi_leftLeg.gltf';
	hurl1 = 'http://127.0.0.1:3000/model/chibi/chibi_righyLeg.gltf';
}
loader.load( hurl, function ( gltf ) {
	gltf.scene.position.setY(1.5);
	gltf.scene.castShadow = true;
	gltf.scene.name = "leftleg";
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );
loader.load( hurl1, function ( gltf ) {
	gltf.scene.position.setY(1.5);
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

function updateIndexes(){
	for(var i=0;i< scene.children.length;++i){
		if(scene.children[i].name=="head"){
			ihead = i;
		}else if(scene.children[i].name=="torso"){
			itorso = i;
		}else if(scene.children[i].name=="leftarm"){
			ilarm = i;
		}else if(scene.children[i].name=="rightarm"){
			irarm = i;
		}else if(scene.children[i].name=="leftleg"){
			illeg = i;
		}else if(scene.children[i].name=="rightleg"){
			irleg = i;
		}else if(scene.children[i].name=="hair"){
			ihair = i;
		}
	}
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

var animate = function () {
	if(headchange){
		updateIndexes();
		var temp = scene.getObjectByName(scene.children[ihead].name);
		scene.remove(temp);
		var hurl = '';
		if(head==0){
			hurl = 'http://127.0.0.1:3000/model/minecraft/minecraft_steve_head.gltf';
			updateIndexes();
			if(ihair!=99){
				var temp = scene.getObjectByName(scene.children[ihair].name);
				scene.remove(temp);
			}
		}else if(head==1){
			hurl = 'http://127.0.0.1:3000/model/chibi/chibi_head.gltf';
			loader.load( 'http://127.0.0.1:3000/model/chibi/chibi_hair.gltf', function ( gltf ) {
				gltf.scene.position.setY(1.5);
				gltf.scene.castShadow = true;
				gltf.scene.name = "hair";
				scene.add( gltf.scene );
	
			}, undefined, function ( error ) {
	
				console.error( error );
	
			} );
		}
		loader.load( hurl, function ( gltf ) {
			gltf.scene.position.setY(1.5);
			gltf.scene.castShadow = true;
			gltf.scene.name = "head";
			scene.add( gltf.scene );

		}, undefined, function ( error ) {

			console.error( error );

		} );
		headchange = false;
	}

	if(torsochange){
		updateIndexes();
		var temp = scene.getObjectByName(scene.children[itorso].name);
		scene.remove(temp);
		var hurl = '';
		if(torso==0){
			hurl = 'http://127.0.0.1:3000/model/minecraft/minecraft_steve_Body.gltf';
		}else if(torso==1){
			hurl = 'http://127.0.0.1:3000/model/chibi/chibi_body.gltf';
		}
		loader.load( hurl, function ( gltf ) {
			gltf.scene.position.setY(1.5);
			gltf.scene.castShadow = true;
			gltf.scene.name = "torso";
			scene.add( gltf.scene );

		}, undefined, function ( error ) {

			console.error( error );

		} );
		torsochange = false;
	}

	if(armschange){
		updateIndexes();
		var temp = scene.getObjectByName(scene.children[ilarm].name);
		scene.remove(temp);
		updateIndexes();
		var temp1 = scene.getObjectByName(scene.children[irarm].name);
		scene.remove(temp1);
		var hurl = '';
		var hurl1 = '';
		if(arms==0){
			hurl = 'http://127.0.0.1:3000/model/minecraft/minecraft_steve_LeftArm.gltf';
			hurl1 = 'http://127.0.0.1:3000/model/minecraft/minecraft_steve_RightArm.gltf';
		}else if(arms==1){
			hurl = 'http://127.0.0.1:3000/model/chibi/chibi_leftArm.gltf';
			hurl1 = 'http://127.0.0.1:3000/model/chibi/chibi_rightArm.gltf';
		}
		loader.load( hurl, function ( gltf ) {
			gltf.scene.position.setY(1.5);
			gltf.scene.castShadow = true;
			gltf.scene.name = "leftarm";
			scene.add( gltf.scene );

		}, undefined, function ( error ) {

			console.error( error );

		} );
		loader.load( hurl1, function ( gltf ) {
			gltf.scene.position.setY(1.5);
			gltf.scene.castShadow = true;
			gltf.scene.name = "rightarm";
			scene.add( gltf.scene );

		}, undefined, function ( error ) {

			console.error( error );

		} );
		armschange = false;
	}

	if(legschange){
		updateIndexes();
		var temp = scene.getObjectByName(scene.children[illeg].name);
		scene.remove(temp);
		updateIndexes();
		var temp1 = scene.getObjectByName(scene.children[irleg].name);
		scene.remove(temp1);
		var hurl = '';
		var hurl1 = '';
		if(legs==0){
			hurl = 'http://127.0.0.1:3000/model/minecraft/minecraft_steve_LeftLeg.gltf';
			hurl1 = 'http://127.0.0.1:3000/model/minecraft/minecraft_steve_RightLeg.gltf';
		}else if(legs==1){
			hurl = 'http://127.0.0.1:3000/model/chibi/chibi_leftLeg.gltf';
			hurl1 = 'http://127.0.0.1:3000/model/chibi/chibi_righyLeg.gltf';
		}
		loader.load( hurl, function ( gltf ) {
			gltf.scene.position.setY(1.5);
			gltf.scene.castShadow = true;
			gltf.scene.name = "leftleg";
			scene.add( gltf.scene );

		}, undefined, function ( error ) {

			console.error( error );

		} );
		loader.load( hurl1, function ( gltf ) {
			gltf.scene.position.setY(1.5);
			gltf.scene.castShadow = true;
			gltf.scene.name = "rightleg";
			scene.add( gltf.scene );

		}, undefined, function ( error ) {

			console.error( error );

		} );
		legschange = false;
	}
	requestAnimationFrame(animate);

	controls.update();
	renderer.render(scene, camera);
};

animate();

$(document).ready(function(){
	$('#headl').click(function () {
		if(head > 0){
			headchange = true;
			head -= 1;
			head = head;
		}
	});
	$('#headr').click(function () {
		var tmp = head;
		if(tmp < 1){
			headchange = true;
			tmp = +tmp + +1;
			head = tmp;
			head = head;
		}
	});

	$('#armsl').click(function () {
		if(arms > 0){
			armschange = true;
			arms -= 1;
			arms = arms;
		}
	});
	$('#armsr').click(function () {
		var tmp = arms;
		if(tmp < 1){
			armschange = true;
			tmp = +tmp + +1;
			arms = tmp;
			arms = arms;
		}
	});

	$('#torsol').click(function () {
		if(torso > 0){
			torsochange = true;
			torso -= 1;
			torso = torso;
		}
	});
	$('#torsor').click(function () {
		var tmp = torso;
		if(tmp < 1){
			torsochange =  true;
			tmp = +tmp + +1;
			torso = tmp;
			torso = torso;
		}
	});

	$('#legsl').click(function () {
		if(legs > 0){
			legschange = true;
			legs -= 1;
			legs = legs;
		}
	});
	$('#legsr').click(function () {
		var tmp = legs;
		if(tmp < 1){
			legschange = true;
			tmp = +tmp + +1;
			legs = tmp;
			legs = legs;
		}
	});

})