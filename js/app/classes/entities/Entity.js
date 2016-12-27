define(['Class', 'Rectangle'], function(Class, Rectangle){

var dying;

	var Entity = Class.extend({
		init: function(_handler, _x, _y, _width, _height){
			this.x = _x;
			this.y = _y;
			this.width = _width;
			this.height = _height;
			this.handler = _handler;
			this.bounds = new Rectangle(0, 0, _width, _height);
			this.target = null;
		},
		tick: function(_dt){
		},
		render: function(_g){
			throw("Entities must have a tick function!");
		},
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
			var candidates =  this.handler.getWorld().getSpatialGrid().retrieve(new Rectangle(this.x + this.bounds.x + xOffset, this.y + this.bounds.y + yOffset, this.bounds.width, this.bounds.height), this);

					//*************************************
					// console.log(`${this.type} > ${e.type}`);
					//PLAYER > MONSTER
					//*************************************

			for(var i = 0; i < candidates.length; i++){
				var e = candidates[i];
				if (this.type === 'player' && e.type === 'monster'){
					// if (e.getCollisionBounds(0, 0).intersects(this.getWeaponCollisionBounds(xOffset, yOffset))){
						e.takeDamage(this.damage);
					// }
				}
				if (e != this && e.health > 0 || e.health === undefined){
						// if (e.type === 'monster' && this.type === 'player'){
						// 	e.takeDamage(this.damage);
						// }
					if (e.getCollisionBounds(0, 0).intersects(this.getCollisionBounds(xOffset, yOffset)) && !(this.type === 'monster' && e.type === 'monster')){
						if (e.type === 'castle' && this.type === 'monster'){
							if (this.targetType && this.dead < 1)
								if(this.targetType === 'castle')
									e.takeDamage(this.damage);
						}
						return true;
					}
				}
			}
			return false;
		},
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