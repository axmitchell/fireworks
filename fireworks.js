//set execution to spacebar
document.body.onkeyup = function(e){
    if (e.keyCode == 32){
        explode()
    }
};

//create canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight

//create sky
let sky = 'darkblue'
ctx.fillStyle = sky;
ctx.fillRect(0,0,canvas.width,canvas.height); 

//set firework parameters
let minSize = 5
let maxSize = 25
let path = 1
let explosionsLimit = 6
let length = 6

//set random values for each firework
let x = Math.floor(Math.random()*canvas.width)
let y = Math.floor(Math.random()*canvas.height)
let size = Math.floor(Math.random()*(maxSize-minSize)+minSize)

//create array to hold fireworks' values
let pastExplosions = []

//create firework pixels
function drawFirework(fx,fy,fs,color) {
        ctx.fillStyle = color;
        ctx.fillRect(fx,fy,fs,fs)
}

//create
function drawFireworks(ffx,ffy,ffs,fcolor){
    drawFirework(ffx,ffy-ffs,ffs, fcolor); //draw center
    drawFirework(ffx+(ffs/4),ffy-path-(2*ffs),ffs/2, fcolor); //draw top path
    drawFirework(ffx+path+(ffs*1.25),ffy-path-(ffs*1.75),ffs/2,fcolor); //draw top-right path
    drawFirework(ffx+path+(ffs*1.5),ffy-(3*ffs/4),ffs/2,fcolor); //draw right path
    drawFirework(ffx+path+(ffs*1.25),ffy+path+(ffs/4),ffs/2,fcolor); //draw bottom-right path
    drawFirework(ffx+(ffs/4),ffy+path+(ffs/2),ffs/2,fcolor); //draw down path
    drawFirework(ffx-path-(3*ffs/4),ffy+path+(ffs/4),ffs/2,fcolor);  //draw bottom-left path
    drawFirework(ffx-path-ffs,ffy-(3*ffs/4),ffs/2,fcolor); //draw left path
    drawFirework(ffx-path-(3*ffs/4),ffy-path-(ffs*1.75),ffs/2,fcolor); //draw top-left path 
}

//create fireworks
function explode() {

    //control time between iterations below
    setTimeout(function(){
        
        //draw pixels across incrementing positions
        if (path < size*length) {
            drawFireworks(x,y,size,getRandomColor())
            
            //add firework's values to array
            pastExplosions.push([x,y,size])   
            
            //increment positions
            path += size;

            explode()
        }

        //control number of fireworks for every execution
        else if (explosionsLimit>1) {
            
            //reset values
            path = 1
            x = Math.floor(Math.random()*canvas.width)
            y = Math.floor(Math.random()*canvas.height)
            size = Math.floor(Math.random()*(maxSize-minSize)+minSize)
            
            console.log(pastExplosions[pastExplosions.length-1])

            explosionsLimit--

            explode(); 
            fadeFireworks()
        }  
        else {
            //reset values
            path = 1
            x = Math.floor(Math.random()*canvas.width)
            y = Math.floor(Math.random()*canvas.height)
            size = Math.floor(Math.random()*(maxSize-minSize)+minSize)
            explosionsLimit = 6

            fadeFireworks()
        }
    }, 150);
}

//remove fireworks
function fadeFireworks() {
    let pastExplosion = pastExplosions[0]
    let oldX = pastExplosion[0]
    let oldY = pastExplosion[1]
    let oldSize = pastExplosion[2]
        
    if (path < oldSize*length) {
        drawFireworks(oldX, oldY, oldSize,sky)  
        path += oldSize;            
        fadeFireworks();
    }
    else{    
        //reset values
        path = 1
        
        //remove first item from array
        pastExplosions.shift()
        
        fadeFireworks();
        
    }
}

//return random color
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}