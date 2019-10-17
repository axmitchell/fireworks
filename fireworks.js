let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// draw rectangle 
ctx.fillStyle = "black";
ctx.fillRect(0,0,700,500);

// draw small rectangle
ctx.fillStyle = "red";
ctx.fillRect(350,475,25,25);