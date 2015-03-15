/*EXPANDERS*/
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