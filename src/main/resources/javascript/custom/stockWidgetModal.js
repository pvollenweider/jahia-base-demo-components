var flipped = false;

$( document ).ready(function() {
    $(".stock-widget").flip({
        axis: 'y',
        trigger: 'click',
        forceWidth: false,
        forceHeight: false
    }).find('.front, .back').css({
        'width': '100%',
        'height': '100%'
    });

    $(".stock-widget").click(function(){
        var backHeight = "300px";
        var frontHeight = "180px";

        // if the back side is shown
        if(flipped === true) {
            $(".card.stock-widget").css('height', frontHeight);
        } else {
            $(".card.stock-widget").css('height', backHeight);
        }
    });
});


