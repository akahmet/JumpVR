/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.PointerLockControls = function ( camera, domElement ) {

	var scope = this;
	this.domElement = ( domElement !== undefined ) ? domElement : document;
	
	camera.rotation.set( 0, 0, 0 );

	var pitchObject = new THREE.Object3D();
	pitchObject.add( camera );

	var yawObject = new THREE.Object3D();
	yawObject.position.y = 15;
	yawObject.add( pitchObject );

	var PI_2 = Math.PI / 2;

	var onMouseMove = function ( event ) {

		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		yawObject.rotation.y -= movementX * 0.008;
		pitchObject.rotation.x -= movementY * 0.008;

		pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );
	};

	this.dispose = function() {

		scope.domElement.removeEventListener( 'mousemove', onMouseMove, false );

	}

	scope.domElement.addEventListener( 'mousemove', onMouseMove, false );
    //scope.domElement.addEventListener( 'mouseup', onMouseUp, false );
	
	this.enabled = false;

	this.getObject = function () {

		return yawObject;

	};

	this.getDirection = function() {

		// assumes the camera itself is not rotated

		var direction = new THREE.Vector3( 0, 0, - 1 );
		var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );

		return function( v ) {

			rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );

			v.copy( direction ).applyEuler( rotation );

			return v;

		}

	}();
	
	this.update = function(delta){
		
		yawObject.position.x -= delta * Math.sin(yawObject.rotation.y) * 40;
		yawObject.position.z -= delta * Math.cos(yawObject.rotation.y) * 40;
	};

};
