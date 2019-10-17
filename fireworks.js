let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let button = document.getElementsByTagName('button')
button.addEventListener('click' ignite)

// 
function ignite () {
    
}

// draw sky 
ctx.fillStyle = "darkblue";
ctx.fillRect(0,0,1000,500);

// draw firwork cell
ctx.fillStyle = "red";
ctx.fillRect(475,475,25,25);

