define(['StaticEntity', 'Tile', 'Assets', 'Bat', 'World'], function(StaticEntity, Tile, Assets, Bat, World){

	var Portal = StaticEntity.extend({
		init: function(_handler, _x, _y){
			this._super(_handler, _x, _y, Tile.TILE_WIDTH * 4, Tile.TILE_HEIGHT * 4);
			this.bounds.x = 0;
			this.bounds.y = 0;
			this.bounds.width = 0;
			this.bounds.height = 0;
			this.height = 64;
			this.width = 64;
			this.type = 'static';
			this.spawnTimer = 0;
			this.lastSpawnTime = Date.now();
			this.spawnSpeed = 2000;
			this.spawnPercent = 0.25;
			this.assets = Assets.getAssets("portal");
			this.spawnTries = 0;
		},
		tick: function(_dt){
			this.assets.animations.idle.tick();
			this.tryToSpawnMonster();
		},
		render: function(_g){
			_g.myDrawImage(this.getCurrentAnimationFrame(), this.x - this.handler.getGameCamera().getxOffset(), this.y - this.handler.getGameCamera().getyOffset(), this.width, this.height);
			// ****** DRAW BOUNDING BOX DON'T DELETE!!
			// _g.fillStyle = "red";
			// _g.fillRect(this.bounds.x + this.x - this.handler.getGameCamera().getxOffset(), this.bounds.y + this.y - this.handler.getGameCamera().getyOffset(), this.bounds.width, this.bounds.height);
			// ****** DRAW BOUNDING BOX DON'T DELETE!!
		},
		getCurrentAnimationFrame: function(){
			return this.assets.animations.idle.getCurrentFrame();
		},
		tryToSpawnMonster(){
			if (!this.handler.getWorld().getRoundOver()) {
				this.spawnTimer += Date.now() - this.lastSpawnTime;
				this.lastSpawnTime = Date.now();

				if (this.spawnTimer >= this.spawnSpeed){
					let spawnX, spawnY, spawnChance;
					spawnChance = Math.random();
					this.spawnTries++;
					if (spawnChance < this.spawnPercent || this.spawnTries === 4){
						if (this.spawnSpeed > 100)
							this.spawnSpeed -= 15;
							// this.spawnPercent += 0.02;
						this.spawnTries = 0;
						// if (this.x >= this.handler.getWidth() / 2) {
						// 	spawnX = this.x - (Tile.TILE_WIDTH * 3);
						// } else {
						// 	spawnX = this.x + (Tile.TILE_WIDTH * 3);
						// }
						// if (this.y >= this.handler.getHeight() / 2) {
						// 	spawnY = this.y - (Tile.TILE_HEIGHT * 3);
						// } else {
						// 	spawnY = this.y + (Tile.TILE_HEIGHT * 3);
						// }
						// Spawning a BAT!
						this.handler.getWorld().getEntityManager().addEntity(new Bat(this.handler, this.x, this.y));
						this.spawnTimer = 0;
					}				
				}
			}

		}

	});
	
	return Portal;
});