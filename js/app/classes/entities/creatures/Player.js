define(['Creature', 'Assets'], function(Creature, Assets){

	var Player = Creature.extend({
		init: function(_handler, _x, _y){
			this._super(_handler, _x, _y, Creature.DEFAULT_CREATURE_WIDTH, Creature.DEFAULT_CREATURE_HEIGHT);
			this.assets = Assets.getAssets('player');
			this.x = _x;
			this.y = _y;
			this.bounds.x = 0;
			this.bounds.y = 0;
			this.bounds.width = 32;
			this.bounds.height = 32;
		},
		tick: function(_dt){
			this.getInput(_dt);
			this.move();
			this.handler.getGameCamera().centerOnEntity(this);
		},
		render: function(_g){
			_g.myDrawImage(this.assets.idle, this.x - this.handler.getGameCamera().getxOffset(), this.y - this.handler.getGameCamera().getyOffset(), this.assets.width, this.assets.height);
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
		}
	
	});

	return Player;
});