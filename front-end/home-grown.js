$(function () {

	$("#search-button").click(function () {
		$.getJSON(
    		"http://lmu-diabolical.appspot.com/characters",
    		function (characters) {
    			$("#table").append("<tr>" + "<th>Character ID</th>" + "<th>Class Type</th>" + "<th>Gender</th>"
        								+ "<th>Level</th>" + "<th>Money</th>" + "<th>Name</th>" + "</tr>");
        		characters.forEach(function (character) {
    			    $("#table").append( "<tr>" + "<td>"+ character.id + "</td>" + "<td>" + character.classType + "</td>"
    			    					+ "<td>" + character.gender + "</td>" + "<td>" + character.level + "</td>" + "<td>" + character.money + "</td>" + 
    			    					"<td>" + character.name + "</td>" + "</tr>");
        		});
    		}
		);
	});

});

