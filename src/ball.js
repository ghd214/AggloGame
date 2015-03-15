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
};