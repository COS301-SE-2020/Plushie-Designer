var THREE = require('three');
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


var hair = $(".head").data("head");
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

//---------------------------LIGHTING-------------------------------
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
//------------------------------------------------------------------

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