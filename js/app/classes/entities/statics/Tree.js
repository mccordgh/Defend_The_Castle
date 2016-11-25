define(['StaticEntity', 'Tile', 'Assets'], function(StaticEntity, Tile, Assets){

	var assets = Assets.getAssets("tree");

	var Tree = StaticEntity.extend({
		init: function(_handler, _x, _y){
			this._super(_handler, _x, _y, Tile.TILE_WIDTH * 4, Tile.TILE_HEIGHT * 4);
			this.bounds.x = 20;
			this.bounds.y = 20;
			this.bounds.width = 30;
			this.bounds.height = 30;
		},
		tick: function(){

		},
		render: function(_g){
			_g.myDrawImage(assets.redwood, this.x - this.handler.getGameCamera().getxOffset(),
				this.y - this.handler.getGameCamera().getyOffset(), this.width, this.height);
		}

	});

	return Tree;
});