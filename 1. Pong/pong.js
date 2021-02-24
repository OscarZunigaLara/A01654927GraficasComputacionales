class bar
{
    constructor(x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(context)
    {
        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    moveUp()
    {
        this.y -= 2;
    }

    moveDown()
    {
        this.y += 2;
    }

    update(keysDown)
    {
        if(keysDown['q'])
            this.moveUp();

        if(keysDown['a'])
            this.moveDown();
        
        
    }
}


class rBar
{
    constructor(x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(context)
    {
        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    moveUp()
    {
        this.y -= 2;
    }

    moveDown()
    {
        this.y += 2;
    }

    update(keysDown)
    {
        if(keysDown['e'])
            this.moveUp();

        if(keysDown['d'])
            this.moveDown();
         
    }
}


class bola
{
    constructor()
    {
        this.x = 300;
        this.y = 0;
        this.width = 10;
        this.height = 10;

        this.moverDerecha = true;
        this.moverArriba = true;


        this.perdio = "nadie";
    }

    draw(context)
    {
        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    moveUp()
    {
        this.y -= 1;
    }

    moveDown()
    {
        this.y += 1;
    }

    update(leftBarY, leftBarX,  rightBarY, rightBarX)
    {
        ////MOVER NORMALMENTE


        if (this.moverDerecha)
            this.x += 2;
            else
                this.x -=1;

        if (this.moverArriba)
            this.y += 1;
            else
                this.y -= 1;
        
      

        ////REBOTAR EN BARRAS

        if (this.x >  rightBarX && this.y > rightBarY && this.y < rightBarY + 60)
        {
            console.log("CHOCA Derecha")
            this.moverDerecha = false
        }


        if (this.x <  leftBarX && this.y > leftBarY && this.y < leftBarY + 60)
        {   
            console.log("CHOCA Izquierda")
            this.moverDerecha = true
        }




        ////chocar arriba
        if (this.y < 0)
        {
            this.moverArriba = true;
        }
         ////Chocar Abajo
         if (this.y > 300)
         {
             this.moverArriba = false;
         }

         /////chocar Izquierda
         if (this.x < 0){
             this.perdio = "izquierda"
             console.log(this.perdio)
         }

         /////chocar derecha
         if (this.x > 600){
             this.perdio = "derecho"
             console.log(this.perdio)
         }
    }
       
}



let keysDown = {
    'q': false,
    'a': false,
    'e': false,
    'd': false
};

function update(context, canvas, leftBar, rightBar, bolaNueva)
{
    requestAnimationFrame(()=> update(context, canvas, leftBar, rightBar, bolaNueva));

    context.clearRect(0,0, canvas.width, canvas.height);
    
    leftBar.update(keysDown);
    leftBar.draw(context);

    rightBar.update(keysDown);
    rightBar.draw(context);


    bolaNueva.update(leftBar.y, leftBar.x ,rightBar.y, rightBar.x);
    bolaNueva.draw(context);

}

function main()
{
    // Obtener el contexto para dibujar
    const canvas = document.getElementById("pongCanvas");
    const context = canvas.getContext("2d");

    const leftBar = new bar(10, 10, 20, 60);
    const rightBar = new rBar (570, 10, 20, 60);

    const bolaNueva = new bola();

    document.addEventListener("keydown", event => keysDown[event.key] = true);
    document.addEventListener("keyup", event => keysDown[event.key] = false);

    update(context, canvas, leftBar, rightBar, bolaNueva);
}