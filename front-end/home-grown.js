$(function () {

	$("#search-button").click(function () {
		$.getJSON(
    		"http://lmu-diabolical.appspot.com/characters",
    		function (characters) {
        		// Do something with the character list.
        		characters.forEach(function (character) {
            		console.log(character);
        		});
    		}
		);
	});

});