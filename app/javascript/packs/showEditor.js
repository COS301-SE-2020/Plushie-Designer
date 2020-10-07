var THREE = require('three');
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
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
												readTextFile("/file_paths7.JSON", function(text){
													var data = JSON.parse(text);
													// console.log(r_leg_models);
													var hair = $(".head").data("head");
													var head = $(".head").data("head");
													var torso = $(".torso").data("torso");
													var larm = $(".larm").data("larm");
													var lleg = $(".lleg").data("lleg");
													var rarm = $(".rarm").data("rarm");
													var rleg = $(".rleg").data("rleg");
													var room = 0;

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
														// buildColors(colors);

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

															// parent.children[0].material = mtl;
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

														function chooseBodyPart(obj)//TODO
														{	
															switch(obj.name)
															{
																case "hair" : currentSelection = hhtemp; break;
																case htemp.children[0].name : currentSelection = htemp; break;
																case ttemp.children[0].name : currentSelection = ttemp; break;
																case lltemp.children[0].name : currentSelection = lltemp; break;
																case rltemp.children[0].name : currentSelection = rltemp; break;
																case latemp.children[0].name : currentSelection = latemp; break;
																case ratemp.children[0].name : currentSelection = ratemp; break;
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
													
													//----------------------------------ADD MODEL----------------------------------------
													function add_model_to_scene(gltf, name)
													{
														let color = colors[2];

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
																color = $(".headtex").data("headtex");
																gltf.scene.position.setY(headposy); 
																gltf.scene.position.setX(headposx);
																gltf.scene.position.setZ(headposz);  
																console.log(gltf.scene.children[0]);
																break;
															case "torso" : 
																ttemp = gltf.scene;
																color = $(".torsotex").data("torsotex");
																gltf.scene.position.setY(torsoposy); 
																gltf.scene.position.setX(torsoposx);  
																gltf.scene.position.setZ(torsoposz);
																console.log(gltf.scene.children[0]);
															break;
															case "leftarm" : 
																latemp = gltf.scene; 
																color = $(".larmtex").data("larmtex");
																gltf.scene.position.setY(larmposy); 
																gltf.scene.position.setX(larmposx);
																gltf.scene.position.setZ(larmposz);
															break;
															case "rightarm" : 
																ratemp = gltf.scene;
																color = $(".rarmtex").data("rarmtex");
																gltf.scene.position.setY(rarmposy); 
																gltf.scene.position.setX(rarmposx); 
																gltf.scene.position.setZ(rarmposz);
															break;
															case "leftleg" : 
																lltemp = gltf.scene;
																color = $(".llegtex").data("llegtex");
																gltf.scene.position.setY(llegposy); 
																gltf.scene.position.setX(llegposx);  
																gltf.scene.position.setZ(llegposz);
															break;
															case "rightleg" : 
																rltemp = gltf.scene;
																color = $(".rlegtex").data("rlegtex");
																gltf.scene.position.setY(rlegposy); 
																gltf.scene.position.setX(rlegposx);  
																gltf.scene.position.setZ(rlegposz);
															break;	
														}
														if(color == null) color = colors[2].color;
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
													// var geometry = new THREE.PlaneBufferGeometry(1000, 1000, 1000);
													// geometry.rotateX(-Math.PI * 0.5); // set horizontal since default is vertical
													// var material = new THREE.MeshPhongMaterial({ color: 0x999999 });
													// material.shininess = 0;
													// var plane = new THREE.Mesh(geometry, material);
													// plane.castShadow = false;
													// plane.receiveShadow = true;
													// plane.position.setY(-6);
													// scene.add(plane);
													//-----------------------------------------------------------------

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

														ConfigureCanvas();

													}

													var animate = function () {
														requestAnimationFrame(animate);

														controls.update();
														//renderer.render(scene, camera);
														composer.render();
													};

													animate();

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