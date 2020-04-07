//import ShowPictures from '../Equirectangular_camera_PME/import.js'
const picA = [];
var arrays = [];
function FetchData() { //Using AJAX technique to fetch database data
var xmlhttp = new XMLHttpRequest();
  
  xmlhttp.onreadystatechange=function() {
    if (this.readyState==4 && this.status==200) {
      var arg = this.responseText;
	  var arr = arg.split(" ");
	  console.log(arr);
	  
	  const arrays = Object.assign({}, ['a', 'b', 'c']);
	  arr.forEach(function(element) {
		  picA.push(element);
	  })
	  
	  
    }
  }
  xmlhttp.open("GET","GetPictures.php");
  xmlhttp.send();
}

FetchData();

console.log(picA);

var camera, renderer, scene; //implementing essential components for three.js components

var interacting = false, onMouseDownMouseX = 0, onMouseDownMouseY = 0, lon = 0, onMouseDownLon = 0, lat = 0, onMouseDownLat = 0, phi = 0, theta = 0; //implementing controls and angles
var material = new THREE.MeshBasicMaterial();
var i = 0;

main();
anim();

function main() {
	var container;
	var mesh;
	
	
	document.addEventListener( 'mousedown', onPointerStart, false );
	document.addEventListener( 'mousemove', onPointerMove, false ); 
	document.addEventListener( 'mouseup', onPointerUp, false );
	//document.addEventListener( 'wheel', onDocumentMouseWheel, false ); // controller for camera 
	document.addEventListener( 'touchstart', onPointerStart, false );
	document.addEventListener( 'touchmove', onPointerMove, false );
	document.addEventListener( 'touchend', onPointerUp, false );	
	document.addEventListener( 'keydown', reloadPicture, false);
	container = document.getElementById( 'container' );
	
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 ); // creating camera
	camera.target = new THREE.Vector3( 0, 0, 0 );
	scene = new THREE.Scene();
	
	var geometry = new THREE.SphereBufferGeometry( 500, 60, 40 ); // creating geometry 
	geometry.scale (-1, 1, 1);
	

	function createT() { //I should try removing the function later (i didn't :))
	
	//loading image
	var loader = new THREE.TextureLoader().load( 'Img/åv6C.png', 
	function ( texture ) {
		console.log("function works");
		material.map = texture; //once done map it
		console.log(material.map);
		mesh = new THREE.Mesh(geometry, material); 
		
		scene.add(mesh);
		rend();
	},
	        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
		        function ( xhr ) {
            console.log( 'error' );
        }
	);
	}
	
createT();
	
	function onPointerStart (event) { //once the mouse is on the screen
		interacting = true;
		
		var clientX = event.clientX || event.touches[ 0 ].clientX;
		var clientY = event.clientY || event.touches[ 0 ].clientY;
		
		onMouseDownMouseX = clientX;
		onMouseDownMouseY = clientY;
		
		onMouseDownLon = lon;
		onMouseDownLat = lat;
	}
	
	function onPointerMove (event) { //when the user moves the mouse
	
	if ( interacting == true ) {
		
			var clientX = event.clientX || event.touches[ 0 ].clientX;
			var clientY = event.clientY || event.touches[ 0 ].clientY;
					
			lon = ( onMouseDownMouseX - clientX ) * 0.1 + onMouseDownLon;
			lat = ( clientY - onMouseDownMouseY ) * 0.1 + onMouseDownLat;
		}

	}
	document.addEventListener( 'dragover', function (event) {
			event.preventDefault();
			event.dataTransfer.dropEffect = 'copy';
	}, false );

	
	


	function rend() { // rendering process
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setClearColor("#e5e5e5");
    renderer.setSize(window.innerWidth,window.innerHeight);
	renderer.setPixelRatio( window.devicePixelRatio );
	container.appendChild(renderer.domElement);
	
	renderer.render(scene, camera);
	}
	
		function reloadPicture(e) { //reload new 
		if (e.code == "ArrowRight") {
			i++;
		}
		else if (e.code == "ArrowLeft") {
			i--;
		}		
		if (i < 0) {
			i = 0;
		}			
		else if (i > picA.length) {
			i = picA.length;
		}
			var loader = new THREE.TextureLoader().load( picA[i], 
	function ( texture ) {
		console.log("function works");
		material.map = texture; //once done map it
		console.log(material.map);
		
		update();
	},
	        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
		        function ( xhr ) {
            console.log( 'error' );
        }
	);
	}
}

	
	function onPointerUp() { //when the mouse is off the screen
		
		interacting = false;
	}
	
	function anim() { //Moving the camera
	
		requestAnimationFrame(anim);
		update();
		
	}
		function update() { //Camera moves slowly if not intereacted 
		
		if ( interacting == false ) {
			lon += 0.1;
			
		}
	lat = Math.max( - 85, Math.min( 85, lat ) );
	phi = THREE.Math.degToRad( 90 - lat );
	theta = THREE.Math.degToRad( lon );
	
	camera.target.x = 500 * Math.sin( phi ) * Math.cos( theta ); // Math for which degrees the camera can spin
	camera.target.y = 500 * Math.cos( phi );
	camera.target.z = 500 * Math.sin( phi ) * Math.sin( theta );
	camera.lookAt( camera.target );
	
	renderer.render(scene, camera);
	}