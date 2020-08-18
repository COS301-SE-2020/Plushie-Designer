var THREE = require('three');
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { TAARenderPass } from 'three/examples/jsm/postprocessing/TAARenderPass.js';
import { UVsDebug } from './dynamicUV';

var headchange = false;
var torsochange = false;
var armschange = false; 
var legschange = false;
var hair = $("#toy_head")[0].value;
var head = $("#toy_head")[0].value;
var torso = $("#toy_torso")[0].value;
var arms = $("#toy_arms")[0].value;
var legs = $("#toy_legs")[0].value;

var headposy = $("#toy_head_pos")[0].value;
var headposx = $("#toy_head_posx")[0].value;
var headposz = $("#toy_head_posz")[0].value;
var torsoposy = $("#toy_torso_posy")[0].value;
var torsoposx = $("#toy_torso_posx")[0].value;
var torsoposz = $("#toy_torso_posz")[0].value;
var larmposy = $("#toy_larm_posy")[0].value;
var larmposx = $("#toy_larm_posx")[0].value;
var larmposz = $("#toy_larm_posz")[0].value;
var rarmposy = $("#toy_rarm_posy")[0].value;
var rarmposx = $("#toy_rarm_posx")[0].value;
var rarmposz = $("#toy_rarm_posz")[0].value;
var llegposy = $("#toy_lleg_posy")[0].value;
var llegposx = $("#toy_lleg_posx")[0].value;
var llegposz = $("#toy_lleg_posz")[0].value;
var rlegposy = $("#toy_rleg_posy")[0].value;
var rlegposx = $("#toy_rleg_posx")[0].value;
var rlegposz = $("#toy_rleg_posz")[0].value;
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
scene.background = new THREE.Color(0x909090);
scene.fog = new THREE.FogExp2(0x909090, 0.012);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 10);

const loadingManager = new THREE.LoadingManager( () => {
	
	const loadingScreen = document.getElementById( 'loading-screen' );
	loadingScreen.classList.add( 'fade-out' );
	
	// optional: remove loader from DOM via event listener
	loadingScreen.addEventListener( 'transitionend', onTransitionEnd );
	
} );

var controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

controls.minDistance = 13;
controls.maxDistance = 13;

controls.maxPolarAngle = Math.PI / 2;

var loader = new GLTFLoader(loadingManager);
var hurl = '';
var hurl1 = '';

var models = new Array();

