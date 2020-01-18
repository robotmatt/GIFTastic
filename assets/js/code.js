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

function drawGif() {
    var gifDiv = $("<div>").addClass("col-md-4");
    var cardDiv = $("<div>").addClass("card mb-4 shadow-sm");
    //var img = $("<img>");
    var img = '<svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail">      <title>Placeholder</title>           <rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef"       dy=".3em">Thumbnail</text>        </svg>';
    var cardBody = $("<div>").addClass("card-body");
    var cardText = $("<p>").addClass("card-text");
    var btnContainer = $("<div>").addClass("d-flex justify-content-between align-items-center");
    var btnGroup = $("<div>").addClass("btn-group");
    var viewBtn = $("<button>").addClass("btn btn-sm btn-outline-secondary");
    var editBtn = $("<button>").addClass("btn btn-sm btn-outline-secondary");

    cardText.text("This is a wider card with supporting text below as a natural lead-in to additional content.");
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

function drawButtons(topicList){
    topicList.forEach(function(element, index) {
        let button = $("<a>");
        button.attr("href", "#");
        button.addClass("btn btn-primary m-1").text(element);
        $("#buttons-here").append(button);
        
    });
}



$(document).ready(function () {
    $("#gif-display").append(drawGif);
    drawButtons(topics);
});