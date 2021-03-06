// Original game from:
// http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
// Slight modifications by Gregorio Robles <grex@gsyc.urjc.es>
// to meet the criteria of a canvas class for DAT @ Univ. Rey Juan Carlos

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// princess image
var princessReady = false;
var princessImage = new Image();
princessImage.onload = function () {
	princessReady = true;
};
princessImage.src = "images/princess.png";

//stone image
var stoneReady = false;
var stoneImage = new Image();
stoneImage.onload = function () {
	stoneReady = true;
};
stoneImage.src = "images/stone.png";

//monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var princess = {};
var princessesCaught = 0;
var stone = {
};
var stonesArray = {
    array: [],
    number: 1
}
var monster = {
    speed: 32
};

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

var i;
// Reset the game when the player catches a princess
var reset = function () {
    console.log("hola caracola")
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the princess somewhere on the screen randomly
	princess.x = 32 + (Math.random() * (canvas.width - 96));
	princess.y = 32 + (Math.random() * (canvas.height - 96));
    
    do {
        monster.x = 32 + (Math.random() * (canvas.width - 96));
	    monster.y = 32 + (Math.random() * (canvas.height - 96));
    } while( ((princess.y > monster.y-32 && princess.y < monster.y+32) && (princess.x > monster.x-32 && princess.x < monster.x+32)) || ((hero.y > monster.y-100 && hero.y < monster.y+100) && (hero.x > monster.x-100 && hero.x < monster.x+100)) )

    for (i = 0; i < stonesArray.number; i++) { 
        console.log("entro en el array number: " + stonesArray.number);
        do {
            stone.x = 32 + (Math.random() * (canvas.width - 96));
	        stone.y = 32 + (Math.random() * (canvas.height - 96));
            
        } while( ((princess.y > stone.y-32 && princess.y < stone.y+32) && (princess.x > stone.x-32 && princess.x < stone.x+32)) || ((hero.y > stone.y-32 && hero.y < stone.y+32) && (hero.x > stone.x-32 && hero.x < stone.x+32)) || ((monster.y > stone.y-32 && monster.y < stone.y+32) && (monster.x > stone.x-32 && monster.x < stone.x+32)) )
        (function(s){
                stonesArray.array.push(function () { return {x: s.x,y:s.y} }());
        }(stone))
    } 
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
        var yAux = hero.y;
		hero.y -= hero.speed * modifier;
        if(hero.y < 32){
            hero.y = 32;
        }
        for (i=0;i<stonesArray.array.length;i++){
            if ( (hero.y >= stonesArray.array[i].y-32 && hero.y <= stonesArray.array[i].y+32) && (hero.x >= stonesArray.array[i].x-32 && hero.x <= stonesArray.array[i].x+32) ){
                hero.y = yAux;
            }
        }
	}
	if (40 in keysDown) { // Player holding down
        var yAux = hero.y;
		hero.y += hero.speed * modifier;
        if(hero.y > canvas.height - 64){
            hero.y = canvas.height - 64;
        }
        for (i=0;i<stonesArray.array.length;i++){
            if ( (hero.y >= stonesArray.array[i].y-32 && hero.y <= stonesArray.array[i].y+32) && (hero.x >= stonesArray.array[i].x-32 && hero.x <= stonesArray.array[i].x+32) ){
                hero.y = yAux;
            }
        }
	}
	if (37 in keysDown) { // Player holding left
        var xAux = hero.x;
		hero.x -= hero.speed * modifier;
        if(hero.x < 32){
            hero.x = 32;
        }
        for (i=0;i<stonesArray.array.length;i++){
            if ( (hero.y >= stonesArray.array[i].y-32 && hero.y <= stonesArray.array[i].y+32) && (hero.x >= stonesArray.array[i].x-32 && hero.x <= stonesArray.array[i].x+32) ){
                hero.x = xAux;
            }
        }
	}
	if (39 in keysDown) { // Player holding right
        var xAux = hero.x;
		hero.x += hero.speed * modifier;
        if(hero.x > canvas.width - 64){
            hero.x = canvas.width - 64;
        }
        for (i=0;i<stonesArray.array.length;i++){
            if ( (hero.y >= stonesArray.array[i].y-32 && hero.y <= stonesArray.array[i].y+32) && (hero.x >= stonesArray.array[i].x-32 && hero.x <= stonesArray.array[i].x+32) ){
                hero.x = xAux;
            }
        }
	}

        var xAuxMonster = monster.x;
        var yAuxMonster = monster.y;
        var diferenciaX = monster.x - hero.x;
        var diferenciaY = monster.y - hero.y;
        if(diferenciaX > 0){
            monster.x -= monster.speed * modifier;
        }else{
            monster.x += monster.speed * modifier;
        }
        if(diferenciaY > 0){
            monster.y -= monster.speed * modifier;
        }else{
            monster.y += monster.speed * modifier;
        }
        for (i=0;i<stonesArray.array.length;i++){
            if ( (monster.x > stonesArray.array[i].x-32 && monster.x < stonesArray.array[i].x+32) && (monster.y > stonesArray.array[i].y-32 && monster.y < stonesArray.array[i].y+32) ){
                monster.x = xAuxMonster;
            }
            if ( (monster.x > stonesArray.array[i].x-32 && monster.x < stonesArray.array[i].x+32) && (monster.y > stonesArray.array[i].y-32 && monster.y < stonesArray.array[i].y+32) ){
                monster.y = yAuxMonster;
            }
        }

	// Are they touching?
	if (
		hero.x <= (princess.x + 16)
		&& princess.x <= (hero.x + 16)
		&& hero.y <= (princess.y + 16)
		&& princess.y <= (hero.y + 32)
	) {
		++princessesCaught;
        var aux = stonesArray.number;
        stonesArray.number = Math.floor(princessesCaught/10) +1;
        if (stonesArray.number > aux){
            monster.speed += 10;
        }
        stonesArray.array = [];
		reset();
	}

   if (
		hero.x <= (monster.x + 16)
		&& monster.x <= (hero.x + 16)
		&& hero.y <= (monster.y + 16)
		&& monster.y <= (hero.y + 32)
	) {
		princessesCaught = 0;
        stonesArray.number = 1;
        monster.speed = 32;
        stonesArray.array = [];
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (princessReady) {
		ctx.drawImage(princessImage, princess.x, princess.y);
	}
    if (stoneReady) {
        for (i = 0; i < stonesArray.number; i++) { 
            console.log("dibuja "+ i);
            ctx.drawImage(stoneImage, stonesArray.array[i].x, stonesArray.array[i].y);
            console.log("dibujo en " + stonesArray.array[i].x + " " + stonesArray.array[i].y);
        }
    }
    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Princesses caught: " + princessesCaught, 32, 32);
};

// The main game loop
var main = function () {
    console.log(stonesArray.number);
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's play this game!
reset();
var then = Date.now();
//The setInterval() method will wait a specified number of milliseconds, and then execute a specified function, and it will continue to execute the function, once at every given time-interval.
//Syntax: setInterval("javascript function",milliseconds);
setInterval(main, 1); // Execute as fast as possible
