define(['Tile'], function(Tile){

	let StoneTile = Tile.extend({
		init: function(_id){
			this._super(Tile.assets.stone, _id);
		},
		isSolid: function(){
			return true;
		}
	});

	return StoneTile;
});