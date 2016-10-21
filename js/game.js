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
    height: 64
  };

  // Canvas and context
  let canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');

  // An array to store the game sprites
  let sprites = [];

  // Create sprites
  // Center it on the canvas
  let obj = Object.create(spriteObject);
  obj.x = 0
  obj.y = 168;
  sprites.push(obj);

  // Load sprite image
  let image = new Image();
  image.addEventListener('load', loadHandler, false);
  image.src = 'sprites/obj.png';

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
