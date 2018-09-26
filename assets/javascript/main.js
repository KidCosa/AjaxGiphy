var topics = ["bird", "cat", "dog", "shark", "giraffe"];

function renderButtons() {
    $("#buttonDump").empty();

    for (var i = 0; i < topics.length; i++) {
        var $button = $("<button>");
        $button.addClass("gifButton");
        $button.attr("data-name", topics[i]);
        $button.text(topics[i]);
        $("#buttonDump").append($button);
    }
}

$("#gifSubmit").on("click", function(event) {
    event.preventDefault();
    var newGif = $("#gifInput").val().trim();
    if ($.inArray(newGif, topics) === -1 && newGif != "") {
        topics.push(newGif);
        renderButtons();
        $("#gifInput").val("");
    } else {
        $("#gifInput").val("");
    }
});

function displayGifs() {
    var gifName = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifName + "&limit=10&api_key=k4JpkJhBkl96gMdXYowRC0jjvu3YzVw0";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("#gifDump").empty();
        for (var i = 0; i < response.data.length; i++) {
            var staticGif = response.data[i].images.fixed_height_still.url;
            var animatedGif = response.data[i].images.fixed_height.url;
            var gifDump = $("#gifDump");
            var gifHolder = $("<img>").attr({"src": staticGif, "data-still": staticGif, "data-animate": animatedGif, "data-state": "still"}).addClass("gif");
            var gifRating = $("<p>").text("RATING: " + response.data[i].rating);
            gifDump.append(gifHolder);
            gifDump.append(gifRating);
        }
        $(".gif").on("click", function() {
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animated");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    })
}

$(document).on("click", ".gifButton", displayGifs);
renderButtons();