// Api Key:
// WMaZObMR3Qzek7ox7SpntqBYQBFfX5yF
$(document).ready(function(){

    var searchArray = ["cat", "dog", "bird", "fish", "plane", "cars", "hamburger", "hotdog", "pizza", "coffee"];

    function displayImg(){

        $("#display-images").empty();
        var input = $(this).attr("data-name");
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=WMaZObMR3Qzek7ox7SpntqBYQBFfX5yF";   

        $.ajax({
            url: queryURL, 
            method: "GET"
        }).done(function(response) {

            for(var j = 0; j < limit; j++) {    

                var displayDiv = $("<div>");
                displayDiv.addClass("holder");
            
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
                displayDiv.append(p)

                $("#display-images").append(displayDiv);
            }
        });
    }

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

    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);
});










// ==================================================================================
// $(function() {
//     populateButtons(searchArray, 'searchButton', '#buttonsArea');
// })
// // Buttons that will load automatically to the page
// var searchArray = ["dog", "cat", "bird", "Denzel Washington", "Will Smith", "Chuck Norris", "Turkish"];

// // Adding buttons 
// function populateButtons(searchArray,classToAdd,areaToAddTo){
//     $(areaToAddTo).empty();
//     for(var i=0; i<searchArray.length; i++){
//         var a = $("<button>");
//         a.addClass(classToAdd);
//         a.attr("data-type", searchArray[i]);
//         a.text(searchArray[i]);
//         $(areaToAddTo).append(a);

//     }
// }

// // Getting the gifs from giphy and displaying it to the page
// $("#searches").empty();
// $(document).on("click", ".searchButton", function(){
//     var type = $(this).data("type");
//     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=WMaZObMR3Qzek7ox7SpntqBYQBFfX5yF&limit=10";
//     $.ajax({
//     url: queryURL,
//     method: "GET"
//     }).done(function(response) {
//     for(var i=0; i < response.data.length; i++){
//         var searchDiv = $('<div class="search-item">');
//         var rating = response.data[i].rating;
//         var p = $("<p>").text("Rating: " +rating);
//         var animated = response.data[i].images.fixed_height.url;
//         var still = response.data[i].images.fixed_height_still.url;
//         var image = $('<img>');
//         image.attr('src', still);
//         image.attr('data-still', still);
//         image.attr('data-animated', animated);
//         image.attr('data-state','still');
//         image.addClass('searchImage');
//         searchDiv.append(p);
//         searchDiv.append(image);
//         $('#searches').append(searchDiv);
//         }
//     })
// })

// // Switching between still and animated state
// $(document).on('click', '.searchImage',function(){
//     var state = $(this).attr('data-state');
//     if(state == 'still'){
//         $(this).attr('src',$(this).data('animated'));
//         $(this).attr('data-state', 'animated');
//     } else {
//         $(this).attr('src',$(this).data('still'));
//         $(this).attr('data-state', 'still');
//     }
// })

// // Adding new button
// $('#addSearch').on('click',function(){
//     var newSearch = $('#input').eq(0).val();
//     searchArray.push(newSearch);
//     populateButtons(searchArray, 'searchButton','#buttonsArea');
//     return false;
// })
