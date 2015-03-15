function Expander() {
	var size = view.size;
/*
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
	this.circle.fillColor = 'red';*/

	this.expander = new Path.Circle({
					x: event.point.x,
					y: event.point.y
				}, 5);
	expander.fillColor = '#7fddc0';
}

Expander.prototype = {
/*	iterate: function() {
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
	}*/
};;function Bullet() {
  this.point = Point.random();
  this.point.x = this.point.x * view.size.width;
  this.point.y = this.point.y * view.size.height;

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
*/
Bullet.prototype.iterate = function(item) {
    this.checkBorders();
    this.move();
    //check if this bullet intersects the item
    return item !== null ? this.bulletHit(item) : false;
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
      x:this.point.x,
      y:this.point.y
    };
};


/**
* Checks for a hit on an expander
*/
Bullet.prototype.bulletHit = function(item) {
    return this.bullet.intersects(item.expander);
};;function Expander(event) {
	this.point = event.point;
	this.expander = new Path.Circle({
					x: this.point.x,
					y: this.point.y
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
	this.expander.position = this.point;
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
		    expander = null,
		    balls = [],
		    resize = function(event) {
			 	view.setViewSize(view.size.width, view.size.width/2);
			},
			onMouseDown = function(event) {
		 		expander = new Expander(event);
			},
			onMouseDrag = function(event) {
				if(expander) {
					expander.point = event.point;
				}
			},
			onMouseUp = function(event) {
				//create new ball w/ current expander characteristics
			 	balls.push(new Ball(expander));
			 	expander.expander.remove();
			 	expander = null;
			},
			onFrame = function() {
				//bullets
				for(var i = bullets.length-1; i >= 0; i--) {
					if(bullets[i].iterate(expander)) {
						//kill the expander
						expander = !expander.expander.remove();
					}
				}

				//balls
				for(var b = balls.length-1; i>= 0; i--) {
					balls[b].iterate();
				}

				//expander
				if(expander) {
					expander.iterate();
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