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
    console.log(element);
    var gifDiv = $("<div>").addClass("col-md-4");
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
    var viewBtn = $("<button>").addClass("btn btn-sm btn-outline-secondary");
    var editBtn = $("<button>").addClass("btn btn-sm btn-outline-secondary");

    cardText.text(element.title);
    viewBtn.text("View");
    editBtn.text("Edit");

    gifDiv.append(cardDiv);
    cardDiv.append(img);
    cardDiv.append(cardBody);
    cardBody.append(cardText);
    cardBody.append(btnContainer);
    btnContainer.append(btnGroup);
    btnGroup.append(viewBtn);
    btnGroup.append(editBtn);
    return gifDiv;
}

function drawButtons(topicList) {
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

$(document).on("click", ".gif-btn", function () {

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



$(document).ready(function () {
    //$("#gif-display").append(drawGif);
    drawButtons(topics);
});