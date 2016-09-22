//Global variables
var gDocLoading         = false;
var gStart              = 0;

//Create an array with the path/url from the items of the list
//Then append the result HTML from each url, from a start-end using an offset
function getNext(begin, offset, url){

    //When it should stop?
    var end = ( parseInt(begin) + parseInt(offset));

    numOfUrlsToLoad = url.length-1;

    //var << end >> can't be higher than the rest of url's to load.
    if (end > numOfUrlsToLoad) end = numOfUrlsToLoad;
    //Check if our array length is greater than the next index
    if (numOfUrlsToLoad > begin) {
        for (i = begin; i < end; i++) {
            if (i<url.length) {
                $.ajax({
                    type: "GET",
                    url: url[i],
                    async: false,
                    success: function (text) {
                        //Append the text and show with a fade animation.
                        var newData = $('<div>').html(text);
                        $('#infiniteScrollingLoader').append(newData);
                        newData.hide().fadeIn("slow");
                        //Stop flag
                        gDocLoading = false;
                        //New value for the starting index of url array.
                        gStart = end;
                    },
                    error: function (ajaxContext) {
                        console.log("Error getting the next item at the url: "+url[i])
                        gDocLoading =true;
                    }
                });
            } else {
                gDocLoading = true;
            }
        }
    }
    return true;
}
$(document).ready(function() {
    var url             = $('#infiniteScrollerInit').attr('url').split(',');
    gStart              = parseInt($('#infiniteScrollerInit').attr('start'));
    var finish          = parseInt($('#infiniteScrollerInit').attr('finish'));
    //Check if the placeholder for the loaded HTML exist.
    if($("#infiniteScrollingLoader").length == 0) {
        //it doesn't exist
        $("#infiniteScrollerMessage").toggle();
    } else {
        $(window).scroll(function () {
            if ((!gDocLoading) && (($(window).scrollTop() + $(window).height()) >= ( $(document).height() - $(".footer-v1").height()))) {
                //Stop flag
                gDocLoading = true;
                //Get next series of items to show
                getNext(gStart, finish,url);
            }
        });
    }
});