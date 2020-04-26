//Bind program executor to spacebar
document.body.onkeyup = function(e){
    if (e.keyCode == 32){
        createFireworks()
    }
}

//Create empty canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight

//Draw sky
let sky = '#2F69C6';
ctx.fillStyle = sky;
ctx.fillRect(0,0,canvas.width,canvas.height); 

//Define firework parameters
let minSize = 5
let maxSize = 25
let randomX = Math.floor(Math.random()*canvas.width)
let randomY = Math.floor(Math.random()*canvas.height)
let randomSize = Math.floor(Math.random()*(maxSize-minSize)+minSize)
let position = 1
let explosionsLimit = 6
let length = 8
let rateOfExpansion = 120
let colors = ['#87fab3', '#fa87ce', '#fab387', '#faed87', '#fa8795', '#cefa87', '#87faed', '#8795fa', '#87cefa'];
// let pastExplosions = []

function getRandomColor() {return colors[Math.floor(Math.random()*(colors.length-1))]}

function designFireworkPixel(x,y,size,color) {
        ctx.fillStyle = color;
        ctx.fillRect(x,y,size,size)
}

function designFirework(x,y,size,color){
    let center = designFireworkPixel(x,y,size,color);
    let topPath = designFireworkPixel(x+(size/4),y-position-size,size/2,color);
    let topRightPath = designFireworkPixel(x+position+(size*1.25),y-position-(size*.75),size/2,color);
    let rightPath = designFireworkPixel(x+position+(size*1.5),y+(size/4),size/2,color);
    let bottomRightPath = designFireworkPixel(x+position+(size*1.25),y+position+(size*1.25),size/2,color);
    let bottomPath = designFireworkPixel(x+(size/4),y+position+(size*1.5),size/2,color);
    let bottomleftPath = designFireworkPixel(x-position-(size*.75),y+position+(size*1.25),size/2,color);
    let leftPath = designFireworkPixel(x-position-size,y+(size/4),size/2,color);
    let topLeftPath = designFireworkPixel(x-position-(size*.75),y-position-(size*.75),size/2,color);
}

function createFireworks() {
    setTimeout(function(){
        if (position < randomSize * length) {
            designFirework(randomX,randomY,randomSize,getRandomColor())
            // pastExplosions.push([randomX,randomY,randomSize])   
            position += randomSize;
            createFireworks()
        } else {
            position = 1
            randomX = Math.floor(Math.random()*canvas.width)
            randomY = Math.floor(Math.random()*canvas.height)
            randomSize = Math.floor(Math.random()*(maxSize-minSize)+minSize)
            if (explosionsLimit > 1) {
                // console.log(pastExplosions[pastExplosions.length-1])
                explosionsLimit--
                createFireworks(); 
            } else {
                explosionsLimit = 6
            }
            fadeFireworks()
        }
    }, rateOfExpansion);
}

function fadeFireworks() {
    ctx.fillStyle = sky;
    ctx.fillRect(0,0,canvas.width,canvas.height); 
    /*
    let pastExplosion = pastExplosions[0]
    let oldX = pastExplosion[0]
    let oldY = pastExplosion[1]
    let oldSize = pastExplosion[2]
    if (position < oldSize*length) {
        designFirework(oldX, oldY, oldSize,sky)  
        position += oldSize;            
        fadeFireworks();
    }
    else{    
        position = 1
        pastExplosions.shift()
        fadeFireworks();
    }
    */
}