//--------------------------------TEXTURE CHANGES---------------------------------------------
const colors = [
	{
		color: 'E3A668',
	},
	{
		texture: '/images/head.png',
		size: [3, 3, 3],
		shininess: 0
	},
	{
		color: '438AAC'
	},
	{
		color: '27548D'
	},
	{
		color: '153944'
	}  
	];


	const TRAY = document.getElementById('js-tray-slide');

	//---------------------------------TO CHANGE TO JPG--------------------
	// Function - Build Colors
	function buildColors(colors) {
		for (let [i, color] of colors.entries()) {
		let swatch = document.createElement('div');
		swatch.classList.add('tray__swatch');
	
		if (color.texture)
		{
		  swatch.style.backgroundImage = "url(" + color.texture + ")";   
		} else
		{
		  swatch.style.background = "#" + color.color;
		}
	
		swatch.setAttribute('data-key', i);
		TRAY.append(swatch);
		}
	}
	//----------------------------------------------------------------------
	buildColors(colors);

	//--------------------SETUP SWATCHES-------------------------------------
	const swatches = document.querySelectorAll(".tray__swatch");

	for (const swatch of swatches) {
	swatch.addEventListener('click', selectSwatch);
	}
	var currentSelection;
	function selectSwatch(e) {
		let color = colors[parseInt(e.target.dataset.key)];
		let new_mtl;
		let bmp = new THREE.TextureLoader().load('/images/cloth_map.jpg');
			bmp.repeat.set( 3, 3, 3);
			bmp.wrapS = THREE.RepeatWrapping;
			bmp.wrapT = THREE.RepeatWrapping;


		if (color.texture) {
      
			let txt = new THREE.TextureLoader().load(color.texture);
			
			txt.repeat.set( color.size[0], color.size[1], color.size[2]);
			txt.wrapS = THREE.RepeatWrapping;
			txt.wrapT = THREE.RepeatWrapping;
			
			new_mtl = new THREE.MeshPhongMaterial( {
			  map: txt,
			  shininess: color.shininess ? color.shininess : 10,
			  bumpMap: bmp,
			  bumpScale: 0.45
			});    
		  } 
		  else
		  {
			new_mtl = new THREE.MeshPhongMaterial({
				color: parseInt('0x' + color.color),
				shininess: color.shininess ? color.shininess : 10,
				bumpMap: bmp,
			 	bumpScale: 0.45
			  });
		  }
	
	setMaterial(currentSelection, new_mtl);
	}

	function setMaterial(parent, mtl) {
		if(parent == null)
		{
			alert("Select a body part before selecting a texture.");
			return;
		}

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

	//-------------------------TAA + FXAA SETUP---------------------------
	var renderPass, taaRenderPass;
	ConfigureCanvas();

	function ConfigureCanvas()
	{
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

		composer = new EffectComposer( renderer );
		renderPass = new RenderPass( scene, camera );
		composer.addPass( renderPass );

		taaRenderPass = new TAARenderPass( scene, camera );
		taaRenderPass.unbiased = true;
		taaRenderPass.enabled = true;
		taaRenderPass.sampleLevel = 3;
		composer.addPass( taaRenderPass );
		outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera );
		composer.addPass( outlinePass );
		
		copyshader = new ShaderPass( FXAAShader );
		copyshader.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
		composer.addPass( copyshader );
	}
	//----------------------------------------------------------------------------------------------

	function chooseBodyPart(obj)//TODO
	{	
		switch(obj.name)
		{
			case "hair" : currentSelection = hhtemp; break;
			case "head" : currentSelection = htemp; break;
			case "body" : currentSelection = ttemp; break;
			case "l_leg" : currentSelection = lltemp; break;
			case "r_leg" : currentSelection = rltemp; break;
			case "l_arm" : currentSelection = latemp; break;
			case "r_arm" : currentSelection = ratemp; break;
			default : return;
		}
		var selectedObject = obj;
		addSelectedObject( selectedObject );
		outlinePass.selectedObjects = selectedObjects;
	}

	function onMouseClick(event)
	{
		// event.preventDefault();

		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		//---------------------PICK BODY PART----------------------
		// update the picking ray with the camera and mouse position
		raycaster.setFromCamera( mouse, camera );
		var intersects = [];
		// calculate objects intersecting the picking ray
		intersects = raycaster.intersectObjects( scene.children , true );
		if(intersects.length > 0)
		{
			chooseBodyPart(intersects[ 0 ].object);
		}
		else{
			outlinePass.selectedObjects = [];
		}
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
	let color = colors[2];
		let new_mtl;
		let bmp = new THREE.TextureLoader().load('/images/cloth_map.jpg');
			bmp.repeat.set( 3, 3, 3);
			bmp.wrapS = THREE.RepeatWrapping;
			bmp.wrapT = THREE.RepeatWrapping;

	new_mtl = new THREE.MeshPhongMaterial({
			color: parseInt('0x' + color.color),
			shininess: color.shininess ? color.shininess : 10,
			bumpMap: bmp,
		 	bumpScale: 0.45
		  });
	setMaterial(gltf.scene, new_mtl);

	gltf.scene.position.setY(1.5);
	gltf.scene.children[0].castShadow = true;
	gltf.scene.name = name;
	scene.add( gltf.scene );
	switch(name)
	{
		case "hair" : 
			hhtemp = gltf.scene; 
			gltf.scene.position.setY(headposy); 
			gltf.scene.position.setX(headposx);
			gltf.scene.position.setZ(headposz);  
			break;
		case "head" :
			htemp = gltf.scene;
			gltf.scene.position.setY(headposy); 
			gltf.scene.position.setX(headposx);
			gltf.scene.position.setZ(headposz);  
			console.log(gltf.scene.children[0]);
			$("#toy_head_uv")[0].value = UVsDebug(gltf.scene.children[0].geometry, gltf.scene.children[0].scale.x, gltf.scene.children[0].scale.y).toDataURL("image/png");
			break;
		case "torso" : 
			ttemp = gltf.scene;
			gltf.scene.position.setY(torsoposy); 
			gltf.scene.position.setX(torsoposx);  
			gltf.scene.position.setZ(torsoposz);
			console.log(gltf.scene.children[0]);
			$("#toy_torso_uv")[0].value = UVsDebug(gltf.scene.children[0].geometry, gltf.scene.children[0].scale.x, gltf.scene.children[0].scale.y).toDataURL("image/png");
		break;
		case "leftarm" : 
			latemp = gltf.scene; 
			gltf.scene.position.setY(larmposy); 
			gltf.scene.position.setX(larmposx);
			gltf.scene.position.setZ(larmposz);
			$("#toy_larm_uv")[0].value = UVsDebug(gltf.scene.children[0].geometry, gltf.scene.children[0].scale.x, gltf.scene.children[0].scale.y).toDataURL("image/png");
		break;
		case "rightarm" : 
			ratemp = gltf.scene;
			gltf.scene.position.setY(rarmposy); 
			gltf.scene.position.setX(rarmposx); 
			gltf.scene.position.setZ(rarmposz);
			$("#toy_rarm_uv")[0].value = UVsDebug(gltf.scene.children[0].geometry, gltf.scene.children[0].scale.x, gltf.scene.children[0].scale.y).toDataURL("image/png");
		break;
		case "leftleg" : 
			lltemp = gltf.scene;
			gltf.scene.position.setY(llegposy); 
			gltf.scene.position.setX(llegposx);  
			gltf.scene.position.setZ(llegposz);
			$("#toy_lleg_uv")[0].value = UVsDebug(gltf.scene.children[0].geometry, gltf.scene.children[0].scale.x, gltf.scene.children[0].scale.y).toDataURL("image/png");
		break;
		case "rightleg" : 
			rltemp = gltf.scene;
			gltf.scene.position.setY(rlegposy); 
			gltf.scene.position.setX(rlegposx);  
			gltf.scene.position.setZ(rlegposz);
			$("#toy_rleg_uv")[0].value = UVsDebug(gltf.scene.children[0].geometry, gltf.scene.children[0].scale.x, gltf.scene.children[0].scale.y).toDataURL("image/png");
		break;	
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
//---------------------------------------------------------------------

//---------------------------PLANE--------------------------------
var geometry = new THREE.PlaneBufferGeometry(1000, 1000, 1000);
geometry.rotateX(-Math.PI * 0.5); // set horizontal since default is vertical
var material = new THREE.MeshPhongMaterial({ color: 0x999999 });
material.shininess = 0;
var plane = new THREE.Mesh(geometry, material);
plane.castShadow = false;
plane.receiveShadow = true;
plane.position.setY(-4.5);
scene.add(plane);
//-----------------------------------------------------------------

//---------------------------LIGHTING-----------------------------
var light = new THREE.AmbientLight(0xffffff);
light.intensity = 0.3;
scene.add(light);

var light = new THREE.DirectionalLight( 0xffffff, 0.5, 100 );
light.position.set( -2.5, 5, 5); 			//default; light shining from top
light.castShadow = true;            // default false
scene.add( light );

var light = new THREE.DirectionalLight( 0xffffff, 0.5, 100 );
light.position.set( 5, 2, -10); 			//default; light shining from top
light.castShadow = false;            // default false
light.intensity = 0.15;
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

	ConfigureCanvas();

}

var tempy;
var tempx;
var tempz;
//--------------------------DragControls-------------------------
var Dcontrols = new DragControls( scene.children, camera, renderer.domElement );
// Dcontrols.transformGroup = true;
Dcontrols.addEventListener( 'dragstart', function ( event ) {

	if(event.object.name == "" || event.object.name == "hair" || event.object.name == "HeadBow008" || event.object.name == "HeadBow007" || event.object.name == "HairBow_base003" ){
		Dcontrols.enabled = false;
	}
	else{
		event.object.material.emissive.set( 0xaaaaaa );
		controls.enableRotate = false;
		tempy = event.object.position.y;
		tempx = event.object.position.x;
		tempz = event.object.position.z;
	}
} );

Dcontrols.addEventListener( 'dragend', function ( event ) {

	if(event.object.name == "" || event.object.name == "hair" || event.object.name == "HeadBow008" || event.object.name == "HeadBow007" || event.object.name == "HairBow_base003" ){
		Dcontrols.enabled = true;
	}
	else{
		event.object.material.emissive.set( 0x000000 );
		controls.enableRotate = true;
		if(event.object.name == "head"){
			updateIndexes();
			$("#toy_head_pos")[0].value = event.object.position.y - tempy;
			// console.log($("#toy_head_pos")[0].value);
			$("#toy_head_posx")[0].value = event.object.position.x - tempx;
			$("#toy_head_posz")[0].value = event.object.position.z - tempz;
			if(ihair!=99){
				hhtemp.position.setY($("#toy_head_pos")[0].value);
				hhtemp.position.setX($("#toy_head_posx")[0].value);
				hhtemp.position.setZ($("#toy_head_posz")[0].value);
			}
		}
		console.log(event.object.name);
		if(event.object.name == "body"){
			$("#toy_torso_posy")[0].value = event.object.position.y - tempy;
			$("#toy_torso_posx")[0].value = event.object.position.x - tempx;
			$("#toy_torso_posz")[0].value = event.object.position.z - tempz;
		}
		if(event.object.name == "l_arm"){
			$("#toy_larm_posy")[0].value = event.object.position.y - tempy;
			$("#toy_larm_posx")[0].value = event.object.position.x - tempx;
			$("#toy_larm_posz")[0].value = event.object.position.z - tempz;
		}
		if(event.object.name == "r_arm"){
			$("#toy_rarm_posy")[0].value = event.object.position.y - tempy;
			$("#toy_rarm_posx")[0].value = event.object.position.x - tempx;
			$("#toy_rarm_posz")[0].value = event.object.position.z - tempz;
		}

		if(event.object.name == "l_leg"){
			$("#toy_lleg_posy")[0].value = event.object.position.y - tempy;
			// console.log($("#toy_lleg_posy")[0].value);
			$("#toy_lleg_posx")[0].value = event.object.position.x - tempx;
			$("#toy_lleg_posz")[0].value = event.object.position.z - tempz;
		}
		if(event.object.name == "r_leg"){
			$("#toy_rleg_posy")[0].value = event.object.position.y - tempy;
			$("#toy_rleg_posx")[0].value = event.object.position.x - tempx;
			$("#toy_rleg_posz")[0].value = event.object.position.z - tempz;
		}
	}
} );
//----------------------------------------------------------------
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

function screensh(){
	controls.reset();
	// var w = window.open('', '');
	// w.document.title = "Screenshot";
	var img = new Image();
	renderer.setSize(500, 500);
	camera.aspect = 500 / 500;
	camera.position.set(0, 0.32, 8.5);
	camera.updateProjectionMatrix();
    renderer.render(scene, camera);
	img.src = renderer.domElement.toDataURL();
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.position.set(0, 1, 10);
	camera.updateProjectionMatrix();
	// w.document.body.appendChild(img);
	$("#toy_image")[0].value = img.src;
}

$(document).ready(function(){
	$('#share-btn').click(function () {
		screensh();
	});

	$('#headl').click(function () {
		if($("#toy_head")[0].value > 0){
			headchange = true;
			$("#toy_head")[0].value -= 1;
			head = $("#toy_head")[0].value;
		}
	});
	$('#headr').click(function () {
		var tmp = $("#toy_head")[0].value;
		if(tmp < 1){
			headchange = true;
			tmp = +tmp + +1;
			$("#toy_head")[0].value = tmp;
			head = $("#toy_head")[0].value;
		}
	});
	var hslideru = document.getElementById("headup");
	var hsliderl = document.getElementById("headleft");
	var hsliderf = document.getElementById("headfront");
	hslideru.oninput = function() {
		//var temp = scene.getObjectByName(scene.children[ihead].name);
		var t = this.value;
		htemp.position.setY(t);
		// console.log(t);
		if(hhtemp!=null){
			hhtemp.position.setY(t);
		}
		$("#toy_head_pos")[0].value = t;
	}
	hsliderl.oninput = function() {
		//var temp = scene.getObjectByName(scene.children[ihead].name);
		var t = this.value;
		htemp.position.setX(t);
		// console.log(t);
		if(hhtemp!=null){
			hhtemp.position.setX(t);
		}
		$("#toy_head_posx")[0].value = t;
	}
	hsliderf.oninput = function() {
		//var temp = scene.getObjectByName(scene.children[ihead].name);
		var t = this.value;
		htemp.position.setZ(-t);
		// console.log(t);
		if(hhtemp!=null){
			hhtemp.position.setZ(-t);
		}
		$("#toy_head_posz")[0].value = -t;
	}

	$('#armsl').click(function () {
		if($("#toy_arms")[0].value > 0){
			armschange = true;
			$("#toy_arms")[0].value -= 1;
			arms = $("#toy_arms")[0].value;
		}
	});
	$('#armsr').click(function () {
		var tmp = $("#toy_arms")[0].value;
		if(tmp < 1){
			armschange = true;
			tmp = +tmp + +1;
			$("#toy_arms")[0].value = tmp;
			arms = $("#toy_arms")[0].value;
		}
	});
	var laslideru = document.getElementById("larmup");
	var lasliderl = document.getElementById("larmleft");
	var lasliderf = document.getElementById("larmfront");
	var raslideru = document.getElementById("rarmup");
	var rasliderl = document.getElementById("rarmleft");
	var rasliderf = document.getElementById("rarmfront");
	laslideru.oninput = function() {
		// var temp = scene.getObjectByName(scene.children[ilarm].name);
		var t = this.value;
		latemp.position.setY(t);
		// console.log(t);
		$("#toy_larm_posy")[0].value = t;
	}
	lasliderl.oninput = function() {
		// var latemp = scene.getObjectByName(scene.children[ilarm].name);
		var t = this.value;
		latemp.position.setX(t);
		// console.log(t);
		$("#toy_larm_posx")[0].value = t;
	}
	lasliderf.oninput = function() {
		// var latemp = scene.getObjectByName(scene.children[ilarm].name);
		var t = this.value;
		latemp.position.setZ(-t);
		$("#toy_larm_posz")[0].value = -t;
		// console.log(t);
	}
	raslideru.oninput = function() {
		// var temp = scene.getObjectByName(scene.children[irarm].name);
		var t = this.value;
		ratemp.position.setY(t);
		// console.log(t);
		$("#toy_rarm_posy")[0].value = t;
	}
	rasliderl.oninput = function() {
		// var ratemp = scene.getObjectByName(scene.children[irarm].name);
		var t = this.value;
		ratemp.position.setX(t);
		// console.log(t);
		$("#toy_rarm_posx")[0].value = t;
	}
	rasliderf.oninput = function() {
		// var ratemp = scene.getObjectByName(scene.children[irarm].name);
		var t = this.value;
		ratemp.position.setZ(-t);
		$("#toy_rarm_posz")[0].value = -t;
		// console.log(t);
	}

	$('#torsol').click(function () {
		if($("#toy_torso")[0].value > 0){
			torsochange = true;
			$("#toy_torso")[0].value -= 1;
			torso = $("#toy_torso")[0].value;
		}
	});
	$('#torsor').click(function () {
		var tmp = $("#toy_torso")[0].value;
		if(tmp < 1){
			torsochange =  true;
			tmp = +tmp + +1;
			$("#toy_torso")[0].value = tmp;
			torso = $("#toy_torso")[0].value;
		}
	});
	var tslideru = document.getElementById("torsoup");
	var tsliderl = document.getElementById("torsoleft");
	var tsliderf = document.getElementById("torsofront");
	tslideru.oninput = function() {
		// var temp = scene.getObjectByName(scene.children[itorso].name);
		var t = this.value;
		ttemp.position.setY(t);
		// console.log(t);
		$("#toy_torso_posy")[0].value = t;
	}
	tsliderl.oninput = function() {
		// var ttemp = scene.getObjectByName(scene.children[itorso].name);
		var t = this.value;
		ttemp.position.setX(t);
		// console.log(t);
		$("#toy_torso_posx")[0].value = t;
	}
	tsliderf.oninput = function() {
		// var ttemp = scene.getObjectByName(scene.children[itorso].name);
		var t = this.value;
		ttemp.position.setZ(-t);
		$("#toy_torso_posz")[0].value = -t;
		// console.log(t);
	}

	$('#legsl').click(function () {
		if($("#toy_legs")[0].value > 0){
			legschange = true;
			$("#toy_legs")[0].value -= 1;
			legs = $("#toy_legs")[0].value;
		}
	});
	$('#legsr').click(function () {
		var tmp = $("#toy_legs")[0].value;
		if(tmp < 1){
			legschange = true;
			tmp = +tmp + +1;
			$("#toy_legs")[0].value = tmp;
			legs = $("#toy_legs")[0].value;
		}
	});
	var llslideru = document.getElementById("llegup");
	var llsliderl = document.getElementById("llegleft");
	var llsliderf = document.getElementById("llegfront");
	var rlslideru = document.getElementById("rlegup");
	var rlsliderl = document.getElementById("rlegleft");
	var rlsliderf = document.getElementById("rlegfront");
	llslideru.oninput = function() {
		// var temp = scene.getObjectByName(scene.children[illeg].name);
		var t = this.value;
		lltemp.position.setY(t);
		// console.log(t);
		$("#toy_lleg_posy")[0].value = t;
	}
	llsliderl.oninput = function() {
		// var lltemp = scene.getObjectByName(scene.children[illeg].name);
		var t = this.value;
		lltemp.position.setX(t);
		// console.log(t);
		$("#toy_lleg_posx")[0].value = t;
	}
	llsliderf.oninput = function() {
		// var lltemp = scene.getObjectByName(scene.children[illeg].name);
		var t = this.value;
		lltemp.position.setZ(-t);
		$("#toy_lleg_posz")[0].value = -t;
		// console.log(t);
	}
	rlslideru.oninput = function() {
		// var temp = scene.getObjectByName(scene.children[irleg].name);
		var t = this.value;
		rltemp.position.setY(t);
		// console.log(t);
		$("#toy_rleg_posy")[0].value = t;
	}
	rlsliderl.oninput = function() {
		// var rltemp = scene.getObjectByName(scene.children[irleg].name);
		var t = this.value;
		rltemp.position.setX(t);
		// console.log(t);
		$("#toy_rleg_posx")[0].value = t;
	}
	rlsliderf.oninput = function() {
		// var rltemp = scene.getObjectByName(scene.children[irleg].name);
		var t = this.value;
		rltemp.position.setZ(-t);
		$("#toy_rleg_posz")[0].value = -t;
		// console.log(t);
	}

})

function onTransitionEnd( event ) {

	event.target.remove();
	
}