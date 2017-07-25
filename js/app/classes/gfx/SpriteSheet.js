define(['Class'], function(Class){

	let SpriteSheet = Class.extend({
		init:function(_sheet){
			this.sheet = _sheet;

		},
		crop: function(_x, _y, _width, _height){
		return {"sheet": this.sheet, "x": _x, "y": _y, "width": _width, "height": _height};
		}
	});

	return SpriteSheet;
});