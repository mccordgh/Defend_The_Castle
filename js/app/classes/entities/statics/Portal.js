define(['StaticEntity', 'Tile', 'Assets', 'Bat', 'World'], function(StaticEntity, Tile, Assets, Bat, World){

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
			this.spawnTimer = 0;
			this.lastSpawnTime = Date.now();
			this.spawnSpeed = 1000;
			this.assets = Assets.getAssets("portal");
			this.spawnTries = 0;
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
			this.tryToSpawnMonster();
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
		},
		tryToSpawnMonster(){
			if (!this.handler.getWorld().getRoundOver()) {
				this.spawnTimer += Date.now() - this.lastSpawnTime;
				this.lastSpawnTime = Date.now();

				if (this.spawnTimer >= this.spawnSpeed){
					let spawnX, spawnY, spawnChance;
					spawnChance = Math.ceil(Math.random() * 4);
					this.spawnTries++;
					if (spawnChance === 4 || this.spawnTries === 4){
						if (this.spawnSpeed > 100)
							this.spawnSpeed -= 30;
						this.spawnTries = 0;
						if (this.x >= this.handler.getWidth() / 2) {
							spawnX = this.x - (Tile.TILE_WIDTH * 3);
						} else {
							spawnX = this.x + (Tile.TILE_WIDTH * 3);
						}
						if (this.y >= this.handler.getHeight() / 2) {
							spawnY = this.y - (Tile.TILE_HEIGHT * 3);
						} else {
							spawnY = this.y + (Tile.TILE_HEIGHT * 3);
						}
					}				
					// Spawning a BAT!
					this.handler.getWorld().getEntityManager().addEntity(new Bat(this.handler, spawnX, spawnY));
					this.spawnTimer = 0;
				}
			}

		}
		// getHealthBar: function() {
		// 	return this.healthbar;
		// }	});

	});
	
	return Portal;
});