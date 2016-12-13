define(['Creature', 'Assets', 'HealthBar'], function(Creature, Assets, HealthBar){

	var lastAnimation = "walk_right", attackCounter = 0, lastAttackCounter = 0;

	var Player = Creature.extend({
		init: function(_handler, _x, _y){
			this._super(_handler, _x, _y, Creature.DEFAULT_CREATURE_WIDTH, Creature.DEFAULT_CREATURE_HEIGHT);
			this.assets = Assets.getAssets('player');
			this.x = _x;
			this.y = _y;
			this.speed = 200;
			this.bounds.x = 11;
			this.bounds.y = 18;
			this.bounds.width = 12;
			this.bounds.height = 18;
			this.type = 'player';
			this.damage = 60;
			this.score = 300900;
			this.weapon = Assets.getAssets('sword');
			// this.portrait = Assets.getAssets('Portraits');
			// this.healthbar = new HealthBar(_handler, this, {
			// 						nodes: 100,
			// 						color: "red",
			// 						bgColor: "green",
			// 						fixed: true,
			// 						fixedX: 125,
			// 						fixedY: 558,
			// 						width: 104,
			// 						height: 12
			// });
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
			if (!this.handler.getWorld().getRoundOver()) {
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
			}
		},
		render: function(_g){
			//DRAW SWORD BEFORE PLAYER IF WALKING UP OR LEFT
			if (lastAnimation === 'walk_up'){
				this.bounds.x = -6;
				this.bounds.y = -32;
				this.bounds.width = 25;
				this.bounds.height = 50;
				_g.myDrawImage(this.weapon.walk_up, this.x - this.handler.getGameCamera().getxOffset() - 9, this.y - this.handler.getGameCamera().getyOffset() - 33, 32, 64);				
			}
			if (lastAnimation === 'walk_left'){
				this.bounds.x = -37;
				this.bounds.y = 15;
				this.bounds.width = 50;
				this.bounds.height = 25;
				_g.myDrawImage(this.weapon.walk_left, this.x - this.handler.getGameCamera().getxOffset() - 40, this.y - this.handler.getGameCamera().getyOffset() + 11, 64, 32);				
			}
			
			//Draw PLAYER
			_g.myDrawImage(this.getCurrentAnimationFrame(), this.x - this.handler.getGameCamera().getxOffset(), this.y - this.handler.getGameCamera().getyOffset(), this.assets.width, this.assets.height);

			//DRAW SWORD AFTER PLAYER IF WALKING DOWN OR RIGHT
			if (lastAnimation === 'walk_down'){
				this.bounds.x = -5;
				this.bounds.y = 35;
				this.bounds.width = 25;
				this.bounds.height = 50;
				_g.myDrawImage(this.weapon.walk_down, this.x - this.handler.getGameCamera().getxOffset() - 9, this.y - this.handler.getGameCamera().getyOffset() + 25, 32, 64);				
			}
			if (lastAnimation === 'walk_right'){
				this.bounds.x = 19;
				this.bounds.y = 15;
				this.bounds.width = 50;
				this.bounds.height = 25;
				_g.myDrawImage(this.weapon.walk_right, this.x - this.handler.getGameCamera().getxOffset() + 7, this.y - this.handler.getGameCamera().getyOffset() + 11, 64, 32);				
			}
			
			// if (this.attacking){
			// 	attackCounter++;
			// 	console.log("increment");
			// 	if (attackCounter >= 15){
			// 		console.log("resetting attack counter and lastAttackCounter");
			// 		attackCounter = 0;
			// 		lastAttackCounter = 0;
			// 		this.attacking = false;
			// 	}
			// }

			// lastAttackCounter++;
			
			// ****** DRAW BOUNDING BOX DON'T DELETE!!
			// _g.fillStyle = "blue";
			// _g.fillRect(this.bounds.x + this.x - this.handler.getGameCamera().getxOffset(), this.bounds.y + this.y - this.handler.getGameCamera().getyOffset(), this.bounds.width, this.bounds.height);
			// ****** DRAW BOUNDING BOX DON'T DELETE!!
		},
		getInput: function(_dt){
			this.xMove = 0;
			this.yMove = 0;
			// if((this.handler.getKeyManager().f || this.handler.getKeyManager().j) && lastAttackCounter > 30){
			// 	this.attacking = true;
			// }
			if(this.handler.getKeyManager().space){
				console.log("SPACE: JUMP!!");
			}
			if(this.handler.getKeyManager().up || this.handler.getKeyManager().upArrow) {
				this.yMove = -this.speed * _dt;
			} 
			if (this.handler.getKeyManager().down || this.handler.getKeyManager().downArrow) {
				this.yMove = this.speed * _dt;
			}
			if(this.handler.getKeyManager().left || this.handler.getKeyManager().leftArrow) {
				this.xMove = -this.speed * _dt;
			} 
			if (this.handler.getKeyManager().right || this.handler.getKeyManager().rightArrow) {
				this.xMove = this.speed * _dt;
			}
		},
		getCurrentAnimationFrame: function(){
			// if (this.health <= 0){
			// 	return this.assets.animations.death.getCurrentFrame();
			// }
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