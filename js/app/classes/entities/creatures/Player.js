define(['Creature', 'Assets', 'HealthBar'], function(Creature, Assets, HealthBar){

	var lastAnimation = "walk_down";

	var Player = Creature.extend({
		init: function(_handler, _x, _y){
			this._super(_handler, _x, _y, Creature.DEFAULT_CREATURE_WIDTH, Creature.DEFAULT_CREATURE_HEIGHT);
			this.assets = Assets.getAssets('player');
			this.x = _x;
			this.y = _y;
			this.bounds.x = 6;
			this.bounds.y = 14;
			this.speed = 400;
			this.bounds.width = 19;
			this.bounds.height = 24;
			this.type = 'player';
			this.damage = 60;
			this.portrait = Assets.getAssets('Portraits');
			this.healthbar = new HealthBar(_handler, this, {
									nodes: 100,
									color: "red",
									bgColor: "green",
									fixed: true,
									fixedX: 125,
									fixedY: 558,
									width: 104,
									height: 12
			});
			// 	color: "#0c0",			// var healthbar_properties = {

			// 	bgColor: "#a00",
			// 	yOffset: 10,
			// 	nodes: 100,
			// 	split: 0,
			// 	width: 75,
			// 	height: 6,
			// 	fadeTime: 0.98,
			// 	renderOnFull: "on",
			// 	border: {
			// 		show: false,
			// 		color: "#000",
			// 		width: 2
			// 	}
			// };
			// this.healthbar = new HealthBar(_handler, this, healthbar_properties);
		},
		tick: function(_dt){
			this.getInput(_dt);
			this.move();
			this.handler.getGameCamera().centerOnEntity(this);
			if (this.yMove < 0)
				this.assets.animations.walk_up.tick();
			if (this.yMove > 0)
				this.assets.animations.walk_down.tick();
			if (this.xMove > 0)
				this.assets.animations.walk_right.tick();
			if (this.xMove < 0)
				this.assets.animations.walk_left.tick();
			// this.assets.animations.idle.tick();
			if (this.health <= 0)
				this.assets.animations.death.tick();
		},
		render: function(_g){
			_g.myDrawImage(this.getCurrentAnimationFrame(), this.x - this.handler.getGameCamera().getxOffset(), this.y - this.handler.getGameCamera().getyOffset(), this.assets.width, this.assets.height);
			// this.healthbar.render(_g);
			// _g.fillStyle = "blue";
			// _g.fillRect(this.bounds.x + this.x - this.handler.getGameCamera().getxOffset(), this.bounds.y + this.y - this.handler.getGameCamera().getyOffset(), this.bounds.width, this.bounds.height);
		},
		getInput: function(_dt){
			this.xMove = 0;
			this.yMove = 0;
			if(this.handler.getKeyManager().up) {
				this.yMove = -this.speed * _dt;
			} 
			if (this.handler.getKeyManager().down) {
				this.yMove = this.speed * _dt;
			}
			if(this.handler.getKeyManager().left) {
				this.xMove = -this.speed * _dt;
			} 
			if (this.handler.getKeyManager().right) {
				this.xMove = this.speed * _dt;
			}
		},
		getCurrentAnimationFrame: function(){
			if (this.health <= 0){
				return this.assets.animations.death.getCurrentFrame();
			}
			if (this.yMove < 0){
					lastAnimation = "walk_up";
					return this.assets.animations.walk_up.getCurrentFrame();
			} else if (this.yMove > 0){
					lastAnimation = "walk_down";
					return this.assets.animations.walk_down.getCurrentFrame();
			} else if (this.xMove < 0){
					lastAnimation = "walk_left";
					return this.assets.animations.walk_left.getCurrentFrame();
			} else if (this.xMove > 0){
					lastAnimation = "walk_right";
					return this.assets.animations.walk_right.getCurrentFrame();
			} else {
					return this.assets.animations[lastAnimation].getCurrentFrame();
			}
		},
		getHealthBar: function() {
			return this.healthbar;
		}
	});

	return Player;
});