let projectionMatrix = null, shaderProgram = null;
let vec3 = glMatrix.vec3;
let mat4 = glMatrix.mat4;

let shaderVertexPositionAttribute = null, shaderVertexColorAttribute = null, shaderProjectionMatrixUniform = null, shaderModelViewMatrixUniform = null;

let duration = 10000;

let cantidadTriangle = 3

let vertexShaderSource = `



attribute vec3 vertexPos;
attribute vec4 vertexColor;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec4 vColor;

void main(void) {
    // Return the transformed and projected vertex value
    gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPos, 1.0);
    // Output the vertexColor in vColor
    vColor = vertexColor;
}`;

let fragmentShaderSource = `
    precision lowp float;
    varying vec4 vColor;

    void main(void) {
    // Return the pixel color: always output white
    gl_FragColor = vColor;
}
`;

function createShader(gl, str, type)
{
    let shader;
    if (type == "fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (type == "vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

function initShader(gl)
{
    // load and compile the fragment and vertex shader
    let fragmentShader = createShader(gl, fragmentShaderSource, "fragment");
    let vertexShader = createShader(gl, vertexShaderSource, "vertex");

    // link them together into a new program
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // get pointers to the shader params
    shaderVertexPositionAttribute = gl.getAttribLocation(shaderProgram, "vertexPos");
    gl.enableVertexAttribArray(shaderVertexPositionAttribute);

    shaderVertexColorAttribute = gl.getAttribLocation(shaderProgram, "vertexColor");
    gl.enableVertexAttribArray(shaderVertexColorAttribute);
    
    shaderProjectionMatrixUniform = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    shaderModelViewMatrixUniform = gl.getUniformLocation(shaderProgram, "modelViewMatrix");

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }
}

function initWebGL(canvas) 
{
    let gl = null;
    let msg = "Your browser does not support WebGL, or it is not enabled by default.";

    try 
    {
        gl = canvas.getContext("experimental-webgl");
    } 
    catch (e)
    {
        msg = "Error creating WebGL Context!: " + e.toString();
    }

    if (!gl)
    {
        alert(msg);
        throw new Error(msg);
    }

    return gl;        
}

function initViewport(gl, canvas)
{
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    gl.viewport(0, 0, canvas.width, canvas.height);
}

function initGL(gl, canvas)
{
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, Math.PI / 4, canvas.width / canvas.height, 1, 100);
    mat4.translate(projectionMatrix, projectionMatrix, [0, 0, 0]);
}

function draw(gl, objs) 
{
    // clear the background (with black)
    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // set the shader to use
    gl.useProgram(shaderProgram);

    for(obj of objs)
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, obj.buffer);
        gl.vertexAttribPointer(shaderVertexPositionAttribute, obj.vertSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, obj.colorBuffer);
        gl.vertexAttribPointer(shaderVertexColorAttribute, obj.colorSize, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indices);

        gl.uniformMatrix4fv(shaderProjectionMatrixUniform, false, projectionMatrix);
        gl.uniformMatrix4fv(shaderModelViewMatrixUniform, false, obj.modelViewMatrix);

        gl.drawElements(obj.primtype, obj.nIndices, gl.UNSIGNED_SHORT, 0);
    }
}


function createPyramid(gl, translation, rotationAxis) 
{
    recur = 0;

    console.log("Pyramid created")
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    let verts = [
        0, 1, 0,
        -1,0,0,
        1,0,0,
    ];


    console.log(verts)
    console.log(verts.length);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

    // Color data
    let colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    let faceColors = [
        [1.0, 0.0, 0.0, 1.0], // Front face
        [0.0, 1.0, 0.0, 1.0], // Back face
        [0.0, 0.0, 1.0, 1.0], // Top face
    ]
    let vertexColors = [];
    faceColors.forEach(color =>{
        for (let j=0; j < 3; j++)
            vertexColors.push(...color);
    });
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColors), gl.STATIC_DRAW);

    // Index data (defines the triangles to be drawn).
    let cubeIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndexBuffer);

    let cubeIndices = [
        0, 1, 2,
    ]
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeIndices), gl.STATIC_DRAW);
    
    let pyramid = {
            buffer: vertexBuffer, colorBuffer:colorBuffer, indices:cubeIndexBuffer,
            vertSize:3, nVerts:verts.length, colorSize:4, nColors: 12, nIndices:3,
            primtype:gl.TRIANGLES, modelViewMatrix: mat4.create(), currentTime : Date.now()
        };

        mat4.translate(pyramid.modelViewMatrix, pyramid.modelViewMatrix, translation);
    pyramid.update = function()
    {
        //console.log("update pyramid")
        let now = Date.now();
        let deltat = now - this.currentTime;
        this.currentTime = now;
        let fract = deltat / duration;
        let angle = Math.PI * 2 * fract;
    
        // Rotates a mat4 by the given angle
        // mat4 out the receiving matrix
        // mat4 a the matrix to rotate
        // Number rad the angle to rotate the matrix by
        // vec3 axis the axis to rotate around
        mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, angle, rotationAxis);
	};
    
    return pyramid;
}

function run(glCtx, objs)
{   
    requestAnimationFrame(function() { run(glCtx, objs); });
    //console.log(objs)
    draw(glCtx, objs);

    for(i = 0; i<objs.length; i++)
        //console.log(i)
        objs[i].update();
}


function dibujarTriangulitosArriba(verts, x1, y1, largo, height, recur){

    if (recur <= cantidadTriangle){
        verts.push(x1);
        verts.push(y1);
        verts.push(largo/2)
        console.log(verts)
        dibujarTriangulitosArriba(verts, y1, largo /2 ,height/2 , recur + 1);
        dibujarTriangulitosArriba(verts + largo /4, y1 + height /2 , largo /2, height/2, recur + 1);
        dibujarTriangulitosArriba(verts, x1 - largo /4, y1 + height /2 , largo /2, height/2, recur + 1);
    }
}

function dibujarTriangulitosArriba(glCtx,listaPiramides, x1, y1, largo, height, recur){

    if (recur <= cantidadTriangle){
        nuevoTriangulo = createPyramid(glCtx, [x1, y1, -3], [0, 0, 0]);
        console.log("asdfasd ", recur);
        listaPiramides.push(nuevoTriangulo)
        dibujarTriangulitosArriba(glCtx,listaPiramides,x1 ,y1, largo /2 ,height/2 , recur + 1);
        dibujarTriangulitosArriba(glCtx,listaPiramides, x1 + largo /4, y1 + height /2 , largo /2, height/2, recur + 1);
        dibujarTriangulitosArriba(glCtx, listaPiramides, x1 - largo /4, y1 + height /2 , largo /2, height/2, recur + 1);
    }
}



function main()
{

    let canvas = document.getElementById("pyramidCanvas");

    let glCtx = initWebGL(canvas);

    initViewport(glCtx, canvas);
    initGL(glCtx, canvas);

    let pyramid = createPyramid(glCtx, [0, 1, -3], [0, 0, 0]);

    listaPiramides = []
    listaPiramides.push(pyramid);

    largo = 2
    height = 2
    recur =0
    dibujarTriangulitosArriba(glCtx, listaPiramides, 0, 0, largo, height, recur)
    console.log(listaPiramides)


    initShader(glCtx, vertexShaderSource, fragmentShaderSource);
    console.log(pyramid)
    run(glCtx, listaPiramides);
}