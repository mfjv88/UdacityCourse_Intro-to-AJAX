function loadData() {

    var $body = $('body');
    var $wikiHeaderElem = $('#wikipedia-header');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $("#street").val();
    var city = $("#city").val();
    var address = street + ', ' + city;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append("<img class='bgimg' src='" + streetviewUrl + "'>");
    // YOUR CODE GOES HERE
    var nytimesUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + address + "&sort=newest&api-key=a16e048e335445438f1c435668ebcd4d"
    $.getJSON(nytimesUrl, function(data) {
        console.log(data);
        $nytHeaderElem.text("New York Times Articles about " + address + "!");

        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '"> ' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
        };
    }).error(function() {
        $nytHeaderElem.text("New York Times Articles could not be loaded");
    });
    // Wikipedia API
    var wikiUrl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + city + "&format=json&callback=wikiCallback";
    var wikiRequestTimeout = setTimeout(function(){
      $wikiElem.text("failed to get wikipedia resources");
    }, 8000);
    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        success: function(response) {
            $wikiHeaderElem.text('Wiki article about ' + city);
            var articles = response[1];
            for (var i = 0; i < articles.length; i++) {
                var article = articles[i];
                var url = 'http://en.wikipedia.org/wiki/' + article;
                $wikiElem.append('<li><a href="' + url + '">' +
                    article + '</a></li>');
            };

            clearTimeout(wikiRequestTimeout);
        },
        error: function(e) {
            $wikiHeaderElem.text('Cannot get article');
        }
    });

    return false;
};

$('#form-container').submit(loadData);
