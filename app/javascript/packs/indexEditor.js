var THREE = require('three');
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { TAARenderPass } from 'three/examples/jsm/postprocessing/TAARenderPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';


var headchange = false;
var torsochange = false;
var armschange = false; 
var legschange = false;

var hair = 0;
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

var htemp;
var ttemp;
var latemp;
var ratemp;
var lltemp;
var rltemp;
var hhtemp = null;

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
var hurl1 = '';

var models = new Array();

//--------------------------------TEXTURE CHANGES---------------------------------------------
	const colors = [
		{
			color: '66533C'
		},
		{
			color: '173A2F'
		},
		{
			color: '153944'
		},
		{
			color: '27548D'
		},
		{
			color: '438AAC'
		}  
		];

	const TRAY = document.getElementById('js-tray-slide');

	//---------------------------------TO CHANGE TO JPG--------------------
	// Function - Build Colors
	function buildColors(colors) {
		for (let [i, color] of colors.entries()) {
		let swatch = document.createElement('div');
		swatch.classList.add('tray__swatch');
	
		swatch.style.background = "#" + color.color;
	
		swatch.setAttribute('data-key', i);
		TRAY.append(swatch);
		}
	}
	
	buildColors(colors);
	//----------------------------------------------------------------------

	//--------------------SETUP SWATCHES-------------------------------------
	const swatches = document.querySelectorAll(".tray__swatch");

	for (const swatch of swatches) {
	swatch.addEventListener('click', selectSwatch);
	}
	var currentSelection;
	function selectSwatch(e) {
		let color = colors[parseInt(e.target.dataset.key)];
		let new_mtl;

		new_mtl = new THREE.MeshPhongMaterial({
			color: parseInt('0x' + color.color),
			shininess: color.shininess ? color.shininess : 10
			
		});
	
	setMaterial(currentSelection, new_mtl);
	}

	function setMaterial(parent, mtl) {
		parent.children[0].material = mtl;
	}
	//------------------------------------------------------------------------


	document.addEventListener("click", onMouseClick, false);
	var mouse = new THREE.Vector2();
	var raycaster = new THREE.Raycaster();

	//------------------------------OUTLINE PASS SETUP------------------------------------------------
	var selectedObjects = [];

	var composer, copyshader, outlinePass;
	function addSelectedObject( object ) {

		selectedObjects = [];
		selectedObjects.push( object );

	}
	var outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
	outlinePass.edgeStrength = Number( 10 );
	outlinePass.edgeGlow = Number( 0);
	outlinePass.edgeThickness = Number( 1 );
	outlinePass.pulsePeriod = Number( 0 );
	outlinePass.visibleEdgeColor.set( "#ffffff" );
	outlinePass.hiddenEdgeColor.set( "#000000" );

	composer = new EffectComposer( renderer );

	var renderPass = new RenderPass( scene, camera );
	composer.addPass( renderPass );

	var taaRenderPass = new TAARenderPass( scene, camera );
	taaRenderPass.unbiased = true;
	taaRenderPass.enabled = true;
	taaRenderPass.sampleLevel = 3;
	composer.addPass( taaRenderPass );
	outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera );
	composer.addPass( outlinePass );
	/*effectFXAA = new ShaderPass( FXAAShader );
	effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
	composer.addPass( effectFXAA );*/
	
	copyshader = new ShaderPass( FXAAShader );
	copyshader.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
	composer.addPass( copyshader );

	//----------------------------------------------------------------------------------------------

	function chooseBodyPart(temp, obj)
	{
		currentSelection = temp;
		var selectedObject = obj;
		addSelectedObject( selectedObject );
		outlinePass.selectedObjects = selectedObjects;
	}

	function onMouseClick(event)
	{
		event.preventDefault();

		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		//---------------------PICK BODY PART----------------------
		// update the picking ray with the camera and mouse position
		raycaster.setFromCamera( mouse, camera );
		var selected_a_part = true;
		var intersects = [];
		// calculate objects intersecting the picking ray

		//TODO improve intersect such that it always picks front object
		if(hhtemp != null)
		{
			intersects = raycaster.intersectObjects( hhtemp.children );
			if(intersects.length > 0)
			{
				if(currentSelection != hhtemp)
				{
					chooseBodyPart(hhtemp, intersects[ 0 ].object);
				}
				else{
					selected_a_part = false;
					currentSelection = null;
				}
			}
		}

		var intersects = raycaster.intersectObjects( htemp.children );
			if(intersects.length > 0)
			{
				if(currentSelection != htemp)
				{
					chooseBodyPart(htemp, intersects[ 0 ].object);
				}
				else{
					selected_a_part = false;
					currentSelection = null;
				}
			}

		intersects = raycaster.intersectObjects( ttemp.children );
			if(intersects.length > 0) 
			{
				if(currentSelection != ttemp)
				{
					chooseBodyPart(ttemp, intersects[ 0 ].object);
				}
				else{
					selected_a_part = false;
					currentSelection = null;
				}
				
			}

		intersects = raycaster.intersectObjects( latemp.children );
			if(intersects.length > 0)
			{
				if(currentSelection != latemp)
				{
					chooseBodyPart(latemp, intersects[ 0 ].object);
				}
				else{
					selected_a_part = false;
					currentSelection = null;
				}
			} 

		intersects = raycaster.intersectObjects( ratemp.children );
			if(intersects.length > 0)
			{
				if(currentSelection != ratemp)
				{
					chooseBodyPart(ratemp, intersects[ 0 ].object);
				}
				else{
					selected_a_part = false;
					currentSelection = null;
				}
			} 

		intersects = raycaster.intersectObjects( lltemp.children );
			if(intersects.length > 0) 
			{
				if(currentSelection != lltemp)
				{
					chooseBodyPart(lltemp, intersects[ 0 ].object);
				}
				else{
					selected_a_part = false;
					currentSelection = null;
				}
			}
			
		intersects = raycaster.intersectObjects( rltemp.children );
			if(intersects.length > 0)
			{
				if(currentSelection != rltemp)
				{
					chooseBodyPart(rltemp, intersects[ 0 ].object);
				}
				else{
					selected_a_part = false;
					currentSelection = null;
				}
			}
		if(!selected_a_part) outlinePass.selectedObjects = [];
		//-------------------------------------------------------
		
	}
