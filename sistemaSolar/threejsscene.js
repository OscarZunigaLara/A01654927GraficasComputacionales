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


//let sunTextureUrl = "../images/ash_uvgrid01.jpg";
let sunTextureUrl = "textures/8k_sun.jpg";
let sunTexture = new THREE.TextureLoader().load(sunTextureUrl);
//let material = new THREE.MeshPhongMaterial({ map: texture });
let group = new THREE.Object3D;
//let figureList = []


let sun = null;
let mercury = null;
let venus = null;
let mars = null;
let jupiter = null;
let saturn = null;
let neptune = null
let uranus = null;
let pluto = null;

let sunMercury = null;
let sunVenus = null;
let sunEarth = null;
let sunMars = null;
let sunJupiter = null;
let sunSaturn = null;
let sunNeptune = null;
let sunUranus = null;
let sunPluto = null;

let asteroidList = []
let moonList = []
let moonJupiterList = []


scene = new THREE.Scene();
let controls = null;





function main() {
    canvas = document.getElementById("webglcanvas");
    // create the scene
    createScene(canvas);
    
    // Run the run loop
    sun = createSun(0, 0,0);

    createOrbit(sun, 15);
    sunMercury = createSmallerSun()
    mercury = createMercury(sunMercury);

    createOrbit(sun, 20);
    sunVenus = createSmallerSun();
    venus = createVenus(sunVenus);

    createOrbit(sun, 26);
    sunEarth = createSmallerSun()
    earth = createEarth(sunEarth);
    createMoons(earth);

    createOrbit(sun, 30);
    sunMars = createSmallerSun()
    mars = createMars(sunMars);
    createMoons(mars);
    createMoons(mars);

    ///crear cinturon asteroides
    for (i= 0; i<= 150; i++){
        //console.log("Asteroids")
        createAsteroids(sun)
    }

    createOrbit(sun, 43);
    sunJupiter = createSmallerSun()
    jupiter = createJupiter(sunJupiter);
    for (i= 0; i<= 15; i++){
        //console.log("Asteroids")
        createJupiterMoons(jupiter)
    }

    createOrbit(sun, 55);
    sunSaturn = createSmallerSun()
    saturn = createSaturn(sunSaturn);
    for (i= 0; i<= 10; i++){
        //console.log("Asteroids")
        createJupiterMoons(saturn)
    }

    createOrbit(sun, 61);
    sunUranus = createSmallerSun()
    uranus = createurAnus(sunUranus);
    for (i= 0; i<= 5; i++){
        //console.log("Asteroids")
        createJupiterMoons(uranus)
    }

    createOrbit(sun, 70);
    sunNeptune = createSmallerSun()
    neptune = createNeptune(sunNeptune);
    for (i= 0; i<= 5; i++){
        //console.log("Asteroids")
        createJupiterMoons(neptune)
    }

    createOrbit(sun, 76);
    sunPluto = createSmallerSun()
    pluto = createPluto(sunPluto);
    
    run();
}

function random(min, max) {
    return ~~(Math.random() * (max - min + 1) + min);
  }

function animate() 
{

    let now = Date.now();
    let deltat = now - currentTime;
    currentTime = now;
    let fract = deltat / duration;
    let angle = Math.PI * 2 * fract;
    angle = angle/4
    // Rotate the cube about its Y axis
    //cube.rotation.y += angle;
    sun.rotation.y += angle * 1.7;
    mercury.rotation.y += angle * 3;
    venus.rotation.y += angle * 2;
    earth.rotation.y += angle;
    mars.rotation.y += angle /3;
    jupiter.rotation.y += angle /2;
    saturn.rotation.y += angle / 3;
    neptune.rotation.y += angle / 2;
    uranus.rotation.y += angle / 2.4;
    pluto.rotation.y += angle /2;

    sunMercury.rotation.y += angle * 6
    sunVenus.rotation.y += angle * 5
    sunEarth.rotation.y += angle * 4
    sunMars.rotation.y += angle * 3
    sunJupiter.rotation.y += angle * 2
    sunSaturn.rotation.y += angle * .9
    sunNeptune.rotation.y += angle * .8
    sunUranus.rotation.y += angle *.7
    sunPluto.rotation.y += angle * .5

    for (i in asteroidList){
       //console.log(figureList[i])
       //figureList[i].rotation.y += angle;
       asteroidList[i].rotation.y += angle * 4;
    }

    // Rotate the sphere group about its Y axis
}
function run() {
    requestAnimationFrame(function() { run(); });
    
    // Render the scene
    renderer.render( scene, camera );
    controls.update();

    // Spin the cube for next frame
    animate();
}


