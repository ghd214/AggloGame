/*
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