//---------------------------------------------------------------------------------

//-----------------------------MODELS TO LOAD SETUP------------------------------
models.push([ "",
'/model/minecraft/steve_head.gltf',
'/model/minecraft/steve_body.gltf',
'/model/minecraft/steve_l_arm.gltf',
'/model/minecraft/steve_r_arm.gltf',
'/model/minecraft/steve_l_leg.gltf',
'/model/minecraft/steve_r_leg.gltf'
	]);
models.push(['/model/chibi/chibi_hair.gltf',
'/model/chibi/chibi_head.gltf',
'/model/chibi/chibi_body.gltf',
'/model/chibi/chibi_l_arm.gltf',
'/model/chibi/chibi_r_arm.gltf',
'/model/chibi/chibi_l_leg.gltf',
'/model/chibi/chibi_r_leg.gltf'
]);
//--------------------------------------------------------------------------------
//----------------------------------ADD MODEL----------------------------------------
function add_model_to_scene(gltf, name)
{
	gltf.scene.position.setY(1.5);
	gltf.scene.castShadow = true;
	gltf.scene.name = name;
	scene.add( gltf.scene );
	switch(name)
	{
		case "hair" : hhtemp = gltf.scene; break;
		case "head" : htemp = gltf.scene; break;
		case "torso" : ttemp = gltf.scene; break;
		case "leftarm" : latemp = gltf.scene; break;
		case "rightarm" : ratemp = gltf.scene; break;
		case "leftleg" : lltemp = gltf.scene; break;
		case "rightleg" : rltemp = gltf.scene; break;	
	}
	
}
//---------------------------------------------------------------------------------

//---------------------------------HAIR-------------------------------------------
hurl = models[hair][0];
if(hurl != "")// model has hair
loader.load( hurl,  (gltf) => add_model_to_scene(gltf , "hair")
	, undefined, function ( error ) { console.error( error );} );
//--------------------------------------------------------------------------------

//---------------------------------HEAD-------------------------------------------
hurl = models[head][1];
loader.load( hurl, (gltf) => add_model_to_scene(gltf , "head")
	, undefined, function ( error ) { console.error( error );} );

