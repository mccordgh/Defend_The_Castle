define(['Entity', 'Tile', 'Rectangle'], function(Entity, Tile, Rectangle){

	var DEFAULT_SPEED = 70,
			DEFAULT_HEALTH = 200,
			DEFAULT_CREATURE_WIDTH = 32,
			DEFAULT_CREATURE_HEIGHT = 32,
			dying = 0,
			tempEntity = null,
			deathInterval;

	var Creature = Entity.extend({
		init: function(_handler, _x, _y, _width, _height){
			this._super(_handler, _x, _y, _width, _height);
			this.health = DEFAULT_HEALTH;
			this.speed = DEFAULT_SPEED;
			this.xMove = 0;
			this.yMove = 0;
			this.dead = 0;
		},
		move: function(){
			if(Math.abs(this.xMove) > 0 || Math.abs(this.yMove) > 0){
				this.handler.getWorld().getSpatialGrid().remove(new Rectangle(this.x + this.bounds.x, this.y + this.bounds.y, this.bounds.width, this.bounds.height), this);
				if(!(this.checkEntityCollisions(this.xMove, 0)))
					this.moveX();
				if(!(this.checkEntityCollisions(0, this.yMove)))
					this.moveY();
				this.handler.getWorld().getSpatialGrid().insert(new Rectangle(this.x + this.bounds.x, this.y + this.bounds.y, this.bounds.width, this.bounds.height), this);
			}
		},
		moveX: function(){
			var tempX;
			if (this.xMove > 0) {
				tempX = parseInt((this.x + this.xMove + this.bounds.x + this.bounds.width) / Tile.TILE_WIDTH);
				if(!this.collisionWithTile(tempX, parseInt((this.y + this.bounds.y) / Tile.TILE_HEIGHT)) && 
					!this.collisionWithTile(tempX, parseInt((this.y + this.bounds.y + this.bounds.height) / Tile.TILE_HEIGHT))) {
					this.x += this.xMove;
				} else {
					this.x = tempX * Tile.TILE_WIDTH - this.bounds.x - this.bounds.width - 1;
				}
			} else if (this.xMove < 0) {
				tempX = parseInt((this.x + this.xMove + this.bounds.x) / Tile.TILE_WIDTH);
				if(!this.collisionWithTile(tempX, parseInt((this.y + this.bounds.y) / Tile.TILE_HEIGHT)) && 
					!this.collisionWithTile(tempX, parseInt((this.y + this.bounds.y + this.bounds.height) / Tile.TILE_HEIGHT))) {
					this.x += this.xMove;
				} else {
					this.x = tempX * Tile.TILE_WIDTH + Tile.TILE_WIDTH - this.bounds.x;
				}
			}
		},
		moveY: function(){
			var tempY;
			if (this.yMove > 0) {
				tempY = parseInt((this.y + this.yMove + this.bounds.y + this.bounds.height) / Tile.TILE_HEIGHT);
				if(!this.collisionWithTile(parseInt((this.x + this.bounds.x) / Tile.TILE_WIDTH), tempY) && 
					!this.collisionWithTile(parseInt((this.x + this.bounds.x + this.bounds.width) / Tile.TILE_WIDTH), tempY)) {
					this.y += this.yMove;
				} else {
					this.y = tempY * Tile.TILE_HEIGHT - this.bounds.y - this.bounds.height - 1;
				}
			} else if (this.yMove < 0) {
				tempY = parseInt((this.y + this.yMove + this.bounds.y) / Tile.TILE_HEIGHT);
				if(!this.collisionWithTile(parseInt((this.x + this.bounds.x) / Tile.TILE_WIDTH), tempY) && 
					!this.collisionWithTile(parseInt((this.x + this.bounds.x + this.bounds.width) / Tile.TILE_WIDTH), tempY)) {
					this.y += this.yMove;
				} else {
					this.y = tempY * Tile.TILE_HEIGHT + Tile.TILE_HEIGHT - this.bounds.y;
				}
			}
		},
		collisionWithTile: function(_x, _y){
			return this.handler.getWorld().getTile(_x, _y).isSolid();
		}, 
		getHealth: function(){
			return this.health;
		},
		getSpeed: function(){
			return this.speed;
		},		
		setHealth: function(_health){
			this.health = _health;
		},
		setSpeed: function(_speed){
			this.speed = _speed;
		},
		takeDamage: function(_damage){
			if (typeof this.healthbar !== undefined && !this.dead)
				this.health -= _damage;
				this.healthbar.update();
			if (this.health <= 0){
				this.assets.animations.death.tick();
			}
			// console.log(this.assets.animations.death.getCurrentAnimationFrame());
			// if (this.assets.animations.death.getCurrentFrame() === 3)
		}
	});

	Creature.DEFAULT_SPEED = DEFAULT_SPEED;
	Creature.DEFAULT_HEALTH = DEFAULT_HEALTH;
	Creature.DEFAULT_CREATURE_WIDTH = DEFAULT_CREATURE_WIDTH;
	Creature.DEFAULT_CREATURE_HEIGHT = DEFAULT_CREATURE_HEIGHT;

	return Creature;
});