function createSmallerSun(){
    const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    let geometry = new THREE.SphereGeometry(1, 32, 32);
    x = 0; y = 0;z =0;
    let smallSun = new THREE.Mesh(geometry, material);
    let newGroup = new THREE.Object3D;

    newGroup.add( smallSun );
    newGroup.position.set(x, y, z);
    scene.add( newGroup );

    // add mouse handling so we can rotate the scene
    // This code gets the world position of the cone.
    newGroup.updateMatrixWorld();
    return smallSun;
}


function createSun(x, y, z){
    console.log("Creating Sun")

    textureMap = new THREE.TextureLoader().load(sunTexture);

  

    let sunMaterial = new THREE.MeshPhongMaterial({
         map: sunTexture ,
         emissiveMap: sunTexture,
         emissiveIntensity: 100

    });

    let newGroup = new THREE.Object3D;

    let geometry = new THREE.SphereGeometry(9, 32, 32);
    let sun = new THREE.Mesh(geometry, sunMaterial);
    //figureList.push(sun);
    //sun.rotation.x = Math.PI / 5;
    //sun.rotation.y = Math.PI / 5;

    // Add the cube mesh to our group

    let light = new THREE.PointLight(0xffffff, 5,100);

    // Position the light out from the scene, pointing at the origin
    
    light.position.set(0,0, 0);
    light.position.set(0,0,0);
    sun.add(light)

    newGroup.add( sun );
    newGroup.position.set(x, y, z);
    scene.add( newGroup );

    // add mouse handling so we can rotate the scene
    // This code gets the world position of the cone.
    newGroup.updateMatrixWorld();
    return sun;

}

function createMercury(father){
    console.log("Creating Mercury")

    let mercuryTextureUrl = "textures/8k_mercury.jpg"
    let mercuryTexture = new THREE.TextureLoader().load(mercuryTextureUrl);
    let mercuryBumpURL = "textures/mercurybump.jpg"    
    let mercuryBumpTexture = new THREE.TextureLoader().load(mercuryBumpURL);
    
    
    let mercuryMaterial = new THREE.MeshPhongMaterial({ 
        map: mercuryTexture,
        bumpMap: mercuryBumpTexture,
        bumpScale: .1,
        
    });


    totalDistance = 15;
    //totalDistance += random(-10, 10)/10
    //console.log(totalDistance)
    //console.log(x, y, z)

    x = Math.sqrt(random(0, (totalDistance * totalDistance)));
    y = 0;
    z = Math.sqrt((totalDistance * totalDistance) - (x * x));
     
    var random_boolean = Math.random() < 0.5;

    if (random_boolean){
        x = -x;
    }
    random_boolean = Math.random() < 0.5;
    if (random_boolean){
        z = -z
    }    //totalDistance += random(-10, 10)/10
    //console.log(totalDistance)
    //console.log(x, y, z)

    x = Math.sqrt(random(0, (totalDistance * totalDistance)));
    y = 0;
    z = Math.sqrt((totalDistance * totalDistance) - (x * x));
     
    var random_boolean = Math.random() < 0.5;

    if (random_boolean){
        x = -x;
    }
    random_boolean = Math.random() < 0.5;
    if (random_boolean){
        z = -z
    }
    //console.log(x, y, z)
    let newGroup = new THREE.Object3D;

    let geometry = new THREE.SphereGeometry(.5, 32, 32);
    let mercury = new THREE.Mesh(geometry, mercuryMaterial);
    //figureList.push(mercury);
    mercury.rotation.x = Math.PI / 5;
    mercury.rotation.y = Math.PI / 5;

    // Add the cube mesh to our group
    newGroup.add( mercury );
    newGroup.position.set(x, y, z);
    father.add( newGroup );

    // add mouse handling so we can rotate the scene
    // This code gets the world position of the cone.
    newGroup.updateMatrixWorld();
   return mercury
}

