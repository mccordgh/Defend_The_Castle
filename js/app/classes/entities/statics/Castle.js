define(['StaticEntity', 'Tile', 'Assets'], function(StaticEntity, Tile, Assets){

	var assets = Assets.getAssets("castle");

	var Castle = StaticEntity.extend({
		init: function(_handler, _x, _y){
			this._super(_handler, _x, _y, Tile.TILE_WIDTH * 4, Tile.TILE_HEIGHT * 4);
			this.bounds.x = 0;
			this.bounds.y = 0;
			this.bounds.width = 80;
			this.bounds.height = 80;
			this.height = 80;
			this.width = 80;
			this.type = 'static';
		},
		tick: function(){

		},
		render: function(_g){
			_g.myDrawImage(assets.sprite, 
							this.x - this.handler.getGameCamera().getxOffset(),
							this.y - this.handler.getGameCamera().getyOffset(), 
							this.width, 
							this.height);
			// _g.fillStyle = "green";
			// _g.fillRect(this.bounds.x + this.x - this.handler.getGameCamera().getxOffset(), this.bounds.y + this.y - this.handler.getGameCamera().getyOffset(), this.bounds.width, this.bounds.height);
		}

	});

	return Castle;
});