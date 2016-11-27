define(['StaticEntity', 'Tile', 'Assets'], function(StaticEntity, Tile, Assets){

	var assets = Assets.getAssets("tree");

	var Tree = StaticEntity.extend({
		init: function(_handler, _x, _y){
			this._super(_handler, _x, _y, Tile.TILE_WIDTH * 4, Tile.TILE_HEIGHT * 4);
			this.bounds.x = 45;
			this.bounds.y = 100;
			this.bounds.width = 40;
			this.bounds.height = 5;
		},
		tick: function(){

		},
		render: function(_g){
			_g.myDrawImage(assets.redwood, this.x - this.handler.getGameCamera().getxOffset(),
				this.y - this.handler.getGameCamera().getyOffset(), this.width, this.height);
			// _g.fillRect(this.bounds.x - this.handler.getGameCamera().getxOffset(),
				// this.bounds.y - this.handler.getGameCamera().getyOffset(), this.bounds.width, this.bounds.height);
		}

	});

	return Tree;
});