define(['Jquery'], function($){

	var Utils = {};

	Utils.loadFileAsString = function(_path){
		var string = "";
		$.ajax({
			url: _path,
			type: "get",
			async: false,
			success: function(_contents){
				string = _contents;
			},
			error: function(){
				alert("file:'" + _path + "' can not be loaded.");
			}
			});

		return string;
	};

	return Utils;

});