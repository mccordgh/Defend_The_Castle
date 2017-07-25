define(['Entity'], function(Entity){

	let StaticEntity = Entity.extend({
		init: function(_handler, _x, _y, _width, _height){
			this._super(_handler, _x, _y, _width, _height);
			this.dead = 0;
		},
		takeDamage: function(_damage){
			if (typeof this.healthbar != undefined && !this.dead)
				this.health -= _damage;
				this.healthbar.update();
		}


	});

	return StaticEntity;
});