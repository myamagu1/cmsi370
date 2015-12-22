(function ($) { // JD: 2

	var dragCan;

	var dragHandler = function (event) {
		dragCan.offset({left: event.pageX, top: event.pageY});
	};

	var dragCleanUp = function (event) {
		var options = dragCan.data('options');
		if (options && $.isFunction(options.trashCallback)) {
			options.trashCallback();
		}

		dragCan.remove();

		$("body").unbind("mousemove", dragHandler);
	}

	$.fn.trashable = function (options) {
		this.mousedown(function (event) {
			dragCan = $(event.target).clone()
				.addClass("can-being-dragged")
				.offset({left: event.pageX, top: event.pageY});

			$("body")
				.append(dragCan)
				.mousemove(dragHandler);

			dragCan.data({options: options});
			dragCan.mouseup(dragCleanUp);
		});		
	};

}(jQuery));