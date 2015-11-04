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
        $("#create-button").click(function () {
            $.ajax({
                type: 'POST',
                url: "http://lmu-diabolical.appspot.com/characters",
                data: JSON.stringify({
                    name: $("#name").val(),
                    classType: $("#classType").val(),
                    gender: "MALE",  // $("#gender").val(),
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
    });

    $("#search-button").click(function () {
        $.getJSON(
            "http://lmu-diabolical.appspot.com/characters/" + $("#searchCharacter").val(),
            function (character) {
                // Do something with the character.
                console.log(character);
            }
        );
    });

    $("#modify-button").click(function () {
        $.ajax({
            type: 'PUT',
            url: "http://lmu-diabolical.appspot.com/characters/" + $("#characterId2").val(),
            data: JSON.stringify({
                id: $("#characterId2").val(),
                name: $("#name2").val(),
                classType: $("#classType2").val(),
                gender: "MALE", //$("#gender2").val(),
                level: $("#level2").val(),
                money: $("#money2").val()
            }),
            contentType: "application/json",
            dataType: "json",
            accept: "application/json",
            success: function (data, textStatus, jqXHR) {
                console.log("Done: no news is good news.");
            }
        });
    });

    $("#delete-button").click(function () {
        $.ajax({
            type: 'DELETE',
            url: "http://lmu-diabolical.appspot.com/characters/" + $("#deleteCharacter").val(),
            success: function (data, textStatus, jqXHR) {
                console.log("Gone baby gone.");
            }
        });
    });
});

