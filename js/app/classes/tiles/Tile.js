define(['Class', 'Assets'], function(Class, Assets){

	let TILE_WIDTH = 16;
	let TILE_HEIGHT = 16;

	let tiles = [];

	let Tile = Class.extend({
		init: function(_texture, _id){
			this.texture = _texture;
			this.id = _id;
			tiles[_id] = this;
		},
		tick: function(_dt){

		},
		render: function(_g, _x, _y){
			_g.myDrawImage(this.texture, _x, _y, TILE_WIDTH, TILE_HEIGHT);
		},
		getId: function(){
			return this.id;
		},
		isSolid: function(){
			return false;
		}
	});

	Tile.tiles = tiles;
	Tile.TILE_WIDTH = TILE_WIDTH;
	Tile.TILE_HEIGHT = TILE_HEIGHT;
	Tile.assets = Assets.getAssets("tiles");

	return Tile;
});