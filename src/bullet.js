function Bullet() {
  var size = view.size,
    speed = 4;

  this.radius = 4;
  this.point = Point.random();
  this.point.x = this.point.x * size.width;
  this.point.y = this.point.y * size.height;

  this.vector = new Point({
    angle: 360 * Math.random(),
    length: speed
  });


  this.circle = new Path.Circle({
    x: this.point.x,
    y: this.point.y
  }, this.radius);
  this.circle.fillColor = 'red';
}

Bullet.prototype = {
  iterate: function() {
    this.checkBorders();
    this.move();
  },
  checkBorders: function() {
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
  },
  move: function() {
    this.point.x += this.vector.x;
    this.point.y += this.vector.y;

    this.circle.position = {
      x:this.point.x,
      y:this.point.y
    };
  }
};