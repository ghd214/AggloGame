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
};;function Expander(event) {
	this.initialWidth = 5;
	this.point = event.point;
	this.posX = this.point.x;
	this.posY = this.point.y;
	this.growScale = 1.03;
	this.shrinkScale = 0.95;

	this.expander = new Path.Circle({
					x: this.posX,
					y: this.posY
				}, this.initialWidth);
	this.expander.fillColor = '#7fddc0';
}

Expander.prototype = {
	iterate: function() {
		this.checkBorders();
		this.move();
		//don't expand if touching a ball
		//if hit by a bullet, pop animation
	},
	checkBorders: function() {
		size = view.size;
		var boundsX = this.expander.bounds.x,
			boundsY = this.expander.bounds.y;

		//check that expander is within the bounds of the screen
		//1px buffer to reduce jitter
		if(boundsX > 1 && boundsY > 1 && boundsX + this.expander.bounds.width < size.width-1 && boundsY + this.expander.bounds.height < size.height-1) {
			this.expand();
		}
		else if(boundsX < 0 || boundsY < 0 || boundsX + this.expander.bounds.width > size.width || boundsY + this.expander.bounds.height > size.height) {
			this.reduce();
		}
	},
	checkCollisions: function() {

	},
	pop: function() {

	},
	expand: function() {
		this.expander.scale(this.growScale);
	},
	reduce: function() {
		this.expander.scale(this.shrinkScale);
	},
	move: function() {
		this.expander.position = this.point;
	}
};;/*EXPANDERS*/
//@todo move expanders into class
//@todo make expanders respect boundaries
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
//		-powerdowns: bullets speed up, bullets invisible, expander slow growth,
// @todo

var Agglo = (function(){

	this.init = function(level) {
		paper.install(window);

		paper.setup('game');

		var tool = new Tool(),
		    view = paper.project.view,
		    bullets = [],
		    lvl = level || 1,
		    expander = null,
		    resize = function(event) {
			 	view.setViewSize(view.size.width, view.size.width/2);
			},
			onMouseDown = function(event) {
		 		console.log('You pressed the mouse!');
		 		expander = new Expander(event);
			},
			onMouseDrag = function(event) {
			 	console.log('dragging...');
			 	expander.point = event.point;
			},
			onMouseUp = function(event) {
			 	console.log('You released the mouse!');
			 	//add expander to ball array
			 	expander = null;
			},
			onFrame = function() {
				for(var i = bullets.length-1; i >= 0; i--) {
					bullets[i].iterate();
				}

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
	Agglo.run(5);
};