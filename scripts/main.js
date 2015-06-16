// Game Canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var fps;	
var frameTotal = 0;
var fpsTotal = 0;
var avgFps = 0;

var metFpsCount = 0;
var randomMet;

var aniFpsCount = 0;


// Game States
var titleScreen = true;
var aboutScreen = false;
var selection = "play";

var openingAni = false;
var openingSeq = false;
var farmerTrig = false;
var farmCount = 0;

var gameStart = false;
var gamePaused = false;
var currentMap = "mapOne";
var currentBg;
var groundPosition;
var bgScroll = true;

var mapOneEnd = false;


// Title Screen
var title = new Image();
title.src = "images/title.png";
var about = new Image();
about.src = "images/about.png";
var selector = new Image();
selector.src = "images/selector.png";
var selectorLoc = 200;

// End Screen
var endScreen = new Image();
endScreen.src = "images/map_two/end.png";

// Sounds
var explosion = new Audio('sounds/explosion.wav');
var titleSound = new Audio('sounds/title.wav');
var hit = new Audio('sounds/hit.wav');
var select = new Audio('sounds/select.wav');

// Player States
var player = new Player();
var superJump = false;
var insideShip = false;


// Life Image
var life = new Image();
life.src = "images/square.png";

// HUD And Powerups
var hud = new Image();
hud.src = "images/hud.png";

var bootFlag = new Image();
bootFlag.src = "images/bootFlag.png";


// Backgrounds
var mapOne = new Background("images/map_one/sky.png", 4000);
var mapTwo = new Background("images/space.png", 3000);


// Opening Sequence Images
var pigOneImg = new Image();
pigOneImg.src = "images/map_one/pigProp.png";
var npcPigOne = new Backdrop(400, 415, 67, 48, pigOneImg)

var bubOneImg = new Image();
bubOneImg.src = "images/map_one/bubOne.png";
var npcBubOne = new Backdrop(400, 300, 150, 150, bubOneImg)

var pigOneImgTwo = new Image();
pigOneImgTwo.src = "images/map_one/pigProp.png";
var npcPigTwo = new Backdrop(400, 415, 67, 48, pigOneImg)

var bubTwoImg = new Image();
bubTwoImg.src = "images/map_one/bubTwo.png";
var npcBubTwo = new Backdrop(400, 300, 150, 150, bubTwoImg)

var farmerImg = new Image();
farmerImg.src = "images/map_one/farmer.png";
var farmer = new Backdrop(200, 160, 80, 300, farmerImg)

var bubThreeImg = new Image();
bubThreeImg.src = "images/map_one/bubThree.png";
var npcBubThree = new Backdrop(200, 80, 150, 150, bubThreeImg)

var postFence = new Image();
postFence.src = "images/map_one/postFence.png";


// Load mapOne Images
var mapOneGround = new Image();
mapOneGround.src = "images/map_one/ground2.png";

var groundAni = new Animation(4000, 40, 0, 0, 2, "images/map_one/groundAni.png", 2, 1, 2);
var pillarAni = new Animation(50, 250, 0, 0, 2, "images/map_one/lava.png", 2, 2, 1);


// Background offset - background.x + this amount
var mapOneOffset = new Array(0, 1850, 2200, 2350, 2650, 2850, 3375, 3700);
var mapTwoOffset = new Array(0, 300);


// Floor tile array
var floor = new Array();


// Meteor array and image
var meteor = new Array();
var meteorImg = new Image();
meteorImg.src = "images/map_one/meteor.png";

var meteorOffset = new Array();

var fenceMeteor = new Backdrop(0, 0, 32, 32, meteorImg);
fenceMeteor.rect.x = 900;
fenceMeteor.rect.y = -50;

var farmerMeteor = new Backdrop(0, 0, 32, 32, meteorImg);
farmerMeteor.rect.x = 500;
farmerMeteor.rect.y = -50;

