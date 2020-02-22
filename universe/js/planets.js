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
    markerRoot,
	planetMesh,
	textMarkerRoot,
	textMesh,
	rotation = 0;

window.onload = function()
{
	getParams();
    init();
    animate();
}

function getParams()
{
	const urlParams = new URLSearchParams(window.location.search);
	planetImg 		= 'images/'+urlParams.get('planet')+'.jpg';

	if (urlParams.get('planet') == null)
		window.location.href = 'index.html';
}

function init()
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

	// renderer.setPixelRatio(window.devicePixelRatio);
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
	markerRoot = new THREE.Group();
    scene.add(markerRoot);

	let markerControls = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
		type: 'pattern', patternUrl: 'data/hiro.patt',
	});

	let planetGeometry  = new THREE.SphereGeometry(1,32,32);
	let planetLoader    = new THREE.TextureLoader();
	let planetTexture   = planetLoader.load(planetImg, render);
    let planetMaterial  = new THREE.MeshLambertMaterial({map:planetTexture, opacity:1});
	planetMesh        	= new THREE.Mesh(planetGeometry, planetMaterial);

	planetMesh.position.x = 0;
	planetMesh.position.y = 1;
	planetMesh.position.z = 0;
	planetMesh.rotation.x = 0;
	planetMesh.rotation.y = 0;

	markerRoot.add(planetMesh);

	let textLoader = new THREE.FontLoader();
	textLoader.load('js/fonts/helvetiker_regular.typeface.json', function(font) {
		let textGeo = new THREE.TextGeometry('Tierra', {
			font: font,
			size: 0.5,
			height: 1,
			curveSegments: 12
		});

		// textGeo.center();
		var textMaterial = new THREE.MeshPhongMaterial({color: 0x000000});
		textMesh 		 = new THREE.Mesh(textGeo, textMaterial);

		textMesh.position.x = 1.1;
		textMesh.position.y = 1;
		textMesh.position.z = 0;
		textMesh.rotation.x = 0;
		textMesh.rotation.y = 0;
		markerRoot.add(textMesh);
	});
}

function update()
{
	if (markerRoot.visible)
		planetMesh.rotation.y += rotation;

	// update artoolkit on every frame
	if (arToolkitSource.ready !== false)
		arToolkitContext.update(arToolkitSource.domElement);
}

function render()
{
	renderer.clear();
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
	if (action == 'back')
		window.location.href = 'index.html';

	if (action == 'move')
		rotation = 0.01

	if (action == 'stop')
		rotation = 0
}
