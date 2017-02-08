// TODO: Add  bounce

function hitTestPoint(pointX, pointY, sprite) {
  return (pointX > sprite.left() &&
          pointX < sprite.right() &&
          pointY > sprite.top() &&
          pointY < sprite.bottom())
}

function hitTestCircle(c1, c2) {
  // Distance between the circles' center points
  let vectorX = c1.centerX() - c2.centerX();
  let vectorY = c1.centerY() - c2.centerY();

  // Vector's magnitude
  let magnitude = Math.sqrt(vectorX * vectorX + vectorY * vectorY);

  let totalRadii = c1.halfWidth() + c2.halfWidth();

  // Collision if the distance between the circles is less than their total radii
  return magnitude < totalRadii;
}

function blockCircle(c1, c2) {
  let vectorX = c1.centerX() - c2.centerX();
  let vectorY = c1.centerY() - c2.centerY();

  // Vector's magnitude
  let magnitude = Math.sqrt(vectorX * vectorX + vectorY * vectorY);

  let totalRadii = c1.halfWidth() + c2.halfWidth();

  if (magnitude < totalRadii) {
    // Collision is happening
    // Find the amount of overlap between the circles
    let overlap = totalRadii - magnitude;

    // Normalize the vector
    // The direction of the Collision
    dx = vectorX / magnitude;
    dy = vectorY / magnitude;

    // Move circle 1 out of the collision
    c1.x += overlap * dx;
    c1.y += overlap * dy;
  }
}

function hitTestRectangle(r1, r2) {

  // Calculate the distance vector
  let vx = r1.centerX() - r2.centerX();
  let vy = r1.centerY() - r2.centerY();

  let combinedHalfWidths = r1.halfWidth() + r2.halfWidth();
  let combinedHalfHeights = r1.halfHeight() + r2.halfHeight();

  // Check for collison on the X axis
  if (Math.abs(vx) < combinedHalfWidths) {
    // Check for collision on the Y axis
    if (Math.abs(vy) < combinedHalfHeights) {
      // Collision is happening
      return true;
    }
  }
}

// blockRectangle

function blockRectangle(r1, r2, bounce) {
  // Set bounce to a default value of false if it's not specified
  if(typeof bounce === "undefined") {
    bounce = false;
  }
  
  var collisionSide = "";
  
  // Calculate the distance vector
  var vx = r1.centerX() - r2.centerX();
  var vy = r1.centerY() - r2.centerY();
  
  // Combined half-widths and half-heights
  var combinedHalfWidths = r1.halfWidth() + r2.halfWidth();
  var combinedHalfHeights = r1.halfHeight() + r2.halfHeight();
}