//--------------------------------------------------------------------

//-------------------------------BODY---------------------------------
hurl = models[torso][2];
loader.load( hurl, (gltf) => add_model_to_scene(gltf , "torso")
	, undefined, function ( error ) { console.error( error );} );
//-----------------------------------------------------------------

/*var textureLoader = new THREE.TextureLoader();
var map =  textureLoader.load("/model/test.jpg");
gltf.scene.children[0].material = new THREE.MeshPhongMaterial({
	map: map,
});*/ //TODO 

//------------------------------ARMS---------------------------------
hurl = models[arms][3];
hurl1 = models[arms][4];
loader.load( hurl, (gltf) => add_model_to_scene(gltf , "leftarm")
	, undefined, function ( error ) { console.error( error );} );
loader.load( hurl1, (gltf) => add_model_to_scene(gltf , "rightarm")
	, undefined, function ( error ) { console.error( error );} );
//---------------------------------------------------------------------

//---------------------------LEGS--------------------------------------
hurl = models[legs][5];
hurl1 = models[legs][6];
loader.load( hurl, (gltf) => add_model_to_scene(gltf , "leftleg")
	, undefined, function ( error ) { console.error( error );} );
loader.load( hurl1, (gltf) => add_model_to_scene(gltf , "rightleg")
	, undefined, function ( error ) { console.error( error );} );

//---------------------------PLANE--------------------------------
var geometry = new THREE.BoxBufferGeometry(1000, 0, 1000);
var material = new THREE.MeshPhongMaterial({ color: 0xA9A9A9 });
var plane = new THREE.Mesh(geometry, material);
plane.castShadow = false;
plane.receiveShadow = true;
plane.position.setY(-4);
scene.add(plane);
//-----------------------------------------------------------------

//---------------------------LIGHTING-----------------------------
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
//----------------------------------------------------------------

//------------------------------INDEX UPDATER----------------------------
function updateIndexes(){
	for(var i=0;i< scene.children.length;++i){
		switch(scene.children[i].name)
		{
			case "head" : ihead = i; break;
			case "torso" : itorso = i; break;
			case "leftarm" : ilarm = i; break;
			case "rightarm" : irarm = i; break;
			case "leftleg" : illeg = i; break;
			case "rightleg" : irleg = i; break;
			case "hair" : ihair = i; break;
		}
	}
}
//--------------------------------------------------------

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

//-------------------------------ANIMATE---------------------------------
var animate = function () {
	
	if(headchange){
		updateIndexes();
		var temp = scene.getObjectByName(scene.children[ihead].name);
		scene.remove(temp);
		if(head==0){
			updateIndexes();
			if(ihair!=99){
				var temp = scene.getObjectByName(scene.children[ihair].name);
				scene.remove(temp);
				hhtemp = null;
			}
		}else if(head==1){
			loader.load( '/model/chibi/chibi_hair.gltf', (gltf) => add_model_to_scene(gltf , "hair")
			, undefined, function ( error ) { console.error( error );} );
		}
		hurl = models[head][1];
		loader.load( hurl, (gltf) => add_model_to_scene(gltf , "head")
			, undefined, function ( error ) { console.error( error );} );
		headchange = false;
	}

	if(torsochange){
		updateIndexes();
		var temp = scene.getObjectByName(scene.children[itorso].name);
		scene.remove(temp);
		hurl = models[torso][2];
		loader.load( hurl, (gltf) => add_model_to_scene(gltf , "torso")
		, undefined, function ( error ) { console.error( error );} );
		torsochange = false;
	}

	if(armschange){
		updateIndexes();
		var temp = scene.getObjectByName(scene.children[ilarm].name);
		scene.remove(temp);
		updateIndexes();
		var temp1 = scene.getObjectByName(scene.children[irarm].name);
		scene.remove(temp1);
		
		hurl = models[arms][3];
		hurl1 = models[arms][4];
		loader.load( hurl, (gltf) => add_model_to_scene(gltf , "leftarm")
			, undefined, function ( error ) { console.error( error );} );
		loader.load( hurl1, (gltf) => add_model_to_scene(gltf , "rightarm")
			, undefined, function ( error ) { console.error( error );} );
		armschange = false;
	}

	if(legschange){
		updateIndexes();
		var temp = scene.getObjectByName(scene.children[illeg].name);
		scene.remove(temp);
		updateIndexes();
		var temp1 = scene.getObjectByName(scene.children[irleg].name);
		scene.remove(temp1);

		hurl = models[legs][5];
		hurl1 = models[legs][6];
		loader.load( hurl, (gltf) => add_model_to_scene(gltf , "leftleg")
			, undefined, function ( error ) { console.error( error );} );
		loader.load( hurl1, (gltf) => add_model_to_scene(gltf , "rightleg")
			, undefined, function ( error ) { console.error( error );} );
		legschange = false;
	}
	requestAnimationFrame(animate);

	controls.update();
	//renderer.render(scene, camera);
	composer.render();
};
//--------------------------------------------------------------

