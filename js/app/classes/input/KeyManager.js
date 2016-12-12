define(['Class'], function(Class){

	var keys = [];

	var KeyManager = Class.extend({
		init:function(){

		},
		tick: function(){
			this.up = keys[87];
			this.upArrow = keys[38];
			this.down = keys[83];
			this.downArrow = keys[40];
			this.left = keys[65];
			this.leftArrow = keys[37];
			this.right = keys[68];
			this.rightArrow = keys[39];
			this.space = keys[32];
			this.a = keys[65];
			this.j = keys[74];
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