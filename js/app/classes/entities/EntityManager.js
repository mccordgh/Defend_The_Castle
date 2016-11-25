define(['Class'], function(Class){

	var handler, player, entities;


	var EntityManager = Class.extend({
		init: function(_handler, _player){
			handler = _handler;
			player = _player;
			entities = new Array(player);
		},
		tick: function(_dt){
			entities.sort(compare);
			for(var i = 0; i < entities.length; i++){
				var e = entities[i];
				e.tick(_dt);
			}
		},
		render: function(_g){
			entities.forEach(function(e){
				e.render(_g);
			});
		},
		getPlayer: function(){
			return player;
		},
		getHandler: function(){
			return handler;
		},
		getEntities: function(){
			return entities;
		},
		addEntity: function(e){
			entities.push(e);
		}

	});

	function compare(a, b){
		let aY = a.getY();
		let bY = b.getY();
		let aH = a.getHeight();
		let bH = b.getHeight();
		if (aY + aH === bY + bH)  return 0;
		if (aY + aH < bY + bH) return -1;
		return 1;
	}

	return EntityManager;
});