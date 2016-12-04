define(['StaticEntity', 'Tile', 'Assets'], function(StaticEntity, Tile, Assets){

	var Portal = StaticEntity.extend({
		init: function(_handler, _x, _y){
			this._super(_handler, _x, _y, Tile.TILE_WIDTH * 4, Tile.TILE_HEIGHT * 4);
			this.bounds.x = 0;
			this.bounds.y = 0;
			this.bounds.width = 64;
			this.bounds.height = 64;
			this.height = 64;
			this.width = 64;
			this.type = 'static';
			this.assets = Assets.getAssets("portal");
		},
		tick: function(_dt){
			// if (this.health <= 0){
			// 	console.log(this.type + " DIED!", this.dead);
			// 	this.dead++;
			// 	if (this.dead === 10){
			// 		this.dead = 666;
			// 		this.handler.getWorld().getEntityManager().removeEntity(this);
			// 		this.handler.getWorld().getSpatialGrid().remove(new Rectangle(this.x + this.bounds.x, this.y + this.bounds.y, this.bounds.width, this.bounds.height), this);
			// 	}
			// }
			// this.move();
			// this.handler.getGameCamera().centerOnEntity(this);
			// this.assets.animations.walk_up.tick();
			// this.assets.animations.walk_right.tick();
			// this.assets.animations.walk_down.tick();
			// this.assets.animations.walk_left.tick();
			this.assets.animations.idle.tick();
			// if (this.health <= 0)
			// 	this.assets.animations.death.tick();
		},
		render: function(_g){
			// _g.globalAlpha = 0.5;
			// _g.fillStyle = "red";
			// _g.fillRect(this.bounds.x + this.x - this.handler.getGameCamera().getxOffset(), this.bounds.y + this.y - this.handler.getGameCamera().getyOffset(), this.bounds.width, this.bounds.height);
			// _g.globalAlpha = 1;
			_g.myDrawImage(this.getCurrentAnimationFrame(), this.x - this.handler.getGameCamera().getxOffset(), this.y - this.handler.getGameCamera().getyOffset(), this.width, this.height);
			// this.healthbar.render(_g);
			// _g.myDrawImage(this.assets, 
			// 				this.x - this.handler.getGameCamera().getxOffset(),
			// 				this.y - this.handler.getGameCamera().getyOffset(), 
			// 				this.width, 
			// 				this.height);
			// _g.fillRect(this.bounds.x + this.x - this.handler.getGameCamera().getxOffset(), this.bounds.y + this.y - this.handler.getGameCamera().getyOffset(), this.bounds.width, this.bounds.height);
		},
		// getInput: function(_dt){
		// 	this.xMove = 0;
		// 	this.yMove = 0;
		// 	if(this.handler.getKeyManager().up) {
		// 		this.yMove = -this.speed * _dt;
		// 	} 
		// 	if (this.handler.getKeyManager().down) {
		// 		this.yMove = this.speed * _dt;
		// 	}
		// 	if(this.handler.getKeyManager().left) {
		// 		this.xMove = -this.speed * _dt;
		// 	} 
		// 	if (this.handler.getKeyManager().right) {
		// 		this.xMove = this.speed * _dt;
		// 	}
		// },
		getCurrentAnimationFrame: function(){
			return this.assets.animations.idle.getCurrentFrame();
		}
		// getHealthBar: function() {
		// 	return this.healthbar;
		// }	});

	});
	
	return Portal;
});