function createVenus(father){
    console.log("Creating Venus")

    let venusTextureUrl = "textures/venusmap.jpg"
    let venusTexture = new THREE.TextureLoader().load(venusTextureUrl);
    let venusBumpURL = "textures/venusbump.jpg"    
    let venusBumpTexture = new THREE.TextureLoader().load(venusBumpURL);
    
    
    let venusMaterial = new THREE.MeshPhongMaterial({ 
        map: venusTexture,
        bumpMap: venusBumpTexture,
        bumpScale: .1,
        
    });


    totalDistance = 20;
    //totalDistance += random(-10, 10)/10
    //console.log(totalDistance)
    //console.log(x, y, z)

    x = Math.sqrt(random(0, (totalDistance * totalDistance)));
    y = 0;
    z = Math.sqrt((totalDistance * totalDistance) - (x * x));
     
    var random_boolean = Math.random() < 0.5;

    if (random_boolean){
        x = -x;
    }
    random_boolean = Math.random() < 0.5;
    if (random_boolean){
        z = -z
    }    //totalDistance += random(-10, 10)/10
    //console.log(totalDistance)
    //console.log(x, y, z)

    x = Math.sqrt(random(0, (totalDistance * totalDistance)));
    y = 0;
    z = Math.sqrt((totalDistance * totalDistance) - (x * x));
     
    var random_boolean = Math.random() < 0.5;

    if (random_boolean){
        x = -x;
    }
    random_boolean = Math.random() < 0.5;
    if (random_boolean){
        z = -z
    }

    //console.log(x, y, z)
    let newGroup = new THREE.Object3D;

    let geometry = new THREE.SphereGeometry(.7, 32, 32);
    let venus = new THREE.Mesh(geometry, venusMaterial);
    //figureList.push(venus);
    venus.rotation.x = Math.PI / 5;
    venus.rotation.y = Math.PI / 5;

    // Add the cube mesh to our group
    newGroup.add( venus );
    newGroup.position.set(x, y, z);
    father.add( newGroup );

    // add mouse handling so we can rotate the scene
    // This code gets the world position of the cone.
    newGroup.updateMatrixWorld();
   return venus
}

function createEarth(father){
    console.log("Creating Earth")

    let earthTextureUrl = "textures/earthmap1k.jpg"
    let earthTexture = new THREE.TextureLoader().load(earthTextureUrl);
    let earthBumpURL = "textures/earthbump1k.jpg"    
    let earthBumpTexture = new THREE.TextureLoader().load(earthBumpURL);
    let especularEarthUrl = "textures/earthspec1k"
    let earthEspecular = new THREE.TextureLoader().load(especularEarthUrl);

    
    let venusMaterial = new THREE.MeshPhongMaterial({ 
        map: earthTexture,
        bumpMap: earthBumpTexture,
        bumpScale: .1,
        
    });


    totalDistance = 26;
    //totalDistance += random(-10, 10)/10
    //console.log(totalDistance)
    //console.log(x, y, z)

    x = Math.sqrt(random(0, (totalDistance * totalDistance)));
    y = 0;
    z = Math.sqrt((totalDistance * totalDistance) - (x * x));
     
    var random_boolean = Math.random() < 0.5;

    if (random_boolean){
        x = -x;
    }
    random_boolean = Math.random() < 0.5;
    if (random_boolean){
        z = -z
    }    //totalDistance += random(-10, 10)/10
    //console.log(totalDistance)
    //console.log(x, y, z)

    x = Math.sqrt(random(0, (totalDistance * totalDistance)));
    y = 0;
    z = Math.sqrt((totalDistance * totalDistance) - (x * x));
     
    var random_boolean = Math.random() < 0.5;

    if (random_boolean){
        x = -x;
    }
    random_boolean = Math.random() < 0.5;
    if (random_boolean){
        z = -z
    }
    //console.log(x, y, z)
    let newGroup = new THREE.Object3D;

    let geometry = new THREE.SphereGeometry(1, 32, 32);
    let earth = new THREE.Mesh(geometry, venusMaterial);
    //figureList.push(earth);
    earth.rotation.x = Math.PI / 4;
    earth.rotation.y = Math.PI / 4;

    // Add the cube mesh to our group
    newGroup.add( earth );
    newGroup.position.set(x, y, z);
    father.add( newGroup );

    // add mouse handling so we can rotate the scene
    // This code gets the world position of the cone.
    newGroup.updateMatrixWorld();
   return earth
}

