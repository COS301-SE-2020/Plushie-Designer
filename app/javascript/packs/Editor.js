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
												readTextFile("/file_paths.JSON", function(text){
													var data = JSON.parse(text);
													// console.log(r_leg_models);
													var headchange = false;
													var torsochange = false;
													var larmchange = false; 
													var rarmchange = false; 
													var llegchange = false;
													var rlegchange = false;
													var bchange = false;

													var type = 0;
													var typechange = false;

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
														//---------------------SAVE TO DB----------------------
														function saveTextureToDB(tex)
													{
														switch(currentSelection)
														{
															case htemp:  $("#toy_head_tex")[0].value = tex;
															break;
															case ttemp:  $("#toy_torso_tex")[0].value = tex;
															break;
															case lltemp:  $("#toy_lleg_tex")[0].value = tex;
															break;
															case rltemp:  $("#toy_rleg_tex")[0].value = tex;
															break;
															case latemp:  $("#toy_larm_tex")[0].value = tex;
															break;
															case ratemp:  $("#toy_rarm_tex")[0].value = tex;
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
													//-----------------------------Populate the controls with models-------------------
													populateControls();
													//---------------------------------------------------------------------------------
													//----------------------------------ADD MODEL----------------------------------------
													function add_model_to_scene(gltf, name)
													{
														let color = colors[2].color;
															
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
																color = $("#toy_head_tex")[0].value;
																gltf.scene.position.setY(headposy); 
																gltf.scene.position.setX(headposx);
																gltf.scene.position.setZ(headposz);  
																console.log(gltf.scene.children[0]);
																$("#toy_head_uv")[0].value = UVsDebug(gltf.scene.children[0].geometry, gltf.scene.children[0].scale.x, gltf.scene.children[0].scale.y,
																	color, false).toDataURL("image/png");
																break;
															case "torso" : 
																ttemp = gltf.scene;
																color = $("#toy_torso_tex")[0].value;
																gltf.scene.position.setY(torsoposy); 
																gltf.scene.position.setX(torsoposx);  
																gltf.scene.position.setZ(torsoposz);
																console.log(gltf.scene.children[0]);
																$("#toy_torso_uv")[0].value = UVsDebug(gltf.scene.children[0].geometry, gltf.scene.children[0].scale.x, gltf.scene.children[0].scale.y
																	, color, false ).toDataURL("image/png");															
																break;
															case "leftarm" : 
																latemp = gltf.scene; 
																color = $("#toy_larm_tex")[0].value;
																gltf.scene.position.setY(larmposy); 
																gltf.scene.position.setX(larmposx);
																gltf.scene.position.setZ(larmposz);
																$("#toy_larm_uv")[0].value = UVsDebug(gltf.scene.children[0].geometry, gltf.scene.children[0].scale.x, gltf.scene.children[0].scale.y
																	, color, false).toDataURL("image/png");
															break;
															case "rightarm" : 
																ratemp = gltf.scene;
																color = $("#toy_rarm_tex")[0].value;
																gltf.scene.position.setY(rarmposy); 
																gltf.scene.position.setX(rarmposx); 
																gltf.scene.position.setZ(rarmposz);
																$("#toy_rarm_uv")[0].value = UVsDebug(gltf.scene.children[0].geometry, gltf.scene.children[0].scale.x, gltf.scene.children[0].scale.y,
																	color , false).toDataURL("image/png");
															break;
															case "leftleg" : 
																lltemp = gltf.scene;
																color = $("#toy_lleg_tex")[0].value;
																gltf.scene.position.setY(llegposy); 
																gltf.scene.position.setX(llegposx);  
																gltf.scene.position.setZ(llegposz);
																$("#toy_lleg_uv")[0].value = UVsDebug(gltf.scene.children[0].geometry, gltf.scene.children[0].scale.x, gltf.scene.children[0].scale.y
																	,color , false).toDataURL("image/png");
															break;
															case "rightleg" : 
																rltemp = gltf.scene;
																color = $("#toy_rleg_tex")[0].value;
																gltf.scene.position.setY(rlegposy); 
																gltf.scene.position.setX(rlegposx);  
																gltf.scene.position.setZ(rlegposz);
																$("#toy_rleg_uv")[0].value = UVsDebug(gltf.scene.children[0].geometry, gltf.scene.children[0].scale.x, gltf.scene.children[0].scale.y,
																	color , false).toDataURL("image/png");
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

													// var tempy;
													// var tempx;
													// var tempz;
													// //--------------------------DragControls-------------------------
													// var Dcontrols = new DragControls( scene.children, camera, renderer.domElement );
													// // Dcontrols.transformGroup = true;
													// Dcontrols.addEventListener( 'dragstart', function ( event ) {

													// 	if(event.object.name == "" || event.object.name == "hair" || event.object.name == "HeadBow008" || event.object.name == "HeadBow007" || event.object.name == "HairBow_base003" ){
													// 		Dcontrols.enabled = false;
													// 	}
													// 	else{
													// 		event.object.material.emissive.set( 0xaaaaaa );
													// 		controls.enableRotate = false;
													// 		tempy = event.object.position.y;
													// 		tempx = event.object.position.x;
													// 		tempz = event.object.position.z;
													// 	}
													// } );

													// Dcontrols.addEventListener( 'dragend', function ( event ) {

													// 	if(event.object.name == "" || event.object.name == "hair" || event.object.name == "HeadBow008" || event.object.name == "HeadBow007" || event.object.name == "HairBow_base003" ){
													// 		Dcontrols.enabled = true;
													// 	}
													// 	else{
													// 		event.object.material.emissive.set( 0x000000 );
													// 		controls.enableRotate = true;
													// 		if(event.object.name == "head"){
													// 			updateIndexes();
													// 			$("#toy_head_pos")[0].value = event.object.position.y - tempy;
													// 			// console.log($("#toy_head_pos")[0].value);
													// 			$("#toy_head_posx")[0].value = event.object.position.x - tempx;
													// 			$("#toy_head_posz")[0].value = event.object.position.z - tempz;
													// 			if(ihair!=99){
													// 				hhtemp.position.setY($("#toy_head_pos")[0].value);
													// 				hhtemp.position.setX($("#toy_head_posx")[0].value);
													// 				hhtemp.position.setZ($("#toy_head_posz")[0].value);
													// 			}
													// 		}
													// 		console.log(event.object.name);
													// 		if(event.object.name == "body"){
													// 			$("#toy_torso_posy")[0].value = event.object.position.y - tempy;
													// 			$("#toy_torso_posx")[0].value = event.object.position.x - tempx;
													// 			$("#toy_torso_posz")[0].value = event.object.position.z - tempz;
													// 		}
													// 		if(event.object.name == "l_arm"){
													// 			$("#toy_larm_posy")[0].value = event.object.position.y - tempy;
													// 			$("#toy_larm_posx")[0].value = event.object.position.x - tempx;
													// 			$("#toy_larm_posz")[0].value = event.object.position.z - tempz;
													// 		}
													// 		if(event.object.name == "r_arm"){
													// 			$("#toy_rarm_posy")[0].value = event.object.position.y - tempy;
													// 			$("#toy_rarm_posx")[0].value = event.object.position.x - tempx;
													// 			$("#toy_rarm_posz")[0].value = event.object.position.z - tempz;
													// 		}

													// 		if(event.object.name == "l_leg"){
													// 			$("#toy_lleg_posy")[0].value = event.object.position.y - tempy;
													// 			// console.log($("#toy_lleg_posy")[0].value);
													// 			$("#toy_lleg_posx")[0].value = event.object.position.x - tempx;
													// 			$("#toy_lleg_posz")[0].value = event.object.position.z - tempz;
													// 		}
													// 		if(event.object.name == "r_leg"){
													// 			$("#toy_rleg_posy")[0].value = event.object.position.y - tempy;
													// 			$("#toy_rleg_posx")[0].value = event.object.position.x - tempx;
													// 			$("#toy_rleg_posz")[0].value = event.object.position.z - tempz;
													// 		}
													// 	}
													// } );
													//----------------------------------------------------------------
													//-------------------------------ANIMATE---------------------------------
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
																button.type = "button";
																button.value = i;
																button.onclick = function(){
																	if(head!=this.value){
																		headchange = true;
																		head = this.value;
																		$("#toy_head")[0].value = head;
																	}																
																};
																hprsh.appendChild(button);
															}
														}
																																									
														for(var i=0;i<data.file_paths.models.length;++i){
															if(data.file_paths.models[i].type==type){
																var button = document.createElement('button');
																button.innerHTML = '<img class="modimgbtn" src="' + data.file_paths.models[i].body.img + '" />';
																button.className = 'btn';
																button.type = "button";
																button.value = i;
																button.onclick = function(){
																	if(torso!=this.value){
																		torsochange = true;
																		torso = this.value;
																		$("#toy_torso")[0].value = torso;
																	}
																};
																tprsh.appendChild(button);
															}
														}
																								
														for(var i=0;i<data.file_paths.models.length;++i){
															if(data.file_paths.models[i].type==type){
																var button = document.createElement('button');
																button.innerHTML = '<img class="modimgbtn" src="' + data.file_paths.models[i].l_arm.img + '" />';
																button.className = 'btn';
																button.type = "button";
																button.value = i;
																button.onclick = function(){
																	if(larm!=this.value){
																		larmchange = true;
																		larm = this.value;
																		$("#toy_arms")[0].value = larm;
																	}																
																};
																laprsh.appendChild(button);
															}
														}

														for(var i=0;i<data.file_paths.models.length;++i){
															if(data.file_paths.models[i].type==type){
																var button = document.createElement('button');
																button.innerHTML = '<img class="modimgbtn" src="' + data.file_paths.models[i].r_arm.img + '" />';
																button.className = 'btn';
																button.type = "button";
																button.value = i;
																button.onclick = function(){
																	if(rarm!=this.value){
																		rarmchange = true;
																		rarm = this.value;
																		$("#toy_r_arm")[0].value = rarm;
																	}																
																};
																raprsh.appendChild(button);
															}
														}

														for(var i=0;i<data.file_paths.models.length;++i){
															if(data.file_paths.models[i].type==type){
																var button = document.createElement('button');
																button.innerHTML = '<img class="modimgbtn" src="' + data.file_paths.models[i].l_leg.img + '" />';
																button.className = 'btn';
																button.type = "button";
																button.value = i;
																button.onclick = function(){
																	if(lleg!=this.value){
																		llegchange = true;
																		lleg = this.value;
																		$("#toy_legs")[0].value = lleg;
																	}															
																};
																llprsh.appendChild(button);
															}
														}

														for(var i=0;i<data.file_paths.models.length;++i){
															if(data.file_paths.models[i].type==type){
																var button = document.createElement('button');
																button.innerHTML = '<img class="modimgbtn" src="' + data.file_paths.models[i].r_leg.img + '" />';
																button.className = 'btn';
																button.type = "button";
																button.value = i;
																button.onclick = function(){
																	if(rleg!=this.value){
																		rlegchange = true;
																		rleg = this.value;
																		$("#toy_r_leg")[0].value = rleg;
																	}																
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
																	headchange = true;
																	head = this.value;
																	$("#toy_head")[0].value = head;
																}																
															};
															hupsh.appendChild(button);
														}
																																									
														for(var i=0;i<body_models.length;++i){
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
																	torsochange = true;
																	torso = this.value;
																	$("#toy_torso")[0].value = torso;
																}
															};
															tupsh.appendChild(button);
														}
																								
														for(var i=0;i<l_arm_models.length;++i){
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
																	larmchange = true;
																	larm = this.value;
																	$("#toy_arms")[0].value = larm;
																}																
															};
															laupsh.appendChild(button);
														}

														for(var i=0;i<r_arm_models.length;++i){
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
																	rarmchange = true;
																	rarm = this.value;
																	$("#toy_r_arm")[0].value = rarm;
																}																
															};
															raupsh.appendChild(button);
														}

														for(var i=0;i<l_leg_models.length;++i){
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
																	llegchange = true;
																	lleg = this.value;
																	$("#toy_legs")[0].value = lleg;
																}															
															};
															llupsh.appendChild(button);
														}

														for(var i=0;i<r_leg_models.length;++i){
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
																	rlegchange = true;
																	rleg = this.value;
																	$("#toy_r_leg")[0].value = rleg;
																}																
															};
															rlupsh.appendChild(button);
														}
													}

													$(document).ready(function(){	
														$('#humanoid').click(function () {
															if(type!=0){
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
															}
														});
														
														$('#animal').click(function () {
															if(type!=1){
																type=1;
																typechange=true;
																$('#lach').html('Left Arm');
																$('#rach').html('Right Arm');
																$('#llch').html('Left Leg');
																$('#rlch').html('Right Leg');

																hair = 2;
																head = 2;
																torso = 2;
																larm = 2;
																rarm = 2;
																lleg = 2;
																rleg = 2;

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
															}
														});
														
														$('#fish').click(function () {
															if(type!=2){
																type=2;
																typechange=true;
																$('#lach').html('Left Fin');
																$('#rach').html('Right Fin');
																$('#llch').html('Back Fin');
																$('#rlch').html('Tail Fin');

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
															}
														});

														$('#headup').attr("value",-headposy);
														$('#headleft').attr("value",headposx);
														$('#headfront').attr("value",-headposz);

														$('#torsoup').attr("value",-torsoposy);
														$('#torsoleft').attr("value",torsoposx);
														$('#torsofront').attr("value",-torsoposz);

														$('#larmup').attr("value",-larmposy);
														$('#larmleft').attr("value",larmposx);
														$('#larmfront').attr("value",-larmposz);
														$('#rarmup').attr("value",-rarmposy);
														$('#rarmleft').attr("value",rarmposx);
														$('#rarmfront').attr("value",-rarmposz);

														$('#llegup').attr("value",-llegposy);
														$('#llegleft').attr("value",llegposx);
														$('#llegfront').attr("value",-llegposz);
														$('#rlegup').attr("value",-rlegposy);
														$('#rlegleft').attr("value",rlegposx);
														$('#rlegfront').attr("value",-rlegposz);

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

														$('#headl').click(function () {
															if($("#toy_head")[0].value > 0){
																headchange = true;
																$("#toy_head")[0].value -= 1;
																head = $("#toy_head")[0].value;
															}
														});
														$('#headr').click(function () {
															var tmp = $("#toy_head")[0].value;
															if(tmp < 1 + head_models.length){
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
															htemp.position.setY(-t);
															// console.log(t);
															if(hhtemp!=null){
																hhtemp.position.setY(-t);
															}
															$("#toy_head_pos")[0].value = -t;
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

														$('#larml').click(function () {
															if($("#toy_arms")[0].value > 0){
																larmchange = true;
																$("#toy_arms")[0].value -= 1;
																larm = $("#toy_arms")[0].value;
															}
														});
														$('#larmr').click(function () {
															var tmp = $("#toy_arms")[0].value;
															if(tmp < 1 + l_arm_models.length){
																larmchange = true;
																tmp = +tmp + +1;
																$("#toy_arms")[0].value = tmp;
																larm = $("#toy_arms")[0].value;
															}
														});

														$('#rarml').click(function () {
															if($("#toy_r_arm")[0].value > 0){
																rarmchange = true;
																$("#toy_r_arm")[0].value -= 1;
																rarm = $("#toy_r_arm")[0].value;
															}
														});
														$('#rarmr').click(function () {
															var tmp = $("#toy_r_arm")[0].value;
															if(tmp < 1 + r_arm_models.length){
																rarmchange = true;
																tmp = +tmp + +1;
																$("#toy_r_arm")[0].value = tmp;
																rarm = $("#toy_r_arm")[0].value;
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
															latemp.position.setY(-t);
															// console.log(t);
															$("#toy_larm_posy")[0].value = -t;
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
															ratemp.position.setY(-t);
															// console.log(t);
															$("#toy_rarm_posy")[0].value = -t;
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
															if(tmp < 1  + body_models.length){
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
															ttemp.position.setY(-t);
															// console.log(t);
															$("#toy_torso_posy")[0].value = -t;
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

														$('#llegl').click(function () {
															if($("#toy_legs")[0].value > 0){
																llegchange = true;
																$("#toy_legs")[0].value -= 1;
																lleg = $("#toy_legs")[0].value;
															}
														});
														$('#llegr').click(function () {
															var tmp = $("#toy_legs")[0].value;
															if(tmp < 1 + l_leg_models.length){
																llegchange = true;
																tmp = +tmp + +1;
																$("#toy_legs")[0].value = tmp;
																lleg = $("#toy_legs")[0].value;
															}
														});

														$('#rlegl').click(function () {
															if($("#toy_r_leg")[0].value > 0){
																rlegchange = true;
																$("#toy_r_leg")[0].value -= 1;
																rleg = $("#toy_r_leg")[0].value;
															}
														});
														$('#rlegr').click(function () {
															var tmp = $("#toy_r_leg")[0].value;
															if(tmp < 1 + r_leg_models.length){
																rlegchange = true;
																tmp = +tmp + +1;
																$("#toy_r_leg")[0].value = tmp;
																rleg = $("#toy_r_leg")[0].value;
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
															lltemp.position.setY(-t);
															// console.log(t);
															$("#toy_lleg_posy")[0].value = -t;
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
															rltemp.position.setY(-t);
															// console.log(t);
															$("#toy_rleg_posy")[0].value = -t;
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