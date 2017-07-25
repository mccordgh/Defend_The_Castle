define(['Entity'], function(Entity){

	let Helper = Entity.extend({
		init: function(_x, _y){
			this._super(_x, _y);
		}
	});

	return Helper;
});