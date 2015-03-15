/*
* Definition for Bullet class
*/
function Bullet() {
  this.point = Point.random();
  this.point.x *= view.size.width;
  this.point.y *= view.size.height;

  this.vector = new Point({
    angle: 360 * Math.random(),
    length: this.speed
  });

  this.bullet = new Path.Circle({
    x: this.point.x,
    y: this.point.y
  }, this.radius);
  this.bullet.fillColor = 'red';
}

Bullet.prototype = {
  speed: 3,
  radius: 3
};

/**
* Runs every onFrame event
* @param xpr obj
* @param balls arr
*/
Bullet.prototype.iterate = function() {
    this.checkBorders();
    this.move();
};

/**
* Checks for a border collision
*/
Bullet.prototype.checkBorders = function() {
    size = view.size;

    if(this.point.x < this.radius) {
      this.point.x = this.radius;
      this.vector.x = -this.vector.x;
    }
    if(this.point.x > size.width - this.radius) {
      this.point.x = size.width - this.radius;
      this.vector.x = -this.vector.x;
    }
    if(this.point.y < this.radius) {
      this.point.y = this.radius;
      this.vector.y = -this.vector.y;
    }
    if(this.point.y > size.height - this.radius) {
      this.point.y = size.height - this.radius;
      this.vector.y = -this.vector.y;
    }
};

/**
* Moves via vector
*/
Bullet.prototype.move = function() {
    this.point.x += this.vector.x;
    this.point.y += this.vector.y;

    this.bullet.position = {
      x: this.point.x,
      y: this.point.y
    };
};

/**
* can update bullet vector from outside object
*/
Bullet.prototype.updateVector = function(ball) {
/*    var angle = Math.atan2(ball.position.x - this.point.x, ball.position.y - this.point.y),
        targetX = this.point.x + Math.cos(angle) * (this.radius + ball.bounds.width/2),
        targetY = this.point.y + Math.sin(angle) * (this.radius + ball.bounds.width/2),
        ax = (targetX - ball.position.x),
        ay = (targetY - ball.position.y);

        console.log('oldV = ' + this.vector.x + ':' + this.vector.y);
        console.log('newV = ' + ax + ':' + ay);

    this.vector.x -= ax/10;
    this.vector.y -= ay/10;*/

    this.vector.x *= -1;
    this.vector.y *= -1;

    //this.move();


    /*float distance = dist(posX, posY, circle[n].posX, circle[n].posY);
      if (distance < (radius + circle[n].dpSize/2)) {
        float angle = atan2(circle[n].posY - posY, circle[n].posX - posX);
        float targetX = posX + cos(angle) * (radius + circle[n].dpSize/2);
        float targetY = posY + sin(angle) * (radius + circle[n].dpSize/2);
        float ax = (targetX - circle[n].posX)*2;
        float ay = (targetY - circle[n].posY)*2;
        speedX -= ax;
        speedY -= ay;
        speedX = speedX*0.8;
        speedY = speedY*0.8;*/
};


/**
* Checks for a hit on an expander or ball
* @param item obj
*/
Bullet.prototype.itemHit = function(item) {
    return this.bullet.intersects(item);
};