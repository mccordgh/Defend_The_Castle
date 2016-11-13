define(['Creature', 'Assets'], function(Creature, Assets){

	var Player = Creature.extend({
		init: function(_handler, _x, _y){
			this._super(_handler, _x, _y, Creature.DEFAULT_CREATURE_WIDTH, Creature.DEFAULT_CREATURE_HEIGHT);
			this.assets = Assets.getAssets('player');
		},
		tick: function(_dt){
			this.getInput(_dt);
			this.move();
		},
		render: function(_g){
			_g.myDrawImage(this.assets.idle, this.x, this.y, this.assets.width, this.assets.height);
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
		}
	
	});

	return Player;
});