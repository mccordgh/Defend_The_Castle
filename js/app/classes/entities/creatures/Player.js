define(['Creature', 'Assets', 'HealthBar', 'Rectangle'], function(Creature, Assets, HealthBar, Rectangle){

	let lastAnimation = "walk_down";//, attackCounter = 0, lastAttackCounter = 0;
	let playerLeap = {};

	let Player = Creature.extend({
		init: function(_handler, _x, _y){
			this._super(_handler, _x, _y, Creature.DEFAULT_CREATURE_WIDTH, Creature.DEFAULT_CREATURE_HEIGHT);
			this.assets = Assets.getAssets('player');
			this.x = _x;
			this.y = _y;
			this.speed = 250;
			this.bounds.x = 10;
			this.bounds.y = 17;
			this.bounds.width = 14;
			this.bounds.height = 19;
			this.type = 'player';
			this.damage = 60;
			this.score = 0;
			this.state = 'moving';
			this.weapon = Assets.getAssets('sword');
			this.weapon.bounds = {
				x: 0,
				y: 0,
				width: 0,
				height: 0
			};
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
			// 	color: "#0c0",			// let healthbar_properties = {

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
				if (this.state === 'moving') {
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

				if (this.state === 'jumping') {
					this.xMove = playerLeap.xSpeed;
					this.yMove = playerLeap.ySpeed;
					console.log({
						xMove: this.xMove,
						yMove: this.yMove,
					});
					this.leap();
					console.log({
						x: this.x,
						y: this.y,
					})
					if (this.x === playerLeap.endX || this.y === playerLeap.endY)
						this.state === 'moving';
				}
			}
		},
		render: function(_g){
			//DRAW SWORD BEFORE PLAYER IF WALKING UP OR LEFT
			if (this.state === 'moving') {
				if (lastAnimation === 'walk_up') {
					this.weapon.bounds.x = -6;
					this.weapon.bounds.y = -32;
					this.weapon.bounds.width = 25;
					this.weapon.bounds.height = 50;
					_g.myDrawImage(this.weapon.walk_up, this.x - this.handler.getGameCamera().getxOffset() - 9, this.y - this.handler.getGameCamera().getyOffset() - 33, 32, 64);
				}
				if (lastAnimation === 'walk_left') {
					this.weapon.bounds.x = -37;
					this.weapon.bounds.y = 15;
					this.weapon.bounds.width = 50;
					this.weapon.bounds.height = 25;
					_g.myDrawImage(this.weapon.walk_left, this.x - this.handler.getGameCamera().getxOffset() - 40, this.y - this.handler.getGameCamera().getyOffset() + 11, 64, 32);
				}

				//Draw PLAYER
				_g.myDrawImage(this.getCurrentAnimationFrame(), this.x - this.handler.getGameCamera().getxOffset(), this.y - this.handler.getGameCamera().getyOffset(), this.assets.width, this.assets.height);

				//DRAW SWORD AFTER PLAYER IF WALKING DOWN OR RIGHT
				if (lastAnimation === 'walk_down') {
					this.weapon.bounds.x = -5;
					this.weapon.bounds.y = 35;
					this.weapon.bounds.width = 25;
					this.weapon.bounds.height = 50;
					_g.myDrawImage(this.weapon.walk_down, this.x - this.handler.getGameCamera().getxOffset() - 9, this.y - this.handler.getGameCamera().getyOffset() + 25, 32, 64);
				}
				if (lastAnimation === 'walk_right') {
					this.weapon.bounds.x = 19;
					this.weapon.bounds.y = 15;
					this.weapon.bounds.width = 50;
					this.weapon.bounds.height = 25;
					_g.myDrawImage(this.weapon.walk_right, this.x - this.handler.getGameCamera().getxOffset() + 7, this.y - this.handler.getGameCamera().getyOffset() + 11, 64, 32);
				}
			}

			if (this.state === 'jumping') {
				_g.myDrawImage(this.getCurrentAnimationFrame(), this.x - this.handler.getGameCamera().getxOffset(), this.y - this.handler.getGameCamera().getyOffset(), this.assets.width, this.assets.height);
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
			// _g.fillStyle = "red";
			// _g.fillRect(this.bounds.x + this.x - this.handler.getGameCamera().getxOffset(), this.bounds.y + this.y - this.handler.getGameCamera().getyOffset(), this.bounds.width, this.bounds.height);
			// ****** DRAW BOUNDING BOX DON'T DELETE!!

			// ****** DRAW WEAPON BOUNDING BOX DON'T DELETE!!
			// _g.fillStyle = "green";
			// _g.fillRect(this.weapon.bounds.x + this.x - this.handler.getGameCamera().getxOffset(), this.weapon.bounds.y + this.y - this.handler.getGameCamera().getyOffset(), this.weapon.bounds.width, this.weapon.bounds.height);
			// ****** DRAW BOUNDING BOX DON'T DELETE!!
		},
		getInput: function(_dt){
			this.xMove = 0;
			this.yMove = 0;

			if (this.state === 'moving') {
				if (this.handler.getKeyManager().up || this.handler.getKeyManager().upArrow) {
					this.yMove = -this.speed * _dt;
				}
				if (this.handler.getKeyManager().down || this.handler.getKeyManager().downArrow) {
					this.yMove = this.speed * _dt;
				}
				if (this.handler.getKeyManager().left || this.handler.getKeyManager().leftArrow) {
					this.xMove = -this.speed * _dt;
				}
				if (this.handler.getKeyManager().right || this.handler.getKeyManager().rightArrow) {
					this.xMove = this.speed * _dt;
				}
				if(this.handler.getKeyManager().space){
					this.jump();
				}
				return;
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
		},
		getWeaponCollisionBounds: function(xOffset, yOffset){
			return new Rectangle(this.weapon.bounds.x + this.x - this.handler.getGameCamera().getxOffset(),
														this.weapon.bounds.y + this.y - this.handler.getGameCamera().getyOffset(),
														this.weapon.bounds.width, this.weapon.bounds.height);

		},
		jump: function () {
			const theCastle = this.handler.getWorld().getEntityManager().getSingleEntity('castle');
			const castleCenterX = Math.round(theCastle.x + (theCastle.width / 2));
			const castleCenterY = Math.round(theCastle.y + (theCastle.height / 2));
			const playerCenterX = Math.round(this.x + (this.width / 2));
			const playerCenterY = Math.round(this.y + (this.height / 2));

			console.log({
				theCastle,
				castleX: theCastle.x,
				castleY: theCastle.y,
				castleWidth: theCastle.width,
				castleHeight: theCastle.height,
				castleCenterX,
				castleCenterY,
			});

			playerLeap.beginX = playerCenterX;
			playerLeap.beginY = playerCenterY;

			//X-AXIS If you are not within 100 yards of the castle, then leap NEXT to it
			if ((playerCenterX > (castleCenterX + 99)) || playerCenterX < (castleCenterX - 99) && (playerCenterY > (castleCenterY + 99)) || (playerCenterY < (castleCenterY - 99))) {
				console.log("NOT WITHIN 100 OF CASTLE");
				playerLeap.endX = (castleCenterX + theCastle.x) * Math.sign(castleCenterX - this.x);
				//X-AXIS else if you are within 100 yards of the castle, leap OVER it.
			} else {
				console.log("YES WITHIN 100 OF CASTLE");
				playerLeap.endX = ((this.x - castleCenterX) - theCastle.x) * Math.sign(castleCenterX - this.x);
			}

			//Y-AXIS If you are not within 100 yards of the castle, then leap NEXT to it
			if ((playerCenterY > (castleCenterY + 99)) || playerCenterY < (castleCenterY - 99) && (playerCenterY > (castleCenterY + 99)) || (playerCenterY < (castleCenterY - 99))) {
				console.log("NOT WITHIN 100 OF CASTLE");
				playerLeap.endY = (castleCenterY + theCastle.y) * Math.sign(castleCenterY - this.y);
				//Y-AYIS else if you are within 100 yards of the castle, leap OVER it.
			} else {
				console.log("YES WITHIN 100 OF CASTLE");
				playerLeap.endY = ((this.y - castleCenterY) - theCastle.y) * Math.sign(castleCenterY - this.y);
			}

			const leapSteps = 50;
			playerLeap.xSpeed = Math.abs(Math.round((playerLeap.beginX - playerLeap.endX) / 50));
			playerLeap.ySpeed = Math.abs(Math.round((playerLeap.beginY - playerLeap.endY) / 50));
			this.state = 'jumping';
		}
	});

	return Player;
});