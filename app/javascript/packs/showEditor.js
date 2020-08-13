var THREE = require('three');
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { TAARenderPass } from 'three/examples/jsm/postprocessing/TAARenderPass.js';
import { UVsDebug } from './dynamicUV';


var hair = 0;
var head = $(".head").data("head");
var torso = $(".torso").data("torso");
var arms = $(".arms").data("arms");
var legs = $(".legs").data("legs");
var headposy = $(".headposy").data("headposy");
var headposx = $(".headposx").data("headposx");
var headposz = $(".headposz").data("headposz");
var torsoposy = $(".torsoposy").data("torsoposy");
var torsoposx = $(".torsoposx").data("torsoposx");
var torsoposz = $(".torsoposz").data("torsoposz");
var larmposy = $(".larmposy").data("larmposy");
var larmposx = $(".larmposx").data("larmposx");
var larmposz = $(".larmposz").data("larmposz");
var rarmposy = $(".rarmposy").data("rarmposy");
var rarmposx = $(".rarmposx").data("rarmposx");
var rarmposz = $(".rarmposz").data("rarmposz");
var llegposy = $(".llegposy").data("llegposy");
var llegposx = $(".llegposx").data("llegposx");
var llegposz = $(".llegposz").data("llegposz");
var rlegposy = $(".rlegposy").data("rlegposy");
var rlegposx = $(".rlegposx").data("rlegposx");
var rlegposz = $(".rlegposz").data("rlegposz");

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
			texture: '/images/box.jpg',
			size: [1,1,1],
			shininess: 60
		},
		{
			texture: '/images/head.png',
			size: [3, 3, 3],
			shininess: 0
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
	gltf.scene.position.setY(1.5);
	gltf.scene.castShadow = true;
	gltf.scene.name = name;
	scene.add( gltf.scene );
	switch(name)
	{
		case "hair" : 
			gltf.scene.position.setY(headposy); 
			gltf.scene.position.setX(headposx);
			gltf.scene.position.setZ(headposz);  
			break;
		case "head" :
			gltf.scene.position.setY(headposy); 
			gltf.scene.position.setX(headposx);
			gltf.scene.position.setZ(headposz);  
			break;
		case "torso" : 
			gltf.scene.position.setY(torsoposy); 
			gltf.scene.position.setX(torsoposx);  
			gltf.scene.position.setZ(torsoposz);
			console.log(gltf.scene.children[0]);
		break;
		case "leftarm" :  
			gltf.scene.position.setY(larmposy); 
			gltf.scene.position.setX(larmposx);
			gltf.scene.position.setZ(larmposz);
		break;
		case "rightarm" : 
			gltf.scene.position.setY(rarmposy); 
			gltf.scene.position.setX(rarmposx); 
			gltf.scene.position.setZ(rarmposz);
		break;
		case "leftleg" : 
			gltf.scene.position.setY(llegposy); 
			gltf.scene.position.setX(llegposx);  
			gltf.scene.position.setZ(llegposz);
		break;
		case "rightleg" : 
			gltf.scene.position.setY(rlegposy); 
			gltf.scene.position.setX(rlegposx);  
			gltf.scene.position.setZ(rlegposz);
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

var geometry = new THREE.BoxBufferGeometry(1000, 0, 1000);
var material = new THREE.MeshPhongMaterial({ color: 0xA9A9A9 });
var plane = new THREE.Mesh(geometry, material);
plane.castShadow = false;
plane.receiveShadow = true;
plane.position.setY(-5);
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

function onTransitionEnd( event ) {

	event.target.remove();
	
}