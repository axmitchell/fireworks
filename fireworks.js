document.body.onkeyup = function(e){
    if (e.keyCode == 32){
        createFireworks()
    }
}

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight

let sky = '#2F69C6';
ctx.fillStyle = sky;
ctx.fillRect(0,0,canvas.width,canvas.height); 

let minSize = 5
let maxSize = 25
let path = 1
let explosionsLimit = 6
let length = 8
let rateOfExpansion = 120
let colors = ['#87fab3', '#fa87ce', '#fab387', '#faed87', '#fa8795', '#cefa87', '#87faed', '#8795fa', '#87cefa'];
let randomX = Math.floor(Math.random()*canvas.width)
let randomY = Math.floor(Math.random()*canvas.height)
let randomSize = Math.floor(Math.random()*(maxSize-minSize)+minSize)
let pastExplosions = []

function getRandomColor() {return colors[Math.floor(Math.random()*(colors.length-1))]}

function designFireworkPixel(selX,selY,selSize,selColor) {
        ctx.fillStyle = selColor;
        ctx.fillRect(selX,selY,selSize,selSize)
}
function designFirework(selX,selY,selSize,selColor){
    let center = designFireworkPixel(selX,selY,selSize,selColor);
    let topPath = designFireworkPixel(selX+(selSize/4),selY-path-selSize,selSize/2,selColor);
    let topRightPath = designFireworkPixel(selX+path+(selSize*1.25),selY-path-(selSize*.75),selSize/2,selColor);
    let rightPath = designFireworkPixel(selX+path+(selSize*1.5),selY+(selSize/4),selSize/2,selColor);
    let bottomRightPath = designFireworkPixel(selX+path+(selSize*1.25),selY+path+(selSize*1.25),selSize/2,selColor);
    let bottomPath = designFireworkPixel(selX+(selSize/4),selY+path+(selSize*1.5),selSize/2,selColor);
    let bottomleftPath = designFireworkPixel(selX-path-(selSize*.75),selY+path+(selSize*1.25),selSize/2,selColor);
    let leftPath = designFireworkPixel(selX-path-selSize,selY+(selSize/4),selSize/2,selColor);
    let topLeftPath = designFireworkPixel(selX-path-(selSize*.75),selY-path-(selSize*.75),selSize/2,selColor);
}

function createFireworks() {
    setTimeout(function(){
        if (path < randomSize*length) {
            designFirework(randomX,randomY,randomSize,getRandomColor())
            pastExplosions.push([randomX,randomY,randomSize])   
            path += randomSize;
            createFireworks()
        }
        else if (explosionsLimit>1) {
            path = 1
            randomX = Math.floor(Math.random()*canvas.width)
            randomY = Math.floor(Math.random()*canvas.height)
            randomSize = Math.floor(Math.random()*(maxSize-minSize)+minSize)
            console.log(pastExplosions[pastExplosions.length-1])
            explosionsLimit--
            createFireworks(); 
            fadeFireworks()
        }  
        else {
            path = 1
            randomX = Math.floor(Math.random()*canvas.width)
            randomY = Math.floor(Math.random()*canvas.height)
            randomSize = Math.floor(Math.random()*(maxSize-minSize)+minSize)
            explosionsLimit = 6
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
    if (path < oldSize*length) {
        designFirework(oldX, oldY, oldSize,sky)  
        path += oldSize;            
        fadeFireworks();
    }
    else{    
        path = 1
        pastExplosions.shift()
        fadeFireworks();
    }
    */
}