// Generate meteors
function genMeteor() {
	metFpsCount++
	if (metFpsCount >= 45) {
		randomMet = ((player.rect.x - currentBg.x) - 200 + (Math.random() * 900));
		meteor.push(new Backdrop(0, 0, 32, 32, meteorImg));
		meteorOffset.push(randomMet);
		metFpsCount = 0;
	}
}

// Opening animation
var topTitle = new Rectangle(0, -250, 700, 250)
var bottomTitle = new Rectangle(0, 500, 700, 250);


// Opening barrier
var openingBlock = new Rectangle(1375, 0, 20, 500);


// Begin Map Code
// Map One
function LoadFirstMap() {

	// Background
	currentMap = "mapOne";
	currentBg = mapOne;


	// Floor tile array
	floor.push(new Rectangle(0, 460, 1780, 20));
	floor.push(new Rectangle(1850, 400, 200, 40));
	floor.push(new Rectangle(2200, 400, 100, 40));
	floor.push(new Rectangle(2350, 320, 200, 40));
	floor.push(new Rectangle(2650, 300, 100, 40));
	floor.push(new Rectangle(2850, 400, 400, 40));
	floor.push(new Rectangle(3375, 225, 100, 40));
	floor.push(new Rectangle(3700, 460, 300, 20));


	// Set floor color
	for (var i = 0; i < floor.length; i++)
		floor[i].color = new Color(100, 100, 100, 0);

		
	// Load mapOne Images
	var barnImg = new Image();
	barnImg.src = "images/map_one/barn.png";
	barn = new Backdrop((currentBg.x + 200), -340, 800, 800, barnImg);
	var fenceImg = new Image();
	fenceImg.src = "images/map_one/fence.png";
	fence = new Backdrop((currentBg.x), 360, 1400, 100, fenceImg);
	
	
	// Load mapOne Platforms
	var platOneImg = new Image();
	platOneImg.src = "images/map_one/platOne.png";
	platOne = new Backdrop((currentBg.x), 400, 200, 100, platOneImg);
		
	var platTwoImg = new Image();
	platTwoImg.src = "images/map_one/platTwo.png";
	platTwo = new Backdrop((currentBg.x), 400, 100, 100, platTwoImg);
	
	var platThreeImg = new Image();
	platThreeImg.src = "images/map_one/platThree.png";
	platThree = new Backdrop((currentBg.x), 320, 200, 180, platThreeImg);
	
	var platFourImg = new Image();
	platFourImg.src = "images/map_one/platFour.png";
	platFour = new Backdrop((currentBg.x), 300, 100, 200, platFourImg);
	
	var platFiveImg = new Image();
	platFiveImg.src = "images/map_one/platFive.png";
	platFive = new Backdrop((currentBg.x), 400, 400, 100, platFiveImg);
		
	var platSixImg = new Image();
	platSixImg.src = "images/map_one/platSix.png";
	platSix = new Backdrop((currentBg.x), 225, 100, 40, platSixImg);
		
		
	// Set pickups
	star = new Pickup((currentBg.x + 1420), 350, 40, 40);
	star.SetProperties("star");
	heart = new Pickup((currentBg.x + 1420), 400, 40, 40);
	heart.SetProperties("heart");
	ship = new Pickup((currentBg.x + 1420), 420, 40, 40);
	ship.SetProperties("ship");
	
}

// Map 2
function LoadSecondMap() {
	insideShip = false;
	floor.Clear();
	
	// Background
	currentMap = "mapTwo";
	currentBg = mapTwo;
	
	
	// Set Player Location
	player.SetPosition(20, 300);
	
	
	// Set Pickups
	star.SetPosition(600,600);
	heart.SetPosition(600,460);
	ship.SetPosition(600,600);
	
	
	// Clear Powerups
	superJump = false;

	
	// Floor tile array
	floor.push(new Rectangle(0, 430, 200, 20));
	floor.push(new Rectangle(0, 350, 2700, 20));
	

	// Set floor color
	for (var i = 0; i < floor.length; i++)
		floor[i].color = new Color(80, 80, 80, 1);
	
}

