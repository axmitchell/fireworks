//set trigger to spacebar
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
ctx.fillStyle = "darkblue";
ctx.fillRect(0,0,canvas.width,canvas.height); 

//set firework parameters
let maxSize = 25
let path = 1
let explosionsLimit = 6

//set random values for each firework
let x = Math.floor(Math.random()*canvas.width)
let y = Math.floor(Math.random()*canvas.height)
let size = Math.floor(Math.random()*maxSize)

//create array to hold fireworks' values
let pastExplosions = []

//create firework pixels
function drawFirework(fx,fy,fs,color) {
    ctx.fillStyle = color;
    ctx.fillRect(fx,fy,fs,fs)
}

//create fireworks
function explode() {
    setTimeout(function(){
        if (path < size*6) {
            drawFirework(x,y-size,size, getRandomColor()); //draw center
            drawFirework(x+(size/4),y-path-(2*size),size/2, getRandomColor()); //draw top path
            drawFirework(x+path+(size*1.25),y-path-(size*1.75),size/2,getRandomColor()); //draw top-right path
            drawFirework(x+path+(size*1.5),y-(3*size/4),size/2,getRandomColor()); //draw right path
            drawFirework(x+path+(size*1.25),y+path+(size/4),size/2,getRandomColor()); //draw bottom-right path
            drawFirework(x+(size/4),y+path+(size/2),size/2,getRandomColor()); //draw down path
            drawFirework(x-path-(3*size/4),y+path+(size/4),size/2,getRandomColor());  //draw bottom-left path
            drawFirework(x-path-size,y-(3*size/4),size/2,getRandomColor()); //draw left path
            drawFirework(x-path-(3*size/4),y-path-(size*1.75),size/2,getRandomColor()); //draw top-left path 
            
            //add firework's values to array
            pastExplosions.push([x,y,size])   
            
            path += size;
            explode()
        }
        else if (explosionsLimit>1) {
            //reset values
            path = 1
            x = Math.floor(Math.random()*canvas.width)
            y = Math.floor(Math.random()*canvas.height)
            size = Math.floor(Math.random()*maxSize)
            
            console.log(pastExplosions[pastExplosions.length-1])
            explosionsLimit--
            explode(); 
            fadeFireworks()
        }  
        else {
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
        if (path < oldSize*6) {
            drawFirework(oldX,oldY-oldSize,oldSize, 'darkblue'); //draw center
            drawFirework(oldX+(oldSize/4),oldY-path-(2*oldSize),oldSize/2,'darkblue'); //draw top path
            drawFirework(oldX+path+(oldSize*1.25),oldY-path-(oldSize*1.75),oldSize/2,'darkblue'); //draw top-right path
            drawFirework(oldX+path+(oldSize*1.5),oldY-(3*oldSize/4),oldSize/2,'darkblue'); //draw right path
            drawFirework(oldX+path+(oldSize*1.25),oldY+path+(oldSize/4),oldSize/2,'darkblue'); //draw bottom-right path
            drawFirework(oldX+(oldSize/4),oldY+path+(oldSize/2),oldSize/2,'darkblue'); //draw bottom path
            drawFirework(oldX-path-(3*oldSize/4),oldY+path+(oldSize/4),oldSize/2,'darkblue'); //draw bottom-left path
            drawFirework(oldX-path-oldSize,oldY-(3*oldSize/4),oldSize/2,'darkblue'); //draw left path
            drawFirework(oldX-path-(3*oldSize/4),oldY-path-(oldSize*1.75),oldSize/2,'darkblue'); //draw top-left path     
            path += oldSize;            
            fadeFireworks();
        }
        else{    
            //reset values
            path = 1
            oldX = pastExplosion[0]
            oldY = pastExplosion[1]
            oldSize = pastExplosion[2]
            
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