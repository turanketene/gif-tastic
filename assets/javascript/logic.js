// Api Key:
// WMaZObMR3Qzek7ox7SpntqBYQBFfX5yF
$(document).ready(function(){
    // List that will automatically be on the page at all times
    var searchArray = ["cat", "dog", "bird", "fish", "plane", "cars", "hamburger", "hotdog", "pizza", "coffee", "Denzel Washington", "Brad Pitt", "Lionel Messi", "Cristiano Ronaldo", "motorcycle","ocean"];

    function displayImg(){
    // empty div to avoid repetition
        $("#display-images").empty();
        // Calling gifs using API
        var input = $(this).attr("data-name");
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=WMaZObMR3Qzek7ox7SpntqBYQBFfX5yF";   

        $.ajax({
            url: queryURL, 
            method: "GET"
        }).done(function(response) {

            for(var j = 0; j < limit; j++) {    
                // Creating div to display gifs in
                var displayDiv = $("<div>");
                displayDiv.addClass("holder");
                // Creating image element to store gifs, then adding various attributes
                var image = $("<img>");
                image.attr("src", response.data[j].images.original_still.url);
                image.attr("data-still", response.data[j].images.original_still.url);
                image.attr("data-animate", response.data[j].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);

                var rating = response.data[j].rating;
                console.log(response);
                var p = $("<p>").text("Rating: " + rating);
                displayDiv.prepend(p);

                $("#display-images").append(displayDiv);
            }
        });
    }

    // Adding new buttons after entering text and submitting
    function renderButtons(){ 

        $("#display-buttons").empty();

        for (var i = 0; i < searchArray.length; i++){

            var newButton = $("<button>") 
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")  
            newButton.attr("data-name", searchArray[i]); 
            newButton.text(searchArray[i]); 
            $("#display-buttons").append(newButton); 
        }
    }

    // Changing state between animated and still
    function imageChangeState() {          

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
    }

    $("#submitPress").on("click", function(){

        var input = $("#user-input").val().trim();
        form.reset();
        searchArray.push(input);
                
        renderButtons();

        return false;
    })

    renderButtons();
// Setting up onclicks
    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);
});
