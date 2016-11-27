define(['Class', 'Rectangle'], function(Class, Rectangle){

	var Entity = Class.extend({
		init: function(_handler, _x, _y, _width, _height){
			this.x = _x;
			this.y = _y;
			this.width = _width;
			this.height = _height;
			this.handler = _handler;
			this.bounds = new Rectangle(0, 0, _width, _height);
		},
		tick: function(_dt){},
		render: function(_g){
			throw("Entities must have a tick function!");
		},

		//Getters
		getX: function(){
			return this.x;
		},
		getY: function(){
			return this.y;
		},
		getWidth: function(){
			return this.width;
		},
		getHeight: function(){
			return this.height;
		},
		getCollisionBounds: function(xOffset, yOffset){
			return new Rectangle(parseInt(this.x + this.bounds.x + xOffset),
														parseInt(this.y + this.bounds.y + yOffset),
														this.bounds.width, this.bounds.height);
		},
		checkEntityCollisions: function(xOffset, yOffset){
			var candidates = this.handler.getWorld().getEntityManager().getEntities();
			for(var i = 0; i < candidates.length; i++){
				var e = candidates[i];
				if (e != this){
					// console.log(e.getCollisionBounds(0, 0));
					// console.log(this.getCollisionBounds(xOffset, yOffset));
					if (e.getCollisionBounds(0, 0).intersects(this.getCollisionBounds(xOffset, yOffset))){
						return true;
					}
				}
			}
			return false;
		},
		//Setters
		setX: function(_x){
			this.x = _x;
		},
		setY: function(_y){
			this.y = _y;
		},
		setWidth: function(_width){
			this.width = _width;
		},
		setHeight: function(_height){
			this.height = _height;
		}
	});

	return Entity;

});