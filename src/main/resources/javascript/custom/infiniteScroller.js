var docLoading = false;

//Create an array with the path/url from the items of the list
//Then append the result HTML from each url, from a start-end using an offset
function getNext(begin, offset){
    var url= $('#infiniteScrollerInit').attr('url').split(',');
    var start= $('#infiniteScrollerInit').attr('start');
    var finish= $('#infiniteScrollerInit').attr('finish');


    var end = begin + offset;



    //Check if our array length is greater than the next index
    if (url.length > begin) {
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
                        docLoading = false;
                        start = end;
                    },
                    error: function (ajaxContext) {
                        console.log("Error getting the next item at the url: "+url[i])
                        docLoading =true;
                    }
                });
            } else {
                docLoading = true;
            }
        }
    }
    return true;
}

$(document).ready(function() {
    var start= $('#infiniteScrollerInit').attr('start');
    var finish= $('#infiniteScrollerInit').attr('finish');
    //Check if the placeholder for the loaded HTML exist.
    if($("#infiniteScrollingLoader").length == 0) {
        //it doesn't exist
        $("#infiniteScrollerMessage").toggle();
    } else {
        $(window).scroll(function () {
            if (!docLoading && $(window).scrollTop() + $(window).height() == $(document).height()) {
                //stop flag
                docLoading = true;
                //Get next series of items to show
                getNext(start, finish);
            }
        });
    }
});