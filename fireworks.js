let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
document.getElementById('button').style.backgroundColor = "red";

// stats
height = window.innerHeight;
width = window.innerWidth;
box = 25;
canvas.width = width;
canvas.height = height;
boxX = width/2-box/2;
boxY = height-box;
K = 1;

// draw rectangle
function drawRect(x,y,w,h,color) {
	ctx.fillStyle = color;
	ctx.fillRect(x,y,w,h);
}

// delete trail
function deleteTrail() {
	boxY = height-box;
	for(boxY; boxY > height/2-box; boxY-=box) {
		drawRect(boxX,boxY,box,box,"black");
	}
}

// launch
function launch() {
	setTimeout(function() {
		if (boxY > height/2-box) {
			drawRect(boxX-box/2,boxY,2*box,box,"black");
			drawRect(boxX,boxY-box,box,box,"red");
			drawRect(boxX+box/4,boxY,box/2,box/2,"orange");
			boxY = boxY - box;
			console.log(boxY);
			launch();
		} else {
			deleteTrail();
			explode(boxX,boxY,box);
		}
	}, 100);
}

// explode
function explode(X,Y,B) {
	setTimeout(function() {
		if (K<9) {
			// draw new boxes
			//drawRect(boxX,boxY,box,box,"black");
			//drawRect(344-K*18,boxY+K*box,box/2,box/2,"orange");
			drawRect(X-B/2-(K-1)*B,Y+K*B,B/2,B/2,"orange");
			//drawRect(344-K*18,boxY+12-K*box,box/2,box/2,"yellow");
			drawRect(X-B/2-(K-1)*B,Y-.5*B-(K-1)*B,B/2,B/2,"yellow");
			//drawRect(344+K*18,boxY+12-K*box,box/2,box/2,"green");
			drawRect(X+K*B,Y-B/2-(K-1)*B,B/2,B/2,"green");
			//drawRect(344+K*18,boxY+K*box,box/2,box/2,"white");
			drawRect(X+K*B,Y+K*B,B/2,B/2,"white");
			//drawRect(344-K*box,boxY+6,box/2,box/2,"pink");
			drawRect(X-K*B,Y+B/4,B/2,B/2,"pink");
			//drawRect(344+K*box,boxY+6,box/2,box/2,"red");
			drawRect(X+B/2+K*B,Y+B/4,B/2,B/2,"red");
			// drawRect(344,boxY-K*box,box/2,box/2,"purple");
			drawRect(X+B/4,Y-K*B,B/2,B/2,"purple");
			//drawRect(344,boxY+12+K*box,box/2,box/2,"white");
			drawRect(X+B/4,Y+B/2+K*B,B/2,B/2,"white");
			K++;
			explode(X,Y,B);
		} else {
			K = 1;
			X = Math.floor(Math.random()*width);
			Y = Math.floor(Math.random()*height);
			B = Math.floor(Math.random()*box)
			explode(X,Y,B);
			/*width = Math.floor(Math.random()*width);
			height = Math.floor(Math.random()*height);
			box = Math.floor(Math.random()*box)
			explode(width,height,box);*/
		}
	}, 100);
}

let button = document.getElementById('button');
button.addEventListener('click', launch);
drawRect(0,0,width,height,"black");
drawRect(boxX,height-box,box,box,"red");

