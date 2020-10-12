var THREE = require('three');
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { TAARenderPass } from 'three/examples/jsm/postprocessing/TAARenderPass.js';
import { UVsDebug } from './dynamicUV';
import { ColorKeyframeTrack, ImageUtils } from 'three/build/three.module';
import {
	EventDispatcher,
	MOUSE,
	Quaternion,
	Spherical,
	TOUCH,
	Vector2,
	Vector3
} from "three/build/three.module.js";

function readTextFile(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("application/json");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function() {
		if (rawFile.readyState === 4 && rawFile.status == "200") {
			callback(rawFile.responseText);
		}
	}
	rawFile.send(null);
}

$.ajax({
	url: "/head_models",
	dataType: "json",
	success:  function(head_models){
		// console.log(head_models);
		$.ajax({
			url: "/body_models",
			dataType: "json",
			success:  function(body_models){
				// console.log(body_models);
				$.ajax({
					url: "/l_arm_models",
					dataType: "json",
					success:  function(l_arm_models){
						// console.log(l_arm_models);
						$.ajax({
							url: "/r_arm_models",
							dataType: "json",
							success:  function(r_arm_models){
								// console.log(r_arm_models);
								$.ajax({
									url: "/l_leg_models",
									dataType: "json",
									success:  function(l_leg_models){
										// console.log(l_leg_models);
										$.ajax({
											url: "/r_leg_models",
											dataType: "json",
											success:  function(r_leg_models){
												readTextFile("/file_paths1.JSON", function(text){
													var data = JSON.parse(text);
													// console.log(r_leg_models);
													var headchange = false;
													var torsochange = false;
													var larmchange = false; 
													var rarmchange = false; 
													var llegchange = false;
													var rlegchange = false;
													var bchange = false;
													var texturepanel = false;

													var type = 0;
													var typechange = false;
													var bzoom = false;
													var menuitem = "type";

													var hair = $("#toy_head")[0].value;
													var head = $("#toy_head")[0].value;
													var torso = $("#toy_torso")[0].value;
													var larm = $("#toy_arms")[0].value;
													var rleg = $("#toy_r_leg")[0].value;
													var rarm = $("#toy_r_arm")[0].value;
													var lleg = $("#toy_legs")[0].value;
													var room = 0;
													var rtmp = 0;

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
													var ib = 9;

													var htemp;
													var ttemp;
													var latemp;
													var ratemp;
													var lltemp;
													var rltemp;
													var hhtemp = null;
													var btemp;

													var scene = new THREE.Scene();
													scene.background = new THREE.Color(0x6c768d);
													scene.fog = new THREE.FogExp2(0x6c768d, 0.012);

													var renderer = new THREE.WebGLRenderer({ antialias: true });
													renderer.setPixelRatio(window.devicePixelRatio);
													renderer.setSize(window.innerWidth, window.innerHeight);
													renderer.shadowMap.enabled = true;
													renderer.shadowMap.type = THREE.PCFSoftShadowMap;
													document.body.appendChild(renderer.domElement);

													var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
													camera.position.set(0, 1, 13);

													const loadingManager = new THREE.LoadingManager( () => {
														
														const loadingScreen = document.getElementById( 'loading-screen' );
														loadingScreen.classList.add( 'fade-out' );
														
														// optional: remove loader from DOM via event listener
														loadingScreen.addEventListener( 'transitionend', onTransitionEnd );
														
													} );

													var controls = new OrbitControls(camera, renderer.domElement);

													controls.enableDamping = true;
													controls.dampingFactor = 0.05;

													controls.minDistance = 6;
													controls.maxDistance = 20;

													controls.enablePan = false;

													controls.maxPolarAngle = Math.PI / 2;

													var loader = new GLTFLoader(loadingManager);
													var hurl = '';
													var hurl1 = '';
													var burl = '';

													var models = new Array();
													var rooms = new Array();
													// //-----------------------------Background-------------------------------

													// loader.load( '/background/Room/scene.gltf', function ( gltf ) {
													// 	gltf.scene.position.setY(-24);
													// 	gltf.scene.position.setX(-4.5);
													// 	// gltf.scene.castShadow = false;
													// 	gltf.scene.children[0].receiveShadow = true;
													// 	gltf.scene.rotateY(-Math.PI/4);
													// 	// // gltf.scene.material.shininess = 0;
													// 	gltf.scene.scale.set(20,20,20);
													// 	// console.log(gltf);
													// 	scene.add( gltf.scene );

													// }, undefined, function ( error ) {

													// 	console.error( error );

													// } );
													// //----------------------------------------------------------------------
													//--------------------------------TEXTURE CHANGES---------------------------------------------
													var colors = [
														{
															color: 'E3A668',
														},
														{
															color: 'FC0303'
															// texture: '/images/head.png',
															// size: [3, 3, 3],
															// shininess: 0
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
														const color_picker = document.getElementById('color-picker');
														color_picker.onchange = addColorSwatch;
														
														function addColorSwatch()
														{
															let swatch = document.createElement('div');
															swatch.classList.add('tray__swatch');
															swatch.style.background = color_picker.value;
															
															swatch.setAttribute('data-key', colors.length);
															colors.push({
																color: color_picker.value.replace('#','')
															});
															swatch.addEventListener('click', selectSwatch);
															TRAY.append(swatch);
														}

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
														//---------------------SAVE TO DB----------------------
														function saveTextureToDB(tex)
													{
														switch(currentSelection)
														{
															case htemp:  $("#toy_head_tex")[0].value = tex;
															$("#toy_head_uv")[0].value = UVsDebug(htemp.children[0].geometry, htemp.children[0].scale.x, htemp.children[0].scale.y,
																tex, false).toDataURL("image/png");
															break;
															case ttemp:  $("#toy_torso_tex")[0].value = tex;
															$("#toy_torso_uv")[0].value = UVsDebug(ttemp.children[0].geometry, ttemp.children[0].scale.x, ttemp.children[0].scale.y,
																tex, false).toDataURL("image/png");
															break;
															case lltemp:  $("#toy_lleg_tex")[0].value = tex;
															$("#toy_lleg_uv")[0].value = UVsDebug(lltemp.children[0].geometry, lltemp.children[0].scale.x, lltemp.children[0].scale.y,
																tex, false).toDataURL("image/png");
															break;
															case rltemp:  $("#toy_rleg_tex")[0].value = tex;
															$("#toy_rleg_uv")[0].value = UVsDebug(rltemp.children[0].geometry, rltemp.children[0].scale.x, rltemp.children[0].scale.y,
																tex, false).toDataURL("image/png");
															break;
															case latemp:  $("#toy_larm_tex")[0].value = tex;
															$("#toy_larm_uv")[0].value = UVsDebug(latemp.children[0].geometry, latemp.children[0].scale.x, latemp.children[0].scale.y,
																tex, false).toDataURL("image/png");
															break;
															case ratemp:  $("#toy_rarm_tex")[0].value = tex;
															$("#toy_rarm_uv")[0].value = UVsDebug(ratemp.children[0].geometry, ratemp.children[0].scale.x, ratemp.children[0].scale.y,
																tex, false).toDataURL("image/png");
															break;												
														}
													}
													//------------------------------------------------------

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
																saveTextureToDB(color.texture);														
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
																saveTextureToDB(color.color);
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
															parent.children.forEach(obj => {
																obj.material = mtl;
															});
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
														function zoomin(obj, anim){
															if(bzoom){
																zoomreset();
																controls.target = new THREE.Vector3(obj.position.x,obj.position.y,obj.position.z);
																camera.position.set(obj.position.x, obj.position.y, 13);	
																controls.minDistance = 6;
																if(!anim){
																	var i = 1;

																	function myLoop() {
																		setTimeout(function() {   
																			controls.dIn(i);
																			controls.update();
																			i -= 0.1;                   
																			if (i >= 0.1) {           
																			myLoop();             
																			}                       
																		}, 15)																	
																	}	
																	myLoop(); 
																}else{
																	controls.dIn(0.1);
																	controls.update();
																}																												
															}
														}

														function zoomreset(){
															controls.target = new THREE.Vector3(0,0,0);
															camera.position.set(0, 1, 13);	
															controls.minDistance = 6; 
															controls.dIn(1);
															controls.update();													
														}

														function chooseBodyPart(obj)//TODO
														{	
															switch(obj.name)
															{
																case "hair" : currentSelection = hhtemp; break;
																case htemp.children[0].name : 
																	if(menuitem != "head"){
																		if(!texturepanel){
																			$('.head-controls').click();
																		} else zoomin(htemp.children[0], false);																	
																	}
																	if(head < data.file_paths.models.length-1)
																		populateInfoCard(data.file_paths.models[head].head.title,data.file_paths.models[head].head.desc,data.file_paths.models[head].head.img);
																	else
																		populateInfoCard("Coming Soon", "No Information for uploaded models.", head_models[head-data.file_paths.models.length].head_image.url);

																	currentSelection = htemp; 
																	// zoomin(obj);
																	break;
																case ttemp.children[0].name : 
																	if(menuitem != "torso"){
																		if(!texturepanel){
																			$('.torso-controls').click();
																		} else zoomin(ttemp.children[0], false);																																				
																	}
																	if(torso < data.file_paths.models.length-1)
																		populateInfoCard(data.file_paths.models[torso].body.title,data.file_paths.models[torso].body.desc,data.file_paths.models[torso].body.img);
																	else
																		populateInfoCard("Coming Soon", "No Information for uploaded models.", body_models[torso-data.file_paths.models.length].body_image.url);
																	currentSelection = ttemp; 
																	// zoomin(obj);
																	break;
																case lltemp.children[0].name :
																	if(menuitem != "l-legs"){
																		if(!texturepanel){
																			$('.l-legs-controls').click();	
																		} else zoomin(lltemp.children[0], false);																																			
																	}
																	if(lleg < data.file_paths.models.length-1)
																		populateInfoCard(data.file_paths.models[lleg].l_leg.title,data.file_paths.models[lleg].l_leg.desc,data.file_paths.models[lleg].l_leg.img);
																	else
																		populateInfoCard("Coming Soon", "No Information for uploaded models.", l_leg_models[lleg-data.file_paths.models.length].l_leg_image.url);
																	currentSelection = lltemp; 
																	// zoomin(obj);
																	break;
																case rltemp.children[0].name : 
																	if(menuitem != "r-legs"){
																		if(!texturepanel){
																			$('.r-legs-controls').click();	
																		} else zoomin(rltemp.children[0], false);																																			
																	}
																	if(rleg < data.file_paths.models.length-1)
																		populateInfoCard(data.file_paths.models[rleg].r_leg.title,data.file_paths.models[rleg].r_leg.desc,data.file_paths.models[rleg].r_leg.img);
																	else
																		populateInfoCard("Coming Soon", "No Information for uploaded models.", r_leg_models[rleg-data.file_paths.models.length].r_leg_image.url);
																	currentSelection = rltemp; 
																	// zoomin(obj);
																	break;
																case latemp.children[0].name : 
																	if(menuitem != "l-arms"){
																		if(!texturepanel){
																			$('.l-arms-controls').click();
																		} else zoomin(latemp.children[0], false);																																				
																	}
																	if(larm < data.file_paths.models.length-1)
																		populateInfoCard(data.file_paths.models[larm].l_arm.title,data.file_paths.models[larm].l_arm.desc,data.file_paths.models[larm].l_arm.img);
																	else
																		populateInfoCard("Coming Soon", "No Information for uploaded models.", l_arm_models[larm-data.file_paths.models.length].l_arm_image.url);
																	currentSelection = latemp; 
																	// zoomin(obj);
																	break;
																case ratemp.children[0].name :
																	if(menuitem != "r-arms"){
																		if(!texturepanel){
																			$('.r-arms-controls').click();	
																		} else zoomin(ratemp.children[0], false);																																			
																	}
																	if(rarm < data.file_paths.models.length-1)
																		populateInfoCard(data.file_paths.models[rarm].r_arm.title,data.file_paths.models[rarm].r_arm.desc,data.file_paths.models[rarm].r_arm.img);
																	else
																		populateInfoCard("Coming Soon", "No Information for uploaded models.", r_arm_models[rarm-data.file_paths.models.length].r_arm_image.url);
																	currentSelection = ratemp; 
																	// zoomin(obj);
																	break;
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
													//-----------------------------Populate the controls with models-------------------
													populateControls();
													//---------------------------------------------------------------------------------
													//----------------------------------ADD MODEL----------------------------------------
													function add_model_to_scene(gltf, name)
													{														
														let color = colors[2].color;
															
														// gltf.scene.position.setY(1.5);
														gltf.scene.children[0].castShadow = true;
														// gltf.scene.children[0].name = name;
														gltf.scene.name = name;
														scene.add( gltf.scene);
														switch(name)
														{
															case "hair" : 
																// console.log(gltf.scene);
																hhtemp = gltf.scene;
																color = $("#toy_head_tex")[0].value;
																if(headposy != 0.0){
																	gltf.scene.children[0].position.setY(headposy);
																}
																if(headposx != 0.0){
																	gltf.scene.children[0].position.setX(headposx);
																}
																if(headposz != 0.0){
																	gltf.scene.children[0].position.setZ(headposz); 
																}
																break;
															case "head" :
																htemp = gltf.scene;			
																if(menuitem == "head"){
																	currentSelection = htemp; 
																	var selectedObject = htemp.children[0];
																	addSelectedObject( selectedObject );
																	outlinePass.selectedObjects = selectedObjects;	
																}																																								
																color = $("#toy_head_tex")[0].value;
																if(headposy != 0.0){
																	headposy = -headposy;
																	headposy = -headposy;
																	gltf.scene.children[0].position.setY(headposy);																
																}else{
																	headposy = gltf.scene.children[0].position.y;
																	$("#toy_head_pos")[0].value = headposy;	
																}
																if(headposx != 0.0){
																	headposx = -headposx;
																	headposx = -headposx;
																	gltf.scene.children[0].position.setX(headposx);
																}else{
																	headposx = gltf.scene.children[0].position.x;
																	$("#toy_head_posx")[0].value = headposx;	
																}
																if(headposz != 0.0){
																	headposz = -headposz;
																	headposz = -headposz;
																	gltf.scene.children[0].position.setZ(headposz);
																}else{
																	headposz = gltf.scene.children[0].position.z;
																	$("#toy_head_posz")[0].value = headposz;	
																}
																// console.log(gltf.scene.children[0]);
																$("#toy_head_uv")[0].value = UVsDebug(gltf.scene.children[0].geometry, gltf.scene.children[0].scale.x, gltf.scene.children[0].scale.y,
																	color, false).toDataURL("image/png");
																zoomin(htemp.children[0], false);	
																$('#headup').attr("value",-headposy);	
																$('#headleft').attr("value",headposx);
																$('#headfront').attr("value",-headposz);												
																break;
															case "torso" : 
																ttemp = gltf.scene;
																if(menuitem == "torso"){
																	currentSelection = ttemp; 
																	var selectedObject = ttemp.children[0];
																	addSelectedObject( selectedObject );
																	outlinePass.selectedObjects = selectedObjects;	
																}
																color = $("#toy_torso_tex")[0].value;
																if(torsoposy != 0.0){
																	torsoposy = -torsoposy;
																	torsoposy = -torsoposy;
																	gltf.scene.children[0].position.setY(torsoposy);
																}else{
																	torsoposy = gltf.scene.children[0].position.y;
																	$("#toy_torso_posy")[0].value = torsoposy;
																}
																if(torsoposx != 0.0){
																	torsoposx = -torsoposx;
																	torsoposx = -torsoposx;
																	gltf.scene.children[0].position.setX(torsoposx);
																}else{
																	torsoposx = gltf.scene.children[0].position.x;
																	$("#toy_torso_posx")[0].value = torsoposx;
																}
																if(torsoposz != 0.0){
																	torsoposz = -torsoposz;
																	torsoposz = -torsoposz;
																	gltf.scene.children[0].position.setZ(torsoposz);
																}else{
																	torsoposz = gltf.scene.children[0].position.z;
																	$("#toy_torso_posz")[0].value = torsoposz;
																}
																// console.log(gltf.scene.children[0]);
																$("#toy_torso_uv")[0].value = UVsDebug(gltf.scene.children[0].geometry, gltf.scene.children[0].scale.x, gltf.scene.children[0].scale.y
																	, color, false ).toDataURL("image/png");
																zoomin(ttemp.children[0], false);		
																$('#torsoup').attr("value",-torsoposy);
																$('#torsoleft').attr("value",torsoposx);
																$('#torsofront').attr("value",-torsoposz);													
																break;
															case "leftarm" : 
																latemp = gltf.scene; 
																if(menuitem == "l-arms"){
																	currentSelection = latemp; 
																	var selectedObject = latemp.children[0];
																	addSelectedObject( selectedObject );
																	outlinePass.selectedObjects = selectedObjects;	
																}
																color = $("#toy_larm_tex")[0].value;
																if(larmposy != 0.0){
																	larmposy = -larmposy;
																	larmposy = -larmposy;
																	gltf.scene.children[0].position.setY(larmposy);
																}else{
																	larmposy = gltf.scene.children[0].position.y;
																	$("#toy_larm_posy")[0].value = larmposy;
																}
																if(larmposx != 0.0){
																	larmposx = -larmposx;
																	larmposx = -larmposx;
																	gltf.scene.children[0].position.setX(larmposx);
																}else{
																	larmposx = gltf.scene.children[0].position.x;
																	$("#toy_larm_posx")[0].value = larmposx;
																}
																if(larmposz != 0.0){
																	larmposz = -larmposz;
																	larmposz = -larmposz;
																	gltf.scene.children[0].position.setZ(larmposz);
																}else{
																	larmposz = gltf.scene.children[0].position.z;
																	$("#toy_larm_posz")[0].value = larmposz;
																}
																$("#toy_larm_uv")[0].value = UVsDebug(gltf.scene.children[0].geometry, gltf.scene.children[0].scale.x, gltf.scene.children[0].scale.y
																	, color, false).toDataURL("image/png");
																zoomin(latemp.children[0], false);		
																$('#larmup').attr("value",-larmposy);
																$('#larmleft').attr("value",larmposx);
																$('#larmfront').attr("value",-larmposz);
															break;
															case "rightarm" : 
																ratemp = gltf.scene;
																if(menuitem == "r-arms"){
																	currentSelection = ratemp; 
																	var selectedObject = ratemp.children[0];
																	addSelectedObject( selectedObject );
																	outlinePass.selectedObjects = selectedObjects;	
																}
																color = $("#toy_rarm_tex")[0].value;
																if(rarmposy != 0.0){
																	rarmposy = -rarmposy;
																	rarmposy = -rarmposy;
																	gltf.scene.children[0].position.setY(rarmposy);
																}else{
																	rarmposy = gltf.scene.children[0].position.y;
																	$("#toy_rarm_posy")[0].value = rarmposy;
																}
																if(rarmposx != 0.0){
																	rarmposx = -rarmposx;
																	rarmposx = -rarmposx;
																	gltf.scene.children[0].position.setX(rarmposx);
																}else{
																	rarmposx = gltf.scene.children[0].position.x;
																	$("#toy_rarm_posx")[0].value = rarmposx;
																}
																if(rarmposz != 0.0){
																	rarmposz = -rarmposz;
																	rarmposz = -rarmposz;
																	gltf.scene.children[0].position.setZ(rarmposz);
																}else{
																	rarmposz = gltf.scene.children[0].position.z;
																	$("#toy_rarm_posz")[0].value = rarmposz;
																}
																$("#toy_rarm_uv")[0].value = UVsDebug(gltf.scene.children[0].geometry, gltf.scene.children[0].scale.x, gltf.scene.children[0].scale.y,
																	color , false).toDataURL("image/png");
																zoomin(ratemp.children[0], false);		
																$('#rarmup').attr("value",-rarmposy);
																$('#rarmleft').attr("value",rarmposx);
																$('#rarmfront').attr("value",-rarmposz);	
															break;
															case "leftleg" : 
																lltemp = gltf.scene;
																if(menuitem == "l-legs"){
																	currentSelection = lltemp; 
																	var selectedObject = lltemp.children[0];
																	addSelectedObject( selectedObject );
																	outlinePass.selectedObjects = selectedObjects;	
																}
																color = $("#toy_lleg_tex")[0].value;
																if(llegposy != 0.0){
																	llegposy = -llegposy;
																	llegposy = -llegposy;
																	gltf.scene.children[0].position.setY(llegposy);
																}else{
																	llegposy = gltf.scene.children[0].position.y;
																	$("#toy_lleg_posy")[0].value = llegposy;
																}
																if(llegposx != 0.0){
																	llegposx = -llegposx;
																	llegposx = -llegposx;
																	gltf.scene.children[0].position.setX(llegposx);
																}else{
																	llegposx = gltf.scene.children[0].position.x;
																	$("#toy_lleg_posx")[0].value = llegposx;
																}
																if(llegposz != 0.0){
																	llegposz = -llegposz;
																	llegposz = -llegposz;
																	gltf.scene.children[0].position.setZ(llegposz);
																}else{
																	llegposz = gltf.scene.children[0].position.z;
																	$("#toy_lleg_posz")[0].value = llegposz;
																}
																$("#toy_lleg_uv")[0].value = UVsDebug(gltf.scene.children[0].geometry, gltf.scene.children[0].scale.x, gltf.scene.children[0].scale.y
																	,color , false).toDataURL("image/png");
																zoomin(lltemp.children[0], false);	
																$('#llegup').attr("value",-llegposy);
																$('#llegleft').attr("value",llegposx);
																$('#llegfront').attr("value",-llegposz);
															break;
															case "rightleg" : 
																rltemp = gltf.scene;
																if(menuitem == "r-legs"){
																	currentSelection = rltemp; 
																	var selectedObject = rltemp.children[0];
																	addSelectedObject( selectedObject );
																	outlinePass.selectedObjects = selectedObjects;	
																}
																color = $("#toy_rleg_tex")[0].value;
																if(rlegposy != 0.0){
																	rlegposy = -rlegposy;
																	rlegposy = -rlegposy;
																	gltf.scene.children[0].position.setY(rlegposy);
																}else{
																	rlegposy = gltf.scene.children[0].position.y;
																	$("#toy_rleg_posy")[0].value = rlegposy;
																}
																if(rlegposx != 0.0){
																	rlegposx = -rlegposx;
																	rlegposx = -rlegposx;
																	gltf.scene.children[0].position.setX(rlegposx);
																}else{
																	rlegposx = gltf.scene.children[0].position.x;
																	$("#toy_rleg_posx")[0].value = rlegposx;
																}
																if(rlegposz != 0.0){
																	rlegposz = -rlegposz;
																	rlegposz = -rlegposz;
																	gltf.scene.children[0].position.setZ(rlegposz);
																}else{
																	rlegposz = gltf.scene.children[0].position.z;
																	$("#toy_rleg_posz")[0].value = rlegposz;
																}
																$("#toy_rleg_uv")[0].value = UVsDebug(gltf.scene.children[0].geometry, gltf.scene.children[0].scale.x, gltf.scene.children[0].scale.y,
																	color , false).toDataURL("image/png");
																zoomin(rltemp.children[0], false);		
																$('#rlegup').attr("value",-rlegposy);
																$('#rlegleft').attr("value",rlegposx);
																$('#rlegfront').attr("value",-rlegposz);
															break;	
														}
														let new_mtl;
															let bmp = new THREE.TextureLoader().load('/images/cloth_map.jpg');
																bmp.repeat.set( 3, 3, 3);
																bmp.wrapS = THREE.RepeatWrapping;
																bmp.wrapT = THREE.RepeatWrapping;

														new_mtl = new THREE.MeshPhongMaterial({
																color: parseInt('0x' + color),
																shininess: 10,
																bumpMap: bmp,
																bumpScale: 0.45
															});
														setMaterial(gltf.scene, new_mtl);
														
													}
													//---------------------------------------------------------------------------------
													//----------------------------------ADD ROOM----------------------------------------
													function add_room_to_scene(gltf, name)
													{
														gltf.scene.name = name;														
														gltf.scene.rotateY(-Math.PI/4);
														switch(name)
														{
															case "Room_1" : 
																gltf.scene.position.setY(-24);
																gltf.scene.position.setX(-4.5);
																gltf.scene.scale.set(20,20,20);
																break;
															case "Room_2" : 
																gltf.scene.position.setY(-3.5);
																gltf.scene.position.setZ(36.5);
																gltf.scene.position.setX(46.5);
																gltf.scene.scale.set(2,2,2);
																break;
														}

														scene.add( gltf.scene );
														btemp = gltf.scene;
													}
													//---------------------------------------------------------------------------------
													//---------------------------------HAIR-------------------------------------------
													if(hair >= data.file_paths.models.length){
														hurl = "";
													}else hurl = data.file_paths.models[hair].hair;
													if(hurl != "")// model has hair
													loader.load( hurl,  (gltf) => add_model_to_scene(gltf , "hair")
														, undefined, function ( error ) { console.error( error );} );
													//--------------------------------------------------------------------------------

													//---------------------------------HEAD-------------------------------------------
													if(head >= data.file_paths.models.length){
														hurl = head_models[head - data.file_paths.models.length].head_file.url;
													}else hurl = data.file_paths.models[head].head.url;
													loader.load( hurl, (gltf) => add_model_to_scene(gltf , "head")
														, undefined, function ( error ) { console.error( error );} );

													//--------------------------------------------------------------------

													//-------------------------------BODY---------------------------------
													if(torso >= data.file_paths.models.length){
														hurl = body_models[torso - data.file_paths.models.length].body_file.url;
													}else hurl = data.file_paths.models[torso].body.url;
													loader.load( hurl, (gltf) => add_model_to_scene(gltf , "torso")
														, undefined, function ( error ) { console.error( error );} );
													//-----------------------------------------------------------------

													/*var textureLoader = new THREE.TextureLoader();
													var map =  textureLoader.load("/model/test.jpg");
													gltf.scene.children[0].material = new THREE.MeshPhongMaterial({
														map: map,
													});*/ //TODO 

													//------------------------------ARMS---------------------------------
													if(larm >= data.file_paths.models.length){
														hurl = l_arm_models[larm - data.file_paths.models.length].l_arm_file.url;
													}else hurl = data.file_paths.models[larm].l_arm.url;
													if(rarm >= data.file_paths.models.length){
														hurl1 = r_arm_models[rarm - data.file_paths.models.length].r_arm_file.url;
													}else hurl1 = data.file_paths.models[rarm].r_arm.url;
													loader.load( hurl, (gltf) => add_model_to_scene(gltf , "leftarm")
														, undefined, function ( error ) { console.error( error );} );
													loader.load( hurl1, (gltf) => add_model_to_scene(gltf , "rightarm")
														, undefined, function ( error ) { console.error( error );} );
													//---------------------------------------------------------------------

													//---------------------------LEGS--------------------------------------
													if(lleg >= data.file_paths.models.length){
														hurl = l_leg_models[lleg - data.file_paths.models.length].l_leg_file.url;
													}else hurl = data.file_paths.models[lleg].l_leg.url;
													if(rleg >= data.file_paths.models.length){
														hurl1 = r_leg_models[rleg - data.file_paths.models.length].r_leg_file.url;
													}else hurl1 = data.file_paths.models[rleg].r_leg.url;
													loader.load( hurl, (gltf) => add_model_to_scene(gltf , "leftleg")
														, undefined, function ( error ) { console.error( error );} );
													loader.load( hurl1, (gltf) => add_model_to_scene(gltf , "rightleg")
														, undefined, function ( error ) { console.error( error );} );
													//---------------------------------------------------------------------
													//---------------------------------Background-------------------------------------
													burl = data.file_paths.rooms.room_1;
													loader.load( burl,  (gltf) => add_room_to_scene(gltf , "Room_1")
														, undefined, function ( error ) { console.error( error );} );
													//--------------------------------------------------------------------------------
													//---------------------------PLANE--------------------------------
													var geometry = new THREE.PlaneBufferGeometry(1000, 1000, 1000);
													geometry.rotateX(-Math.PI * 0.5); // set horizontal since default is vertical
													var material = new THREE.MeshPhongMaterial({ color: 0x3b4252 });
													material.shininess = 0;
													var plane = new THREE.Mesh(geometry, material);
													plane.castShadow = false;
													plane.receiveShadow = true;
													plane.position.setY(-5.2);
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
																case "Room_1" : ib = i; break;
																case "Room_2" : ib = i; break;
															}
														}
													}
													//--------------------------------------------------------

													window.addEventListener( 'resize', onWindowResize, false );

													function onWindowResize() {

														ConfigureCanvas();

													}

													// var tempx;
													// var tempy;
													// var tempz;
													// // console.log(scene.children);
													// // console.log(scene.children.slice(3,10));
													// //--------------------------DragControls-------------------------
													// var Dcontrols = new DragControls( scene.children, camera, renderer.domElement );
													// // Dcontrols.transformGroup = true;
													// Dcontrols.addEventListener( 'dragstart', function ( event ) {
													// 	// console.log(event.object);
													// 	if(event.object.name == "" || event.object.name.match(/mesh_/) || event.object.name == "hair" || event.object.name == "HeadBow008" || event.object.name == "HeadBow007" || event.object.name == "HairBow_base003" ){
													// 		Dcontrols.enabled = false;
													// 	}
													// 	else{
													// 		event.object.material.emissive.set( 0xaaaaaa );
													// 		controls.enableRotate = false;
													// 		tempx = event.object.position.x;
													// 		tempy = event.object.position.y;
													// 		tempz = event.object.position.z;
													// 	}
													// } );

													// Dcontrols.addEventListener( 'dragend', function ( event ) {

													// 	if(event.object.name == "" || event.object.name.match(/mesh_/) || event.object.name == "hair" || event.object.name == "HeadBow008" || event.object.name == "HeadBow007" || event.object.name == "HairBow_base003" ){
													// 		Dcontrols.enabled = true;
													// 	}
													// 	else{
													// 		event.object.material.emissive.set( 0x000000 );
													// 		controls.enableRotate = true;															
													// 		if(event.object.name == "head"){
													// 			updateIndexes();
													// 			$("#toy_head_pos")[0].value = event.object.position.y;
													// 			// console.log($("#toy_head_pos")[0].value);
													// 			$("#toy_head_posx")[0].value = event.object.position.x;
													// 			$("#toy_head_posz")[0].value = event.object.position.z;
													// 			// $('#headup').attr("value",-event.object.position.y);	
													// 			// $('#headleft').attr("value",event.object.position.x);
													// 			// $('#headfront').attr("value",-event.object.position.z);	
													// 			// $('#headup').attr("max",event.object.position.y + 4);	
													// 			// $('#headleft').attr("max",event.object.position.x + 4);
													// 			// $('#headfront').attr("max",event.object.position.z + 4);	
													// 			// $('#headup').attr("min",-event.object.position.y-4);	
													// 			// $('#headleft').attr("min",-event.object.position.x-4);
													// 			// $('#headfront').attr("min",-event.object.position.z-4);	
													// 			if(ihair!=99){
													// 				hhtemp.children[0].position.setY($("#toy_head_pos")[0].value);
													// 				hhtemp.children[1].position.setY($("#toy_head_pos")[0].value);
													// 				hhtemp.children[2].position.setY($("#toy_head_pos")[0].value);
													// 				hhtemp.children[3].position.setY($("#toy_head_pos")[0].value);
													// 				hhtemp.children[0].position.setX($("#toy_head_posx")[0].value);
													// 				hhtemp.children[1].position.setX($("#toy_head_posx")[0].value);
													// 				hhtemp.children[2].position.setX($("#toy_head_posx")[0].value);
													// 				hhtemp.children[3].position.setX($("#toy_head_posx")[0].value);
													// 				hhtemp.children[0].position.setZ($("#toy_head_posz")[0].value);
													// 				hhtemp.children[1].position.setZ($("#toy_head_posz")[0].value);
													// 				hhtemp.children[2].position.setZ($("#toy_head_posz")[0].value);
													// 				hhtemp.children[3].position.setZ($("#toy_head_posz")[0].value);
													// 			}
													// 		}
													// 		if(event.object.name == "body"){
													// 			$("#toy_torso_posy")[0].value = event.object.position.y;
													// 			$("#toy_torso_posx")[0].value = event.object.position.x;
													// 			$("#toy_torso_posz")[0].value = event.object.position.z;
													// 		}
													// 		if(event.object.name == "l_arm"){
													// 			$("#toy_larm_posy")[0].value = event.object.position.y;
													// 			$("#toy_larm_posx")[0].value = event.object.position.x;
													// 			$("#toy_larm_posz")[0].value = event.object.position.z;
													// 		}
													// 		if(event.object.name == "r_arm"){
													// 			$("#toy_rarm_posy")[0].value = event.object.position.y;
													// 			$("#toy_rarm_posx")[0].value = event.object.position.x;
													// 			$("#toy_rarm_posz")[0].value = event.object.position.z;
													// 		}

													// 		if(event.object.name == "l_leg"){
													// 			$("#toy_lleg_posy")[0].value = event.object.position.y;
													// 			// console.log($("#toy_lleg_posy")[0].value);
													// 			$("#toy_lleg_posx")[0].value = event.object.position.x;
													// 			$("#toy_lleg_posz")[0].value = event.object.position.z;
													// 		}
													// 		if(event.object.name == "r_leg"){
													// 			$("#toy_rleg_posy")[0].value = event.object.position.y;
													// 			$("#toy_rleg_posx")[0].value = event.object.position.x;
													// 			$("#toy_rleg_posz")[0].value = event.object.position.z;
													// 		}
													// 	}
													// } );
													// // ----------------------------------------------------------------

													// console.log(htemp);
													//-------------------------------ANIMATE---------------------------------
													// console.log(scene);
													var animate = function () {
														if(typechange){
															clearcontrols();
															populateControls();
															typechange=false;
														}

														if(bchange){
															updateIndexes();
															if(rtmp != 2){
																var temp = scene.getObjectByName(scene.children[ib].name);
																scene.remove(temp);
															}
															var tname;
															var i;
															if(room == 0){
																tname = "Room_1";
																i = 0;
																burl = data.file_paths.rooms.room_1;
															}
															else if(room == 1){
																tname = "Room_2";
																i = 1;
																burl = data.file_paths.rooms.room_2;
															}
															if(room != 2){
																loader.load( burl, (gltf) => add_room_to_scene(gltf , tname)
																, undefined, function ( error ) { console.error( error );} );
															}
															bchange = false;
														}

														if(headchange){
															updateIndexes();															
															var temp = scene.getObjectByName(scene.children[ihead].name);
															scene.remove(temp);
															if(head != 1){
																// alert(ihair);
																updateIndexes();
																if(ihair!=99){
																	// console.log(scene.children);
																	var temp = scene.getObjectByName(scene.children[ihair].name);
																	scene.remove(temp);
																	hhtemp = null;
																	ihair = 99;
																	// alert(ihair);
																}
															}else if(head==1){
																loader.load( '/model/chibi/chibi_hair.gltf', (gltf) => add_model_to_scene(gltf , "hair")
																, undefined, function ( error ) { console.error( error );} );
															}
															if(head >= data.file_paths.models.length){
																hurl = head_models[head - data.file_paths.models.length].head_file.url;
															}else hurl = data.file_paths.models[head].head.url;
															loader.load( hurl, (gltf) => add_model_to_scene(gltf , "head")
																, undefined, function ( error ) { console.error( error );} );
															headchange = false;															
														}

														if(torsochange){
															updateIndexes();
															var temp = scene.getObjectByName(scene.children[itorso].name);
															scene.remove(temp);
															if(torso >= data.file_paths.models.length){
																hurl = body_models[torso - data.file_paths.models.length].body_file.url;
															}else hurl = data.file_paths.models[torso].body.url;
															loader.load( hurl, (gltf) => add_model_to_scene(gltf , "torso")
															, undefined, function ( error ) { console.error( error );} );
															torsochange = false;
														}

														if(larmchange){
															updateIndexes();
															var temp = scene.getObjectByName(scene.children[ilarm].name);
															scene.remove(temp);
															
															if(larm >= data.file_paths.models.length){
																hurl = l_arm_models[larm - data.file_paths.models.length].l_arm_file.url;
															}else hurl = data.file_paths.models[larm].l_arm.url;
															loader.load( hurl, (gltf) => add_model_to_scene(gltf , "leftarm")
																, undefined, function ( error ) { console.error( error );} );
															larmchange = false;
														}

														if(rarmchange){
															updateIndexes();
															var temp1 = scene.getObjectByName(scene.children[irarm].name);
															scene.remove(temp1);
															
															if(rarm >= data.file_paths.models.length){
																hurl1 = r_arm_models[rarm - data.file_paths.models.length].r_arm_file.url;
															}else hurl1 = data.file_paths.models[rarm].r_arm.url;
															loader.load( hurl1, (gltf) => add_model_to_scene(gltf , "rightarm")
																, undefined, function ( error ) { console.error( error );} );
															rarmchange = false;
														}

														if(llegchange){
															updateIndexes();
															var temp = scene.getObjectByName(scene.children[illeg].name);
															scene.remove(temp);

															if(lleg >= data.file_paths.models.length){
																hurl = l_leg_models[lleg - data.file_paths.models.length].l_leg_file.url;
															}else hurl = data.file_paths.models[lleg].l_leg.url;
															loader.load( hurl, (gltf) => add_model_to_scene(gltf , "leftleg")
																, undefined, function ( error ) { console.error( error );} );
															llegchange = false;
														}

														if(rlegchange){
															updateIndexes();
															var temp1 = scene.getObjectByName(scene.children[irleg].name);
															scene.remove(temp1);

															if(rleg >= data.file_paths.models.length){
																hurl1 = r_leg_models[rleg - data.file_paths.models.length].r_leg_file.url;
															}else hurl1 = data.file_paths.models[rleg].r_leg.url;
															loader.load( hurl1, (gltf) => add_model_to_scene(gltf , "rightleg")
																, undefined, function ( error ) { console.error( error );} );
															rlegchange = false;
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
														renderer.setSize(972, 500);
														camera.aspect = 972 / 500;
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

													function clearcontrols(){
														var hprsh = document.getElementById("headprsh");
														var tprsh = document.getElementById("torsoprsh");
														var laprsh = document.getElementById("larmprsh");
														var raprsh = document.getElementById("rarmprsh");
														var llprsh = document.getElementById("llegprsh");
														var rlprsh = document.getElementById("rlegprsh");
													
														hprsh.innerHTML = "";
														tprsh.innerHTML = "";
														laprsh.innerHTML = "";
														raprsh.innerHTML = "";
														llprsh.innerHTML = "";
														rlprsh.innerHTML = "";
													
														var hupsh = document.getElementById("headupsh");
														var tupsh = document.getElementById("torsoupsh");
														var laupsh = document.getElementById("larmupsh");
														var raupsh = document.getElementById("rarmupsh");
														var llupsh = document.getElementById("llegupsh");
														var rlupsh = document.getElementById("rlegupsh");
													
														hupsh.innerHTML = "";
														tupsh.innerHTML = "";
														laupsh.innerHTML = "";
														raupsh.innerHTML = "";
														llupsh.innerHTML = "";
														rlupsh.innerHTML = "";
													}

													function populateControls(){
														var hprsh = document.getElementById("headprsh");
														var tprsh = document.getElementById("torsoprsh");
														var laprsh = document.getElementById("larmprsh");
														var raprsh = document.getElementById("rarmprsh");
														var llprsh = document.getElementById("llegprsh");
														var rlprsh = document.getElementById("rlegprsh");								
																																																						
														for(var i=0;i<data.file_paths.models.length;++i){
															if(data.file_paths.models[i].type==type){
																var button = document.createElement('button');
																//alert(data.file_paths.models.test);
																button.innerHTML = '<img class="modimgbtn" src="' + data.file_paths.models[i].head.img + '" />';
																button.className = 'btn';
																var tid = "head" + i;
																button.id = tid;
																button.type = "button";
																button.value = i;
																button.onclick = function(){															
																	if(head!=this.value){
																		headposy = 0.0;
																		headposx = 0.0;
																		headposz = 0.0;
																		headchange = true;
																		head = this.value;
																		$("#toy_head")[0].value = head;																		
																	}
																	currentSelection = htemp; 
																	var selectedObject = htemp.children[0];
																	addSelectedObject( selectedObject );
																	outlinePass.selectedObjects = selectedObjects;
																	populateInfoCard(data.file_paths.models[head].head.title,data.file_paths.models[head].head.desc,data.file_paths.models[head].head.img);															
																};
																hprsh.appendChild(button);
															}
														}
																																									
														for(var i=0;i<data.file_paths.models.length;++i){
															if(data.file_paths.models[i].type==type){
																var button = document.createElement('button');
																button.innerHTML = '<img class="modimgbtn" src="' + data.file_paths.models[i].body.img + '" />';
																button.className = 'btn';
																var tid = "body" + i;
																button.id = tid;
																button.type = "button";
																button.value = i;
																button.onclick = function(){
																	if(torso!=this.value){
																		torsoposy = 0.0;
																		torsoposx = 0.0;
																		torsoposz = 0.0;
																		torsochange = true;
																		torso = this.value;
																		$("#toy_torso")[0].value = torso;																		
																	}
																	currentSelection = ttemp; 
																	var selectedObject = ttemp.children[0];
																	addSelectedObject( selectedObject );
																	outlinePass.selectedObjects = selectedObjects;
																	populateInfoCard(data.file_paths.models[torso].body.title,data.file_paths.models[torso].body.desc,data.file_paths.models[torso].body.img);
																};
																tprsh.appendChild(button);
															}
														}
																								
														for(var i=0;i<data.file_paths.models.length;++i){
															if(data.file_paths.models[i].type==type){
																var button = document.createElement('button');
																button.innerHTML = '<img class="modimgbtn" src="' + data.file_paths.models[i].l_arm.img + '" />';
																button.className = 'btn';
																var tid = "l_arm" + i;
																button.id = tid;
																button.type = "button";
																button.value = i;
																button.onclick = function(){
																	if(larm!=this.value){																		
																		larmposy = 0.0;
																		larmposx = 0.0;
																		larmposz = 0.0;
																		larmchange = true;
																		larm = this.value;
																		$("#toy_arms")[0].value = larm;																		
																	}
																	currentSelection = latemp; 
																	var selectedObject = latemp.children[0];
																	addSelectedObject( selectedObject );
																	outlinePass.selectedObjects = selectedObjects;
																	populateInfoCard(data.file_paths.models[larm].l_arm.title,data.file_paths.models[larm].l_arm.desc,data.file_paths.models[larm].l_arm.img);																
																};
																laprsh.appendChild(button);
															}
														}

														for(var i=0;i<data.file_paths.models.length;++i){
															if(data.file_paths.models[i].type==type){
																var button = document.createElement('button');
																button.innerHTML = '<img class="modimgbtn" src="' + data.file_paths.models[i].r_arm.img + '" />';
																button.className = 'btn';
																var tid = "r_arm" + i;
																button.id = tid;
																button.type = "button";
																button.value = i;
																button.onclick = function(){
																	if(rarm!=this.value){
																		rarmposy = 0.0;
																		rarmposx = 0.0;
																		rarmposz = 0.0;
																		rarmchange = true;
																		rarm = this.value;
																		$("#toy_r_arm")[0].value = rarm;																		
																	}
																	currentSelection = ratemp; 
																	var selectedObject = ratemp.children[0];
																	addSelectedObject( selectedObject );
																	outlinePass.selectedObjects = selectedObjects;
																	populateInfoCard(data.file_paths.models[rarm].r_arm.title,data.file_paths.models[rarm].r_arm.desc,data.file_paths.models[rarm].r_arm.img);															
																};
																raprsh.appendChild(button);
															}
														}

														for(var i=0;i<data.file_paths.models.length;++i){
															if(data.file_paths.models[i].type==type){
																var button = document.createElement('button');
																button.innerHTML = '<img class="modimgbtn" src="' + data.file_paths.models[i].l_leg.img + '" />';
																button.className = 'btn';
																var tid = "l_leg" + i;
																button.id = tid;
																button.type = "button";
																button.value = i;
																button.onclick = function(){
																	if(lleg!=this.value){
																		llegposy = 0.0;
																		llegposx = 0.0;
																		llegposz = 0.0;
																		llegchange = true;
																		lleg = this.value;
																		$("#toy_legs")[0].value = lleg;																		
																	}
																	currentSelection = lltemp; 
																	var selectedObject = lltemp.children[0];
																	addSelectedObject( selectedObject );
																	outlinePass.selectedObjects = selectedObjects;
																	populateInfoCard(data.file_paths.models[lleg].l_leg.title,data.file_paths.models[lleg].l_leg.desc,data.file_paths.models[lleg].l_leg.img);														
																};
																llprsh.appendChild(button);
															}
														}

														for(var i=0;i<data.file_paths.models.length;++i){
															if(data.file_paths.models[i].type==type){
																var button = document.createElement('button');
																button.innerHTML = '<img class="modimgbtn" src="' + data.file_paths.models[i].r_leg.img + '" />';
																button.className = 'btn';
																var tid = "r_leg" + i;
																button.id = tid;
																button.type = "button";
																button.value = i;
																button.onclick = function(){
																	if(rleg!=this.value){
																		rlegposy = 0.0;
																		rlegposx = 0.0;
																		rlegposz = 0.0;
																		rlegchange = true;
																		rleg = this.value;
																		$("#toy_r_leg")[0].value = rleg;																		
																	}
																	currentSelection = rltemp; 
																	var selectedObject = rltemp.children[0];
																	addSelectedObject( selectedObject );
																	outlinePass.selectedObjects = selectedObjects;
																	populateInfoCard(data.file_paths.models[rleg].r_leg.title,data.file_paths.models[rleg].r_leg.desc,data.file_paths.models[rleg].r_leg.img);															
																};
																rlprsh.appendChild(button);
															}
														}

														var hupsh = document.getElementById("headupsh");
														var tupsh = document.getElementById("torsoupsh");
														var laupsh = document.getElementById("larmupsh");
														var raupsh = document.getElementById("rarmupsh");
														var llupsh = document.getElementById("llegupsh");
														var rlupsh = document.getElementById("rlegupsh");
														
														for(var i=0;i<head_models.length;++i){
															if(head_models[i].model_type == type){
																var button = document.createElement('button');
																var img = head_models[i].head_image.url;
																if (img == null){
																	img = "/images/Default_Upl.png";
																}
																button.innerHTML = '<img class="modimgbtn" src="' + img + '" />';
																button.className = 'btn';
																button.type = "button";
																button.value = i + data.file_paths.models.length;
																button.onclick = function(){
																	if(head!=this.value){
																		headposy = 0.0;
																		headposx = 0.0;
																		headposz = 0.0;
																		headchange = true;
																		head = this.value;
																		$("#toy_head")[0].value = head;
																	}
																	currentSelection = htemp; 
																	var selectedObject = htemp.children[0];
																	addSelectedObject( selectedObject );
																	outlinePass.selectedObjects = selectedObjects;
																	populateInfoCard("Coming Soon", "No Information for uploaded models.", img);														
																};
																hupsh.appendChild(button);
															}
														}
																																									
														for(var i=0;i<body_models.length;++i){
															if(body_models[i].model_type == type){
																var button = document.createElement('button');
																var img = body_models[i].body_image.url;
																if (img == null){
																	img = "/images/Default_Upl.png";
																}
																button.innerHTML = '<img class="modimgbtn" src="' + img + '" />';
																button.className = 'btn';
																button.type = "button";
																button.value = i + data.file_paths.models.length;
																button.onclick = function(){
																	if(torso!=this.value){																		
																		torsoposy = 0.0;
																		torsoposx = 0.0;
																		torsoposz = 0.0;
																		torsochange = true;
																		torso = this.value;
																		$("#toy_torso")[0].value = torso;
																	}
																	currentSelection = ttemp; 
																	var selectedObject = ttemp.children[0];
																	addSelectedObject( selectedObject );
																	outlinePass.selectedObjects = selectedObjects;
																	populateInfoCard("Coming Soon", "No Information for uploaded models.", img);
																};
																tupsh.appendChild(button);
															}
														}
																								
														for(var i=0;i<l_arm_models.length;++i){
															if(l_arm_models[i].model_type == type){
																var button = document.createElement('button');
																var img = l_arm_models[i].l_arm_image.url;
																if (img == null){
																	img = "/images/Default_Upl.png";
																}
																button.innerHTML = '<img class="modimgbtn" src="' + img + '" />';
																button.className = 'btn';
																button.type = "button";
																button.value = i + data.file_paths.models.length;
																button.onclick = function(){
																	if(larm!=this.value){																		
																		larmposy = 0.0;
																		larmposx = 0.0;
																		larmposz = 0.0;
																		larmchange = true;
																		larm = this.value;
																		$("#toy_arms")[0].value = larm;
																	}	
																	currentSelection = latemp; 
																	var selectedObject = latemp.children[0];
																	addSelectedObject( selectedObject );
																	outlinePass.selectedObjects = selectedObjects;
																	populateInfoCard("Coming Soon", "No Information for uploaded models.", img);															
																};
																laupsh.appendChild(button);
															}
														}

														for(var i=0;i<r_arm_models.length;++i){
															if(r_arm_models[i].model_type == type){
																var button = document.createElement('button');
																var img = r_arm_models[i].r_arm_image.url;
																if (img == null){
																	img = "/images/Default_Upl.png";
																}
																button.innerHTML = '<img class="modimgbtn" src="' + img + '" />';
																button.className = 'btn';
																button.type = "button";
																button.value = i + data.file_paths.models.length;
																button.onclick = function(){
																	if(rarm!=this.value){
																		rarmposy = 0.0;
																		rarmposx = 0.0;
																		rarmposz = 0.0;
																		rarmchange = true;
																		rarm = this.value;
																		$("#toy_r_arm")[0].value = rarm;
																	}	
																	currentSelection = ratemp; 
																	var selectedObject = ratemp.children[0];
																	addSelectedObject( selectedObject );
																	outlinePass.selectedObjects = selectedObjects;
																	populateInfoCard("Coming Soon", "No Information for uploaded models.", img);															
																};
																raupsh.appendChild(button);
															}
														}

														for(var i=0;i<l_leg_models.length;++i){
															if(l_leg_models[i].model_type == type){
																var button = document.createElement('button');
																var img = l_leg_models[i].l_leg_image.url;
																if (img == null){
																	img = "/images/Default_Upl.png";
																}
																button.innerHTML = '<img class="modimgbtn" src="' + img + '" />';
																button.className = 'btn';
																button.type = "button";
																button.value = i + data.file_paths.models.length;
																button.onclick = function(){
																	if(lleg!=this.value){
																		llegposy = 0.0;
																		llegposx = 0.0;
																		llegposz = 0.0;
																		llegchange = true;
																		lleg = this.value;
																		$("#toy_legs")[0].value = lleg;
																	}	
																	currentSelection = lltemp; 
																	var selectedObject = lltemp.children[0];
																	addSelectedObject( selectedObject );
																	outlinePass.selectedObjects = selectedObjects;
																	populateInfoCard("Coming Soon", "No Information for uploaded models.", img);														
																};
																llupsh.appendChild(button);
															}
														}

														for(var i=0;i<r_leg_models.length;++i){
															if(r_leg_models[i].model_type == type){
																var button = document.createElement('button');
																var img = r_leg_models[i].r_leg_image.url;
																if (img == null){
																	img = "/images/Default_Upl.png";
																}
																button.innerHTML = '<img class="modimgbtn" src="' + img + '" />';
																button.className = 'btn';
																button.type = "button";
																button.value = i + data.file_paths.models.length;
																button.onclick = function(){
																	if(rleg!=this.value){
																		rlegposy = 0.0;
																		rlegposx = 0.0;
																		rlegposz = 0.0;
																		rlegchange = true;
																		rleg = this.value;
																		$("#toy_r_leg")[0].value = rleg;
																	}	
																	currentSelection = rltemp; 
																	var selectedObject = rltemp.children[0];
																	addSelectedObject( selectedObject );
																	outlinePass.selectedObjects = selectedObjects;
																	populateInfoCard("Coming Soon", "No Information for uploaded models.", img);															
																};
																rlupsh.appendChild(button);
															}
														}
													}
													
													function populateFullModels(){
														var fm = document.getElementById("fullmodels");
														fm.innerHTML="";
																																																						
														for(var i=0;i<data.file_paths.models.length;++i){
															if(data.file_paths.models[i].type==type){
																var button = document.createElement('button');
																//alert(data.file_paths.models.test);
																button.innerHTML = '<img class="modimgbtn" src="' + data.file_paths.models[i].img + '" />';
																button.className = 'btn';
																var tid = "fullmodel" + i;
																button.id = tid;
																button.type = "button";
																button.value = i;
																button.onclick = function(){
																	headposy = 0.0;
																	headposx = 0.0;
																	headposz = 0.0;
																	torsoposy = 0.0;
																	torsoposx = 0.0;
																	torsoposz = 0.0;
																	larmposy = 0.0;
																	larmposx = 0.0;
																	larmposz = 0.0;
																	rarmposy = 0.0;
																	rarmposx = 0.0;
																	rarmposz = 0.0;
																	llegposy = 0.0;
																	llegposx = 0.0;
																	llegposz = 0.0;
																	rlegposy = 0.0;
																	rlegposx = 0.0;
																	rlegposz = 0.0;

																	// type=this.value;
																	// typechange=true;

																	hair = this.value;
																	head = this.value;
																	torso = this.value;
																	larm = this.value;
																	rarm = this.value;
																	lleg = this.value;
																	rleg = this.value;

																	$("#toy_head")[0].value = head;
																	$("#toy_torso")[0].value = torso;
																	$("#toy_arms")[0].value = larm;
																	$("#toy_r_leg")[0].value = rarm;
																	$("#toy_r_arm")[0].value = lleg;
																	$("#toy_legs")[0].value = rleg;

																	headchange = true;
																	torsochange = true;
																	larmchange = true; 
																	rarmchange = true; 
																	llegchange = true;
																	rlegchange = true;														
																};
																fm.appendChild(button);
															}
														}
													}

													function populateInfoCard(title, desc, image){
														$('#info-title').html(title);
														$('#info-description').html(desc);
														$('#info-image').html('<img src="'+image+'" alt="A113">');
													}

													$(document).ready(function(){
														populateFullModels();
														$('#info-card').fadeToggle(0);
														$('#info-btn').click(function () {
															if($('#info-btn').text()=="Show Info"){
																$('#info-btn').html('Hide Info');																
															}else{
																$('#info-btn').html('Show Info');
															}
															$('#info-card').fadeToggle(300);
														});

														$('#check-zoom').click(function () {
															bzoom = !bzoom;
															if(!bzoom){
																zoomreset();
															}else {
																switch(menuitem){
																	case "head" : zoomin(htemp.children[0], false); break;
																	case "torso" : zoomin(ttemp.children[0], false); break;
																	case "l-arms" : zoomin(latemp.children[0], false); break;
																	case "r-arms" : zoomin(ratemp.children[0], false); break;
																	case "l-legs" : zoomin(lltemp.children[0], false); break;
																	case "r-legs" : zoomin(rltemp.children[0], false); break;
																	case "type" : zoomreset(); break;
																}
															}
														});
														
														$('.head-controls').click(function (){
															zoomin(htemp.children[0], false);
															menuitem = "head";
															texturepanel = false;
														});

														$('.torso-controls').click(function (){
															zoomin(ttemp.children[0], false);
															menuitem = "torso";
															texturepanel = false;
														});

														$('.l-arms-controls').click(function (){
															zoomin(latemp.children[0], false);	
															menuitem = "l-arms";
															texturepanel = false;
														});

														$('.r-arms-controls').click(function (){
															zoomin(ratemp.children[0], false);
															menuitem = "r-arms";
															texturepanel = false;	
														});

														$('.l-legs-controls').click(function (){
															zoomin(lltemp.children[0], false);
															menuitem = "l-legs";
															texturepanel = false;	
														});

														$('.r-legs-controls').click(function (){															
															zoomin(rltemp.children[0], false);	
															menuitem = "r-legs";
															texturepanel = false;
														});

														$('.type-controls').click(function (){															
															zoomreset();
															menuitem = "type";
															texturepanel = false;
															currentSelection = null; 
															outlinePass.selectedObjects = [];
														});
														$('.textures').click(function (){
															menuitem = "type";
															texturepanel = true;
														});
														$('.rooms-controls').click(function (){
															zoomreset();
															menuitem = "type";
															texturepanel = false;
															currentSelection = null; 
															outlinePass.selectedObjects = [];
														});
														$('#humanoid').click(function () {
															if(type!=0){
																if(bzoom){
																	$('#check-zoom').click();
																}
																headposy = 0.0;
																headposx = 0.0;
																headposz = 0.0;
																torsoposy = 0.0;
																torsoposx = 0.0;
																torsoposz = 0.0;
																larmposy = 0.0;
																larmposx = 0.0;
																larmposz = 0.0;
																rarmposy = 0.0;
																rarmposx = 0.0;
																rarmposz = 0.0;
																llegposy = 0.0;
																llegposx = 0.0;
																llegposz = 0.0;
																rlegposy = 0.0;
																rlegposx = 0.0;
																rlegposz = 0.0;

																type=0;
																typechange=true;														
																$('#lach').html('Left Arm');
																$('#rach').html('Right Arm');
																$('#llch').html('Left Leg');
																$('#rlch').html('Right Leg');

																hair = 0;
																head = 0;
																torso = 0;
																larm = 0;
																rarm = 0;
																lleg = 0;
																rleg = 0;

																$("#toy_head")[0].value = head;
																$("#toy_torso")[0].value = torso;
																$("#toy_arms")[0].value = larm;
																$("#toy_r_leg")[0].value = rarm;
																$("#toy_r_arm")[0].value = lleg;
																$("#toy_legs")[0].value = rleg;

																headchange = true;
																torsochange = true;
																larmchange = true; 
																rarmchange = true; 
																llegchange = true;
																rlegchange = true;

																populateFullModels();
															}															
														});
														
														$('#animal').click(function () {
															if(type!=1){
																if(bzoom){
																	$('#check-zoom').click();
																}
																headposy = 0.0;
																headposx = 0.0;
																headposz = 0.0;
																torsoposy = 0.0;
																torsoposx = 0.0;
																torsoposz = 0.0;
																larmposy = 0.0;
																larmposx = 0.0;
																larmposz = 0.0;
																rarmposy = 0.0;
																rarmposx = 0.0;
																rarmposz = 0.0;
																llegposy = 0.0;
																llegposx = 0.0;
																llegposz = 0.0;
																rlegposy = 0.0;
																rlegposx = 0.0;
																rlegposz = 0.0;

																type=1;
																typechange=true;
																$('#lach').html('Left Arm');
																$('#rach').html('Right Arm');
																$('#llch').html('Left Leg');
																$('#rlch').html('Right Leg');

																hair = 3;
																head = 3;
																torso = 3;
																larm = 3;
																rarm = 3;
																lleg = 3;
																rleg = 3;

																$("#toy_head")[0].value = head;
																$("#toy_torso")[0].value = torso;
																$("#toy_arms")[0].value = larm;
																$("#toy_r_leg")[0].value = rarm;
																$("#toy_r_arm")[0].value = lleg;
																$("#toy_legs")[0].value = rleg;

																headchange = true;
																torsochange = true;
																larmchange = true; 
																rarmchange = true; 
																llegchange = true;
																rlegchange = true;

																populateFullModels();
															}
														});
														
														$('#fish').click(function () {
															if(type!=2){
																if(bzoom){
																	$('#check-zoom').click();
																}
																headposy = 0.0;
																headposx = 0.0;
																headposz = 0.0;
																torsoposy = 0.0;
																torsoposx = 0.0;
																torsoposz = 0.0;
																larmposy = 0.0;
																larmposx = 0.0;
																larmposz = 0.0;
																rarmposy = 0.0;
																rarmposx = 0.0;
																rarmposz = 0.0;
																llegposy = 0.0;
																llegposx = 0.0;
																llegposz = 0.0;
																rlegposy = 0.0;
																rlegposx = 0.0;
																rlegposz = 0.0;

																type=2;
																typechange=true;
																$('#lach').html('Left Fin');
																$('#rach').html('Right Fin');
																$('#llch').html('Back Fin');
																$('#rlch').html('Tail Fin');

																hair = 6;
																head = 6;
																torso = 6;
																larm = 6;
																rarm = 6;
																lleg = 6;
																rleg = 6;

																$("#toy_head")[0].value = head;
																$("#toy_torso")[0].value = torso;
																$("#toy_arms")[0].value = larm;
																$("#toy_r_leg")[0].value = rarm;
																$("#toy_r_arm")[0].value = lleg;
																$("#toy_legs")[0].value = rleg;

																headchange = true;
																torsochange = true;
																larmchange = true; 
																rarmchange = true; 
																llegchange = true;
																rlegchange = true;

																populateFullModels();
															}
														});

														$('#share-btn').click(function () {
															screensh();
														});

														$('#rooml').click(function () {
															if(room > 0){
																bchange = true;
																rtmp = room;
																room -= 1;
															}
														});
														$('#roomr').click(function () {
															var tmp = room;
															if(tmp < 2){
																bchange = true;
																rtmp = room;
																tmp = +tmp + +1;
																room = tmp;
															}
														});

														// $('#headl').click(function () {
														// 	if($("#toy_head")[0].value > 0){
														// 		headchange = true;
														// 		$("#toy_head")[0].value -= 1;
														// 		head = $("#toy_head")[0].value;
														// 	}
														// });
														// $('#headr').click(function () {
														// 	var tmp = $("#toy_head")[0].value;
														// 	if(tmp < 1 + head_models.length){
														// 		headchange = true;
														// 		tmp = +tmp + +1;
														// 		$("#toy_head")[0].value = tmp;
														// 		head = $("#toy_head")[0].value;
														// 	}
														// });
														var hslideru = document.getElementById("headup");
														var hsliderl = document.getElementById("headleft");
														var hsliderf = document.getElementById("headfront");
														
														hslideru.oninput = function() {
															// var temp = scene.getObjectByName(scene.children[ihead].name);
															var t = this.value;
															t = -t;
															t = -t;
															htemp.children[0].position.setY(-t);
															// console.log(t);
															if(hhtemp!=null){
																hhtemp.children[0].position.setY(-t);
																hhtemp.children[1].position.setY(-t);
																hhtemp.children[2].position.setY(-t);
																hhtemp.children[3].position.setY(-t);
															}
															$("#toy_head_pos")[0].value = -t;	
															zoomin(htemp.children[0], true);																								
														}
														hsliderl.oninput = function() {
															//var temp = scene.getObjectByName(scene.children[ihead].name);
															var t = this.value;
															t = -t;
															t = -t;
															htemp.children[0].position.setX(t);
															// console.log(t);
															if(hhtemp!=null){
																hhtemp.children[0].position.setX(t);
																hhtemp.children[1].position.setX(t);
																hhtemp.children[2].position.setX(t);
																hhtemp.children[3].position.setX(t);
															}
															$("#toy_head_posx")[0].value = t;
															zoomin(htemp.children[0], true);											
														}
														hsliderf.oninput = function() {
															//var temp = scene.getObjectByName(scene.children[ihead].name);
															var t = this.value;
															t = -t;
															t = -t;
															htemp.children[0].position.setZ(-t);
															// console.log(t);
															if(hhtemp!=null){
																hhtemp.children[0].position.setZ(-t);
																hhtemp.children[1].position.setZ(-t);
																hhtemp.children[2].position.setZ(-t);
																hhtemp.children[3].position.setZ(-t);
															}
															$("#toy_head_posz")[0].value = -t;
															zoomin(htemp.children[0], true);
														}

														// $('#larml').click(function () {
														// 	if($("#toy_arms")[0].value > 0){
														// 		larmchange = true;
														// 		$("#toy_arms")[0].value -= 1;
														// 		larm = $("#toy_arms")[0].value;
														// 	}
														// });
														// $('#larmr').click(function () {
														// 	var tmp = $("#toy_arms")[0].value;
														// 	if(tmp < 1 + l_arm_models.length){
														// 		larmchange = true;
														// 		tmp = +tmp + +1;
														// 		$("#toy_arms")[0].value = tmp;
														// 		larm = $("#toy_arms")[0].value;
														// 	}
														// });

														// $('#rarml').click(function () {
														// 	if($("#toy_r_arm")[0].value > 0){
														// 		rarmchange = true;
														// 		$("#toy_r_arm")[0].value -= 1;
														// 		rarm = $("#toy_r_arm")[0].value;
														// 	}
														// });
														// $('#rarmr').click(function () {
														// 	var tmp = $("#toy_r_arm")[0].value;
														// 	if(tmp < 1 + r_arm_models.length){
														// 		rarmchange = true;
														// 		tmp = +tmp + +1;
														// 		$("#toy_r_arm")[0].value = tmp;
														// 		rarm = $("#toy_r_arm")[0].value;
														// 	}
														// });
														var laslideru = document.getElementById("larmup");
														var lasliderl = document.getElementById("larmleft");
														var lasliderf = document.getElementById("larmfront");
														var raslideru = document.getElementById("rarmup");
														var rasliderl = document.getElementById("rarmleft");
														var rasliderf = document.getElementById("rarmfront");
														laslideru.oninput = function() {
															// var temp = scene.getObjectByName(scene.children[ilarm].name);
															var t = this.value;
															t = -t;
															t = -t;
															latemp.children[0].position.setY(-t);
															// console.log(t);
															$("#toy_larm_posy")[0].value = -t;
															zoomin(latemp.children[0], true);
														}
														lasliderl.oninput = function() {
															// var latemp = scene.getObjectByName(scene.children[ilarm].name);
															var t = this.value;
															t = -t;
															t = -t;
															latemp.children[0].position.setX(t);
															// console.log(t);
															$("#toy_larm_posx")[0].value = t;
															zoomin(latemp.children[0], true);
														}
														lasliderf.oninput = function() {
															// var latemp = scene.getObjectByName(scene.children[ilarm].name);
															var t = this.value;
															t = -t;
															t = -t;
															latemp.children[0].position.setZ(-t);
															$("#toy_larm_posz")[0].value = -t;
															zoomin(latemp.children[0], true);
															// console.log(t);
														}
														raslideru.oninput = function() {
															// var temp = scene.getObjectByName(scene.children[irarm].name);
															var t = this.value;
															t = -t;
															t = -t;
															ratemp.children[0].position.setY(-t);
															// console.log(t);
															$("#toy_rarm_posy")[0].value = -t;
															zoomin(ratemp.children[0], true);	
														}
														rasliderl.oninput = function() {
															// var ratemp = scene.getObjectByName(scene.children[irarm].name);
															var t = this.value;
															t = -t;
															t = -t;
															ratemp.children[0].position.setX(t);
															// console.log(t);
															$("#toy_rarm_posx")[0].value = t;
															zoomin(ratemp.children[0], true);
														}
														rasliderf.oninput = function() {
															// var ratemp = scene.getObjectByName(scene.children[irarm].name);
															var t = this.value;
															t = -t;
															t = -t;
															ratemp.children[0].position.setZ(-t);
															$("#toy_rarm_posz")[0].value = -t;
															zoomin(ratemp.children[0], true);
															// console.log(t);
														}

														// $('#torsol').click(function () {
														// 	if($("#toy_torso")[0].value > 0){
														// 		torsochange = true;
														// 		$("#toy_torso")[0].value -= 1;
														// 		torso = $("#toy_torso")[0].value;
														// 	}
														// });
														// $('#torsor').click(function () {
														// 	var tmp = $("#toy_torso")[0].value;
														// 	if(tmp < 1  + body_models.length){
														// 		torsochange =  true;
														// 		tmp = +tmp + +1;
														// 		$("#toy_torso")[0].value = tmp;
														// 		torso = $("#toy_torso")[0].value;
														// 	}
														// });
														var tslideru = document.getElementById("torsoup");
														var tsliderl = document.getElementById("torsoleft");
														var tsliderf = document.getElementById("torsofront");
														tslideru.oninput = function() {
															// var temp = scene.getObjectByName(scene.children[itorso].name);
															var t = this.value;
															t = -t;
															t = -t;
															ttemp.children[0].position.setY(-t);
															// console.log(t);
															$("#toy_torso_posy")[0].value = -t;
															zoomin(ttemp.children[0], true);
														}
														tsliderl.oninput = function() {
															// var ttemp = scene.getObjectByName(scene.children[itorso].name);
															var t = this.value;
															t = -t;
															t = -t;
															ttemp.children[0].position.setX(t);
															// console.log(t);
															$("#toy_torso_posx")[0].value = t;
															zoomin(ttemp.children[0], true);
														}
														tsliderf.oninput = function() {
															// var ttemp = scene.getObjectByName(scene.children[itorso].name);
															var t = this.value;
															t = -t;
															t = -t;
															ttemp.children[0].position.setZ(-t);
															$("#toy_torso_posz")[0].value = -t;
															zoomin(ttemp.children[0], true);
															// console.log(t);
														}

														// $('#llegl').click(function () {
														// 	if($("#toy_legs")[0].value > 0){
														// 		llegchange = true;
														// 		$("#toy_legs")[0].value -= 1;
														// 		lleg = $("#toy_legs")[0].value;
														// 	}
														// });
														// $('#llegr').click(function () {
														// 	var tmp = $("#toy_legs")[0].value;
														// 	if(tmp < 1 + l_leg_models.length){
														// 		llegchange = true;
														// 		tmp = +tmp + +1;
														// 		$("#toy_legs")[0].value = tmp;
														// 		lleg = $("#toy_legs")[0].value;
														// 	}
														// });

														// $('#rlegl').click(function () {
														// 	if($("#toy_r_leg")[0].value > 0){
														// 		rlegchange = true;
														// 		$("#toy_r_leg")[0].value -= 1;
														// 		rleg = $("#toy_r_leg")[0].value;
														// 	}
														// });
														// $('#rlegr').click(function () {
														// 	var tmp = $("#toy_r_leg")[0].value;
														// 	if(tmp < 1 + r_leg_models.length){
														// 		rlegchange = true;
														// 		tmp = +tmp + +1;
														// 		$("#toy_r_leg")[0].value = tmp;
														// 		rleg = $("#toy_r_leg")[0].value;
														// 	}
														// });
														var llslideru = document.getElementById("llegup");
														var llsliderl = document.getElementById("llegleft");
														var llsliderf = document.getElementById("llegfront");
														var rlslideru = document.getElementById("rlegup");
														var rlsliderl = document.getElementById("rlegleft");
														var rlsliderf = document.getElementById("rlegfront");
														llslideru.oninput = function() {
															// var temp = scene.getObjectByName(scene.children[illeg].name);
															var t = this.value;
															t = -t;
															t = -t;
															lltemp.children[0].position.setY(-t);
															// console.log(t);
															$("#toy_lleg_posy")[0].value = -t;															
															zoomin(lltemp.children[0], true);
														}
														llsliderl.oninput = function() {
															// var lltemp = scene.getObjectByName(scene.children[illeg].name);
															var t = this.value;
															t = -t;
															t = -t;
															lltemp.children[0].position.setX(t);
															// console.log(t);
															$("#toy_lleg_posx")[0].value = t;
															zoomin(lltemp.children[0], true);
														}
														llsliderf.oninput = function() {
															// var lltemp = scene.getObjectByName(scene.children[illeg].name);
															var t = this.value;
															t = -t;
															t = -t;
															lltemp.children[0].position.setZ(-t);
															$("#toy_lleg_posz")[0].value = -t;
															zoomin(lltemp.children[0], true);
															// console.log(t);
														}
														rlslideru.oninput = function() {
															// var temp = scene.getObjectByName(scene.children[irleg].name);
															var t = this.value;
															t = -t;
															t = -t;
															rltemp.children[0].position.setY(-t);
															// console.log(t);
															$("#toy_rleg_posy")[0].value = -t;
															zoomin(rltemp.children[0], true);
														}
														rlsliderl.oninput = function() {
															// var rltemp = scene.getObjectByName(scene.children[irleg].name);
															var t = this.value;
															t = -t;
															t = -t;
															rltemp.children[0].position.setX(t);
															// console.log(t);
															$("#toy_rleg_posx")[0].value = t;
															zoomin(rltemp.children[0], true);
														}
														rlsliderf.oninput = function() {
															// var rltemp = scene.getObjectByName(scene.children[irleg].name);
															var t = this.value;
															t = -t;
															t = -t;
															rltemp.children[0].position.setZ(-t);
															$("#toy_rleg_posz")[0].value = -t;
															zoomin(rltemp.children[0], true);
															// console.log(t);
														}

													})

													function onTransitionEnd( event ) {

														event.target.remove();
														
													}
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	}
});
var OrbitControls = function ( object, domElement ) {

	if ( domElement === undefined ) console.warn( 'THREE.OrbitControls: The second parameter "domElement" is now mandatory.' );
	if ( domElement === document ) console.error( 'THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.' );

	this.object = object;
	this.domElement = domElement;

	this.enabled = true;

	this.target = new Vector3();

	this.minDistance = 0;
	this.maxDistance = Infinity;

	this.minZoom = 0;
	this.maxZoom = Infinity;

	this.minPolarAngle = 0;
	this.maxPolarAngle = Math.PI;

	this.minAzimuthAngle = - Infinity;
	this.maxAzimuthAngle = Infinity;

	this.enableDamping = false;
	this.dampingFactor = 0.05;

	this.enableZoom = true;
	this.zoomSpeed = 1.0;
	this.dIn = dollyIn

	this.enableRotate = true;
	this.rotateSpeed = 1.0;

	this.enablePan = true;
	this.panSpeed = 1.0;
	this.screenSpacePanning = false;
	this.keyPanSpeed = 7.0;

	this.autoRotate = false;
	this.autoRotateSpeed = 2.0; 

	this.enableKeys = true;

	this.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

	this.mouseButtons = { LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN };

	this.touches = { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN };

	this.target0 = this.target.clone();
	this.position0 = this.object.position.clone();
	this.zoom0 = this.object.zoom;

	this.getPolarAngle = function () {

		return spherical.phi;

	};

	this.getAzimuthalAngle = function () {

		return spherical.theta;

	};

	this.saveState = function () {

		scope.target0.copy( scope.target );
		scope.position0.copy( scope.object.position );
		scope.zoom0 = scope.object.zoom;

	};

	this.reset = function () {

		scope.target.copy( scope.target0 );
		scope.object.position.copy( scope.position0 );
		scope.object.zoom = scope.zoom0;

		scope.object.updateProjectionMatrix();
		scope.dispatchEvent( changeEvent );

		scope.update();

		state = STATE.NONE;

	};

	this.update = function () {

		var offset = new Vector3();

		// so camera.up is the orbit axis
		var quat = new Quaternion().setFromUnitVectors( object.up, new Vector3( 0, 1, 0 ) );
		var quatInverse = quat.clone().inverse();

		var lastPosition = new Vector3();
		var lastQuaternion = new Quaternion();

		return function update() {

			var position = scope.object.position;

			offset.copy( position ).sub( scope.target );

			// rotate offset to "y-axis-is-up" space
			offset.applyQuaternion( quat );

			// angle from z-axis around y-axis
			spherical.setFromVector3( offset );

			if ( scope.autoRotate && state === STATE.NONE ) {

				rotateLeft( getAutoRotationAngle() );

			}

			if ( scope.enableDamping ) {

				spherical.theta += sphericalDelta.theta * scope.dampingFactor;
				spherical.phi += sphericalDelta.phi * scope.dampingFactor;

			} else {

				spherical.theta += sphericalDelta.theta;
				spherical.phi += sphericalDelta.phi;

			}

			// restrict theta to be between desired limits
			spherical.theta = Math.max( scope.minAzimuthAngle, Math.min( scope.maxAzimuthAngle, spherical.theta ) );

			// restrict phi to be between desired limits
			spherical.phi = Math.max( scope.minPolarAngle, Math.min( scope.maxPolarAngle, spherical.phi ) );

			spherical.makeSafe();


			spherical.radius *= scale;

			// restrict radius to be between desired limits
			spherical.radius = Math.max( scope.minDistance, Math.min( scope.maxDistance, spherical.radius ) );

			// move target to panned location

			if ( scope.enableDamping === true ) {

				scope.target.addScaledVector( panOffset, scope.dampingFactor );

			} else {

				scope.target.add( panOffset );

			}

			offset.setFromSpherical( spherical );

			// rotate offset back to "camera-up-vector-is-up" space
			offset.applyQuaternion( quatInverse );

			position.copy( scope.target ).add( offset );

			scope.object.lookAt( scope.target );

			if ( scope.enableDamping === true ) {

				sphericalDelta.theta *= ( 1 - scope.dampingFactor );
				sphericalDelta.phi *= ( 1 - scope.dampingFactor );

				panOffset.multiplyScalar( 1 - scope.dampingFactor );

			} else {

				sphericalDelta.set( 0, 0, 0 );

				panOffset.set( 0, 0, 0 );

			}

			scale = 1;

			// update condition is:
			// min(camera displacement, camera rotation in radians)^2 > EPS
			// using small-angle approximation cos(x/2) = 1 - x^2 / 8

			if ( zoomChanged ||
				lastPosition.distanceToSquared( scope.object.position ) > EPS ||
				8 * ( 1 - lastQuaternion.dot( scope.object.quaternion ) ) > EPS ) {

				scope.dispatchEvent( changeEvent );

				lastPosition.copy( scope.object.position );
				lastQuaternion.copy( scope.object.quaternion );
				zoomChanged = false;

				return true;

			}

			return false;

		};

	}();

	this.dispose = function () {

		scope.domElement.removeEventListener( 'contextmenu', onContextMenu, false );
		scope.domElement.removeEventListener( 'mousedown', onMouseDown, false );
		scope.domElement.removeEventListener( 'wheel', onMouseWheel, false );

		scope.domElement.removeEventListener( 'touchstart', onTouchStart, false );
		scope.domElement.removeEventListener( 'touchend', onTouchEnd, false );
		scope.domElement.removeEventListener( 'touchmove', onTouchMove, false );

		document.removeEventListener( 'mousemove', onMouseMove, false );
		document.removeEventListener( 'mouseup', onMouseUp, false );

		scope.domElement.removeEventListener( 'keydown', onKeyDown, false );

		//scope.dispatchEvent( { type: 'dispose' } ); // should this be added here?

	};

	//
	// internals
	//

	var scope = this;

	var changeEvent = { type: 'change' };
	var startEvent = { type: 'start' };
	var endEvent = { type: 'end' };

	var STATE = {
		NONE: - 1,
		ROTATE: 0,
		DOLLY: 1,
		PAN: 2,
		TOUCH_ROTATE: 3,
		TOUCH_PAN: 4,
		TOUCH_DOLLY_PAN: 5,
		TOUCH_DOLLY_ROTATE: 6
	};

	var state = STATE.NONE;

	var EPS = 0.000001;

	// current position in spherical coordinates
	var spherical = new Spherical();
	var sphericalDelta = new Spherical();

	var scale = 1;
	var panOffset = new Vector3();
	var zoomChanged = false;

	var rotateStart = new Vector2();
	var rotateEnd = new Vector2();
	var rotateDelta = new Vector2();

	var panStart = new Vector2();
	var panEnd = new Vector2();
	var panDelta = new Vector2();

	var dollyStart = new Vector2();
	var dollyEnd = new Vector2();
	var dollyDelta = new Vector2();

	function getAutoRotationAngle() {

		return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;

	}

	function getZoomScale() {

		return Math.pow( 0.95, scope.zoomSpeed );

	}

	function rotateLeft( angle ) {

		sphericalDelta.theta -= angle;

	}

	function rotateUp( angle ) {

		sphericalDelta.phi -= angle;

	}

	var panLeft = function () {

		var v = new Vector3();

		return function panLeft( distance, objectMatrix ) {

			v.setFromMatrixColumn( objectMatrix, 0 ); // get X column of objectMatrix
			v.multiplyScalar( - distance );

			panOffset.add( v );

		};

	}();

	var panUp = function () {

		var v = new Vector3();

		return function panUp( distance, objectMatrix ) {

			if ( scope.screenSpacePanning === true ) {

				v.setFromMatrixColumn( objectMatrix, 1 );

			} else {

				v.setFromMatrixColumn( objectMatrix, 0 );
				v.crossVectors( scope.object.up, v );

			}

			v.multiplyScalar( distance );

			panOffset.add( v );

		};

	}();

	// deltaX and deltaY are in pixels; right and down are positive
	var pan = function () {

		var offset = new Vector3();

		return function pan( deltaX, deltaY ) {

			var element = scope.domElement;

			if ( scope.object.isPerspectiveCamera ) {

				// perspective
				var position = scope.object.position;
				offset.copy( position ).sub( scope.target );
				var targetDistance = offset.length();

				// half of the fov is center to top of screen
				targetDistance *= Math.tan( ( scope.object.fov / 2 ) * Math.PI / 180.0 );

				// we use only clientHeight here so aspect ratio does not distort speed
				panLeft( 2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix );
				panUp( 2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix );

			} else if ( scope.object.isOrthographicCamera ) {

				// orthographic
				panLeft( deltaX * ( scope.object.right - scope.object.left ) / scope.object.zoom / element.clientWidth, scope.object.matrix );
				panUp( deltaY * ( scope.object.top - scope.object.bottom ) / scope.object.zoom / element.clientHeight, scope.object.matrix );

			} else {

				// camera neither orthographic nor perspective
				console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.' );
				scope.enablePan = false;

			}

		};

	}();

	function dollyOut( dollyScale ) {

		if ( scope.object.isPerspectiveCamera ) {

			scale /= dollyScale;

		} else if ( scope.object.isOrthographicCamera ) {

			scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom * dollyScale ) );
			scope.object.updateProjectionMatrix();
			zoomChanged = true;

		} else {

			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
			scope.enableZoom = false;

		}

	}

	function dollyIn( dollyScale ) {

		if ( scope.object.isPerspectiveCamera ) {

			scale *= dollyScale;

		} else if ( scope.object.isOrthographicCamera ) {

			scope.object.zoom = Math.max( scope.minZoom, Math.min( scope.maxZoom, scope.object.zoom / dollyScale ) );
			scope.object.updateProjectionMatrix();
			zoomChanged = true;

		} else {

			console.warn( 'WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.' );
			scope.enableZoom = false;

		}

	}

	//
	// event callbacks - update the object state
	//

	function handleMouseDownRotate( event ) {

		rotateStart.set( event.clientX, event.clientY );

	}

	function handleMouseDownDolly( event ) {

		dollyStart.set( event.clientX, event.clientY );

	}

	function handleMouseDownPan( event ) {

		panStart.set( event.clientX, event.clientY );

	}

	function handleMouseMoveRotate( event ) {

		rotateEnd.set( event.clientX, event.clientY );

		rotateDelta.subVectors( rotateEnd, rotateStart ).multiplyScalar( scope.rotateSpeed );

		var element = scope.domElement;

		rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight ); // yes, height

		rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );

		rotateStart.copy( rotateEnd );

		scope.update();

	}

	function handleMouseMoveDolly( event ) {

		dollyEnd.set( event.clientX, event.clientY );

		dollyDelta.subVectors( dollyEnd, dollyStart );

		if ( dollyDelta.y > 0 ) {

			dollyOut( getZoomScale() );

		} else if ( dollyDelta.y < 0 ) {

			dollyIn( getZoomScale() );

		}

		dollyStart.copy( dollyEnd );

		scope.update();

	}

	function handleMouseMovePan( event ) {

		panEnd.set( event.clientX, event.clientY );

		panDelta.subVectors( panEnd, panStart ).multiplyScalar( scope.panSpeed );

		pan( panDelta.x, panDelta.y );

		panStart.copy( panEnd );

		scope.update();

	}

	function handleMouseUp( /*event*/ ) {

		// no-op

	}

	function handleMouseWheel( event ) {

		if ( event.deltaY < 0 ) {

			dollyIn( getZoomScale() );

		} else if ( event.deltaY > 0 ) {

			dollyOut( getZoomScale() );

		}

		scope.update();

	}

	function handleKeyDown( event ) {

		var needsUpdate = false;

		switch ( event.keyCode ) {

			case scope.keys.UP:
				pan( 0, scope.keyPanSpeed );
				needsUpdate = true;
				break;

			case scope.keys.BOTTOM:
				pan( 0, - scope.keyPanSpeed );
				needsUpdate = true;
				break;

			case scope.keys.LEFT:
				pan( scope.keyPanSpeed, 0 );
				needsUpdate = true;
				break;

			case scope.keys.RIGHT:
				pan( - scope.keyPanSpeed, 0 );
				needsUpdate = true;
				break;

		}

		if ( needsUpdate ) {

			// prevent the browser from scrolling on cursor keys
			event.preventDefault();

			scope.update();

		}


	}

	function handleTouchStartRotate( event ) {

		if ( event.touches.length == 1 ) {

			rotateStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

		} else {

			var x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
			var y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );

			rotateStart.set( x, y );

		}

	}

	function handleTouchStartPan( event ) {

		if ( event.touches.length == 1 ) {

			panStart.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

		} else {

			var x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
			var y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );

			panStart.set( x, y );

		}

	}

	function handleTouchStartDolly( event ) {

		var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
		var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

		var distance = Math.sqrt( dx * dx + dy * dy );

		dollyStart.set( 0, distance );

	}

	function handleTouchStartDollyPan( event ) {

		if ( scope.enableZoom ) handleTouchStartDolly( event );

		if ( scope.enablePan ) handleTouchStartPan( event );

	}

	function handleTouchStartDollyRotate( event ) {

		if ( scope.enableZoom ) handleTouchStartDolly( event );

		if ( scope.enableRotate ) handleTouchStartRotate( event );

	}

	function handleTouchMoveRotate( event ) {

		if ( event.touches.length == 1 ) {

			rotateEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

		} else {

			var x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
			var y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );

			rotateEnd.set( x, y );

		}

		rotateDelta.subVectors( rotateEnd, rotateStart ).multiplyScalar( scope.rotateSpeed );

		var element = scope.domElement;

		rotateLeft( 2 * Math.PI * rotateDelta.x / element.clientHeight ); // yes, height

		rotateUp( 2 * Math.PI * rotateDelta.y / element.clientHeight );

		rotateStart.copy( rotateEnd );

	}

	function handleTouchMovePan( event ) {

		if ( event.touches.length == 1 ) {

			panEnd.set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );

		} else {

			var x = 0.5 * ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX );
			var y = 0.5 * ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY );

			panEnd.set( x, y );

		}

		panDelta.subVectors( panEnd, panStart ).multiplyScalar( scope.panSpeed );

		pan( panDelta.x, panDelta.y );

		panStart.copy( panEnd );

	}

	function handleTouchMoveDolly( event ) {

		var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
		var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;

		var distance = Math.sqrt( dx * dx + dy * dy );

		dollyEnd.set( 0, distance );

		dollyDelta.set( 0, Math.pow( dollyEnd.y / dollyStart.y, scope.zoomSpeed ) );

		dollyOut( dollyDelta.y );

		dollyStart.copy( dollyEnd );

	}

	function handleTouchMoveDollyPan( event ) {

		if ( scope.enableZoom ) handleTouchMoveDolly( event );

		if ( scope.enablePan ) handleTouchMovePan( event );

	}

	function handleTouchMoveDollyRotate( event ) {

		if ( scope.enableZoom ) handleTouchMoveDolly( event );

		if ( scope.enableRotate ) handleTouchMoveRotate( event );

	}

	function handleTouchEnd( /*event*/ ) {

		// no-op

	}

	//
	// event handlers - FSM: listen for events and reset state
	//

	function onMouseDown( event ) {

		if ( scope.enabled === false ) return;

		// Prevent the browser from scrolling.
		event.preventDefault();

		// Manually set the focus since calling preventDefault above
		// prevents the browser from setting it automatically.

		scope.domElement.focus ? scope.domElement.focus() : window.focus();

		var mouseAction;

		switch ( event.button ) {

			case 0:

				mouseAction = scope.mouseButtons.LEFT;
				break;

			case 1:

				mouseAction = scope.mouseButtons.MIDDLE;
				break;

			case 2:

				mouseAction = scope.mouseButtons.RIGHT;
				break;

			default:

				mouseAction = - 1;

		}

		switch ( mouseAction ) {

			case MOUSE.DOLLY:

				if ( scope.enableZoom === false ) return;

				handleMouseDownDolly( event );

				state = STATE.DOLLY;

				break;

			case MOUSE.ROTATE:

				if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

					if ( scope.enablePan === false ) return;

					handleMouseDownPan( event );

					state = STATE.PAN;

				} else {

					if ( scope.enableRotate === false ) return;

					handleMouseDownRotate( event );

					state = STATE.ROTATE;

				}

				break;

			case MOUSE.PAN:

				if ( event.ctrlKey || event.metaKey || event.shiftKey ) {

					if ( scope.enableRotate === false ) return;

					handleMouseDownRotate( event );

					state = STATE.ROTATE;

				} else {

					if ( scope.enablePan === false ) return;

					handleMouseDownPan( event );

					state = STATE.PAN;

				}

				break;

			default:

				state = STATE.NONE;

		}

		if ( state !== STATE.NONE ) {

			document.addEventListener( 'mousemove', onMouseMove, false );
			document.addEventListener( 'mouseup', onMouseUp, false );

			scope.dispatchEvent( startEvent );

		}

	}

	function onMouseMove( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();

		switch ( state ) {

			case STATE.ROTATE:

				if ( scope.enableRotate === false ) return;

				handleMouseMoveRotate( event );

				break;

			case STATE.DOLLY:

				if ( scope.enableZoom === false ) return;

				handleMouseMoveDolly( event );

				break;

			case STATE.PAN:

				if ( scope.enablePan === false ) return;

				handleMouseMovePan( event );

				break;

		}

	}

	function onMouseUp( event ) {

		if ( scope.enabled === false ) return;

		handleMouseUp( event );

		document.removeEventListener( 'mousemove', onMouseMove, false );
		document.removeEventListener( 'mouseup', onMouseUp, false );

		scope.dispatchEvent( endEvent );

		state = STATE.NONE;

	}

	function onMouseWheel( event ) {

		if ( scope.enabled === false || scope.enableZoom === false || ( state !== STATE.NONE && state !== STATE.ROTATE ) ) return;

		event.preventDefault();
		event.stopPropagation();

		scope.dispatchEvent( startEvent );

		handleMouseWheel( event );

		scope.dispatchEvent( endEvent );

	}

	function onKeyDown( event ) {

		if ( scope.enabled === false || scope.enableKeys === false || scope.enablePan === false ) return;

		handleKeyDown( event );

	}

	function onTouchStart( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault(); // prevent scrolling

		switch ( event.touches.length ) {

			case 1:

				switch ( scope.touches.ONE ) {

					case TOUCH.ROTATE:

						if ( scope.enableRotate === false ) return;

						handleTouchStartRotate( event );

						state = STATE.TOUCH_ROTATE;

						break;

					case TOUCH.PAN:

						if ( scope.enablePan === false ) return;

						handleTouchStartPan( event );

						state = STATE.TOUCH_PAN;

						break;

					default:

						state = STATE.NONE;

				}

				break;

			case 2:

				switch ( scope.touches.TWO ) {

					case TOUCH.DOLLY_PAN:

						if ( scope.enableZoom === false && scope.enablePan === false ) return;

						handleTouchStartDollyPan( event );

						state = STATE.TOUCH_DOLLY_PAN;

						break;

					case TOUCH.DOLLY_ROTATE:

						if ( scope.enableZoom === false && scope.enableRotate === false ) return;

						handleTouchStartDollyRotate( event );

						state = STATE.TOUCH_DOLLY_ROTATE;

						break;

					default:

						state = STATE.NONE;

				}

				break;

			default:

				state = STATE.NONE;

		}

		if ( state !== STATE.NONE ) {

			scope.dispatchEvent( startEvent );

		}

	}

	function onTouchMove( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault(); // prevent scrolling
		event.stopPropagation();

		switch ( state ) {

			case STATE.TOUCH_ROTATE:

				if ( scope.enableRotate === false ) return;

				handleTouchMoveRotate( event );

				scope.update();

				break;

			case STATE.TOUCH_PAN:

				if ( scope.enablePan === false ) return;

				handleTouchMovePan( event );

				scope.update();

				break;

			case STATE.TOUCH_DOLLY_PAN:

				if ( scope.enableZoom === false && scope.enablePan === false ) return;

				handleTouchMoveDollyPan( event );

				scope.update();

				break;

			case STATE.TOUCH_DOLLY_ROTATE:

				if ( scope.enableZoom === false && scope.enableRotate === false ) return;

				handleTouchMoveDollyRotate( event );

				scope.update();

				break;

			default:

				state = STATE.NONE;

		}

	}

	function onTouchEnd( event ) {

		if ( scope.enabled === false ) return;

		handleTouchEnd( event );

		scope.dispatchEvent( endEvent );

		state = STATE.NONE;

	}

	function onContextMenu( event ) {

		if ( scope.enabled === false ) return;

		event.preventDefault();

	}

	//

	scope.domElement.addEventListener( 'contextmenu', onContextMenu, false );

	scope.domElement.addEventListener( 'mousedown', onMouseDown, false );
	scope.domElement.addEventListener( 'wheel', onMouseWheel, false );

	scope.domElement.addEventListener( 'touchstart', onTouchStart, false );
	scope.domElement.addEventListener( 'touchend', onTouchEnd, false );
	scope.domElement.addEventListener( 'touchmove', onTouchMove, false );

	scope.domElement.addEventListener( 'keydown', onKeyDown, false );

	// make sure element can receive keys.

	if ( scope.domElement.tabIndex === - 1 ) {

		scope.domElement.tabIndex = 0;

	}

	// force an update at start

	this.update();

};

OrbitControls.prototype = Object.create( EventDispatcher.prototype );
OrbitControls.prototype.constructor = OrbitControls;


// This set of controls performs orbiting, dollying (zooming), and panning.
// Unlike TrackballControls, it maintains the "up" direction object.up (+Y by default).
// This is very similar to OrbitControls, another set of touch behavior
//
//    Orbit - right mouse, or left mouse + ctrl/meta/shiftKey / touch: two-finger rotate
//    Zoom - middle mouse, or mousewheel / touch: two-finger spread or squish
//    Pan - left mouse, or arrow keys / touch: one-finger move

var MapControls = function ( object, domElement ) {

	OrbitControls.call( this, object, domElement );

	this.mouseButtons.LEFT = MOUSE.PAN;
	this.mouseButtons.RIGHT = MOUSE.ROTATE;

	this.touches.ONE = TOUCH.PAN;
	this.touches.TWO = TOUCH.DOLLY_ROTATE;

};

MapControls.prototype = Object.create( EventDispatcher.prototype );
MapControls.prototype.constructor = MapControls;

export { OrbitControls, MapControls };
