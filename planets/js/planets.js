var planetImg,
	scene,
    ambientLight,
    camera,
    renderer,
    clock,
    deltaTime,
    totalTime,
    arToolkitSource,
    arToolkitContext,
    markerRoot1,
	mesh1,
	rotation = 0;

window.onload = function()
{
	console.log('planets: 0.1.0');
	getParams();
    initialize();
    animate();
}

function getParams()
{
	const urlParams = new URLSearchParams(window.location.search);
	planetImg 		= 'images/'+urlParams.get('planet')+'.jpg';
}

function initialize()
{
	scene        = new THREE.Scene();
	ambientLight = new THREE.AmbientLight();
    scene.add(ambientLight);

	camera = new THREE.Camera();
	scene.add(camera);

	renderer = new THREE.WebGLRenderer({
		antialias : true,
		alpha: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.domElement.style.position = 'absolute'
	renderer.domElement.style.top      = '0px'
	renderer.domElement.style.left     = '0px'
	document.getElementById('div-cam').appendChild(renderer.domElement);

	clock     = new THREE.Clock();
	deltaTime = 0;
	totalTime = 0;

	////////////////////////////////////////////////////////////
	// setup arToolkitSource
	////////////////////////////////////////////////////////////

	arToolkitSource = new THREEx.ArToolkitSource({
		sourceType : 'webcam',
	});

	function onResize()
	{
		arToolkitSource.onResize()
		arToolkitSource.copySizeTo(renderer.domElement)
		if (arToolkitContext.arController !== null)
			arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)
	}

	arToolkitSource.init(function onReady(){
		onResize()
	});

	// handle resize event
	window.addEventListener('resize', function(){
		onResize()
	});

	////////////////////////////////////////////////////////////
	// setup arToolkitContext
	////////////////////////////////////////////////////////////

	// create atToolkitContext
	arToolkitContext = new THREEx.ArToolkitContext({
		cameraParametersUrl: 'data/camera_para.dat',
		detectionMode: 'mono'
	});

	// copy projection matrix to camera when initialization complete
	arToolkitContext.init(function onCompleted() {
		camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
	});

	////////////////////////////////////////////////////////////
	// setup markerRoots
	////////////////////////////////////////////////////////////

	// build markerControls
	markerRoot1 = new THREE.Group();
    scene.add(markerRoot1);

	let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markerRoot1, {
		type: 'pattern', patternUrl: 'data/hiro.patt',
    })

	let geometry1   = new THREE.SphereGeometry(1,32,32);
	let loader      = new THREE.TextureLoader();
	let texture     = loader.load(planetImg, render);
    let material1   = new THREE.MeshLambertMaterial({map:texture, opacity:1});

	mesh1            = new THREE.Mesh(geometry1, material1);
	mesh1.position.y = 1;

	markerRoot1.add(mesh1);
}

function update()
{
	if (markerRoot1.visible)
        mesh1.rotation.y += rotation;

	// update artoolkit on every frame
	if (arToolkitSource.ready !== false)
		arToolkitContext.update(arToolkitSource.domElement);
}

function render()
{
	renderer.render(scene, camera);
}

function animate()
{
	requestAnimationFrame(animate);
	deltaTime  = clock.getDelta();
	totalTime += deltaTime;
	update();
	render();
}

function action(action)
{
	if (action == 'menu')
		window.location.href = 'index.html';

	if (action == 'move')
		rotation = 0.01

	if (action == 'stop')
		rotation = 0
}
