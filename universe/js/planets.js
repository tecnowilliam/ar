var planetId,
	planetImg,
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

window.onload = function () {
	document.getElementById('planetInfo').style.display = 'none';
	document.getElementById('moonsInfo').style.display = 'none';
	document.getElementById('buttonInfo').style.display = 'block';
	document.getElementById('buttonMoons').style.display = 'block';

	getParams();
	init();
	animate();
}

function getParams() {
	const urlParams = new URLSearchParams(window.location.search);
	planetId = urlParams.get('planet');
	planetImg = 'images/' + planetId + '.jpg';

	if (planetId != 'earth')
		document.getElementById('buttonNight').remove();

	if (planetId == 'buttonNight') {
		planetId = 'earth'
		planetImg = 'images/earth-night.jpg';
	}

	if (planetId == 'asteroid' || planetId == 'comet') {
		document.getElementById('buttonInfo').style.display = 'none';
		document.getElementById('buttonMoons').style.display = 'none';
	}

	if (planetId == 'moon')
		document.getElementById('buttonMoons').style.display = 'none';

	if (planetId == null)
		window.location.href = 'index.html';
}

function init() {
	scene = new THREE.Scene();
	ambientLight = new THREE.AmbientLight();
	scene.add(ambientLight);

	camera = new THREE.Camera();
	scene.add(camera);

	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	});

	// renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.domElement.style.position = 'absolute'
	renderer.domElement.style.top = '0px'
	renderer.domElement.style.left = '0px'
	document.getElementById('camera').appendChild(renderer.domElement);

	clock = new THREE.Clock();
	deltaTime = 0;
	totalTime = 0;

	////////////////////////////////////////////////////////////
	// setup arToolkitSource
	////////////////////////////////////////////////////////////

	arToolkitSource = new THREEx.ArToolkitSource({
		sourceType: 'webcam',
	});

	function onResize() {
		arToolkitSource.onResize()
		arToolkitSource.copySizeTo(renderer.domElement)
		if (arToolkitContext.arController !== null)
			arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)
	}

	arToolkitSource.init(function onReady() {
		onResize()
	});

	// handle resize event
	window.addEventListener('resize', function () {
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

	// Saturn's rings
	if (planetId == 'saturn') {
		let planetGeometry = new THREE.RingGeometry(1.2, 1.5, 30);
		let planetLoader = new THREE.TextureLoader();
		let planetTexture = planetLoader.load('images/saturn_ring.jpg', render);
		let planetMaterial = new THREE.MeshBasicMaterial({ map: planetTexture, opacity: 1, side: THREE.DoubleSide });
		planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);

		planetMesh.position.x = 0;
		planetMesh.position.y = 1;
		planetMesh.position.z = 0;
		planetMesh.rotation.x = 90;
		planetMesh.rotation.y = 0;
		markerRoot.add(planetMesh);
	}

	let planetGeometry = new THREE.SphereGeometry(1, 32, 32);
	if (planetId == 'asteroid' || planetId == 'comet') {
		planetGeometry = new THREE.SphereGeometry(1, 10, 5);
	}

	let planetLoader = new THREE.TextureLoader();
	let planetTexture = planetLoader.load(planetImg, render);
	let planetMaterial = new THREE.MeshLambertMaterial({ map: planetTexture, opacity: 1 });

	// Asteroids
	if (planetId == 'asteroid') {
		let asteroidGeometry1 = new THREE.SphereGeometry(2, 10, 5);
		planetMesh = new THREE.Mesh(asteroidGeometry1, planetMaterial);
		planetMesh.position.x = 1;
		planetMesh.position.y = 1.5;
		planetMesh.position.z = -3.5;
		markerRoot.add(planetMesh);

		let asteroidGeometry2 = new THREE.SphereGeometry(0.3, 10, 5);
		planetMesh = new THREE.Mesh(asteroidGeometry2, planetMaterial);
		planetMesh.position.x = 1.5;
		planetMesh.position.y = 2;
		planetMesh.position.z = -0.75;
		markerRoot.add(planetMesh);

		let asteroidGeometry3 = new THREE.SphereGeometry(0.5, 10, 5);
		planetMesh = new THREE.Mesh(asteroidGeometry3, planetMaterial);
		planetMesh.position.x = -1.5;
		planetMesh.position.y = 2;
		planetMesh.position.z = -0.75;
		markerRoot.add(planetMesh);

		let asteroidGeometry4 = new THREE.SphereGeometry(0.2, 10, 5);
		planetMesh = new THREE.Mesh(asteroidGeometry4, planetMaterial);
		planetMesh.position.x = -0.75;
		planetMesh.position.y = 1.5;
		planetMesh.position.z = -1;
		markerRoot.add(planetMesh);
	}

	planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
	planetMesh.position.x = 0;
	planetMesh.position.y = 1;
	planetMesh.position.z = 0;
	planetMesh.rotation.x = 0;
	planetMesh.rotation.y = 0;
	markerRoot.add(planetMesh);

	let textLoader = new THREE.FontLoader();
	textLoader.load('js/fonts/droid/droid_sans_regular.typeface.json', function (font) {
		let textGeo = new THREE.TextGeometry(dataPlanets[planetId].n, {
			font: font,
			size: 0.5,
			height: 0.25,
			curveSegments: 12,
		});

		textGeo.center();

		var textMaterial = new THREE.MeshPhongMaterial({ color: 0x000000, opacity: 0.5 });
		textMesh = new THREE.Mesh(textGeo, textMaterial);

		textMesh.position.x = dataPlanets[planetId].ptx;
		textMesh.position.y = dataPlanets[planetId].pty;
		textMesh.position.z = 0;
		textMesh.rotation.x = 0;
		textMesh.rotation.y = 0;
		markerRoot.add(textMesh);
	});
}

