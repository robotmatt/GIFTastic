// Variable: topics
// list of detaul topics to get GIFs for
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

// Function: drawGif {array} 
// Draws the GIFs on the page based on the GIFY API response
function drawGif(element) {
    // log the element 
    console.log(element);

    // Create the display elements
    var gifDiv = $("<div>").addClass("col-md-4 gif-div");
    var cardDiv = $("<div>").addClass("card mb-4 shadow-sm");
    var img = $("<img>");
    var cardBody = $("<div>").addClass("card-body");
    var cardText = $("<p>").addClass("card-text");
    var btnContainer = $("<div>").addClass("d-flex justify-content-between align-items-center");
    var btnGroup = $("<div>").addClass("btn-group");
    var downloadBtn = $("<button>").addClass("btn btn-sm btn-outline-secondary download");
    
    // set the download button properties
    downloadBtn.attr("onclick", "window.open('" + element.images.original.url + "')");

    // set the image properties
    img.attr("src", element.images.fixed_height_still.url);
    img.addClass("gif-img");
    img.attr("data-animate", element.images.fixed_height.url);
    img.attr("data-still", element.images.fixed_height_still.url)

    // set the text for the image
    cardText.text(element.title);
    cardText.append($("<p>").text("Rating: " + element.rating.toUpperCase()));
    downloadBtn.text("Download");

    // add all the various divs to eachother
    gifDiv.append(cardDiv);
    cardDiv.append(img);
    cardDiv.append(cardBody);
    cardBody.append(cardText);
    cardBody.append(btnContainer);
    btnContainer.append(btnGroup);
    btnGroup.append(downloadBtn);

    // return the jQuery object to be displayed
    return gifDiv;
}

// Funcation: drawButtons {array}
// Take in an array of topics and draw them on the page
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

// On click function of the gif-img class
// Starts or stops the animation of the GIF
$(document).on("click", ".gif-img", function () {
    // if the source is still, then animate it
    if($(this).attr("src") === $(this).attr("data-still")){
        $(this).attr("src", $(this).attr("data-animate"));
    } else { // otherwise stop it
        $(this).attr("src", $(this).attr("data-still"));
    }
});

// On click function of the gif-btn class
// Loads GIFs based on the button that was clicked
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
                // Draw the gifs on the page
                $("#gif-display").append(drawGif(element));
            });
        });
});

// On click function to add a new button
// Adds a button to the page based on the input
$("#new-phrase-btn").on("click", function(){
    event.preventDefault();
    let value = $("#new-phrase-input").val().trim();

    // if the value isn't null, then push it to the list and redraw the buttons
    if(value){
        topics.push(value);
        $("#new-phrase-input").val("");
        drawButtons(topics);
    }
    
})


$(document).ready(function () {
    // Draw the initial set of topics when the page loads
    drawButtons(topics);
});