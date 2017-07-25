define(['Class'], function(Class){

	let Rectangle = Class.extend({
		init: function(_x, _y, _width, _height){
			this.x = _x;
			this.y = _y;
			this.width = _width;
			this.height = _height;
		},
		intersects: function(_rect){
			if(this.x < _rect.x + _rect.width &&
					this.x + this.width > _rect.x &&
					this.y < _rect.y + _rect.height &&
					this.y + this.height > _rect.y){
				return true;
			} else {
				return false;
			}
		}
	});

	return Rectangle;
});