LoadFirstMap();
// Update function
var Update = setInterval(function() {

	if (gameStart == true) {
	
		// Begin Map Code
		// Map One
		if (currentMap == "mapOne") {
		
			// Opening barrier
			openingBlock.x = currentBg.x + 1375;
			if (player.rect.Intersects(openingBlock) && openingSeq == true) {
				player.movingRight = false;
				farmerTrig = true;
			}
			
			// Update the platforms
			for (var i = 0; i < floor.length; i++) {
				floor[i].x = (mapOne.x) + mapOneOffset[i];
			}
			
			if (player.rect.Intersects(floor[4])) {
				floor[4].y += 0.4;
				platFour.rect.y += 0.4;
			}
			
			// Update meteors
				for (var j = 0; j < meteor.length; j++) {
					meteor[j].rect.y += Math.random() * 2;
					meteorOffset[j] -= Math.random() * 2;
					meteor[j].rect.x = (mapOne.x) + meteorOffset[j]; 
					
					// Check Meteor Death
					if (player.rect.Intersects(meteor[j].rect)) {
						if (player.lives <= 0) {
							currentBg.x = 0;
							player.SetPosition(20, 400);
							player.lives = 4;
						}
						meteor[j].rect.y = 600;
						hit.currentTime = 0;
						hit.play();
						player.lives -= 1;
					}
				}
				
			// Update the backdrops
			barn.rect.x = currentBg.x + 200;
			fence.rect.x = currentBg.x;
				
				
			// Update the paltforms
			platOne.rect.x = currentBg.x + mapOneOffset[1];
			platTwo.rect.x = currentBg.x + mapOneOffset[2];
			platThree.rect.x = currentBg.x + mapOneOffset[3];
			platFour.rect.x = currentBg.x + mapOneOffset[4];
			platFive.rect.x = currentBg.x + mapOneOffset[5];
			platSix.rect.x = currentBg.x + mapOneOffset[6];
			
			
			// Update pickups
			star.rect.x = currentBg.x + 3150;
			heart.rect.x = currentBg.x + 1600;
			ship.rect.x = currentBg.x + 3800;
			
			
			// Map One Animations
			groundAni.position.x = currentBg.x;
			groundAni.position.y = 460;
			
			pillarAni.position.x = currentBg.x + 3400;
			pillarAni.position.y = 230;
			
			groundAni.Update();
			pillarAni.Update();
			
			
			// Opening Images
			npcPigOne.rect.x = currentBg.x + 400;
			npcBubOne.rect.x = currentBg.x + 400;
			npcPigTwo.rect.x = currentBg.x + 800;
			npcBubTwo.rect.x = currentBg.x + 800;
			farmer.rect.x = currentBg.x + 800;
			npcBubThree.rect.x = currentBg.x + 800;
		}
	
		// Map Two
		if (currentMap == "mapTwo") {
			
			
			// Update the platforms
			for (var i = 0; i < floor.length; i++)
				floor[i].x = mapTwo.x + mapTwoOffset[i];
				
				
			// Update pickups
			star.rect.x = currentBg.x + 1450;
			heart.rect.x = currentBg.x + 30;
		}
		
		
		// Pickup Collision && Properties
		if (heart.rect.Intersects(player.rect)) {
			player.lives++;
			heart.rect.y = 600;
			select.currentTime = 0;
			select.play();
		}
		if (star.rect.Intersects(player.rect)) {
			superJump = true;
			star.rect.y = 600;
			select.currentTime = 0;
			select.play();
		}
		if (ship.rect.Intersects(player.rect)) {
			insideShip = true;
			player.rect.x = ship.rect.x;
			player.rect.y = ship.rect.y;
			ship.rect.y -= 1;
			if (ship.rect.y < -20)
				mapOneEnd = true;
		}
		
		
		// Platform Collision 
		var collided = false;
		bgScroll = true;
		for (var i = 0; i < floor.length; i++) {
			
			if (floor[i].Intersects(player.rect) && player.rect.y + (player.rect.height / 2) <= floor[i].y) {
				player.SetPosition(null, floor[i].y - player.rect.height);
				player.jumpAvailable = true;
				collided = true;
				break;
			}
			
			else if (floor[i].Intersects(player.rect) && player.rect.y > floor[i].y) {
				player.SetPosition(null, floor[i].y + floor[i].height);
			}
		}
		
		
		// Movement and Bounds Collision 
		if (player.movingLeft === true && (currentBg.x < 0 && player.rect.x <= 220))
			currentBg.x += 1;
		if (player.movingLeft === true && (currentBg.x >= 0 || player.rect.x > 220))
			if (player.rect.x > currentBg.x) 
				player.rect.x -= 1;
		if (player.movingRight === true && player.rect.x >= 220 && currentBg.x > ((currentBg.width * -1) + 700) && bgScroll == true)
			currentBg.x -= 1;
		if (player.movingRight === true && (player.rect.x < 220 || currentBg.x <= ((currentBg.width * -1) + 700)))
			if (player.rect.x + player.rect.width < 700)
				player.rect.x += 1;
				
				
		// Checks jump availability
		if (!collided)
			player.jumpAvailable = false;
			
			
		// Check Falling Death
		if (player.rect.y + player.rect.height > 500) {
			currentBg.x = 0;
			player.SetPosition(20, 400);
			player.lives = 3;
		}

	}
	
	
	// Title Screen
	if (titleScreen == true) {
		if (selection == "play") {
			selectorLoc = 135;
			if (input.enter) {
				select.currentTime = 0;
				select.play();
				gameStart = false;
				titleScreen = false;
				openingAni = true;
				//menuSelect.play();
			} else if (input.right)
				selection = "about";
		}
		
		if (selection == "about") {
			selectorLoc = 328;
			if (input.enter) {
				select.currentTime = 0;
				select.play();
				titleScreen = false;
				aboutScreen = true;
			} else if (input.left)
				selection = "play";
		}
	}
	
	
	// About Screen
	if (aboutScreen == true) {
		if (input.b) {
			aboutScreen = false
			titleScreen = true;
		}
	}
	
	// Opening Animation
	if (openingAni == true) {
		topTitle.color = new Color(0, 0, 0, 1);
		bottomTitle.color = new Color(0, 0, 0, 1);
		aniFpsCount += 1;
		if (aniFpsCount >= 1) {
			topTitle.y += 1;
			bottomTitle.y -= 1;
			aniFpsCount = 0;
		}
		
		if (topTitle.y == 250) {
			openingAni = false;
			gameStart = true;
			openingSeq = true;
		}
	}
	
	if (titleScreen == false && aboutScreen == false && openingAni == false)
		player.Update();
}, 1);



