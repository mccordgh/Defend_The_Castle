define(['Class'],function(Class){

    let currentState = null;

    let State = Class.extend({
        init:function(_handler){
            this.handler = _handler;
        },
        tick:function(_dt){
            throw("Every state needs a tick");
        },
        render:function(_g){
            throw("Every state needs a render");
        }
    });
    State.getState = function(){
        return currentState;
    };
    State.setState = function(_state){
        currentState = _state;
    };

    return State;
});