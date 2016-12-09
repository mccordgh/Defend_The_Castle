define(['StaticEntity', 'Tile', 'Assets'], function(StaticEntity, Tile, Assets){

	var assets = Assets.getAssets("tree");

	var Tree = StaticEntity.extend({
		init: function(_handler, _x, _y){
			this._super(_handler, _x, _y, Tile.TILE_WIDTH * 4, Tile.TILE_HEIGHT * 4);
			this.bounds.x = 21;
			this.bounds.y = 35;
			this.bounds.width = 20;
			this.bounds.height = 25;
			this.type = 'static';
			this.width = 64;
			this.height = 64;
		},
		tick: function(){

		},
		render: function(_g){
			_g.myDrawImage(assets.redwood, 
							this.x - this.handler.getGameCamera().getxOffset(),
							this.y - this.handler.getGameCamera().getyOffset(), 
							this.width, 
							this.height);

		// ****** DRAW BOUNDING BOX DON'T DELETE!!
		// _g.fillStyle = "blue";
		// _g.fillRect(this.bounds.x + this.x - this.handler.getGameCamera().getxOffset(), this.bounds.y + this.y - this.handler.getGameCamera().getyOffset(), this.bounds.width, this.bounds.height);
		// ****** DRAW BOUNDING BOX DON'T DELETE!!
		}

	});

	return Tree;
});