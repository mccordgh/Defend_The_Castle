define(['Tile'], function(Tile){

	var GrassTile = Tile.extend({
		init: function(_id){
			this._super(Tile.assets.grass, _id);
		}		
	});

	return GrassTile;
});