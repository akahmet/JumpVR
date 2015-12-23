<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Cardboard Example</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <style>
      body {
        margin: 0px;
        overflow: hidden;
      }
      #example {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    </style>
  </head>
  <body>
    <div id="example"></div>

  <script src="js/third-party/threejs/three.js"></script>
  <script src="js/third-party/threejs/StereoEffect.js"></script>
  <script src="js/third-party/threejs/DeviceOrientationControls.js"></script>
  <script src="js/third-party/threejs/JumpVR.js"></script>
  <script src="js/third-party/threejs/OrbitControls.js"></script>
  
		<script src="js/geometries/TextGeometry.js"></script>
		<script src="fonts/optimer_bold.typeface.js"></script>
		<script src="fonts/optimer_regular.typeface.js"></script>

  <script>
	var textMesh;
    var camera, scene, renderer;
    var effect, controls, jump;
    var element, container;

    var clock = new THREE.Clock();

    init();
    animate();

    function init() {
		
		renderer = new THREE.WebGLRenderer();
		element = renderer.domElement;
		container = document.getElementById('example');
		container.appendChild(element);
		
		effect = new THREE.StereoEffect(renderer);
		
		scene = new THREE.Scene();
		
		camera = new THREE.PerspectiveCamera(90, 1, 0.001, 700);
		camera.position.set(0, 10, 0);
		scene.add(camera);
		
		controls = new THREE.OrbitControls(camera, element);
		controls.rotateUp(Math.PI / 4);
		controls.target.set(
		camera.position.x + 30,
		camera.position.y,
		camera.position.z+15
		);
		controls.noZoom = true;
		controls.noPan = true;
		
		jump = new THREE.JumpVR(function(e){
			//console.log(e.count);
			scene.remove(textMesh);
			var textShapes = THREE.FontUtils.generateShapes( e.state.count + " Jump", {'font' : 'optimer','weight' : 'normal', 'style' : 'normal','size' : 10,'curveSegments' : 300, 'height' : 10,
				'hover' : 30} );
				
			var textGeo = new THREE.ShapeGeometry( textShapes );
			textMesh = new THREE.Mesh( textGeo, new THREE.MeshBasicMaterial( { color: 0xff0000 } ) ) ;
			scene.add(textMesh);

			textMesh.position.x = 20;
			textMesh.position.y = 20;
			textMesh.position.z = 20;

			textMesh.rotation.x = 0;
			textMesh.rotation.y = Math.PI;
		});
	  
		function setOrientationControls(e) {
			if (!e.alpha) {
			return;
			}
			
			controls = new THREE.DeviceOrientationControls(camera, true);
			
			
			
			controls.connect();
			controls.update();
			
			element.addEventListener('click', fullscreen, false);
			
			window.removeEventListener('deviceorientation', setOrientationControls, true);
		}
		window.addEventListener('deviceorientation', setOrientationControls, true);


		var light = new THREE.HemisphereLight(0x777777, 0x000000, 0.6);
		scene.add(light);
	
		var texture = THREE.ImageUtils.loadTexture(
			'textures/patterns/checker.png'
		);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat = new THREE.Vector2(50, 50);
		texture.anisotropy = renderer.getMaxAnisotropy();
	
		var material = new THREE.MeshPhongMaterial({
			color: 0xffffff,
			specular: 0xffffff,
			shininess: 20,
			shading: THREE.FlatShading,
			map: texture
		});
	
		var geometry = new THREE.PlaneGeometry(1000, 1000);
		var geometryx = new THREE.BoxGeometry( 20, 20, 20 );
		var mesh = new THREE.Mesh(geometry, material);
		mesh.rotation.x = -Math.PI / 2;
		meshx = new THREE.Mesh( geometryx, material);
		meshx.position.y=12;
		scene.add(mesh);
		
		scene.add(meshx);
	
		window.addEventListener('resize', resize, false);
		setTimeout(resize, 1);
    }
	
	
    function resize() {
      var width = container.offsetWidth;
      var height = container.offsetHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      effect.setSize(width, height);
    }

    function update(dt) {
      resize();

      camera.updateProjectionMatrix();

      controls.update(dt);
    }

    function render(dt) {
      effect.render(scene, camera);
    }

    function animate(t) {
      requestAnimationFrame(animate);

      update(clock.getDelta());
      render(clock.getDelta());
    }

    function fullscreen() {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      }
    }
  </script>
  </body>
</html>
