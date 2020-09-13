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
		console.log(head_models);
		$.ajax({
			url: "/body_models",
			dataType: "json",
			success:  function(body_models){
				console.log(body_models);
				$.ajax({
					url: "/l_arm_models",
					dataType: "json",
					success:  function(l_arm_models){
						console.log(l_arm_models);
						$.ajax({
							url: "/r_arm_models",
							dataType: "json",
							success:  function(r_arm_models){
								console.log(r_arm_models);
								$.ajax({
									url: "/l_leg_models",
									dataType: "json",
									success:  function(l_leg_models){
										console.log(l_leg_models);
										$.ajax({
											url: "/r_leg_models",
											dataType: "json",
											success:  function(r_leg_models){
												readTextFile("/file_paths1.JSON", function(text){
													var data = JSON.parse(text);
													console.log(r_leg_models);
													var headchange = false;
													var torsochange = false;
													var larmchange = false; 
													var rarmchange = false; 
													var llegchange = false;
													var rlegchange = false;
													var bchange = false;

													var hair = 0;
													var head = 0;
													var torso = 0;
													var larm = 0;
													var rarm = 0;
													var lleg = 0;
													var rleg = 0;
													var room = 0;
													var rtmp = 0;

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

													//TEst UV image generation
													// function test( name, mesh ) {

													// 	var d = document.createElement( 'div' );

													// 	d.innerHTML = '<h3>' + name + '</h3>';
													// 	var Uvimg = UVsDebug( mesh ).toDataURL("image/png") ;

													// 	var image = new Image();
													//         image.src =  Uvimg;

													// 		var w = window.open("", "");
													//         w.document.write(image.outerHTML);

													// }

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
													//-----------------------------Populate the controls with models-------------------
													populateControls();
													//---------------------------------------------------------------------------------
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
															case "hair" : hhtemp = gltf.scene; break;
															case "head" : 
															htemp = gltf.scene;
															// test("head", gltf.scene.children[0].geometry);
															break;
															case "torso" : ttemp = gltf.scene; break;
															case "leftarm" : latemp = gltf.scene; break;
															case "rightarm" : ratemp = gltf.scene; break;
															case "leftleg" : lltemp = gltf.scene; break;
															case "rightleg" : rltemp = gltf.scene; break;	
														}
														
													}
													//---------------------------------------------------------------------------------

													//----------------------------------ADD ROOM----------------------------------------
													function add_room_to_scene(gltf, name)
													{
														gltf.scene.name = name;
														gltf.scene.rotateY(-Math.PI/4);
														gltf.scene.children.forEach(obj => {
															obj.shininess = 0;
															obj.receiveShadow = true;
															obj.castShadow = true;
														});
														switch(name)
														{
															case "Room_1" : 
																gltf.scene.position.setY(-22.5);
																gltf.scene.position.setX(-3);
																gltf.scene.scale.set(20,20,20);
																break;
															case "Room_2" : 
																gltf.scene.position.setY(-2);
																gltf.scene.position.setZ(35);
																gltf.scene.position.setX(45);
																gltf.scene.scale.set(2,2,2);
																break;
														}

														scene.add( gltf.scene );
														btemp = gltf.scene;
													}
													//---------------------------------------------------------------------------------
													//---------------------------------HAIR-------------------------------------------
													hurl = data.file_paths.models[hair].hair;
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
													//----------------------------------------------------------------

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
													var material = new THREE.MeshPhongMaterial({ color: 0x3b4252});
													material.shininess = 0;
													var plane = new THREE.Mesh(geometry, material);
													plane.castShadow = false;
													plane.receiveShadow = true;
													plane.position.setY(-3.7);
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
													console.log(scene.children);

													window.addEventListener( 'resize', onWindowResize, false );

													function onWindowResize() {

														ConfigureCanvas();

													}

													// console.log(scene.children);
													//-------------------------------ANIMATE---------------------------------
													var animate = function () {
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
																updateIndexes();
																if(ihair!=99){
																	var temp = scene.getObjectByName(scene.children[ihair].name);
																	scene.remove(temp);
																	hhtemp = null;
																	ihair=99;
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
														var w = window.open('', '');
														w.document.title = "Screenshot";
														var img = new Image();
														renderer.setSize(500, 500);
														camera.aspect = 500 / 500;
														camera.position.set(0, 1.5, 8.5);
														camera.updateProjectionMatrix();
														renderer.render(scene, camera);
														img.src = renderer.domElement.toDataURL();
														renderer.setSize(window.innerWidth, window.innerHeight);
														camera.aspect = window.innerWidth / window.innerHeight;
														camera.position.set(0, 1, 10);
														camera.updateProjectionMatrix();
														w.document.body.appendChild(img);
														//console.log(img.src);
													}

													function populateControls(){
														var hprsh = document.getElementById("headprsh");
														var tprsh = document.getElementById("torsoprsh");
														var laprsh = document.getElementById("larmprsh");
														var raprsh = document.getElementById("rarmprsh");
														var llprsh = document.getElementById("llegprsh");
														var rlprsh = document.getElementById("rlegprsh");
														
														for(var i=0;i<data.file_paths.models.length;++i){
															var button = document.createElement('button');
															//alert(data.file_paths.models.test);
															button.innerHTML = '<img class="modimgbtn" src="' + data.file_paths.models[i].head.img + '" />';
															button.className = 'btn';
															button.value = i;
															button.onclick = function(){
																if(head!=this.value){
																	headchange = true;
																	head = this.value;
																}																
															};
															hprsh.appendChild(button);
														}
																																									
														for(var i=0;i<data.file_paths.models.length;++i){
															var button = document.createElement('button');
															button.innerHTML = '<img class="modimgbtn" src="' + data.file_paths.models[i].body.img + '" />';
															button.className = 'btn';
															button.value = i;
															button.onclick = function(){
																if(torso!=this.value){
																	torsochange = true;
																	torso = this.value;
																}
															};
															tprsh.appendChild(button);
														}
																								
														for(var i=0;i<data.file_paths.models.length;++i){
															var button = document.createElement('button');
															button.innerHTML = '<img class="modimgbtn" src="' + data.file_paths.models[i].l_arm.img + '" />';
															button.className = 'btn';
															button.value = i;
															button.onclick = function(){
																if(larm!=this.value){
																	larmchange = true;
																	larm = this.value;
																}																
															};
															laprsh.appendChild(button);
														}

														for(var i=0;i<data.file_paths.models.length;++i){
															var button = document.createElement('button');
															button.innerHTML = '<img class="modimgbtn" src="' + data.file_paths.models[i].r_arm.img + '" />';
															button.className = 'btn';
															button.value = i;
															button.onclick = function(){
																if(rarm!=this.value){
																	rarmchange = true;
																	rarm = this.value;
																}																
															};
															raprsh.appendChild(button);
														}

														for(var i=0;i<data.file_paths.models.length;++i){
															var button = document.createElement('button');
															button.innerHTML = '<img class="modimgbtn" src="' + data.file_paths.models[i].l_leg.img + '" />';
															button.className = 'btn';
															button.value = i;
															button.onclick = function(){
																if(lleg!=this.value){
																	llegchange = true;
																	lleg = this.value;
																}															
															};
															llprsh.appendChild(button);
														}

														for(var i=0;i<data.file_paths.models.length;++i){
															var button = document.createElement('button');
															button.innerHTML = '<img class="modimgbtn" src="' + data.file_paths.models[i].r_leg.img + '" />';
															button.className = 'btn';
															button.value = i;
															button.onclick = function(){
																if(rleg!=this.value){
																	rlegchange = true;
																	rleg = this.value;
																}																
															};
															rlprsh.appendChild(button);
														}

														var hupsh = document.getElementById("headupsh");
														var tupsh = document.getElementById("torsoupsh");
														var laupsh = document.getElementById("larmupsh");
														var raupsh = document.getElementById("rarmupsh");
														var llupsh = document.getElementById("llegupsh");
														var rlupsh = document.getElementById("rlegupsh");
														
														for(var i=0;i<head_models.length;++i){
															var button = document.createElement('button');
															button.innerHTML = '<img class="modimgbtn" src="' + head_models[i].head_image.url + '" alt="No Image" />';
															button.className = 'btn';
															button.value = i + data.file_paths.models.length;
															button.onclick = function(){
																if(head!=this.value){
																	headchange = true;
																	head = this.value;
																}																
															};
															hupsh.appendChild(button);
														}
																																									
														for(var i=0;i<body_models.length;++i){
															var button = document.createElement('button');
															button.innerHTML = '<img class="modimgbtn" src="' + body_models[i].body_image.url + '" alt="No Image" />';
															button.className = 'btn';
															button.value = i + data.file_paths.models.length;
															button.onclick = function(){
																if(torso!=this.value){
																	torsochange = true;
																	torso = this.value;
																}
															};
															tupsh.appendChild(button);
														}
																								
														for(var i=0;i<l_arm_models.length;++i){
															var button = document.createElement('button');
															button.innerHTML = '<img class="modimgbtn" src="' + l_arm_models[i].l_arm_image.url + '" alt="No Image" />';
															button.className = 'btn';
															button.value = i + data.file_paths.models.length;
															button.onclick = function(){
																if(larm!=this.value){
																	larmchange = true;
																	larm = this.value;
																}																
															};
															laupsh.appendChild(button);
														}

														for(var i=0;i<r_arm_models.length;++i){
															var button = document.createElement('button');
															button.innerHTML = '<img class="modimgbtn" src="' + r_arm_models[i].r_arm_image.url + '" alt="No Image" />';
															button.className = 'btn';
															button.value = i + data.file_paths.models.length;
															button.onclick = function(){
																if(rarm!=this.value){
																	rarmchange = true;
																	rarm = this.value;
																}																
															};
															raupsh.appendChild(button);
														}

														for(var i=0;i<l_leg_models.length;++i){
															var button = document.createElement('button');
															button.innerHTML = '<img class="modimgbtn" src="' + l_leg_models[i].l_leg_image.url + '" alt="No Image" />';
															button.className = 'btn';
															button.value = i + data.file_paths.models.length;
															button.onclick = function(){
																if(lleg!=this.value){
																	llegchange = true;
																	lleg = this.value;
																}															
															};
															llupsh.appendChild(button);
														}

														for(var i=0;i<r_leg_models.length;++i){
															var button = document.createElement('button');
															button.innerHTML = '<img class="modimgbtn" src="' + r_leg_models[i].r_leg_image.url + '" alt="No Image" />';
															button.className = 'btn';
															button.value = i + data.file_paths.models.length;
															button.onclick = function(){
																if(rleg!=this.value){
																	rlegchange = true;
																	rleg = this.value;
																}																
															};
															rlupsh.appendChild(button);
														}
													}

													//---------------------------HTML CUSTOMIZE PLUSH-----------------------
													$(document).ready(function(){
														

														$('#scrsh').click(function () {
															screensh();
														});

														$('#rooml').click(function () {
															if(room > 0){
																// alert("hello");
																bchange = true;
																rtmp = room;
																room -= 1;
															}
														});
														$('#roomr').click(function () {
															var tmp = room;
															if(tmp < 2){
																rtmp = room;
																bchange = true;
																tmp = +tmp + +1;
																room = tmp;
															}
														});

														// $('#headl').click(function () {
														// 	if(head > 0){
														// 		headchange = true;
														// 		head -= 1;
														// 		head = head;
														// 	}
														// });
														// $('#headr').click(function () {
														// 	var tmp = head;
														// 	if(tmp < 1 + head_models.length){
														// 		headchange = true;
														// 		tmp = +tmp + +1;
														// 		head = tmp;
														// 		head = head;
														// 	}
														// });
														var hslideru = document.getElementById("headup");
														var hsliderl = document.getElementById("headleft");
														var hsliderf = document.getElementById("headfront");
														hslideru.oninput = function() {
															//var temp = scene.getObjectByName(scene.children[ihead].name);
															var t = this.value;
															htemp.position.setY(-t);
															//console.log(t);
															if(hhtemp!=null){
																hhtemp.position.setY(-t);
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
														hsliderf.oninput = function() {
															//var temp = scene.getObjectByName(scene.children[ihead].name);
															var t = this.value;														
															htemp.position.setZ(-t);
															// console.log(t);
															if(hhtemp!=null){
																hhtemp.position.setZ(-t);
															}
														}

														// $('#larml').click(function () {
														// 	if(larm > 0){
														// 		larmchange = true;
														// 		larm -= 1;
														// 		larm = larm;
														// 	}
														// });
														// $('#larmr').click(function () {
														// 	var tmp = larm;
														// 	if(tmp < 1 + l_arm_models.length){
														// 		larmchange = true;
														// 		tmp = +tmp + +1;
														// 		larm = tmp;
														// 		larm = larm;
														// 	}
														// });

														// $('#rarml').click(function () {
														// 	if(rarm > 0){
														// 		rarmchange = true;
														// 		rarm -= 1;
														// 		rarm = rarm;
														// 	}
														// });
														// $('#rarmr').click(function () {
														// 	var tmp = rarm;
														// 	if(tmp < 1 + r_arm_models.length){
														// 		rarmchange = true;
														// 		tmp = +tmp + +1;
														// 		rarm = tmp;
														// 		rarm = rarm;
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
															latemp.position.setY(-t);
															// console.log(t);
														}
														lasliderl.oninput = function() {
															// var latemp = scene.getObjectByName(scene.children[ilarm].name);
															var t = this.value;
															latemp.position.setX(t);
															// console.log(t);
														}
														lasliderf.oninput = function() {
															// var latemp = scene.getObjectByName(scene.children[ilarm].name);
															var t = this.value;
															latemp.position.setZ(-t);
															// console.log(t);
														}
														raslideru.oninput = function() {
															// var temp = scene.getObjectByName(scene.children[irarm].name);
															var t = this.value;
															ratemp.position.setY(-t);
															// console.log(t);
														}
														rasliderl.oninput = function() {
															// var ratemp = scene.getObjectByName(scene.children[irarm].name);
															var t = this.value;
															ratemp.position.setX(t);
															// console.log(t);
														}
														rasliderf.oninput = function() {
															// var ratemp = scene.getObjectByName(scene.children[irarm].name);
															var t = this.value;
															ratemp.position.setZ(-t);
															// console.log(t);
														}

														// $('#torsol').click(function () {
														// 	if(torso > 0){
														// 		torsochange = true;
														// 		torso -= 1;
														// 		torso = torso;
														// 	}
														// });
														// $('#torsor').click(function () {
														// 	var tmp = torso;
														// 	if(tmp < 1 + body_models.length){
														// 		torsochange =  true;
														// 		tmp = +tmp + +1;
														// 		torso = tmp;
														// 		torso = torso;
														// 	}
														// });
														var tslideru = document.getElementById("torsoup");
														var tsliderl = document.getElementById("torsoleft");
														var tsliderf = document.getElementById("torsofront");
														tslideru.oninput = function() {
															// var temp = scene.getObjectByName(scene.children[itorso].name);
															var t = this.value;
															ttemp.position.setY(-t);
															//console.log(t);
														}
														tsliderl.oninput = function() {
															// var ttemp = scene.getObjectByName(scene.children[itorso].name);
															var t = this.value;
															ttemp.position.setX(t);
															// console.log(t);
														}
														tsliderf.oninput = function() {
															// var ttemp = scene.getObjectByName(scene.children[itorso].name);
															var t = this.value;
															ttemp.position.setZ(-t);
															// console.log(t);
														}

														// $('#llegl').click(function () {
														// 	if(lleg > 0){
														// 		llegchange = true;
														// 		lleg -= 1;
														// 		lleg = lleg;
														// 	}
														// });
														// $('#llegr').click(function () {
														// 	var tmp = lleg;
														// 	if(tmp < 1 + l_leg_models.length){
														// 		llegchange = true;
														// 		tmp = +tmp + +1;
														// 		lleg = tmp;
														// 		lleg = lleg;
														// 	}
														// });

														// $('#rlegl').click(function () {
														// 	if(rleg > 0){
														// 		rlegchange = true;
														// 		rleg -= 1;
														// 		rleg = rleg;
														// 	}
														// });
														// $('#rlegr').click(function () {
														// 	var tmp = rleg;
														// 	if(tmp < 1 + r_leg_models.length){
														// 		rlegchange = true;
														// 		tmp = +tmp + +1;
														// 		rleg = tmp;
														// 		rleg = rleg;
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
															lltemp.position.setY(-t);
															// console.log(t);
														}
														llsliderl.oninput = function() {
															// var lltemp = scene.getObjectByName(scene.children[illeg].name);
															var t = this.value;
															lltemp.position.setX(t);
															// console.log(t);
														}
														llsliderf.oninput = function() {
															// var lltemp = scene.getObjectByName(scene.children[illeg].name);
															var t = this.value;
															lltemp.position.setZ(-t);
															// console.log(t);
														}
														rlslideru.oninput = function() {
															// var temp = scene.getObjectByName(scene.children[irleg].name);
															var t = this.value;
															rltemp.position.setY(-t);
															// console.log(t);
														}
														rlsliderl.oninput = function() {
															// var rltemp = scene.getObjectByName(scene.children[irleg].name);
															var t = this.value;
															rltemp.position.setX(t);
															// console.log(t);
														}
														rlsliderf.oninput = function() {
															// var rltemp = scene.getObjectByName(scene.children[irleg].name);
															var t = this.value;
															rltemp.position.setZ(-t);
															// console.log(t);
														}

													})
													//----------------------------------------------------------------------------------------

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
