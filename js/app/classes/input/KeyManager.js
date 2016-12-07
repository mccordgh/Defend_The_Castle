define(['Class'], function(Class){

	var keys = [];

	var KeyManager = Class.extend({
		init:function(){

		},
		tick: function(){
			this.up = keys[87];
			this.down = keys[83];
			this.left = keys[65];
			this.right = keys[68];
			this.space = keys[32];
		}
	});

	window.onkeydown = function(e){
		keys[e.keyCode] = true;
	};

	window.onkeyup = function(e){
		keys[e.keyCode] = false;
	};

	return KeyManager;

});