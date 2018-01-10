var backHeight = 342;
var frontHeight = 180;

/**
 * Tells whether or not the widget is flippable (depending on the back width).
 * @param {Object} stockWidget - The stock widget to analyze.
 * @return {boolean} true if the widget is flippable.
 */
function isFlippable(stockWidget) {
    var backWidth = $(stockWidget).find(".back").width();
    // min required back width to allow the card to flip (width of image + space + width of arrow)
    var minWidthToFlip = 600;
    return backWidth >= minWidthToFlip;
}

/**
 * Initializes the flip function of the given stock widget
 * @param {Object} stockWidget - The stock widget to initialize
 */
function initFlip(stockWidget) {
    stockWidget.flip({
        axis: 'y',
        trigger: 'manual',
        forceWidth: false,
        forceHeight: false,
    }).find('.front, .back').css({
        'width': '100%',
        'height': '100%'
    });
}

/**
 * Tells whether or not the given stock widget has flipped (back side displayed)
 * /!\ It would have been cleaner if the library provided a boolean for this purpose.
 * @param {Object} stockWidget - The stock widgets to analyze
 * @return {boolean} true if the stock widget has flipped
 */
function isCardFlipped(stockWidget) {
    return $(stockWidget).height() === backHeight;
}

/**
 * Makes the given widget flip
 * @param {Object} stockWidget - the stock widget to analyze
 */
function flip(stockWidget, isEditModeEnabled, uuid) {
    var isFlippableWidget = isFlippable(stockWidget);

    if(!isEditModeEnabled && isFlippableWidget) {
        var isFlipped = isCardFlipped(stockWidget);
        if(isFlipped) {
            $(stockWidget).css("height", frontHeight + "px");
        } else {
            $(stockWidget).css("height", backHeight + "px");
        }
        $(stockWidget).flip("toggle");
    } else if(isFlippableWidget) {
        $("#not-flippable-due-to-editmode-alert" + uuid).show();
    }
}