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

function blockRectangle(r1, r2, bounce)
{
  //Set bounce to a default value of false if it's not specified
  if(typeof bounce === "undefined")
  {
    bounce = false;
  }
  
  //A variable to tell us which side the 
  //collision is occurring on
  var collisionSide = "";
  
  //Calculate the distance vector
  var vx = r1.centerX() - r2.centerX();
  var vy = r1.centerY() - r2.centerY();
  
  //Figure out the combined half-widths and half-heights
  var combinedHalfWidths = r1.halfWidth() + r2.halfWidth();
  var combinedHalfHeights = r1.halfHeight() + r2.halfHeight();
    
  //Check whether vx is less than the combined half widths 
  if(Math.abs(vx) < combinedHalfWidths) 
  {
    //A collision might be occurring! 
    //Check whether vy is less than the combined half heights 
    if(Math.abs(vy) < combinedHalfHeights)
    {
      //A collision has occurred! This is good! 
      //Find out the size of the overlap on both the X and Y axes
      var overlapX = combinedHalfWidths - Math.abs(vx);
      var overlapY = combinedHalfHeights - Math.abs(vy);
        
      //The collision has occurred on the axis with the
      //*smallest* amount of overlap. Let's figure out which
      //axis that is
        
      if(overlapX >= overlapY)
      {
        //The collision is happening on the X axis 
        //But on which side? vy can tell us
        if(vy > 0)
        {
          collisionSide = "top";
            
          //Move the rectangle out of the collision
          r1.y = r1.y + overlapY;
        }
        else 
        {
          collisionSide = "bottom";
          
          //Move the rectangle out of the collision
          r1.y = r1.y - overlapY;
        }
    
        //Bounce
        if(bounce)
        {
          r1.vy *= -1;
		      
          /*Alternative
          //Find the bounce surface's vx and vy properties
          var s = {};
          s.vx = r2.x - r2.x + r2.width; 
          s.vy = 0;
		    
          //Bounce r1 off the surface
          //bounceOffSurface(r1, s);
          */
        }
      } 
      else 
      {
        //The collision is happening on the Y axis 
        //But on which side? vx can tell us
        if(vx > 0)
        {
          collisionSide = "left";
            
          //Move the rectangle out of the collision
          r1.x = r1.x + overlapX;
        }
        else 
        {
          collisionSide = "right";
            
          //Move the rectangle out of the collision
          r1.x = r1.x - overlapX;
        }
        
        //Bounce
        if(bounce)
        {
          r1.vx *= -1;
			    
          /*Alternative
          //Find the bounce surface's vx and vy properties
          var s = {};
          s.vx = 0; 
          s.vy = r2.y - r2.y + r2.height;
			    
          //Bounce r1 off the surface
          bounceOffSurface(r1, s);
          */
        }
      } 
    }
    else 
    {
      //No collision
      collisionSide = "none";
    }
  } 
  else 
  {
    //No collision
    collisionSide = "none";
  }
  
  return collisionSide;
}


//Use this to bounce an object off another object
function bounceOffSurface(o, s) {
  //1. Calculate the collision surface's properties
  
  //Find the surface vector's left normal
  s.lx = s.vy; 
  s.ly = -s.vx;
  //Find its magnitude
  s.magnitude = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
}
