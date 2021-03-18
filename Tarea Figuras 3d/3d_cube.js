let mat4 = glMatrix.mat4;

let projectionMatrix;

let shaderProgram, shaderVertexPositionAttribute, shaderVertexColorAttribute, shaderProjectionMatrixUniform, shaderModelViewMatrixUniform;

let duration = 10000; // ms

// Attributes: Input variables used in the vertex shader. Since the vertex shader is called on each vertex, these will be different every time the vertex shader is invoked.
// Uniforms: Input variables for both the vertex and fragment shaders. These do not change values from vertex to vertex.
// Varyings: Used for passing data from the vertex shader to the fragment shader. Represent information for which the shader can output different value for each vertex.
let vertexShaderSource =    
    "    attribute vec3 vertexPos;\n" +
    "    attribute vec4 vertexColor;\n" +

    "    uniform mat4 modelViewMatrix;\n" +
    "    uniform mat4 projectionMatrix;\n" +

    "    varying vec4 vColor;\n" +

    "    void main(void) {\n" +
    "		// Return the transformed and projected vertex value\n" +
    "        gl_Position = projectionMatrix * modelViewMatrix * \n" +
    "            vec4(vertexPos, 1.0);\n" +
    "        // Output the vertexColor in vColor\n" +
    "        vColor = vertexColor * 0.8;\n" +
    "    }\n";

// precision lowp float
// This determines how much precision the GPU uses when calculating floats. The use of highp depends on the system.
// - highp for vertex positions,
// - mediump for texture coordinates,
// - lowp for colors.
let fragmentShaderSource = 
    "    precision lowp float;\n" +
    "    varying vec4 vColor;\n" +
    "    void main(void) {\n" +
    "    gl_FragColor = vColor;\n" +
    "}\n";

function main() 
{
    let canvas = document.getElementById("webglcanvas");
    let gl = initWebGL(canvas);
    initViewport(gl, canvas);
    initGL(canvas);
    
    let escutoide  =crearEscutoide (gl, [-4 , -1, -2], [1, 1, 0.2]);
    let Dodecahedron = createDodecahedron(gl,[.5,0, -2], [-.4, 1, 0.1] ,[0,1,0] );
    let octaedro = createoctahedron (gl, [3 , 0, -2], [0, 1, 0]);
    //let cube2 = createCube(gl, [-2, 0, -2], [-1, 1, 0]);
    initShader(gl);
    run(gl, [octaedro, escutoide,Dodecahedron]);
}

function initWebGL(canvas)
{
    let gl = null;
    let msg = "Your browser does not support WebGL, " +
        "or it is not enabled by default.";
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
    gl.viewport(0, 0, canvas.width, canvas.height);
}

function initGL(canvas)
{
    // Create a project matrix with 45 degree field of view
    projectionMatrix = mat4.create();
    
    mat4.perspective(projectionMatrix, Math.PI / 4, canvas.width / canvas.height, 1, 100);
    mat4.translate(projectionMatrix, projectionMatrix, [0, 0, -5]);
}



