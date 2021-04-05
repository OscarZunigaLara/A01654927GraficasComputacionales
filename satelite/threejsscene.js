let renderer = null, 
scene = null, 
camera = null,
cube = null,
sphere = null,
cone = null,
sphereGroup = null;

let canvas;

let duration = 5000; // ms
let currentTime = Date.now();


let textureUrl = "../images/ash_uvgrid01.jpg";
let texture = new THREE.TextureLoader().load(textureUrl);
let material = new THREE.MeshPhongMaterial({ map: texture });


let group = new THREE.Object3D;

scene = new THREE.Scene();


function addElement(){
    console.log("AddElement")

    createCube();
}


function addSatellite(){
    console.log("Satelite")
    

    console.log(group)
    //createCube();
}

function reset(){
    console.log("reset")
    //console.log(cubeGroup)

    //scene.remove(cubeGroup);
    //let cubeGroup = new THREE.Object3D;
}



function main() {
    canvas = document.getElementById("webglcanvas");
    // create the scene
    createScene(canvas);
    
    // Run the run loop

    run();
}

function animate() 
{

    let now = Date.now();
    let deltat = now - currentTime;
    currentTime = now;
    let fract = deltat / duration;
    let angle = Math.PI * 2 * fract;

    // Rotate the cube about its Y axis
    cube.rotation.y += angle;

    // Rotate the sphere group about its Y axis
}

function createCube(){
    console.log("Creating cube")
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    cube = new THREE.Mesh(geometry, material);

    cube.rotation.x = Math.PI / 5;
    cube.rotation.y = Math.PI / 5;

    // Add the cube mesh to our group
    group.add( cube );
    group.position.set(1, 0, -0.5);
    console.log("cube position:" , cube);
    // Create a group for the sphere
    scene.add( group );
    // add mouse handling so we can rotate the scene
    addMouseHandler(canvas, group);
    // This code gets the world position of the cone.
    group.updateMatrixWorld();
    
    
}


function run() {
    requestAnimationFrame(function() { run(); });
    
    // Render the scene
    renderer.render( scene, camera );

    // Spin the cube for next frame
    //animate();
}



function createScene(canvas)
{    
    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);
    
    // Create a new Three.js scene

    // Set the background color 
    scene.background = new THREE.Color( 0.2, 0.2, 0.2 );

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.z = 10;
    scene.add(camera);
    
    // Create a group to hold all the objects
    //let cubeGroup = new THREE.Object3D;
    
    // Add a directional light to show off the objects
    let light = new THREE.DirectionalLight( 0xffffff, 1.0);

    // Position the light out from the scene, pointing at the origin
    light.position.set(-.5, .2, 1);
    light.target.position.set(0,-2,0);
    scene.add(light);

    // This light globally illuminates all objects in the scene equally.
    // Cannot cast shadows
    let ambientLight = new THREE.AmbientLight(0xffccaa, 0.2);
    scene.add(ambientLight);


    // Create the cube geometry
    let geometry = new THREE.BoxGeometry(2, 2, 2);

    // And put the geometry and material together into a mesh
    cube = new THREE.Mesh(geometry, material);

    // Tilt the mesh toward the viewer
    cube.rotation.x = Math.PI / 5;
    cube.rotation.y = Math.PI / 5;

    // Add the cube mesh to our group
    group.add( cube );
    group.position.set(1, 0, -0.5);
    console.log("cube position:" , cube);
    // Create a group for the sphere
    scene.add( group );
    // add mouse handling so we can rotate the scene
    addMouseHandler(canvas, group);
    // This code gets the world position of the cone.
    group.updateMatrixWorld();
}