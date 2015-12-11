(function ($) {
    /**
     * Tracks a box as it is rubberbanded or moved across the drawing area.
     */
    var trackDrag = function (event) {
    $.each(event.changedTouches, function (index, touch) {
        event.preventDefault();
        // Don't bother if we aren't tracking anything.
        if (touch.target.movingBox) {
            var boxParent = $(touch.target.movingBox).parent(),
                parentWidth = boxParent.width(),
                parentHeight = boxParent.height();
                parentLeft = boxParent.offset().left,
                parentTop = boxParent.offset().top,
                parentRight = parentLeft + parentWidth,
                parentBottom = parentTop + parentHeight;

            // Reposition the object.
            touch.target.movingBox.offset ({
                left: touch.pageX - touch.target.deltaX,
                top: touch.pageY - touch.target.deltaY
            });

            //  Adds Deletion Highlight
            // JD: Nice non-hardcoded drawing area :)
            if (touch.pageX - touch.target.deltaX > parentRight || touch.pageY - touch.target.deltaY > parentBottom || 
                touch.pageX - touch.target.deltaX < parentLeft || touch.pageY - touch.target.deltaY < parentTop) {
                touch.target.movingBox.addClass("box-delete deletion-highlight");
            };
            
            /* Removes Deletion Highlight,
             * used if() instead of else() due to on-move oscillation between
             * box-highlight and deletion-highlight with else() 
             */
            if (touch.pageX - touch.target.deltaX <= parentRight && touch.pageY - touch.target.deltaY <= parentBottom && 
                touch.pageX - touch.target.deltaX >= parentLeft && touch.pageY - touch.target.deltaY >= parentTop) {
                touch.target.movingBox.removeClass("box-delete deletion-highlight");
            }
        }

        var cacheEntry = cache[touch.identifier];
        if (cacheEntry && cacheEntry.creation) {
            var createLeft, createTop, createWidth, createHeight;

            if (touch.pageX < cacheEntry.initialX) {
                createLeft = touch.pageX;
                createWidth = cacheEntry.initialX - touch.pageX;
                // JD: Some code duplication with the Y computations.  Pull out to a function maybe?
                if (touch.pageY < cacheEntry.initialY) {
                    createTop = touch.pageY;
                    createHeight = cacheEntry.initialY - touch.pageY;
                } else {
                    createTop = cacheEntry.initialY;
                    createHeight = touch.pageY - cacheEntry.initialY;
                }
            } else {
                createLeft = cacheEntry.initialX;
                createWidth = touch.pageX - cacheEntry.initialX;
                if (touch.pageY < cacheEntry.initialY) {
                    createTop = touch.pageY;
                    createHeight = cacheEntry.initialY - touch.pageY;
                } else {
                    createTop = cacheEntry.initialY;
                    createHeight = touch.pageY - cacheEntry.initialY;
                }
            }

            cacheEntry.creation
                .offset({
                    left: createLeft,
                    top: createTop
                })
                .width(createWidth)
                .height(createHeight);
        }
    });
    // var trackDrag = function (event) {
    //     $.each(event.changedTouches, function (index, touch) {
    //         // Don't bother if we aren't tracking anything.
    //         if (touch.target.movingBox) {
    //             // Reposition the object.
    //             touch.target.movingBox.offset({
    //                 left: touch.pageX - touch.target.deltaX,
    //                 top: touch.pageY - touch.target.deltaY
    //             });
    //         }
    //     });

        // Don't do any touch scrolling.
        event.preventDefault();
    };

    /**
     * Concludes a drawing or moving sequence.
     */
    var endDrag = function (event) {
        $.each(event.changedTouches, function (index, touch) {
            if (touch.target.movingBox) {
                // Change state to "not-moving-anything" by clearing out
                // touch.target.movingBox.
                touch.target.movingBox = null;
            }

            var cacheEntry = cache[touch.identifier];
                if (cacheEntry && cacheEntry.creation) {
                    // Do we want to keep it?
                    var $creation = $(cacheEntry.creation);
                    // JD: Yay, minimum size check!  To give "20" this meaning, it would probably
                    //     be good to stick it as another "private" variable like:
                    //
                    //     var MINIMUM_WIDTH = 20, MINIMUM_HEIGHT = 20;
                    if ($creation.width() < 20 || $creation.height() < 20) {
                        $creation.remove();
                    }

                    cacheEntry.creation.removeClass("creation-highlight");
                    cacheEntry.creation = null;
                    // Clean up.
                    delete cache[touch.identifier];
                }
            });
        };
    //     });
    // };

    /**
     * Indicates that an element is unhighlighted.
     */
    var unhighlight = function () {
        $(this).removeClass("box-highlight");
        if ($(this).hasClass("box-delete")) {
            $(this).remove();
        }
    };
    // var unhighlight = function () {
    //     $(this).removeClass("box-highlight");
    // };

    /**
     * Begins a box move sequence.
     */
    var startMove = function (event) {
        $.each(event.changedTouches, function (index, touch) {
        // Highlight the element.
        $(touch.target).addClass("box-highlight");

        // Take note of the box's current (global) location.
        var jThis = $(touch.target),
            startOffset = jThis.offset();

            // Set the drawing area's state to indicate that it is
            // in the middle of a move.
            touch.target.movingBox = jThis;
            touch.target.deltaX = touch.pageX - startOffset.left;
            touch.target.deltaY = touch.pageY - startOffset.top;
        });

        // Eat up the event so that the drawing area does not
        // deal with it.
        event.stopPropagation();
    };
    // var startMove = function (event) {
    //     $("#console").text("Inside startMove");
    //     $.each(event.changedTouches, function (index, touch) {
    //         $("#console").text("Processing touch " + touch.id);
    //         // Highlight the element.
    //         $(touch.target).addClass("box-highlight");

    //         // Take note of the box's current (global) location.
    //         var jThis = $(touch.target),
    //             startOffset = jThis.offset();

    //         // Set the drawing area's state to indicate that it is
    //         // in the middle of a move.
    //         touch.target.movingBox = jThis;
    //         touch.target.deltaX = touch.pageX - startOffset.left;
    //         touch.target.deltaY = touch.pageY - startOffset.top;
    //     });

    //     // Eat up the event so that the drawing area does not
    //     // deal with it.
    //     event.stopPropagation();
    // };

    /**
     * Sets up the given jQuery collection as the drawing area(s).
     */
    var setDrawingArea = function (jQueryElements) {
        // Set up any pre-existing box elements for touch behavior.
        jQueryElements
            .addClass("drawing-area")
            
            // Event handler setup must be low-level because jQuery
            // doesn't relay touch-specific event properties.
            .each(function (index, element) {
                //
                element.addEventListener("touchstart", startCreate, false);
                element.addEventListener("touchmove", trackDrag, false);
                element.addEventListener("touchend", endDrag, false);
            })

            .find("div.box").each(function (index, element) {
                element.addEventListener("touchstart", startMove, false);
                element.addEventListener("touchend", unhighlight, false);
                // element.velocity = { x: 0, y: 0 };
                // element.acceleration = { x: 0, y: 0 };
            });
    };
    
    // 
    var startCreate = function (event) {
        $.each(event.changedTouches, function(index, touch) {
            cacheEntry = { };

            cacheEntry.initialX = touch.pageX;
            cacheEntry.initialY = touch.pageY;

            var createdBox = '<div class="box" style="width: 0px; height: 0px; height: 0px; left:' 
            + touch.pageX + 'px; top: ' + touch.pageY + 'px">' + '</div>';

            $("#drawing-area").append(createdBox);
            cacheEntry.creation =  $("div div:last-child");
            cacheEntry.creation.addClass("creation-highlight");

            $("#drawing-area").find("div.box").each(function(index, element) {
                    element.addEventListener("touchstart", BoxesTouch.startMove, false);
                    element.addEventListener("touchend", BoxesTouch.unhighlight, false);
            });
        });
        event.stopPropagation();
    };

    // var lastTimeStamp = 0;
    // var FRAME_RATE = 10;
    // var MS_BETWEEN_FRAMES = 1000 / FRAME_RATE;
    // var updateBoxes = function (timestamp) {
    //     var timePassed = timestamp - lastTimeStamp;
    //     if (timePassed > MS_BETWEEN_FRAMES) {
    //         $("div.box").each(function (index, element) {
    //             var offset = $(element).offset();
    //             offset.left += element.velocity.x * timePassed;
    //             offset.top += element.velocity.y * timePassed;

    //             element.velocity.x += element.acceleration.x * timePassed;
    //             element.velocity.y += element.acceleration.y * timePassed;
    //             $(element).offset(offset);
    //         });

    //         lastTimeStamp = timestamp;
    //         $("#timestamp").text(delta);

    //         // Move the boxes... on. Their. Own!!!
    //         $("div.box").each(function (index) {
    //             var $box = $(this);
    //             var offset = $box.offset();

    //             var distance = 10.0 * delta / 1000;
    //             offset.top += Math.floor(distance);

    //             $box.offset(offset);
    //         });
    //         lastTimeStamp = timestamp;
        }

        window.requestAnimationFrame(updateBoxes);
    };

    $.fn.boxesTouch = function () {
        var element = $("#drawing-area");
        var elementOffset = element.offset();

        setDrawingArea(this);
        window.requestAnimationFrame(updateBoxes);

        window.addEventListener('devicemotion', function (event) {
            $("#console").text("x: " + event.accelerationIncludingGravity.x +
                "y: " + event.accelerationIncludingGravity.y);

            $("div.box").each(function (index, element) {
                element.acceleration.x = event.accelerationIncludingGravity.x /1000000;
                element.acceleration.y = -event.accelerationIncludingGravity.y /1000000;
            });
        });
    };
}(jQuery));