// Create the vertex, color and index data for a multi-colored cube
function createDodecahedron(gl, translation, rotationAxis1, rotationAxis2)
{    
    // Vertex Data
    let vertexBuffer;
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
       let verts = [
        //cara1
        0.000000, 0.809017, -0.154510,
        0.000000, 0.499996, -0.654510,
        0.475531, 0.654507, 0.154507,
        0.475531, 0.154509, -0.654510,
        0.769421, 0.250001, -0.154510,
        //cara2 
        0.000000, 0.809017, -0.154510,
        0.000000, 0.499996, -0.654510,
        -0.475530, 0.654507, 0.154507,
        -0.475530, 0.154509, -0.654510,
        -0.769420, 0.250001, -0.154510,
        ///cara 3
        0.000000, 0.809017, -0.154510,
        -0.475530, 0.654507, 0.154507,
        0.475531, 0.654507, 0.154507,
        -0.293890, 0.404507, 0.654510,
        0.293890, 0.404507, 0.654510,
        //cara 4
        -0.475530, 0.654507, 0.154507,
        -0.769420, 0.249999, -0.154507,
        -0.293890, 0.404508, 0.654510,
        -0.769420, -0.249999, 0.154507,
        -0.475530, -0.154508, 0.654510,
        //cara 5
        -0.769420, 0.249999, -0.154507,
        -0.769420, -0.249999, 0.154507,
        -0.475530, 0.154509, -0.654510,
        -0.475531, -0.654508, -0.154510,
        -0.293890, -0.404508, -0.654510,
        //cara 6
        0.000000, 0.499996, -0.654510,
        -0.475530, 0.154509, -0.654510,
        0.475530, 0.154509, -0.654510,
        -0.293890, -0.404508, -0.654510,
        0.293890, -0.404508, -0.654510,
        //casa 7
        0.769420, 0.249999, -0.154507,
        0.475531, 0.154508, -0.654510,
        0.769421, -0.249999, 0.154507,
        0.293890, -0.404508, -0.654510,
        0.475531, -0.654508, -0.154510,
        //casa 8
        0.475531, 0.654508, 0.154510,
        0.769420, 0.249999, -0.154507,
        0.293890, 0.404507, 0.654510,
        0.769421, -0.249999, 0.154507,
        0.475531, -0.154508, 0.654510,
        //cara 9
        0.293890, 0.404508, 0.654510,
        -0.293890, 0.404508, 0.654510,
        0.475531, -0.154508, 0.654510,
        -0.475531, -0.154508, 0.654510,
        0.000000, -0.499996, 0.654510,
        //cara 10
        -0.475531, -0.154508, 0.654510,
        0.000000, -0.499999, 0.654510,
        -0.769421, -0.249999, 0.154507,
        0.000000, -0.809016, 0.154507,
        -0.475530, -0.654508, -0.154510,
        //cara 11 
        0.000000, -0.809016, 0.154507,
        0.475530, -0.654508, -0.154510,
        -0.475530, -0.654508, -0.154510,
        0.293890, -0.404508, -0.654510,
        -0.293890, -0.404508, -0.654510,
        //cara 12
        0.475530, -0.154509, 0.654510,
        0.769421, -0.249999, 0.154507,
        0.000000, -0.499996, 0.654510,
        0.475530, -0.654508, -0.154510,
        0.000000, -0.809017, 0.154510,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

    // Color data
    let colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);


    let faceColors = [
        [0.0,  1.0,  0.0,  1.0],    // Top face: green
        [1.0,  0.0,  0.0,  1.0],    // Back face: red
        [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
        [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
        [1.0,  0.0,  1.0,  1.0]    // Left face: purple


    ];

    // Each vertex must have the color information, that is why the same color is concatenated 4 times, one for each vertex of the cube's face.
    let vertexColors = [];
    // for (const color of faceColors) 
    // {
    //     for (let j=0; j < 4; j++)
    //         vertexColors.push(...color);
    // }
    faceColors.forEach(color =>{
        for (let j=0; j < 15; j++)
            vertexColors.push(...color);
    });
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColors), gl.STATIC_DRAW);
    // Index data (defines the triangles to be drawn).
    let cubeIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndexBuffer);
    let Indices = [
        //cara1
        0,1,2,
        1,2,3,
        2,3,4,
        //cara2
        5,6,7,
        6,7,8,
        7,8,9,
        //cara3
        10,11,12,
        11,12,13,
        12,13,14,
        //cara4
        15,16,17,
        16,17,18,
        17,18,19,
        //cara5
        20,21,22,
        21,22,23,
        22,23,24,
        //cara6
        25,26,27,
        26,27,28,
        27,28,29,
        //cara7
        30,31,32,
        31,32,33,
        32,33,34,
        //cara8
        35,36,37,
        36,37,38,
        37,38,39,
        //cara9
        40,41,42,
        41,42,43,
        42,43,44,
        //cara10
        45, 46, 47,
        46,47,48,
        47,48,49,
        //cara11
        50,51,52,
        51, 52,53,
        52,53,54,
        //cara12
        55,56,57,
        56,57,58,
        57,58,59,
    ];

    // gl.ELEMENT_ARRAY_BUFFER: Buffer used for element indices.
    // Uint16Array: Array of 16-bit unsigned integers.
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(Indices), gl.STATIC_DRAW);
    
    let dodecaedro = {
            buffer: vertexBuffer, colorBuffer:colorBuffer, indices:cubeIndexBuffer,
            vertSize:3, nVerts:36, colorSize:4, nColors: 50, nIndices:108,
            primtype:gl.TRIANGLES, modelViewMatrix: mat4.create(), currentTime : Date.now()
        };

    mat4.translate(dodecaedro.modelViewMatrix, dodecaedro.modelViewMatrix, translation);

    dodecaedro.update = function()
    {
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
        mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, angle, rotationAxis1);
        mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, angle, rotationAxis2);

    };
    
    return dodecaedro;
}




