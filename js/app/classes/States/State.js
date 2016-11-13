define(['Class'], function(Class){

	var currentState = null;

	var State = Class.extend({
		init:function(_handler){
			this.handler = _handler;
		}
	});

	State.prototype.tick = function(_dt){

	};

	State.prototype.render = function(_g){

	};

	State.getState = function(){
		return currentState;
	};

	State.setState = function(_state){
		currentState = _state;
	};

	return State;

});