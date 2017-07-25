define(['StaticEntity', 'Tile', 'Assets', 'HealthBar', 'Rectangle', 'GameOverState', 'State'], function(StaticEntity, Tile, Assets, HealthBar, Rectangle, GameOverState, State){

	let assets = Assets.getAssets("castle"), deathCleanup = true, exploderCount = 0;

	let Castle = StaticEntity.extend({
		init: function(_handler, _x, _y){
			this._super(_handler, _x, _y, Tile.TILE_WIDTH * 4, Tile.TILE_HEIGHT * 4);
			this.bounds.x = 0;
			this.bounds.y = 0;
			this.bounds.width = 80;
			this.bounds.height = 80;
			this.height = 81;
			this.width = 80;
			this.type = 'castle';
			this.damage = 100;
			this.health = 2000;
			let tempX = this.handler.getWidth() - 220,
					tempY = 45;
			let hb_properties = {
				nodes: 100,
				fixed: true,
				fixedX: tempX,
				fixedY: tempY,
				width: 200,
				height: 30,
				title: "Castle Health"
			};
			this.healthbar = new HealthBar(_handler, this, hb_properties);
		},
		tick: function(){
			if (this.health <= 0){
				this.handler.getGameCamera().slowCenterOnEntity(this);
				this.dead++;
				if (this.dead === 100){
					this.handler.getSoundManager().pause("explode");
					this.dead = 666;
					this.handler.getWorld().getEntityManager().removeEntity(this);
					this.handler.getWorld().getSpatialGrid().remove(new Rectangle(this.x + this.bounds.x, this.y + this.bounds.y, this.bounds.width, this.bounds.height), this);
					gameOverState = new GameOverState(this.handler);
					State.setState(gameOverState);
				}
			}
		},
		render: function(_g){
			if (this.health <= 0){
				if (deathCleanup){
					this.handler.getSoundManager().setLoop("gameMusic", false);
					this.handler.getSoundManager().fadeOut("gameMusic", 3);
					deathCleanup = false;
				}
				exploderCount++;
				if (exploderCount > 10){
					this.handler.getSoundManager().play("explode");
					exploderCount = 0;
				}
				assets.animations.explode.tick();
				this.handler.getWorld().setRoundOver(true);
				this.handler.getWorld().getEntityManager().removeAllMonsters();
				_g.myDrawImage(assets.animations.explode.getCurrentFrame(), 
								this.x - this.handler.getGameCamera().getxOffset(),
								this.y - this.handler.getGameCamera().getyOffset(), 
								this.width, 
								this.height);
			} else {
				if (this.health > 1250)
					castleSprite = assets.sprite1;
				if (this.health > 750 && this.health < 1250)
					castleSprite = assets.sprite2;
				if (this.health > 0 && this.health < 750)
					castleSprite = assets.sprite3;
					_g.myDrawImage(castleSprite, 
									this.x - this.handler.getGameCamera().getxOffset(),
									this.y - this.handler.getGameCamera().getyOffset(), 
									this.width, 
									this.height);
				this.healthbar.render(_g);
			}
			// ****** DRAW BOUNDING BOX DON'T DELETE!!
			// _g.fillStyle = "green";
			// _g.fillRect(this.bounds.x + this.x - this.handler.getGameCamera().getxOffset(), this.bounds.y + this.y - this.handler.getGameCamera().getyOffset(), this.bounds.width, this.bounds.height);
			// ****** DRAW BOUNDING BOX DON'T DELETE!!
		}

	});

	return Castle;
});