// Create the vertex, color and index data for a multi-colored cube
function crearEscutoide(gl, translation, rotationAxis)
{    
    // Vertex Data
    let vertexBuffer;
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  
       let verts = [

       0.0, 0.0, 1.0, 
       1.0, 0.0, 0.0,
       -1.0, 0.0, 0.0,
       0.7, 0.0, -1.0,
       -0.7, 0.0, -1.0,  
       1.0, 3.0, 0.0,
       -1.0, 3.0, 0.0,  
       0.7, 3.0, -1.0,
       -0.7, 3.0, -1.0,
       0.7, 3, 1,
       -0.7, 3, 1,
       0.0, 1.5, 1.5

       

    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

    // Color data
    let colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);





    let faceColors = [
        [1.0,  0.0,  0.0,  1.0],    // Back face: red
        [0.0,  1.0,  0.0,  1.0],    // Top face: green
        [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
        [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
        [1.0,  0.0,  1.0,  1.0]    // Left face: purple

    ];

    // Each vertex must have the color information, that is why the same color is concatenated 4 times, one for each vertex of the cube's face.
    let vertexColors = [];
    // for (const color of faceColors) 
    // {
    //     for (let j=0; j < 4; j++)
    //         vertexColors.push(...color);
    // }
    faceColors.forEach(color =>{
        for (let j=0; j < 3; j++)
            vertexColors.push(...color);
    });

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColors), gl.STATIC_DRAW);

    // Index data (defines the triangles to be drawn).
    let cubeIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndexBuffer);

    let a = 0;    let b = 1

    let c = 2;    let d = 3

    let e = 4;    let f = 5

    let g = 6;    let h = 7

    let i = 8;    let j = 9

    let k = 10;    let l = 11

    let Indices = [
      
        ////cara 5 puntas
       0, 4, 2, 
       0, 1, 3, 
       3, 0, 4, 
       
       ///cara 6 puntas
       5, 7, 9, 
       10, 6, 8,
       8, 9, 10,
       7, 8, 9,
       9, 10, 11,
       3, 4, 7,
       4, 7, 8,
       f, h, d,
       b, d, f,

       c, e, i,
       g, i, c,

       a, l, j,
       a,b,j,
       j,f,b,

       a,l,k,
       a,c,k,
       k,g,c

    ];

    // gl.ELEMENT_ARRAY_BUFFER: Buffer used for element indices.
    // Uint16Array: Array of 16-bit unsigned integers.
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(Indices), gl.STATIC_DRAW);
    
    let escutoide = {
            buffer: vertexBuffer, colorBuffer:colorBuffer, indices:cubeIndexBuffer,
            vertSize:3, nVerts:36, colorSize:4, nColors: 24, nIndices:60,
            primtype:gl.TRIANGLES, modelViewMatrix: mat4.create(), currentTime : Date.now()
        };
    mat4.translate(escutoide.modelViewMatrix, escutoide.modelViewMatrix, translation);
    escutoide.update = function()
    {
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
    return escutoide;
}


