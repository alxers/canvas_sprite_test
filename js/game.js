

//--- The sprite object

var spriteObject =
{
  sourceX: 0,
  sourceY: 0,
  sourceWidth: 64,
  sourceHeight: 64,
  width: 64,
  height: 64,
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,

  //Getters
  centerX: function()
  {
    return this.x + (this.width / 2);
  },
  centerY: function()
  {
    return this.y + (this.height / 2);
  },
  halfWidth: function()
  {
    return this.width / 2;
  },
  halfHeight: function()
  {
    return this.height / 2;
  }
};

//--- The main program

//The canvas and its drawing surface
var canvas = document.querySelector("canvas");
var drawingSurface = canvas.getContext("2d");

//An array to store the sprites
var sprites = [];

//Create the redCircle circle
var redCircle = Object.create(spriteObject);
redCircle.x = 350;
redCircle.y = 100;
redCircle.height = 100;
redCircle.width = 100;
sprites.push(redCircle);

//Create the blueCircle circle
var blueCircle = Object.create(spriteObject);
blueCircle.sourceX = 64;
blueCircle.x = 150;
blueCircle.y = 250;
sprites.push(blueCircle);

//Load the image
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "sprites/circles.png";

//Arrow key codes
var UP = 38;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37;

//Directions
var moveUp = false;
var moveDown = false;
var moveRight = false;
var moveLeft = false;

//Add keyboard listeners
window.addEventListener("keydown", function(event)
{
  switch(event.keyCode)
  {
    case UP:
	    moveUp = true;
	    break;

	  case DOWN:
	    moveDown = true;
	    break;

	  case LEFT:
	    moveLeft = true;
	    break;

	  case RIGHT:
	    moveRight = true;
	    break;
  }
}, false);

window.addEventListener("keyup", function(event)
{
  switch(event.keyCode)
  {
    case UP:
	    moveUp = false;
	    break;

	  case DOWN:
	    moveDown = false;
	    break;

	  case LEFT:
	    moveLeft = false;
	    break;

	  case RIGHT:
	    moveRight = false;
	    break;
  }
}, false);

function loadHandler()
{
  update();
}

function update()
{
  //The animation loop
  requestAnimationFrame(update, canvas);

  //Up
  if(moveUp && !moveDown)
  {
    blueCircle.vy = -5;
  }
  //Down
  if(moveDown && !moveUp)
  {
    blueCircle.vy = 5;
  }
  //Left
  if(moveLeft && !moveRight)
  {
    blueCircle.vx = -5;
  }
  //Right
  if(moveRight && !moveLeft)
  {
    blueCircle.vx = 5;
  }

  //Set the blueCircle's velocity to zero if none of the keys are being pressed
  if(!moveUp && !moveDown)
  {
    blueCircle.vy = 0;
  }
  if(!moveLeft && !moveRight)
  {
    blueCircle.vx = 0;
  }

  //Move the blueCircle circle
  blueCircle.x += blueCircle.vx;
  blueCircle.y += blueCircle.vy;

  //Use hitTestCircle to check for a collision and
  //return the result (true or false) to the collision variable
  blockCircle(blueCircle, redCircle);

  //Render the sprites
  render();
}

function blockCircle(c1, c2)
{
  //Calculate the vector between the circles’ center points
  var vx = c1.centerX() - c2.centerX();
  var vy = c1.centerY() - c2.centerY();

  //Find the distance between the circles by calculating
  //the vector's magnitude (how long the vector is)
  var magnitude = Math.sqrt(vx * vx + vy * vy);

  //Add together the circles' combined half-widths
  var totalRadii = c1.halfWidth() + c2.halfWidth();

  //Figure out if there's a collision
  if(magnitude < totalRadii)
  {
    //Yes, a collision is happening.
    //Find the amount of overlap between the circles
    var overlap = totalRadii - magnitude;

    //Normalize the vector.
    //These numbers tell us the direction of the collision
    dx = vx / magnitude;
    dy = vy / magnitude;
debugger
    //Move circle 1 out of the collision by multiplying
    //the overlap with the normalized vector and add it to
    //circle 1's position
    c1.x += overlap * dx;
    c1.y += overlap * dy;
  }
}

function render(event)
{
  drawingSurface.clearRect(0, 0, canvas.width, canvas.height);

  if(sprites.length !== 0)
  {
    for(var i = 0; i < sprites.length; i++)
    {
      var sprite = sprites[i];
      drawingSurface.drawImage
      (
        image,
        sprite.sourceX, sprite.sourceY,
        sprite.sourceWidth, sprite.sourceHeight,
        Math.floor(sprite.x), Math.floor(sprite.y),
        sprite.width, sprite.height
      );
    }
  }
}
