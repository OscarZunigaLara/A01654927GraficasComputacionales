///https://codepen.io/chrisjaime/pen/lcEpn
//https://stackoverflow.com/questions/2368784/draw-on-html5-canvas-using-a-mouse
//https://stackoverflow.com/questions/22891827/how-do-i-hand-draw-on-canvas-with-javascript
///http://jsfiddle.net/MartinThoma/vSDTW/2/

///CODE I USED???




///Local variables
let selectedColor = 'black';
let thickness = 10;

////CLASS PAINT, USED FOR THE PREVIOUS LOCATION OF CURSOR AT DRAWING.
class paint{
    constructor (prevX, prevY) {
        this.prevX = prevX;
        this.prevY = prevY;
    }
}


//////CLEARING CANVAS BUTTON
function clearc(){
    console.log("clearCanvas")
    clearCanvas = true;
    prevX = 0;
    prevY = 0;
}

///SET COLOR IN VARABLE
function setColor(color){
    console.log(color)
    selectedColor= color;
}
///SET THICKNESS IN VARABLE
function setTickness(thick){
    console.log(thick);
    thickness = thick;
}

///GETTING MOUSE POSITION
function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


////DRAW CANVAS AND BORDER, ALSO USED TO CLEAN CANVAS
function drawBorder(context, canvas){
context.rect(0,0, canvas.height , canvas.width );
context.fillStyle = "white";
context.fill();
context.lineWidth = 5;
context.strokeStyle = "black";
context.stroke();
}



////DRAW LINE BASED IN ACTUAL POSITION AND PREVIOUS POSITION
function drawLine(context, prevX, prevY, currX, currY) {
    context.beginPath();
    context.moveTo(prevX, prevY);
    context.lineTo(currX, currY);
    context.strokeStyle = selectedColor;
    context.lineWidth = thickness;
    context.lineJoin = "round";
    context.closePath();
    context.stroke();  
}




///UPDATE EVERY FRAME
function update(context, canvas, paint)
{
    requestAnimationFrame(()=> update(context, canvas, paint));



    canvas.addEventListener('mousemove', function (evt) {
        if (evt.buttons === 1) {
            let mousePos = getMousePos(canvas, evt);
            if (paint.prevX == null){
                paint.prevX = mousePos.x;
                paint.prevY = mousePos.y;
            }

            drawLine(context,paint.prevX, paint.prevY, mousePos.x, mousePos.y);
            paint.prevX = mousePos.x;
            paint.prevY = mousePos.y;
        }
        }, false);

    ////MOUSE UP, SET PREVIOUS POSITION TO NULL
    ////PERFORMANCE ISSUES AFTER 1 MINUTE, DONT KNOW WHY

    canvas.addEventListener('mouseup', function (evt) {
        paint.prevX = null;
        paint.prevX = null;
    }, false);
    if (clearCanvas) {
        drawBorder(context, canvas)
        clearCanvas = false;
    }

    canvas.removeEventListener('mousemove', function (evt) {})
    canvas.removeEventListener('mouseup', function (evt){})
}

function main()
{
    
    // Obtener el contexto para dibujar

    
    const canvas = document.getElementById("PAINTCANVAS");
    const context = canvas.getContext("2d");
    thickness = document.getElementById("slider").value;
    const pain = new paint(null, null )


    drawBorder(context, canvas);
    update(context, canvas, pain);
}
