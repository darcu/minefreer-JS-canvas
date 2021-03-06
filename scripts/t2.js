var _canvas = document.getElementById('canvas');
var _canvasContext = null;
if( _canvas && _canvas.getContext ){
	_canvasContext = _canvas.getContext('2d');			
}
else{
	//exit();
}

//mouse

//document.getElementById('canvas').onclick = function () {
//        //ini();
//	//console.log("x: " + event.pageX + " y " + event.pageY);
//	//console.log("x: " + _canvas.offsetLeft + " y " + _canvas.offsetTop);
//	
//	
//	console.log("x: " + Math.floor((event.pageX - _canvas.offsetLeft)/32) + " y " + Math.floor((event.pageY - _canvas.offsetTop)/32));
//}

/*
_canvas.addEventListener("click", mouseOnClick, false);

var mouseOnClick = function(e){
	var pos = getCursorPosition(e);
}

var getCursorPosition = function(e){
	var x;
	var y;
	if (e.pageX || e.pageY) { 
	  x = e.pageX;
	  y = e.pageY;
	}
	else { 
	  x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
	  y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
	} 
	x -= _canvas.offsetLeft;
	y -= _canvas.offsetTop;
	
	console.log("x: "+x+" y "+y);
}*/


document.getElementById('canvas').onclick = function () {
	var coordX = Math.floor((event.pageX - _canvas.offsetLeft)/32);
	var coordY = Math.floor((event.pageY - _canvas.offsetTop)/32);
	
	console.log("x "+coordX+" y "+coordY);
}

//cell object
Cell = function () {
	this.cx = 0;
	this.cy = 0;
	this.state = 1; //empty 0, cover 1, flag 2, question 3
	//this.img = "zero";
	this.mine = false;
	this.minesNear = 0;
}

