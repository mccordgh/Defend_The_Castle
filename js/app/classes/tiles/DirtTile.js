define(['Tile'], function(Tile){

	let DirtTile = Tile.extend({
		init: function(_id){
			this._super(Tile.assets.dirt, _id);
		}		
	});

	return DirtTile;
});