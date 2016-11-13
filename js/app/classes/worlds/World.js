define(['Class', 'TileLoader'], function(Class, Tile){

	var World = Class.extend({
		init:function(_path){
			this.tiles = [];
			this.width = 5;
			this.height = 5;
			this.loadWorld(_path);
		},
		loadWorld: function(_path){
			for(x=0; x < this.width; x++){
				for(y=0; y < this.height; y++){
					if(!this.tiles[x])
						this.tiles[x] = [];
					
					this.tiles[x][y] = 0;
				}
			}
		},
		tick: function(_dt){

		},
		render: function(_g){
			for(y=0; y < this.height; y++){
				for(x=0; x < this.width; x++){
					this.getTile(x, y).render(_g, x * Tile.TILE_WIDTH, y * Tile.TILE_HEIGHT);
				}
			}
		},
		getTile: function(_x, _y){
			return Tile.tiles[this.tiles[x][y]];
		}

	});

	return World;
});