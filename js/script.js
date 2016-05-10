
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    $(".bgimg").append("<img class='bgimg' src='https://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + street + ", " + city + "' alt='streetview' />");
    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);

var input = $( "button" ).click(function() {
  var street = $("#street").text();
  var city = $("#city").text();
  $(".bgimg").val(city, street);
});