function createMars(father){
    console.log("Creating Mars")

    let marsTextureUrl = "textures/mars_1k_color.jpg"
    let marsTexture = new THREE.TextureLoader().load(marsTextureUrl);
    let marsBumpURL = "textures/marsbump1k.jpg"    
    let marsBumpTexture = new THREE.TextureLoader().load(marsBumpURL);
    let marsNormalURL = "textures/mars_1k_normal.jpg"
    let marsNormalTexture = new THREE.TextureLoader().load(marsNormalURL);
    //let especularEarthUrl = "textures/earthspec1k"
    //let earthEspecular = new THREE.TextureLoader().load(especularEarthUrl);

    
    let marsMaterial = new THREE.MeshPhongMaterial({ 
        map: marsTexture,
        bumpMap: marsBumpTexture,
        bumpScale: .1,
        normalMap: marsNormalTexture
        
    });


    totalDistance = 30;
    //totalDistance += random(-10, 10)/10
    //console.log(totalDistance)
    //console.log(x, y, z)

    x = Math.sqrt(random(0, (totalDistance * totalDistance)));
    y = 0;
    z = Math.sqrt((totalDistance * totalDistance) - (x * x));
     
    var random_boolean = Math.random() < 0.5;

    if (random_boolean){
        x = -x;
    }
    random_boolean = Math.random() < 0.5;
    if (random_boolean){
        z = -z
    }
    //console.log(x, y, z)
    let newGroup = new THREE.Object3D;

    let geometry = new THREE.SphereGeometry(.8, 32, 32);
    let mars = new THREE.Mesh(geometry, marsMaterial);
    //figureList.push(mars);
    mars.rotation.x = Math.PI / 4;
    mars.rotation.y = Math.PI / 4;

    // Add the cube mesh to our group
    newGroup.add( mars );
    newGroup.position.set(x, y, z);
    father.add( newGroup );

    // add mouse handling so we can rotate the scene
    // This code gets the world position of the cone.
    newGroup.updateMatrixWorld();
   return mars
}

function createJupiter(father){
    console.log("Creating Jupiter")
    let jupiterTextureUrl = "textures/jupitermapthumb.jpg"
    let jupiterTexture = new THREE.TextureLoader().load(jupiterTextureUrl);
  
    
    let jupiterMaterial = new THREE.MeshPhongMaterial({ 
        map: jupiterTexture,
    });

    totalDistance = 43;
    //totalDistance += random(-10, 10)/10
    //console.log(totalDistance)
    //console.log(x, y, z)

    x = Math.sqrt(random(0, (totalDistance * totalDistance)));
    y = 0;
    z = Math.sqrt((totalDistance * totalDistance) - (x * x));
     
    var random_boolean = Math.random() < 0.5;

    if (random_boolean){
        x = -x;
    }
    random_boolean = Math.random() < 0.5;
    if (random_boolean){
        z = -z
    }
    //console.log(x, y, z)
    let newGroup = new THREE.Object3D;

    let geometry = new THREE.SphereGeometry(3, 32, 32);
    let jupiter = new THREE.Mesh(geometry, jupiterMaterial);
    //figureList.push(jupiter);
    jupiter.rotation.x = Math.PI / 4;
    jupiter.rotation.y = Math.PI / 4;

    // Add the cube mesh to our group
    newGroup.add( jupiter );
    newGroup.position.set(x, y, z);
    father.add( newGroup );

    // add mouse handling so we can rotate the scene
    // This code gets the world position of the cone.
    newGroup.updateMatrixWorld();
   return jupiter
}

