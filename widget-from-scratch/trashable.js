(function ($) {

	var dragCan;

	var dragHandler = function (event) {
		dragCan.offset({left: event.pageX, top: event.pageY});
	};

	var dragCleanUp = function (event) {
		dragCan.remove();
		$("body").unbind("mousemove", dragHandler);
	}

	$.fn.trashable = function () {
		this.mousedown(function (event) {
			dragCan = $(event.target).clone()
				.addClass("can-being-dragged")
				.offset({left: event.pageX, top: event.pageY});

			$("body")
				.append(dragCan)
				.mousemove(dragHandler);

			dragCan.mouseup(dragCleanUp);
		});		
	};

}(jQuery));