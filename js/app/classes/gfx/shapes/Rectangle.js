define(['Class'], function(Class){

	var Rectangle = Class.extend({
		init: function(_x, _y, _width, _height){
			this.x = _x;
			this.y = _y;
			this.width = _width;
			this.height = _height;
		}
	});

	return Rectangle;
});