function createSaturn(father){
    console.log("Creating Saturn")
    let saturnTextureUrl = "textures/saturnmapthumb.jpg"
    let saturnTexture = new THREE.TextureLoader().load(saturnTextureUrl);
  
    
    let saturnMaterial = new THREE.MeshPhongMaterial({ 
        map: saturnTexture,
    });

    totalDistance = 55;
    //totalDistance += random(-10, 10)/10
    //console.log(totalDistance)
    //console.log(x, y, z)

    x = Math.sqrt(random(0, (totalDistance * totalDistance)));
    y = 0;
    z = Math.sqrt((totalDistance * totalDistance) - (x * x));
     
    var random_boolean = Math.random() < 0.5;

    if (random_boolean){
        x = -x;
    }
    random_boolean = Math.random() < 0.5;
    if (random_boolean){
        z = -z
    }
    //console.log(x, y, z)
    let newGroup = new THREE.Object3D;

    let geometry = new THREE.SphereGeometry(2.5, 32, 32);
    let saturn = new THREE.Mesh(geometry, saturnMaterial);
    //figureList.push(saturn);
    saturn.rotation.x = Math.PI / 4;
    saturn.rotation.y = Math.PI / 4;


    let saturnRigColorTextureURL = "textures/saturnringcolor.jpg"
    let saturnRigColorTexture = new THREE.TextureLoader().load(saturnRigColorTextureURL);
     
    let saturnRingMaterial = new THREE.MeshPhongMaterial({ 
        map: saturnRigColorTexture,
    });
    let geometryRing = new THREE.TorusGeometry(4,.4,16,100);
    let ring = new THREE.Mesh(geometryRing, saturnRingMaterial);
    ring.rotation.x = Math.PI / 2;
    //ring.rotation.y = Math.PI / 4;
    saturn.add(ring)


    // Add the cube mesh to our group
    newGroup.add( saturn );
    newGroup.position.set(x, y, z);
    father.add( newGroup );

    // add mouse handling so we can rotate the scene
    // This code gets the world position of the cone.
    newGroup.updateMatrixWorld();
   return saturn
}

function createurAnus(father){
    console.log("Creating urAnus")
    let uranusTextureUrl = "textures/uranusmap.jpg"
    let uranusTexture = new THREE.TextureLoader().load(uranusTextureUrl);
  
    
    let uranusMaterial = new THREE.MeshPhongMaterial({ 
        map: uranusTexture,
    });

    totalDistance = 61;
    //totalDistance += random(-10, 10)/10
    //console.log(totalDistance)
    //console.log(x, y, z)

    x = Math.sqrt(random(0, (totalDistance * totalDistance)));
    y = 0;
    z = Math.sqrt((totalDistance * totalDistance) - (x * x));
     
    var random_boolean = Math.random() < 0.5;

    if (random_boolean){
        x = -x;
    }
    random_boolean = Math.random() < 0.5;
    if (random_boolean){
        z = -z
    }
    //console.log(x, y, z)
    let newGroup = new THREE.Object3D;

    let geometry = new THREE.SphereGeometry(2, 32, 32);
    let uranus = new THREE.Mesh(geometry, uranusMaterial);
    //figureList.push(uranus);
    uranus.rotation.x = Math.PI / 4;
    uranus.rotation.y = Math.PI / 4;

    let saturnRigColorTextureURL = "textures/uranusringcolour.jpg"
    let saturnRigColorTexture = new THREE.TextureLoader().load(saturnRigColorTextureURL);
     
    let saturnRingMaterial = new THREE.MeshPhongMaterial({ 
        map: saturnRigColorTexture,
    });
    let geometryRing = new THREE.TorusGeometry(3,.2,16,100);
    let ring = new THREE.Mesh(geometryRing, saturnRingMaterial);
    ring.rotation.x = Math.PI / 2;
    //ring.rotation.y = Math.PI / 4;
    uranus.add(ring)


    // Add the cube mesh to our group
    newGroup.add( uranus );
    newGroup.position.set(x, y, z);
    father.add( newGroup );

    // add mouse handling so we can rotate the scene
    // This code gets the world position of the cone.
    newGroup.updateMatrixWorld();
   return uranus
}

