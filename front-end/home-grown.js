$(function () {

	$("#search-button").click(function () {
		$.getJSON(
    		"http://lmu-diabolical.appspot.com/characters",
    		function (characters) {
        		// Do something with the character list.
        		characters.forEach(function (character) {
        			document.write(character.id, character.classType);
        			document.write("<br>");
        		});

        		var linebreak = "<br />"
var my_var = "Hello World!"

document.write(my_var)
document.write(linebreak)

my_var = "I am learning JavaScript!"
document.write(my_var)
document.write(linebreak)

my_var = "Script is Finishing up..."
document.write(my_var)
				/*var items = [];
				$.each( characters, function( key, val ) {
				    items.push( "<li id='" + key + "'>" + val + "</li>" );
				  });
				  $( "<ul/>", {
				    "class": "my-new-list",
				    html: items.join( "" )
				  }).appendTo( "body" );*/
    		}
		);
	});

});

