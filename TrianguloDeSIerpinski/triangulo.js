////GENERA EL PRIMER TRIANGULO

class triangulo {

    constructor(x, y, largo){
        this.x = x;
        this.y = y;
        this.largo = largo;
        this. height = largo * (Math.sqrt(3)/2);
    }

    draw(context)
    {
       context.beginPath();
       context.moveTo(this.x, this.y);
       context.lineTo(this.x + this.largo / 2, this.y + this.height);
       context.lineTo(this.x - this.largo / 2, this.y + this.height);
       context.lineTo(this.x, this.y);

       context.closePath();
       
       context.lineWidth = 5;
       context.stroke();
       context.fillStyle = "#FF0000";
       context.fill();



    }

};



///GENERA LOS TRIANGULOS INVERTIDOS.
class triangulitos {

    constructor(x, y, largo){
        this.x = x;
        this.y = y;
        this.largo = largo;
        this. height = largo * (Math.sqrt(3)/2);

    }

    draw(context)
    {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x - this.largo / 2, this.y - this.height);
        context.lineTo(this.x + this.largo / 2, this.y - this.height);
        context.lineTo(this.x, this.y);
 
        context.closePath();
     
        context.lineWidth = 5;
        context.stroke();
        context.fillStyle = "#FFCC00";
        context.fill();
    }

};



/////FUNCION RECURSIVA, SE ENCARGA DE LLAMAR A LA GENERACION DE LOS DEMAS TRIANGULOS. 
function dibujarTriangulitosArriba(context, x1, y1, largo, height, recur){

    if (recur <= cantidadDeTriangulos){
        const t4 = new triangulitos(x1, y1 +height ,largo/2);
        t4.draw(context);
        dibujarTriangulitosArriba(context, x1, y1, largo /2 ,height/2 , recur + 1);
        dibujarTriangulitosArriba(context, x1 + largo /4, y1 + height /2 , largo /2, height/2, recur + 1);
        dibujarTriangulitosArriba(context, x1 - largo /4, y1 + height /2 , largo /2, height/2, recur + 1);
    }
}






function update(context, canvas)
{
    requestAnimationFrame(()=> update(context, canvas));

    ///POSICION DE GENERACION DEL PRIMER TRIANGULO

    x1 = 400;
    y1 = 200;
    largo =700;

    ////CONSULTA CON EL SLIDER LA CANTIDAD DE TRIANGULOS A GENERAR
    cantidadDeTriangulos = document.getElementById("slider").value -1;


    const t1 = new triangulo(x1, y1, largo);
    t1.draw(context);

    var recur = 0;
    dibujarTriangulitosArriba(context, x1, y1, largo,t1.height, recur);
  
    

}

function main()
{
    
    // Obtener el contexto para dibujar
    const canvas = document.getElementById("trianguloCanvas");
    const context = canvas.getContext("2d");

    cantidadDeTriangulos = 0

    update(context, canvas, cantidadDeTriangulos);
}