board = function() {
	var col = 10;
	var row = 10;
	var mines = 10;
	this.flaggedMines = mines;
	this.end = 0;
	this.cell = [];
	for(i=0; i<col; i++){
		this.cell[i] = [row];
	}
	for(i = 0; i < col; i++)
	for(j = 0; j < row; j++){
		this.cell[i][j] = new Cell();
		this.cell[i][j].cx = i*32;
		this.cell[i][j].cy = j*32;
		//console.log("i: "+i+" j: "+j+" x: "+this.cell[i][j].cx+" - y: "+this.cell[i][j].cy);
	}
	
	
	this.ini = function(){
		//this.mouseCoord();
		
		this.randMines();
		this.countMines();
		
		this.drawBoard();
		
		//mouseOnClick();
	};
	this.youDie = function (){
		console.log("HAHA you dead!");
		for(i = 0; i < col; i++)
		for(j = 0; j < row; j++){
			this.cell[i][j].state = 0;
		}
		this.drawBoard();
		this.end = 1;
		startTime = null;
	}
	this.randMines = function(){
		while(mines){
			var px = Math.floor(Math.random()*col);
			var py = Math.floor(Math.random()*row);
			if(!(this.cell[px][py].mine)){
				this.cell[px][py].mine = true;
				//this.cell[px][py].img = "one";
				mines--;
			}
		}
	}
	this.countMines = function(){
		for(i = 0; i < col; i++)
		for(j = 0; j < row; j++){
			if(!this.cell[i][j].mine){
				for(a = Math.max(i-1, 0); a <= Math.min(i+1, col-1); a++)
				    for(b = Math.max(j-1, 0); b <= Math.min(j+1, row-1); b++){
					//console.log(a+" : "+b);
					if(!(a == i && b == j)){
						if(this.cell[a][b].mine == true){
							this.cell[i][j].minesNear++;
						}
					}
				}
				//console.log("i "+i+" j "+j+" - "+this.cell[i][j].minesNear);
			}
			//console.log("a "+a+" b "+b+" i+a "+(i+a)+" i+b "+(j+b)+" mines "+this.cell[i][j].minesNear+" is mine "+this.cell[i+a][j+b].mine);
		}	
	}
	this.drawBoard = function(){
		//console.log("drawBoard");
		for(i = 0; i < col; i++)
		for(j = 0; j < row; j++){
			this.drawCell(i, j);
						
		}
		//debug canvas
		//_canvasContext.fillStyle = "rgb(0,255,0)";
		//for(i = 0; i <= 11; i++){
		//	_canvasContext.fillRect(i*32, 320, 32, 20);
		//	i++;
		//}

	};
	this.drawCell = function(dx, dy){
		//is covered
		if(this.cell[dx][dy].state == 1){
			_canvasContext.drawImage(upImg, this.cell[dx][dy].cx, this.cell[dx][dy].cy);
		}
		else if(this.cell[dx][dy].state == 2){
			_canvasContext.drawImage(fImg, this.cell[dx][dy].cx, this.cell[dx][dy].cy);
		}
		else if(this.cell[dx][dy].state == 3){
			_canvasContext.drawImage(qImg, this.cell[dx][dy].cx, this.cell[dx][dy].cy);
		}
		//is mine
		else if(this.cell[dx][dy].mine){
			_canvasContext.drawImage(mineImg, this.cell[dx][dy].cx, this.cell[dx][dy].cy);
		}
		else if(this.cell[dx][dy].state == 0){
			switch (this.cell[dx][dy].minesNear){
			/*case "up":
				_canvasContext.drawImage(upImg, this.cell[dx][dy].cx, this.cell[dx][dy].cy);
				break;*/
			case 0:
				_canvasContext.drawImage(zeroImg, this.cell[dx][dy].cx, this.cell[dx][dy].cy);
				break;
			case 1:
				_canvasContext.drawImage(oneImg, this.cell[dx][dy].cx, this.cell[dx][dy].cy);
				break;
			case 2:
				_canvasContext.drawImage(twoImg, this.cell[dx][dy].cx, this.cell[dx][dy].cy);
				break;
			case 3:
				_canvasContext.drawImage(threeImg, this.cell[dx][dy].cx, this.cell[dx][dy].cy);
				break;
			case 4:
				_canvasContext.drawImage(fourImg, this.cell[dx][dy].cx, this.cell[dx][dy].cy);
				break;
			case 5:
				_canvasContext.drawImage(fiveImg, this.cell[dx][dy].cx, this.cell[dx][dy].cy);
				break;
			case 6:
				_canvasContext.drawImage(sixImg, this.cell[dx][dy].cx, this.cell[dx][dy].cy);
				break;
			case 7:
				_canvasContext.drawImage(sevenImg, this.cell[dx][dy].cx, this.cell[dx][dy].cy);
				break;
			default:
				_canvasContext.drawImage(qImg, this.cell[dx][dy].cx, this.cell[dx][dy].cy);
				break;
			};
		}
	}
	this.flip = function(i, j) {
		console.log("i:" + i + " j:" + j);
		for(var a = Math.max(i-1, 0); a <= Math.min(i+1, col-1); a++){
		for(var b = Math.max(j-1, 0); b <= Math.min(j+1, row-1); b++){
			if(this.cell[a][b].state == 1 && !this.cell[a][b].mine){
				this.cell[a][b].state = 0;
				if(this.cell[a][b].minesNear == 0)
					this.flip(a, b);
			}
		}}
	}
	this.mouse1 = function(){
	if(!this.end){
		var coordX = Math.floor((event.pageX - _canvas.offsetLeft)/32);
		var coordY = Math.floor((event.pageY - _canvas.offsetTop)/32);

		if(this.cell[coordX][coordY].state == 1){	
			this.cell[coordX][coordY].state = 0;
			console.log("x " + coordX + " y " + coordY + " state " + this.cell[coordX][coordY].state);
			
			if(this.cell[coordX][coordY].mine){
				//console.log("ouch, you die");
				this.youDie();
				this.drawCell(coordX, coordY);
				//this.cell[coordX][coordY].state = 0;
			}
			else if(this.cell[coordX][coordY].minesNear == 0){//zero mines
				//console.log("zero mines, gtg " + coordX + " " + coordY);
				//this.clearSpace(coordX, coordY, 0);
				
				this.flip(coordX, coordY);
				this.drawBoard();
			}
			else {
				this.cell[coordX][coordY].state = 0;
				this.drawCell(coordX, coordY);
			}
			
			
			//this.drawBoard();
		}
	}
	};
	this.mouse2 = function(){
	if(!this.end){
		var coordX = Math.floor((event.pageX - _canvas.offsetLeft)/32);
		var coordY = Math.floor((event.pageY - _canvas.offsetTop)/32);
		
		if(this.cell[coordX][coordY].state == 1){
			console.log("1 " + this.cell[coordX][coordY].state);
			this.cell[coordX][coordY].state = 2;
			this.drawCell(coordX, coordY);
			
			this.flaggedMines--;
			document.getElementById("mines").innerHTML = "Mines " + this.flaggedMines;
		}
		else if(this.cell[coordX][coordY].state == 2){
			console.log("2 " + this.cell[coordX][coordY].state);
			this.cell[coordX][coordY].state = 3;
			this.drawCell(coordX, coordY);
			
			this.flaggedMines++;
			document.getElementById("mines").innerHTML = "Mines " + this.flaggedMines;
		}
		else if(this.cell[coordX][coordY].state == 3){
			console.log("3 " + this.cell[coordX][coordY].state);
			this.cell[coordX][coordY].state = 1;
			this.drawCell(coordX, coordY);
		}
		
		//console.log("mouse2 x " + coordX + " y " + coordY + " state " + this.cell[coordX][coordY].state);	
		
	}
	};
};


//img
var upImg = new Image();
upImg.src = "images/upb.png";

var zeroImg = new Image();
zeroImg.src = "images/0.png";

var oneImg = new Image();
oneImg.src = "images/1.png";

var twoImg = new Image();
twoImg.src = "images/2.png";

var threeImg = new Image();
threeImg.src = "images/3.png";

var fourImg = new Image();
fourImg.src = "images/4.png";

var fiveImg = new Image();
fiveImg.src = "images/5.png";

var sixImg = new Image();
sixImg.src = "images/6.png";

var sevenImg = new Image();
sevenImg.src = "images/7.png";


var mineImg = new Image();
mineImg.src = "images/mine.png";

var qImg = new Image();
qImg.src = "images/question.png";

var fImg = new Image();
fImg.src = "images/flag.png";


var startTime = 0;

var time = function (){
if(startTime){	
	var cTime = new Date().getTime();
	var diff = (cTime - startTime)/1000;
	var min = "0"+String(Math.floor(diff/60));
	var sec = "0"+String(Math.floor(diff%60));
	
	document.getElementById("time").innerHTML = "Time " + min.substring(min.length - 2) + ":" + sec.substring(sec.length - 2);
	setTimeout(time, 1000);
}
}


var ini = function(){
	var Board = new board;
	Board.ini();
	document.getElementById("mines").innerHTML = "Mines " + Board.flaggedMines;
	
	startTime = new Date().getTime();	
	time();
	
	document.getElementById('canvas').onclick = function () {
		Board.mouse1();
		return false;
	}
	document.getElementById('canvas').oncontextmenu = function () {
		Board.mouse2();
		return false;
	}
}