function  createoctahedron (gl, translation, rotationAxis)
{    
    // Vertex Data
    let vertexBuffer;
    vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
       let verts = [
        /*
        1.0, 0.0, 0.0,      //arriba
        0.0, 1.0, 0.0,      //1
        0.0, 0.0, 1.0,      //2
        0.0, -1.0, 0.0,     //3
        0.0, 0.0, -1.0,     //4   
        -1.0, 0.0, 0.0,     //abajo
        */
        1.0, 0.0, 0.0,      //arriba
        0.0, 1.0, 0.0,      //1
        0.0, 0.0, 1.0,      //2

        1.0, 0.0, 0.0,      //arriba
        0.0, 0.0, 1.0,      //2
        0.0, -1.0, 0.0,     //3

        1.0, 0.0, 0.0,      //arriba
        0.0, -1.0, 0.0,     //3
        0.0, 0.0, -1.0,     //4  

        1.0, 0.0, 0.0,      //arriba
        0.0, 0.0, -1.0,     //4 
        0.0, 1.0, 0.0,      //1

        -1.0, 0.0, 0.0,     //abajo
        0.0, 1.0, 0.0,      //1
        0.0, 0.0, 1.0,      //2

        -1.0, 0.0, 0.0,     //abajo
        0.0, 0.0, 1.0,      //2
        0.0, -1.0, 0.0,     //3

        -1.0, 0.0, 0.0,     //abajo
        0.0, -1.0, 0.0,     //3
        0.0, 0.0, -1.0,     //4  

        -1.0, 0.0, 0.0,     //abajo
        0.0, 0.0, -1.0,     //4 
        0.0, 1.0, 0.0,      //1

        

    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);
    // Color data
    let colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    let faceColors = [
        [1.0,  0.0,  0.0,  1.0],    // Back face: red
        [0.0,  1.0,  0.0,  1.0],    // Top face: green
        [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
        [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
        
    ];
    // Each vertex must have the color information, that is why the same color is concatenated 4 times, one for each vertex of the cube's face.
    let vertexColors = [];
    // for (const color of faceColors) 
    // {
    //     for (let j=0; j < 4; j++)
    //         vertexColors.push(...color);
    // }
    faceColors.forEach(color =>{
        for (let j=0; j < 6; j++)
            vertexColors.push(...color);
    });
    console.log(faceColors)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColors), gl.STATIC_DRAW);
    // Index data (defines the triangles to be drawn).
    let cubeIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndexBuffer);
    let Inidices = [
      /*
        0, 1, 2, 
       0, 2, 3, 
       0, 3, 4, 
       0, 4, 1, 
       5, 1, 2, 
       5, 2, 3, 
       5, 3, 4, 
       5, 1, 4
       */
      0,1,2,
      3,4,5,
      6,7,8,
      9,10,11,
      12,13,14,
      15,16,17,
      18,19,20,
      21,22,23
    ];
    // gl.ELEMENT_ARRAY_BUFFER: Buffer used for element indices.
    // Uint16Array: Array of 16-bit unsigned integers.
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(Inidices), gl.STATIC_DRAW);
    
    let octaedro = {
            buffer: vertexBuffer, colorBuffer:colorBuffer, indices:cubeIndexBuffer,
            vertSize:3, nVerts:24, colorSize:4, nColors: 20, nIndices:24,
            primtype:gl.TRIANGLES, modelViewMatrix: mat4.create(), currentTime : Date.now(), counter:0,up:true
        };
    mat4.translate(octaedro.modelViewMatrix, octaedro.modelViewMatrix, translation);
    octaedro.update = function()
    {
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
        let y = 0;
        if( this.counter >= .12){
            this.up = false;
        } else if (this.counter <= -.12){
            this.up = true;
        }
        if (this.up){
            y += fract;
            y += .01;
            this.counter += fract;
        } else{
            y -= fract;
            y -= .01;
            this.counter -= fract;
        }
        mat4.translate(this.modelViewMatrix, this.modelViewMatrix, [0, y, 0]);
    };
    return octaedro;
}



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

function draw(gl, objs) 
{
    // clear the background (with black)
    gl.clearColor(0.1, 0.1, 0.1, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    // set the shader to use
    gl.useProgram(shaderProgram);

    for(i = 0; i< objs.length; i++)
    {
        obj = objs[i];
        // connect up the shader parameters: vertex position, color and projection/model matrices
        // set up the buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, obj.buffer);
        gl.vertexAttribPointer(shaderVertexPositionAttribute, obj.vertSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, obj.colorBuffer);
        gl.vertexAttribPointer(shaderVertexColorAttribute, obj.colorSize, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, obj.indices);

        gl.uniformMatrix4fv(shaderProjectionMatrixUniform, false, projectionMatrix);
        gl.uniformMatrix4fv(shaderModelViewMatrixUniform, false, obj.modelViewMatrix);

        // Draw the object's primitives using indexed buffer information.
        // void gl.drawElements(mode, count, type, offset);
        // mode: A GLenum specifying the type primitive to render.
        // count: A GLsizei specifying the number of elements to be rendered.
        // type: A GLenum specifying the type of the values in the element array buffer.
        // offset: A GLintptr specifying an offset in the element array buffer.
        gl.drawElements(obj.primtype, obj.nIndices, gl.UNSIGNED_SHORT, 0);
    }
}

function run(gl, objs) 
{
    // The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser call a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.
    requestAnimationFrame(function() { run(gl, objs); });

    draw(gl, objs);

    for(i = 0; i<objs.length; i++)
        objs[i].update();
}


