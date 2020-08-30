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

	var uvs = [
		new Vector2(),
		new Vector2(),
		new Vector2()
	];

	var face = [];

	var canvas = document.createElement( 'canvas' );
	var width = 1024 * w; // power of 2 required for wrapping
	var height = 1024 * h;
	canvas.width = width;
	canvas.height = height;

	var ctx = canvas.getContext( '2d' );
	ctx.lineWidth = 2;
	ctx.strokeStyle = 'rgba( 0, 0, 0, 1.0 )';
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

			processFace( face, uvs, i );

		}

	} else {

		var index = geometry.index;
		var uvAttribute = geometry.attributes.uv;

		if ( index ) {

			// indexed geometry

			for ( var i = 0, il = index.count; i < il; i += 3 ) {

				face[ 0 ] = index.getX( i );
				face[ 1 ] = index.getX( i + 1 );
				face[ 2 ] = index.getX( i + 2 );

				uvs[ 0 ].fromBufferAttribute( uvAttribute, face[ 0 ] );
				uvs[ 1 ].fromBufferAttribute( uvAttribute, face[ 1 ] );
				uvs[ 2 ].fromBufferAttribute( uvAttribute, face[ 2 ] );

				processFace( face, uvs, i / 3 );

			}

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

	function processFace( face, uvs, index ) {

		// draw contour of face

		ctx.beginPath();

		a.set( 0, 0 );
  
		for ( var j = 0, jl = uvs.length; j < jl; j ++ ) {

			var uv = uvs[ j ];

			//uv.x = uv.x - Math.floor( uv.x );
			//uv.y = uv.y - Math.floor( uv.y );

			a.x += uv.x;
			a.y += uv.y;

			if ( j === 0 ) {
				ctx.moveTo( uv.x * width, ( 1 - uv.y ) * height );

			} else {
				ctx.lineTo( uv.x * width, ( 1 - uv.y ) * height );
            }

		}

		ctx.closePath();
		var img = new Image();
		img.src = '/images/head.png';
		var pat = ctx.createPattern(img, "repeat");
		ctx.rect(0, 0, 150, 100);
		ctx.fillStyle = pat;
		//ctx.stroke();

    	 ctx.fill();
	}

};

export { UVsDebug };