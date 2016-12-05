define(['Entity'], function(Entity){

	var StaticEntity = Entity.extend({
		init: function(_handler, _x, _y, _width, _height){
			this._super(_handler, _x, _y, _width, _height);
			this.dead = 0;
		},
		takeDamage: function(_damage){
			if (typeof this.healthbar != undefined && !this.dead)
				this.health -= _damage;
				this.healthbar.update();
			// if (this.health <= 0){
			// 	this.assets.animations.death.tick();
			// }
			// console.log(this.assets.animations.death.getCurrentAnimationFrame());
			// if (this.assets.animations.death.getCurrentFrame() === 3)
		}


	});

	return StaticEntity;
});