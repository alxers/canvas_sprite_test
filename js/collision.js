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
