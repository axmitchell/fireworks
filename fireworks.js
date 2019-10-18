let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
document.getElementsByTagName('button')[0].addEventListener('click', ignite);

let width = 1000
let height = 500
let centerWidth = width/2
let centerHeight = height/2
let trailLeft = 500
let trailRight = 500
let trailUp = 250
let trailDown = 250
let cell = 25

// draw sky 
ctx.fillStyle = "darkblue";
ctx.fillRect(0,0,width,height);

// draw firework cell
ctx.fillStyle = "brown";
ctx.fillRect((width/2),(height-cell),cell,cell);

function ignite() {
    ctx.fillStyle = "red";
    ctx.fillRect((width/2),(height-cell),cell,cell);
    launch()
}

function launch () {
    setTimeout(function(){
        if (height>=(500/2)) {
            ctx.fillStyle = "red";
            ctx.fillRect((width/2),(height-cell),cell,cell);
            ctx.fillStyle = "darkblue";
            ctx.fillRect((width/2),(height),cell,cell);
            height-=cell;
            console.log(height);
            launch();
        }
        else {
            ctx.fillStyle = "orange";
            ctx.fillRect((width/2),(500/2)-cell,cell,cell);
            explode()
        
        }
    }, 100);
}

function explode() {
    setTimeout(function(){
        if (height>=(500/8)) {

            //up
            ctx.fillStyle = "yellow";
            ctx.fillRect(centerWidth+(cell/4),trailUp-cell*2,cell/2,cell/2);

            //down
            ctx.fillStyle = "yellow";
            ctx.fillRect(centerWidth+(cell/4),trailDown+(cell/2),cell/2,cell/2);

            //left
            ctx.fillStyle = "yellow";
            ctx.fillRect(trailLeft-(cell),centerHeight-(cell*.75),cell/2,cell/2);

            //right
            ctx.fillStyle = "yellow";
            ctx.fillRect(trailRight+(cell*1.5),centerHeight-(cell*.75),cell/2,cell/2);

            //top-right
            ctx.fillStyle = "purple";
            ctx.fillRect(trailRight+(cell/4),trailUp-(cell*.75),cell/2,cell/2);

            //top-left
            ctx.fillStyle = "purple";
            ctx.fillRect(trailLeft+(cell/4),trailUp-(cell*.75),cell/2,cell/2);

            //bottom-right
            ctx.fillStyle = "purple";
            ctx.fillRect(trailRight+(cell/4),trailDown-(cell*.75),cell/2,cell/2);

            //bottom-left
            ctx.fillStyle = "purple";
            ctx.fillRect(trailLeft+(cell/4),trailDown-(cell*.75),cell/2,cell/2);

            trailUp-=cell;
            trailLeft-=cell;
            trailRight+=cell;
            trailDown+=cell;
            height-=cell

            explode();
        } 
        else {
            height = 500;
            randomFirework()
        }
    }, 200);
    
}

function randomFirework() {
    let randomHeight = Math.floor(Math.random()*height);
    let randomWidth = Math.floor(Math.random()*width);
    let randomUp = randomHeight;
    let randomDown = randomHeight;
    let randomLeft = randomWidth;
    let randomRight = randomWidth;
    let randomCenter = randomHeight;
    ctx.fillStyle = "orange";
    ctx.fillRect(randomWidth, randomHeight, cell/2, cell/2);
    console.log(randomWidth + " " + randomHeight);
    randomExplosion(randomWidth, randomHeight, randomUp, randomDown, randomLeft, randomRight, randomCenter);
}

function randomExplosion(randomW, randomH, randomU, randomD, randomL, randomR, randomC) {
    setTimeout(function(){
    if (randomC<=randomH+200) {

    //random up
    ctx.fillStyle = 'yellow'
    ctx.fillRect(randomW, randomU, cell/4, cell/4)

    //random down
    ctx.fillStyle = 'yellow'
    ctx.fillRect(randomW, randomD, cell/4, cell/4)
    
    //random left
    ctx.fillStyle = 'yellow'
    ctx.fillRect(randomL, randomH, cell/4, cell/4)

    //random right
    ctx.fillStyle = 'yellow'
    ctx.fillRect(randomR, randomH, cell/4, cell/4)

    randomU+=cell/4
    randomD-=cell/4
    randomL-=cell/4
    randomR+=cell/4
    randomC+=cell
    randomExplosion(randomW, randomH, randomU, randomD, randomL, randomR, randomC);
    } else {
        randomC = randomH;
        randomFirework();
    }
}, 120)
}