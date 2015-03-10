function Expander(event) {
	this.initialWidth = 5;
	this.point = event.point;
	this.posX = this.point.x;
	this.posY = this.point.y;
	this.baseScale = 1;
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
		var bounds = this.expander.bounds;

		//check that expander is within the bounds of the screen
		//1px buffer to reduce jitter
		if(bounds.x > 1 && bounds.y > 1 && bounds.x + bounds.width < size.width-1 && bounds.y + this.expander.bounds.height < size.height-1) {
			this.expand();
		}
		else if(bounds.x < 0 || bounds.y < 0 || bounds.x + bounds.width > size.width || bounds.y + this.expander.bounds.height > size.height) {
			this.reduce();
		}
	},
	checkCollisions: function() {

	},
	pop: function() {

	},
	expand: function() {
		//scale is inverse size
		var radius = this.expander.bounds.width / 2,
			scale = this.baseScale + (this.baseScale / radius);
		this.expander.scale(scale);
	},
	reduce: function() {
		this.expander.scale(this.shrinkScale);
	},
	move: function() {
		this.expander.position = this.point;
	}
};