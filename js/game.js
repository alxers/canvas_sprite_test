;(function() {
  let spriteObject = {
    // The 'x' any 'y' source position of the sprite's image and its height and width
    sourceX: 0,
    sourceY: 0,
    sourceWidth: 64,
    sourceHeight: 64,

    // The 'x' and 'y' position of the sprite on the canvas and its height and width
    x: 0,
    y: 0,
    width: 64,
    height: 64,

    vx: 0,
    vy: 0
  };

  // Canvas and context
  let canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');

  // An array to store the game sprites
  let sprites = [];

  // Create sprites
  // Center it on the canvas
  let obj = Object.create(spriteObject);
  obj.x = canvas.height / 2 - obj.height / 2;
  obj.y = canvas.width / 2 - obj.width / 2;
  sprites.push(obj);

  // Load sprite image
  let image = new Image();
  image.addEventListener('load', loadHandler, false);
  image.src = 'sprites/obj.png';

  // Arrow key codes
  const UP = 38;
  const DOWN = 40;
  const RIGHT = 39;
  const LEFT = 37;

  // Directions
  let moveUp = false;
  let moveDown = false;
  let moveRight = false;
  let moveLeft = false;

  // Keyboard listeners
  window.addEventListener('keydown', function(e) {
    switch(e.keyCode) {
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
  }, false)

  window.addEventListener('keyup', function(e) {
    switch(e.keyCode) {
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
  }, false)

  function loadHandler() {
    // Update the sprite as soon as the image has been loaded
    update();
  }

  function update() {
    // Create animation loop
    window.requestAnimationFrame(update, canvas);

    obj.x++;

    // Render the animation
    render();
  }

  function render() {
    // Clear previous
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Loop through all the sprites and use their properties to display them
    sprites.map(function(sprite) {
      ctx.drawImage(
        image,
        sprite.sourceX, sprite.sourceY,
        sprite.sourceWidth, sprite.sourceHeight,
        Math.floor(sprite.x), Math.floor(sprite.y),
        sprite.width, sprite.height
      )
    });
  }
})()