function update() {
	if (markerRoot.visible)
		planetMesh.rotation.y += rotation;

	// update artoolkit on every frame
	if (arToolkitSource.ready !== false)
		arToolkitContext.update(arToolkitSource.domElement);
}

function render() {
	renderer.clear();
	renderer.render(scene, camera);
}

function animate() {
	requestAnimationFrame(animate);
	deltaTime = clock.getDelta();
	totalTime += deltaTime;
	update();
	render();
}

function action(action) {
	if (action == 'back')
		window.location.href = 'index.html';

	if (action == 'info')
		if (document.getElementById('planetInfo').style.display == 'none') {
			updateDataPlanet();
			document.getElementById('moonsInfo').style.display = 'none';
			document.getElementById('planetInfo').style.display = 'block';
		} else {
			document.getElementById('planetInfo').style.display = 'none';
		}

	if (action == 'moons')
		if (document.getElementById('moonsInfo').style.display == 'none') {
			updateDataMoons();
			document.getElementById('planetInfo').style.display = 'none';
			document.getElementById('moonsInfo').style.display = 'block';
		} else {
			document.getElementById('moonsInfo').style.display = 'none';
		}

	if (action == 'move')
		rotation = 0.01

	if (action == 'stop')
		rotation = 0

	if (action == 'night')
		window.location.href = 'planet.html?planet=buttonNight';
}

function updateDataPlanet() {
	document.getElementById('planetInfoN').innerHTML = dataPlanets[planetId].n;
	document.getElementById('planetInfoG').innerHTML = dataPlanets[planetId].g;
	document.getElementById('planetInfoTP').innerHTML = dataPlanets[planetId].tp;
	document.getElementById('planetInfoSN').innerHTML = dataPlanets[planetId].sn;
	document.getElementById('planetInfoDE').innerHTML = dataPlanets[planetId].de;
	document.getElementById('planetInfoPO').innerHTML = dataPlanets[planetId].po;
	document.getElementById('planetInfoPR').innerHTML = dataPlanets[planetId].pr;
}

function updateDataMoons() {
	var x, list = '';
	for (x in dataPlanets[planetId].snl) {
		list += '<li>'+dataPlanets[planetId].snl[x]+'</li>';
	}
	document.getElementById('moonsList').innerHTML = list;
}
