/*$(function () {
	$("#search-button").click(function () {
		$.getJSON(
    		"http://lmu-diabolical.appspot.com/characters",
    		function (characters) {
        		// Do something with the character list.
        		characters.forEach(function (character) {
        			document.write("&middot" + " Character ID: " + character.id + " ClassType: " + character.classType + 
        				" Gender: " + character.gender);
        			document.write("<br/>" + "<br/>");
        		});
    		}
		);
	});

});
*/


$(function () {

	$("#search-button").click(function () {
		$.getJSON(
    		"http://lmu-diabolical.appspot.com/characters",
    		function (characters) {
        		// Do something with the character list.
        		characters.forEach(function (character) {
    			    $("body").append($("<div></div>").text(" Character ID: " + character.id + " ClassType: " + character.classType +
                                    " Gender: " + character.gender));
        		});
    		}
		);
	});

});