animate();

//---------------------------HTML CUSTOMIZE PLUSH-----------------------
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
	var hslideru = document.getElementById("headup");
	var hsliderl = document.getElementById("headleft");
	hslideru.oninput = function() {
		//var temp = scene.getObjectByName(scene.children[ihead].name);
		var t = this.value;
		htemp.position.setY(t);
		// console.log(t);
		if(hhtemp!=null){
			hhtemp.position.setY(t);
		}
	}
	hsliderl.oninput = function() {
		//var temp = scene.getObjectByName(scene.children[ihead].name);
		var t = this.value;
		htemp.position.setX(t);
		// console.log(t);
		if(hhtemp!=null){
			hhtemp.position.setX(t);
		}
	}

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
	var laslideru = document.getElementById("larmup");
	var lasliderl = document.getElementById("larmleft");
	var raslideru = document.getElementById("rarmup");
	var rasliderl = document.getElementById("rarmleft");
	laslideru.oninput = function() {
		// var temp = scene.getObjectByName(scene.children[ilarm].name);
		var t = this.value;
		latemp.position.setY(t);
		// console.log(t);
	}
	lasliderl.oninput = function() {
		// var latemp = scene.getObjectByName(scene.children[ilarm].name);
		var t = this.value;
		latemp.position.setX(t);
		// console.log(t);
	}
	raslideru.oninput = function() {
		// var temp = scene.getObjectByName(scene.children[irarm].name);
		var t = this.value;
		ratemp.position.setY(t);
		// console.log(t);
	}
	rasliderl.oninput = function() {
		// var ratemp = scene.getObjectByName(scene.children[irarm].name);
		var t = this.value;
		ratemp.position.setX(t);
		// console.log(t);
	}

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
	var tslideru = document.getElementById("torsoup");
	var tsliderl = document.getElementById("torsoleft");
	tslideru.oninput = function() {
		// var temp = scene.getObjectByName(scene.children[itorso].name);
		var t = this.value;
		ttemp.position.setY(t);
		// console.log(t);
	}
	tsliderl.oninput = function() {
		// var ttemp = scene.getObjectByName(scene.children[itorso].name);
		var t = this.value;
		ttemp.position.setX(t);
		// console.log(t);
	}

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
	var llslideru = document.getElementById("llegup");
	var llsliderl = document.getElementById("llegleft");
	var rlslideru = document.getElementById("rlegup");
	var rlsliderl = document.getElementById("rlegleft");
	llslideru.oninput = function() {
		// var temp = scene.getObjectByName(scene.children[illeg].name);
		var t = this.value;
		lltemp.position.setY(t);
		// console.log(t);
	}
	llsliderl.oninput = function() {
		// var lltemp = scene.getObjectByName(scene.children[illeg].name);
		var t = this.value;
		lltemp.position.setX(t);
		// console.log(t);
	}
	rlslideru.oninput = function() {
		// var temp = scene.getObjectByName(scene.children[irleg].name);
		var t = this.value;
		rltemp.position.setY(t);
		// console.log(t);
	}
	rlsliderl.oninput = function() {
		// var rltemp = scene.getObjectByName(scene.children[irleg].name);
		var t = this.value;
		rltemp.position.setX(t);
		// console.log(t);
	}

})
//----------------------------------------------------------------------------------------