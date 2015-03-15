/*
* Definition for Ball class
* @param expander obj
*/
function Ball(expander) {
	var xpr = expander;

  this.point = xpr.mousePoint;
	this.ball = new Path.Circle({
					x: this.point.x,
					y: this.point.y
				}, xpr.expander.bounds.width / 2);
	this.ball.strokeColor = '#eee';
	this.ball.strokeWidth = 1;
}

Ball.prototype = {
	iterate: function() {
	},
	/*checkBorders: function() {
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
	}*/
};;/*
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
};;/*
* class definition for Expander obj
* @param event Event obj
*/
function Expander(event) {
	this.mousePoint = event.point;

	this.expander = new Path.Circle({
					x: this.mousePoint.x,
					y: this.mousePoint.y
				}, this.initialWidth);
	//this.expander.fillColor = '#7fddc0';
	this.expander.strokeColor = '#eee';
	this.expander.strokeWidth = 1;
}

Expander.prototype = {
	baseScale: 1,
	shrinkScale: 0.95,
	initialWidth: 5
};

/**
* Runs every onFrame event
*/
Expander.prototype.iterate = function() {
	this.checkBorders();
	this.move();
	//@todo don't expand if touching a ball
	//@todo if hit by a bullet, pop animation
};

/**
* check that expander is within the bounds of the screen
*/
Expander.prototype.checkBorders = function() {
	var size = view.size,
		bounds = this.expander.bounds;

	//1px buffer to reduce jitter
	if(bounds.x > 1 && bounds.y > 1 && bounds.x + bounds.width < size.width-1 && bounds.y + bounds.height < size.height-1) {
		this.expand();
	}
	else if(bounds.x < 0 || bounds.y < 0 || bounds.x + bounds.width > size.width || bounds.y + bounds.height > size.height) {
		this.reduce();
	}
};

/**
* check collisions between bullets and balls
*/
/*Expander.prototype.checkCollisions = function() {
	bullets.forEach(function(bullet){
		if()
	});
};*/

/**
* pop animation when bullet hits expander
*/
Expander.prototype.pop = function() {

};

/**
* increase expander size if in the open
*/
Expander.prototype.expand = function() {
	//scale is inverse size
	var radius = this.expander.bounds.width / 2,
		scale = this.baseScale + (this.baseScale / radius);
	this.expander.scale(scale);
};

/**
* Decrease expander size when hitting a ball or boundary
*/
Expander.prototype.reduce = function() {
	this.expander.scale(this.shrinkScale);
};

/**
* Move expander coordinates on mouseDrag
* @todo move mouseDrag method inside this class
*/
Expander.prototype.move = function() {
	this.expander.position = this.mousePoint;
};
;/*EXPANDERS*/
//@todo expanders *pop* when hit by bullet
//@todo expanders respect dropped balls

/*BULLETS*/
//@todo bullets bounce off dropped balls

/*BALLS*/

/*BONUS*/
// @todo bullets increase speed with level/hardness
// @todo bullets bounce velocity has tolerance that can make the bullet unweildy to track
// @todo add powerups that are achieved by matching a circle shape shown on screen
//		-slowdown, bullet remover, extra life, ball expanse multiplier
//		-powerdowns: bullets speed up, bullets invisible, expander slow growth

var Agglo = (function(){

	this.init = function(level) {
		paper.install(window);
		paper.setup('game');

		var tool = new Tool(),
		    view = paper.project.view,
		    bullets = [],
		    lvl = level || 1,
		    xpr = null,
		    balls = [],
		    resize = function(event) {
			 	view.setViewSize(view.size.width, view.size.width/2);
			},
			onMouseDown = function(event) {
		 		xpr = new Expander(event);
			},
			onMouseDrag = function(event) {
				if(xpr) {
					xpr.mousePoint = event.point;
				}
			},
			onMouseUp = function(event) {
				//create new ball w/ current expander characteristics
				if(xpr) {
					balls.push(new Ball(xpr));
				 	xpr.expander.remove();
				 	xpr = null;
				}
			},
			onFrame = function() {
				//bullets
				for(var i = bullets.length-1; i >= 0; i--) {
					bullets[i].iterate();
					if(xpr) {
						if(bullets[i].itemHit(xpr.expander)) {
							xpr.expander.remove();
							xpr = null;
						}
					}
				}

				//balls
				for(var b = balls.length-1; b >= 0; b--) {
					balls[b].iterate();
					for(var n = bullets.length-1; n >= 0; n--) {
						if(bullets[n].itemHit(balls[b].ball)) {
							bullets[n].updateVector(balls[b].ball);
						}
					}
				}

				//expander
				if(xpr) {
					xpr.iterate();
				}
			};

		for(var i = lvl-1; i >= 0; i--) {
			bullets.push(new Bullet());
		}

		resize();

		tool.onMouseUp = onMouseUp;
		tool.onMouseDown = onMouseDown;
		tool.onMouseDrag = onMouseDrag;
		view.onResize = resize;
		view.onFrame = onFrame;
	};

	return {
		run: this.init
	};
}());

window.onload = function() {
	Agglo.run(2);
};