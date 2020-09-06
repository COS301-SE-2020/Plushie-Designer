/**
 * @author zz85 / http://github.com/zz85
 * @author WestLangley / http://github.com/WestLangley
 * @author Mugen87 / https://github.com/Mugen87
 *
 * tool for "unwrapping" and debugging three.js geometries UV mapping
 *
 * Sample usage:
 *	document.body.appendChild( UVsDebug( new THREE.SphereBufferGeometry( 10, 10, 10, 10 ) );
 *
 */

import {
	Vector2
} from "three/build/three.module.js";

var UVsDebug = function ( geometry, w, h) {

	// handles wrapping of uv.x > 1 only

	var abc = 'abc';
	var a = new Vector2();
	var b = new Vector2();

	var face = [];
	var uvs = [];

	var canvas = document.createElement( 'canvas' );
	var width = 1024 * w; // power of 2 required for wrapping
	var height = 1024 * h;
	canvas.width = width;
	canvas.height = height;

	var ctx = canvas.getContext( '2d' );
	ctx.lineWidth = 3;
	ctx.strokeStyle = 'rgba( 1.0, 0, 0, 1.0 )';
	ctx.textAlign = 'center';

	// paint background white

	ctx.fillStyle = 'rgba( 255, 255, 255, 1.0 )';
	ctx.fillRect( 0, 0, width, height );

	if ( geometry.isGeometry ) {

		var faces = geometry.faces;
		var uvSet = geometry.faceVertexUvs[ 0 ];

		for ( var i = 0, il = uvSet.length; i < il; i ++ ) {

			var face = faces[ i ];
			var uv = uvSet[ i ];

			face[ 0 ] = face.a;
			face[ 1 ] = face.b;
			face[ 2 ] = face.c;

			uvs[ 0 ].copy( uv[ 0 ] );
			uvs[ 1 ].copy( uv[ 1 ] );
			uvs[ 2 ].copy( uv[ 2 ] );

			processFace( face, uvs, i);

		}

	} else {

		var index = geometry.index;
		var uvAttribute = geometry.attributes.uv;

		if ( index ) {

			// indexed geometry

			for ( var i = 0, il = index.count; i < il; i ++ ) {
				uvs.push(new Vector2().fromBufferAttribute( uvAttribute, index.getX( i )));
			}
			processFace( face, uvs, 3 );
		} else {

			// non-indexed geometry

			for ( var i = 0, il = uvAttribute.count; i < il; i += 3 ) {

				face[ 0 ] = i;
				face[ 1 ] = i + 1;
				face[ 2 ] = i + 2;

				uvs[ 0 ].fromBufferAttribute( uvAttribute, face[ 0 ] );
				uvs[ 1 ].fromBufferAttribute( uvAttribute, face[ 1 ] );
				uvs[ 2 ].fromBufferAttribute( uvAttribute, face[ 2 ] );

				processFace( face, uvs, i / 3 );

			}

		}

	}

	return canvas;

	function count(array_elements) {	
		var points = [];
	
		var cnt = 0;
		for(var x = 0; x < array_elements.length ; x++ ){
			cnt = 0;
			for (var i = 0; i < array_elements.length; i++) {
				if (array_elements[i].x == array_elements[x].x) {
					if (array_elements[i].y == array_elements[x].y) 
					{
						cnt++;
					}
				}
			}
			if(cnt > 3)
			{
				points.push(array_elements[x]);	
			}
		}
		return points;	
	}

	function drawPattern(img, width, height) {   

		var tempCanvas = document.createElement("canvas"),
			tCtx = tempCanvas.getContext("2d");
   
		tempCanvas.width = width;
		tempCanvas.height = height;
		tCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
   
		// use getContext to use the canvas for drawing
		var ctx = canvas.getContext('2d');
		//ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = ctx.createPattern(tempCanvas, 'repeat');
   
		ctx.fill();
		
   }

	function processFace( face, uvs, index ) {

		// draw contour of face

	//	var points_to_ignore = count(uvs);

		ctx.beginPath();

		a.set( 0, 0 );
  
		for ( var j = 0, jl = uvs.length; j < jl; j ++ ) {

			var uv = uvs[ j ];

			a.x += uv.x;
			a.y += uv.y;

			if ( j === 0 || j % 3 === 0) {
				ctx.moveTo( uv.x * width, ( 1 - uv.y ) * height );

			} else {
				ctx.lineTo( uv.x * width, ( 1 - uv.y ) * height );
            }

		}
		
		ctx.closePath();
		var img = new Image();
		img.src = '/images/head.png';
		drawPattern(img, 256, 256);	
/*
		ctx.beginPath();

		a.set( 0, 0 );

		for ( var j = 0, jl = uvs.length; j < jl; j ++ ) {

			var uv = uvs[ j ];

			a.x += uv.x;
			a.y += uv.y;

			if ( j === 0 || j % 3 === 0) {
				if(!points_to_ignore.includes(uvs[ j ]) )
					ctx.moveTo( uv.x * width, ( 1 - uv.y ) * height );
			} else {
				if(!points_to_ignore.includes(uvs[ j ]) &&  !points_to_ignore.includes(uvs[ j - 1 ]))
					ctx.lineTo( uv.x * width, ( 1 - uv.y ) * height );
			}	

		}
		ctx.closePath();
		ctx.stroke();	*/
		
	}

};

export { UVsDebug };