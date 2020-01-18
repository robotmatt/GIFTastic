let topics = [
    "Cool",
    "Waiting",
    "Hello",
    "Alright",
    "Laughing",
    "No",
    "Happy",
    "Dancing"
]

function drawGif(element) {
    // log the element 
    console.log(element);
    var gifDiv = $("<div>").addClass("col-md-4 gif-div");
    var cardDiv = $("<div>").addClass("card mb-4 shadow-sm");
    var img = $("<img>");
    img.attr("src", element.images.fixed_height_still.url);
    img.addClass("gif-img");
    img.attr("data-animate", element.images.fixed_height.url);
    img.attr("data-still", element.images.fixed_height_still.url)
    var cardBody = $("<div>").addClass("card-body");
    var cardText = $("<p>").addClass("card-text");
    var btnContainer = $("<div>").addClass("d-flex justify-content-between align-items-center");
    var btnGroup = $("<div>").addClass("btn-group");
    var downloadBtn = $("<button>").addClass("btn btn-sm btn-outline-secondary download");
    
    downloadBtn.attr("onclick", "window.open('" + element.images.original.url + "')");

    cardText.text(element.title);
    cardText.append($("<p>").text("Rating: " + element.rating.toUpperCase()));
    downloadBtn.text("Download");

    gifDiv.append(cardDiv);
    cardDiv.append(img);
    cardDiv.append(cardBody);
    cardBody.append(cardText);
    cardBody.append(btnContainer);
    btnContainer.append(btnGroup);
    btnGroup.append(downloadBtn);
    return gifDiv;
}

function drawButtons(topicList) {
    // Remove the current buttons
    $(".gif-btn").remove();

    // Redraw all of the buttons
    topicList.forEach(function (element, index) {
        let button = $("<a>");
        button.attr("href", "#");
        button.attr("data-index", index);
        button.addClass("btn btn-primary m-1 gif-btn").text(element);
        $("#buttons-here").append(button);
    });
}
$(document).on("click", ".gif-img", function () {
    if($(this).attr("src") === $(this).attr("data-still")){
        $(this).attr("src", $(this).attr("data-animate"));
    } else{
        $(this).attr("src", $(this).attr("data-still"));
    }
});
$(document).on("click", ".animate", function () {
    if($(this).attr("src") === $(this).attr("data-still")){
        $(this).attr("src", $(this).attr("data-animate"));
    } else{
        $(this).attr("src", $(this).attr("data-still"));
    }
});
$(document).on("click", ".pause", function () {
    $(this).attr("src", $(this).attr("data-still"));
});

$(document).on("click", ".gif-btn", function () {
    // Remove current GIFs
    $(".gif-div").remove();

    // Set up the query url to use the gify API
    var apiKey = "T74dMsmdTp3yeLjLoyQNCm8jN3J2Szu3";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&limit=12&offset=0&rating=PG-13&lang=en&q=" + topics[$(this).attr("data-index")];
    console.log(queryURL);
    // Sets up the jQuery ajax function to pull from the giphy API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // ajax function callback. Do something with the response!
        .then(function (response) {
            console.log(response);

            response.data.forEach(function (element, index) {
                $("#gif-display").append(drawGif(element));
            });
        });
});

$("#new-phrase-btn").on("click", function(){
    event.preventDefault();
    topics.push($("#new-phrase-input").val().trim());
    $("#new-phrase-input").val("");
    drawButtons(topics);
})


$(document).ready(function () {
    drawButtons(topics);
});