(function(){
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	
	window.requestAnimationFrame = requestAnimationFrame;
})();
var requestId = 0;



// Drawing loop
var lastLoop = new Date;
function Draw()
{	
	if (gameStart == true) {
		// fps calculator 
		var thisLoop = new Date;
		fps = Math.round(1000 / (thisLoop - lastLoop));
		lastLoop = thisLoop;
		frameTotal++;
		fpsTotal += fps;
		avgFps = Math.round(fpsTotal / frameTotal);

		
		// Redraw and Current background
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		currentBg.Draw(ctx);
		
		
		// Draw floor tiles
		for (var i = 0; i < floor.length; i++)
			floor[i].Draw(ctx);
		
			
		// Draw backdrop + platforms
		if (currentMap == "mapOne") {
			groundAni.Draw(ctx);
			pillarAni.Draw(ctx);
			barn.Draw(ctx);
			platOne.Draw(ctx);
			platTwo.Draw(ctx);
			platThree.Draw(ctx);
			platFour.Draw(ctx);
			platFive.Draw(ctx);
			platSix.Draw(ctx);
		}
		
		// Draws Pickups
		star.Draw(ctx);
		heart.Draw(ctx);
		ship.Draw(ctx);
		
		
		// Draw meteor tiles
		for (var i = 0; i < meteor.length; i++)
			meteor[i].Draw(ctx);
		
		
		// Draw Player
		if (!insideShip)
			player.Draw(ctx);
			
			
		// Opening sequence Behind Fence
		if (openingSeq == true && farmerTrig == false) {
			npcPigOne.Draw(ctx);
			npcPigTwo.Draw(ctx);
		}
		if (openingSeq == true && farmerTrig == true) {
			farmer.Draw(ctx);
		}
		
			
		// Draw foreground
		// mapOne
		if (currentMap == "mapOne")
			fence.Draw(ctx);
		
		// Opening Sequence Over Fence
		if (openingSeq == true && player.rect.Intersects(npcPigOne.rect) && farmerTrig == false) {
			npcBubOne.Draw(ctx);
		}
		if (openingSeq == true && player.rect.Intersects(npcPigTwo.rect) && farmerTrig == false) {
			npcBubTwo.Draw(ctx);
		}
		if (openingSeq == true && player.rect.Intersects(farmer.rect) && farmerTrig == true) {
			var fenceFlag = false;
			npcBubThree.Draw(ctx);
			player.moveFreeze = true;
			farmCount++
			
			if (fenceMeteor.rect.Intersects(fence.rect) == false) {
				fenceMeteor.rect.y += 4
				fenceMeteor.rect.x -= 4
				fenceMeteor.Draw(ctx);
			} else {
				fence.changeImg(postFence);
				fenceFlag = true;
				explosion.play();
				fenceMeteor.rect.x = 600;
			}
			
			if (fenceFlag == true) {
				farmerMeteor.rect.y += 4
				farmerMeteor.rect.x -= 4
				farmerMeteor.Draw(ctx);
			}
			
			if (farmer.rect.Intersects(farmerMeteor.rect)) {
				farmerTrig = false;
				openingSeq = false;
				player.moveFreeze = false;
				explosion.currentTime = 0;
				explosion.play();
			}
		}
		
		// HUD Display
		ctx.drawImage(hud, 100, 5);
		
		
		// Begin meteors
		if ((currentBg.x <= -1500 && currentBg.x >= -3200) && !insideShip)
			genMeteor();
		
		
		// Displays Powerup Info
		if (superJump == true) {
			ctx.drawImage(bootFlag, 475, 11);
			player.JUMP_MAX = 2.8;
		} else {
			player.JUMP_MAX = 1.8;
		}


		// Life Display
		if (player.lives > 0) {
			ctx.drawImage(life, 223, 18);
			if (player.lives > 1) {
				ctx.drawImage(life, 238, 18);
				if (player.lives > 2) {
					ctx.drawImage(life, 253, 18);
					if (player.lives > 3) {
						ctx.drawImage(life, 268, 18);
					}
				}
			}
				
		}
	}
	
	
	// Title screen
	if (titleScreen == true) {
		ctx.drawImage(title, 0, 0);
		ctx.drawImage(selector, selectorLoc, 412);
	}
	
	// About screen
	if (aboutScreen == true) {
		ctx.drawImage(about, 0, 0);
	}
	
	// Opening animation
	if (openingAni == true) {
		topTitle.Draw(ctx);
		bottomTitle.Draw(ctx);
	}
	
	// Ending
	if (mapOneEnd == true) {
		ctx.drawImage(endScreen, 0, 0);
	}
	
	requestId = window.requestAnimationFrame(Draw);
}



function Start()
{
	requestId = window.requestAnimationFrame(Draw);
	
	gamePaused = false;
}



function Stop()
{
	gamePause = true;
	if (requestId)
		window.cancelAnimationFrame(requestId);
	
	requestId = 0;
}

Start();
/*
// Touch Input
var element = document.getElementById('jump');
var hammertime = Hammer(element).on("tap", function(event) {
	gameStart = true;
	titleScreen = false;
	player.Jump();
});

var element = document.getElementById('left');
var hammertime = Hammer(element).on("hold", function(event) {
	player.animation.SetRow(1);
	player.moving = true;
	player.movingLeft = true;
	player.lookinRight = false;
});

var element = document.getElementById('right');
var hammertime = Hammer(element).on("hold", function(event) {
	player.animation.SetRow(0);
	player.movingRight = true;
	player.moving = true;
	player.lookinRight = true;
});
*/