function createNeptune(father){
    console.log("Creating Neptune")
    let neptuneTextureURL = "textures/neptunemap.jpg"
    let neptuneTexture = new THREE.TextureLoader().load(neptuneTextureURL);
  
    
    let neptuneMaterial = new THREE.MeshPhongMaterial({ 
        map: neptuneTexture,
    });

    totalDistance = 70;
    //totalDistance += random(-10, 10)/10
    //console.log(totalDistance)
    //console.log(x, y, z)

    x = Math.sqrt(random(0, (totalDistance * totalDistance)));
    y = 0;
    z = Math.sqrt((totalDistance * totalDistance) - (x * x));
     
    var random_boolean = Math.random() < 0.5;

    if (random_boolean){
        x = -x;
    }
    random_boolean = Math.random() < 0.5;
    if (random_boolean){
        z = -z
    }
    //console.log(x, y, z)
    let newGroup = new THREE.Object3D;

    let geometry = new THREE.SphereGeometry(2, 32, 32);
    let neptune = new THREE.Mesh(geometry, neptuneMaterial);
    //figureList.push(neptune);
    neptune.rotation.x = Math.PI / 4;
    neptune.rotation.y = Math.PI / 4;

    // Add the cube mesh to our group
    newGroup.add( neptune );
    newGroup.position.set(x, y, z);
    father.add( newGroup );

    // add mouse handling so we can rotate the scene
    // This code gets the world position of the cone.
    newGroup.updateMatrixWorld();
   return neptune
}

function createPluto(father){
    console.log("Creating pluto")
    let uranusTextureUrl = "textures/uranusmap.jpg"
    let uranusTexture = new THREE.TextureLoader().load(uranusTextureUrl);
  
    
    let uranusMaterial = new THREE.MeshPhongMaterial({ 
        map: uranusTexture,
    });

    totalDistance = 76;
    //totalDistance += random(-10, 10)/10
    //console.log(totalDistance)
    //console.log(x, y, z)

    x = Math.sqrt(random(0, (totalDistance * totalDistance)));
    y = 0;
    z = Math.sqrt((totalDistance * totalDistance) - (x * x));
     
    var random_boolean = Math.random() < 0.5;

    if (random_boolean){
        x = -x;
    }
    random_boolean = Math.random() < 0.5;
    if (random_boolean){
        z = -z
    }
    //console.log(x, y, z)
    let newGroup = new THREE.Object3D;

    let geometry = new THREE.SphereGeometry(.5, 32, 32);
    let uranus = new THREE.Mesh(geometry, uranusMaterial);
    //figureList.push(uranus);
    uranus.rotation.x = Math.PI / 4;
    uranus.rotation.y = Math.PI / 4;

    // Add the cube mesh to our group
    newGroup.add( uranus );
    newGroup.position.set(x, y, z);
    father.add( newGroup );

    // add mouse handling so we can rotate the scene
    // This code gets the world position of the cone.
    newGroup.updateMatrixWorld();
   return uranus
}


function createMoons(father){
    console.log("Creating Moon")
    let moonTextureURL = "textures/moonmap1k.jpg"
    let moonTexture = new THREE.TextureLoader().load(moonTextureURL);
    let moonBumpTextureURL = "textures/moonbump1k"
    let monnBump = new THREE.TextureLoader().load(moonBumpTextureURL);
    let moonMaterial = new THREE.MeshPhongMaterial({ 
        map: moonTexture,
        bumpMap: monnBump
    });
    x = 0; y = 0; z =0;

    while (x == 0){
        x = random(-2,2)
    }
    while (y == 0){
        y = random(-2,2)
    }
    while (z == 0){
        z = random(-2,2)
    }


    console.log(x, y, z)
    //x = 1;y = 0;z = 1;

    //console.log(x, y, z)
    let newGroup = new THREE.Object3D;

    let geometry = new THREE.SphereGeometry(.3, 32, 32);
    let moon = new THREE.Mesh(geometry, moonMaterial);
    moonList.push(moon);
    moon.rotation.x = Math.PI / 4;
    moon.rotation.y = Math.PI / 4;

    // Add the cube mesh to our group
    newGroup.add( moon );
    newGroup.position.set(x, y, z);
    father.add( newGroup );

    // add mouse handling so we can rotate the scene
    // This code gets the world position of the cone.
    newGroup.updateMatrixWorld();
   return moon
}


