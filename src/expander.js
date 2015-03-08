function Expander(event) {
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
};