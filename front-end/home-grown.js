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

    $("#create-button").click(function () {
        $.ajax({
            type: 'POST',
            url: "http://lmu-diabolical.appspot.com/characters",
            data: JSON.stringify({
                name: $("#name").val(),
                classType: $("#classType").val(),
                gender: $("#gender").val(),
                level: $("#level").val(),
                money: $("#money").val()
            }),
            contentType: "application/json",
            dataType: "json",
            accept: "application/json",
            complete: function (jqXHR, textStatus) {
                // The new character can be accessed from the Location header.
                window.alert("You may access the new character at:" +
                    jqXHR.getResponseHeader("Location"));
            }
        });
    });

    $("#create-button").click(function () {
        $.ajax({
            type: 'DELETE',
            url: "http://lmu-diabolical.appspot.com/characters/5891733057437696",
            success: function (data, textStatus, jqXHR) {
                console.log("Gone baby gone.");
            }
        });
    });
});