function createJupiterMoons(father){
    console.log("Creating Moon")
    let moonTextureURL = "textures/moonmap1k.jpg"
    let moonTexture = new THREE.TextureLoader().load(moonTextureURL);
    let moonBumpTextureURL = "textures/moonbump1k"
    let monnBump = new THREE.TextureLoader().load(moonBumpTextureURL);
    let moonMaterial = new THREE.MeshPhongMaterial({ 
        map: moonTexture,
        bumpMap: monnBump
    });
    x = 0; y = 0; z =0;

    while (x == 0){
        x = random(-5,5)
    }
    while (y == 0){
        y = random(-5,5)
    }
    while (z == 0){
        z = random(-5,5)
    }


    console.log(x, y, z)
    //x = 1;y = 0;z = 1;

    //console.log(x, y, z)
    let newGroup = new THREE.Object3D;

    let geometry = new THREE.SphereGeometry(.2, 32, 32);
    let moon = new THREE.Mesh(geometry, moonMaterial);
    moonJupiterList.push(moon);
    moon.rotation.x = Math.PI / 4;
    moon.rotation.y = Math.PI / 4;

    // Add the cube mesh to our group
    newGroup.add( moon );
    newGroup.position.set(x, y, z);
    father.add( newGroup );

    // add mouse handling so we can rotate the scene
    // This code gets the world position of the cone.
    newGroup.updateMatrixWorld();
   return moon
}
function createAsteroids(father){
    console.log("Creating Asteroid")
    let moonTextureURL = "textures/moonmap1k.jpg"
    let moonTexture = new THREE.TextureLoader().load(moonTextureURL);
    let moonBumpTextureURL = "textures/moonbump1k"
    let monnBump = new THREE.TextureLoader().load(moonBumpTextureURL);
    let moonMaterial = new THREE.MeshPhongMaterial({ 
        map: moonTexture,
        bumpMap: monnBump
    });

    totalDistance = 36;
    totalDistance += random(-10, 10)/10
    //console.log(totalDistance)
    //console.log(x, y, z)

    x = Math.sqrt(random(0, (totalDistance * totalDistance)));
    y = 0;
    z = Math.sqrt((totalDistance * totalDistance) - (x * x));
     
    var random_boolean = Math.random() < 0.5;

    if (random_boolean){
        x = -x;
    }
    random_boolean = Math.random() < 0.5;
    if (random_boolean){
        z = -z
    }

    let newGroup = new THREE.Object3D;

    let geometry = new THREE.SphereGeometry(.4, 32, 32);
    let uranus = new THREE.Mesh(geometry, moonMaterial);
    asteroidList.push(uranus);
    uranus.rotation.x = Math.PI / 4;
    uranus.rotation.y = Math.PI / 4;

    // Add the cube mesh to our group
    newGroup.add( uranus );
    newGroup.position.set(x, y, z);
    father.add( newGroup );

    // add mouse handling so we can rotate the scene
    // This code gets the world position of the cone.
    newGroup.updateMatrixWorld();
   return uranus

}


function createOrbit(sun, radius){
    let saturnRigColorTextureURL = "textures/saturnringcolor.jpg"
    let saturnRigColorTexture = new THREE.TextureLoader().load(saturnRigColorTextureURL);
     
    let saturnRingMaterial = new THREE.MeshPhongMaterial({ 
        map: saturnRigColorTexture,
    });
    let geometryRing = new THREE.TorusGeometry(radius,.01,16,100);
    let ring = new THREE.Mesh(geometryRing, saturnRingMaterial);
    ring.rotation.x = Math.PI / 2;
    //ring.rotation.y = Math.PI / 4;
    sun.add(ring)
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
    camera.position.z = 60;

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();
    scene.add(camera);
    
    // Create a group to hold all the objects
    //let cubeGroup = new THREE.Object3D;
    
    // Add a directional light to show off the objects
    /*
    let light = new THREE.DirectionalLight( 0xffffff, 1.0);

    // Position the light out from the scene, pointing at the origin
    
    
    light.position.set(-.5, .2, 1);
    light.target.position.set(0,-2,0);
    scene.add(light);
    */
    // This light globally illuminates all objects in the scene equally.
    // Cannot cast shadows
    let ambientLight = new THREE.AmbientLight(0xffccaa, 0.6);
    scene.add(ambientLight);

    // Create the cube geometry
    
    // Create a group for the sphere
    scene.add( group );
    // add mouse handling so we can rotate the scene
    //addMouseHandler(canvas, group);
    // This code gets the world position of the cone.
    group.updateMatrixWorld();
}