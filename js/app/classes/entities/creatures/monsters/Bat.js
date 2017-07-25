define(['Creature', 'Assets', 'HealthBar', 'Rectangle'], function(Creature, Assets, HealthBar, Rectangle){

	let Bat = Creature.extend({
		init: function(_handler, _x, _y){
			this._super(_handler, _x, _y, 64, 64);
			this.assets = Assets.getAssets("bat");
			this.x = _x;
			this.y = _y;
			this.bounds.x = 22;
			this.bounds.y = 15;
			this.bounds.width = 21;
			this.bounds.height = 24;
			this.type = 'monster';
			this.health = 80;
			this.damage = 55;
			this.targetType = 'castle';
			this.deathCleanup = true;
			let healthbar_properties = {
				color: "#0c0",
				bgColor: "#a00",
				yOffset: 10,
				nodes: 100,
				split: 0,
				width: 75,
				height: 6,
				fadeTime: 0.97,
				renderOnFull: "on",
				border: {
					show: false,
					color: "#000",
					width: 2
				}
			};
			this.healthbar = new HealthBar(_handler, this, healthbar_properties);
		},
		tick: function(_dt){
			if (this.health <= 0){
				this.handler.getWorld().getEntityManager().getPlayer().score += 333;
				this.dead++;
				if (this.deathCleanup) {
					this.handler.getSoundManager().play("monster");
					this.deathCleanup = false;
				}
				if (this.dead === 8){
					this.dead = 666;
					this.handler.getWorld().getEntityManager().removeEntity(this);
					this.handler.getWorld().getSpatialGrid().remove(new Rectangle(this.x + this.bounds.x, this.y + this.bounds.y, this.bounds.width, this.bounds.height), this);
				}
			}
			this.xMove = 0;
			this.yMove = 0;
			
			this.target = this.handler.getWorld().getEntityManager().getSingleEntity(this.targetType);		
			if (this.target) {
				if(this.target.y < this.y) {
					if (this.target.y - this.y > 10 || this.target.y - this.y < -10)
						this.yMove = -this.speed * _dt;
				} 
				if (this.target.y > this.y) {
					if (this.target.y - this.y > 10 || this.target.y - this.y < -10)
						this.yMove = this.speed * _dt;
				}
				if(this.target.x < this.x) {
					if (this.target.x - this.x > 10 || this.target.x - this.x < -10)
					this.xMove = -this.speed * _dt;
				} 
				if (this.target.x > this.x) {
					if (this.target.x - this.x > 10 || this.target.x - this.x < -10)
					this.xMove = this.speed * _dt;
				}
			}		
			if (this.dead === 0)
				this.move();
				
			if (this.yMove < 0)
				this.assets.animations.walk_up.tick();
			if (this.yMove > 0)
				this.assets.animations.walk_down.tick();
			if (this.xMove > 0)
				this.assets.animations.walk_right.tick();
			if (this.xMove < 0)
				this.assets.animations.walk_left.tick();

			this.assets.animations.idle.tick();
		},
		render: function(_g){
			_g.myDrawImage(this.getCurrentAnimationFrame(), this.x - this.handler.getGameCamera().getxOffset(), this.y - this.handler.getGameCamera().getyOffset(), this.width, this.height);
			this.healthbar.render(_g);
			// ****** DRAW BOUNDING BOX DON'T DELETE!!
			// _g.fillStyle = "blue";
			// _g.fillRect(this.bounds.x + this.x - this.handler.getGameCamera().getxOffset(), this.bounds.y + this.y - this.handler.getGameCamera().getyOffset(), this.bounds.width, this.bounds.height);
			// ****** DRAW BOUNDING BOX DON'T DELETE!!
		},
		getInput: function(_dt){
			
		},
		getCurrentAnimationFrame: function(){
			if (this.health <= 0){
				this.assets.animations.death.tick();
				return this.assets.animations.death.getCurrentFrame();
			}
			if (this.yMove < 0){
					return this.assets.animations.walk_up.getCurrentFrame();
			} else if (this.yMove > 0){
					return this.assets.animations.walk_down.getCurrentFrame();
			} else if (this.xMove < 0){
					return this.assets.animations.walk_left.getCurrentFrame();
			} else if (this.xMove > 0){
					return this.assets.animations.walk_right.getCurrentFrame();
			} else {
					return this.assets.animations.idle.getCurrentFrame();
			}
		},
		getHealthBar: function() {
			return this.healthbar;
		}
	});

	return Bat;
});