scene = null;
stats = null;
mouseDown = false;
renderer = null;

camera = null;
controls = null;
moveForward = false;
moveBackward = false;
moveLeft = false;
moveRight = false;
jumping = false;
shoot = false;
enableControls = true; 

function createGUI (withStats) {
  var gui = new dat.GUI();
  if (withStats) stats = initStats();
}

function initStats() {
  var stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  $("#Stats-output").append( stats.domElement );
  return stats;
}

function setMessage (str) {
  document.getElementById ("Messages").innerHTML = "<h2>"+str+"</h2>";
}

function onMouseDown (event) {
  if (enableControls) {
    if(event.buttons == 1 && blocker.style.display == 'none') {
      scene.shooter();
      shoot = true;
    }
  }
}

function onKeyDown (event) {
  if (enableControls) {
    switch ( event.keyCode ) {

      case 38: // up
      case 87: // w
        moveForward = true;
        break;

      case 37: // left
      case 65: // a
        moveLeft = true;
        break;

      case 40: // down
      case 83: // s
        moveBackward = true;
        break;

      case 39: // right
      case 68: // d
        moveRight = true;
        break;

      case 32: // space
        jumping = true;
        break;
    }
  }

  if (event.keyCode == 80 && enableControls == false) { // p
    scene.newGame();
  }
}

function onKeyUp (event) {
  if (enableControls) {
    switch( event.keyCode ) {
      case 38: // up
      case 87: // w
        moveForward = false;
        break;

      case 37: // left
      case 65: // a
        moveLeft = false;
        break;

      case 40: // down
      case 83: // s
        moveBackward = false;
        break;

      case 39: // right
      case 68: // d
        moveRight = false;
        break;
    }
  }
}

function onMouseWheel (event) {
  if (enableControls) {
    if (!shoot) scene.changeWeapon();
  }
}

function onWindowResize () {
  scene.setCameraAspect (window.innerWidth / window.innerHeight);
  renderer.setSize (window.innerWidth, window.innerHeight);
}

function createRenderer () {
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild( renderer.domElement );
  renderer.shadowMap.enabled = true;
  return renderer;
}
function render() {
  requestAnimationFrame(render);
  stats.update();
  scene.animate();
  renderer.render(scene, scene.getCamera());
  scene.simulate();
}

$(function () {
  Physijs.scripts.worker = '../libs/physijs_worker.js';
  Physijs.scripts.ammo = '../libs/ammo.js';

  var instructions = document.getElementById( 'instructions' );
  var title = document.getElementById('title');
  var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;

  if ( havePointerLock ) {
    var element = document.body;
    var pointerlockchange = function ( event ) {

      if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
        controlsEnabled = true;
        controls.enabled = true;
        enableControls = true;
        blocker.style.display = 'none';

      } else {

        blocker.style.display = 'block';

        instructions.style.display = '';

        instructions.style.fontSize = "50px";
        instructions.innerHTML = "Pause";

        enableControls = false;
        controls.enabled = false;
      }

    };

    var pointerlockerror = function ( event ) {
      instructions.style.display = '';
    };
    document.addEventListener( 'pointerlockchange', pointerlockchange, false );
    document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
    document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

    // document.addEventListener( 'pointerlockerror', pointerlockerror, false );
    // document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
    // document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

    instructions.addEventListener( 'click', function ( event ) {

      instructions.style.display = 'none';
      element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
      element.requestPointerLock();
    }, 
    false );
  } else {
    instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
  }

  var controlsEnabled = false;
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

  renderer = createRenderer();
  $("#WebGL-output").append(renderer.domElement);
  window.addEventListener ("resize", onWindowResize);
  window.addEventListener ("mousedown", onMouseDown, true);
  window.addEventListener("keydown", onKeyDown, true);
  window.addEventListener("keyup", onKeyUp, true);
  window.addEventListener ("mousewheel", onMouseWheel, true); 
  window.addEventListener ("DOMMouseScroll", onMouseWheel, true); 

  scene = new TheScene (renderer.domElement, camera);
  controls = new THREE.PointerLockControls (camera);
  scene.add( controls.getObject() );

  let pendengar = new THREE.AudioListener();
  camera.add(pendengar);

  let sound1 = new THREE.Audio(pendengar);
  let loader = new THREE.AudioLoader().load('music/bensound-epic.mp3', (hasil) =>{
    sound1.setBuffer(hasil);
    sound1.setLoop(true);
    sound1.play();
  })

  createGUI(true);

  render();
});
