define(['Class', 'Rectangle', 'Tile'], function(Class, Rectangle, Tile){

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
				if (!(e.x > e.handler.getWidth() + e.handler.getGameCamera().getxOffset()) && !(e.y > e.handler.getHeight() + e.handler.getGameCamera().getyOffset()))
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
		getSingleEntity(_type) {
			let entityObj;

			entities.forEach((item, index) => {
				if (item.type === _type) {
					entityObj = {
						type: item.type,
						x: item.x,
						y: item.y
					};
				}
			});

			return entityObj;
		},
		addEntity: function(e){
			entities.push(e);
			handler.getWorld().getSpatialGrid().insert(new Rectangle(e.x + e.bounds.x, e.y + e.bounds.y, e.bounds.width, e.bounds.height), e);
		},
		removeEntity: function(_entity){
			for (let i = 0; i < entities.length; i++){
				var e = entities[i];
				if (e === _entity){
					entities.splice(i, 1);
				}
			}
		},
		removeAllMonsters: function(){
			for (let i = 0; i < entities.length; i++){
				var e = entities[i];
				if (e.type === 'monster'){
					entities.splice(i, 1);
				}
			}
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