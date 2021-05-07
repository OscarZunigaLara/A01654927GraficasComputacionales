import * as THREE from './libs/three.module.js'

let renderer = null, scene = null, camera = null, root = null;

let raycaster = null, mouse = new THREE.Vector2(), intersected, clicked;

let directionalLight = null, spotLight = null, ambientLight = null;

let cubes = [];
let score = 0;

var scoreID = document.getElementById('scoreText')

const mapUrl = "../../images/checker_large.gif";
let currentTime = Date.now();

function animate()
{
    const now = Date.now();
    const deltat = now - currentTime;
    currentTime = now;
    for (let value of cubes){
        //console.log(value.position)
        value.position.z = value.position.z += .1;
        //console.log(value.position.z)

        if (value.position.z >= 70){
            scene.remove(value)
        }
        value +=1

       
    }
}

function update() 
{
    requestAnimationFrame(function() { update(); });
    renderer.render( scene, camera );
    animate();
}

function createScene(canvas) 
{
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    renderer.setSize(canvas.width, canvas.height);
    
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.set(0, 15, 125);
    scene.add(camera);
    
    root = new THREE.Object3D;
    
    directionalLight = new THREE.DirectionalLight( 0xaaaaaa, 1);
    directionalLight.position.set(0, 5, 100);

    root.add(directionalLight);
    
    spotLight = new THREE.SpotLight (0xffffff);
    spotLight.position.set(0, 8, 100);
    root.add(spotLight);

    ambientLight = new THREE.AmbientLight ( 0xffffff, 0.3);
    root.add(ambientLight);

    let map = new THREE.TextureLoader().load(mapUrl);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set(10, 10);

    let geometry = new THREE.PlaneGeometry(1000, 1000, 50, 50);
    let mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({map:map, side:THREE.DoubleSide}));

    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = -4;
    root.add( mesh );
    
    raycaster = new THREE.Raycaster();

    document.addEventListener('pointermove', onDocumentPointerMove);
    document.addEventListener('pointerdown', onDocumentPointerDown);

    scene.add( root );
}

function onDocumentPointerMove( event ) 
{
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );

    const intersects = raycaster.intersectObjects( scene.children );

    if ( intersects.length > 0 ) 
    {
        if ( intersected != intersects[ 0 ].object ) 
        {
            if ( intersected )
                intersected.material.emissive.set( intersected.currentHex );

            intersected = intersects[ 0 ].object;
            intersected.currentHex = intersected.material.emissive.getHex();
            intersected.material.emissive.set( 0xff0000 );
           
        }
    } 
    else 
    {
        if ( intersected ) 
            intersected.material.emissive.set( intersected.currentHex );

        intersected = null;
    }
}

function onDocumentPointerDown(event)
{
    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );

    let intersects = raycaster.intersectObjects( scene.children );

    if ( intersects.length > 0 ) 
    {
        clicked = intersects[ 0 ].object;
        console.log(clicked)
        scene.remove( clicked)
        score += 5
        console.log(score)
        scoreID.innerText = ('Score: '+  score)

    } 
}

function main()
{
    const canvas = document.getElementById("webglcanvas");
    
    createScene(canvas);
    setInterval(function(){
        createCube() 
        }, 500);

    update();
}

function createCube(){ 
    //console.log("Creating cube")
    let x = random(-40, 40)
    let y = random(-40, 40)
    let z = -80;
    let color = '#'+Math.floor(Math.random()*16777215).toString(16);
    //console.log(x,y,z, color)
    const geometry = new THREE.BoxGeometry( 3, 3, 3 );
    const material = new THREE.MeshPhongMaterial( {color: color} );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
    cubes.push(cube)
    scene.add( cube );
    //console.log(cubes)
}

function random(min, max) {
    return ~~(Math.random() * (max - min + 1) + min);
  }


function resize()
{
    const canvas = document.getElementById("webglcanvas");

    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    camera.aspect = canvas.width / canvas.height;

    camera.updateProjectionMatrix();
    renderer.setSize(canvas.width, canvas.height);
}

window.onload = () => {
    main();
    resize(); 
};

window.addEventListener('resize', resize, false);
