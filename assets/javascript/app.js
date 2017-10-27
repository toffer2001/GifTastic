
$(function() {
	generateButton(searchArray);
	console.log("Page loaded")
});

var searchArray = ["90s dance", "ballroom dance", "robot dance"];

function generateButton(searchArray) {
	$("#buttons").empty();
	for (var i = 0; i < searchArray.length; i++) {
		var a = $("<button>");
		a.addClass("searchButton");
		a.attr("data-type", searchArray[i]);
		a.text(searchArray[i]);
		$("#buttons").append(a);
	}
};


$(document).on("click", ".searchButton", function () {
	var type = $(this).data("type");
	console.log(type);
	var apiKey = "SQ9anfFcqrdmpYm2LF3r1nUQbW71Z8fO";
	var limit = 10;
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=" + apiKey + "&limit=" + limit;

	$.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(data) {
      console.log(data);
      $('#searches').empty();
      for (var i = 0; i < data.data.length; i++) {
      	var searchDiv = $('<div class="search-item">');
      	var rating = data.data[i].rating;
      	var p = $("<p>").text("Rating: " + rating);
      	var animated = data.data[i].images.fixed_height.url;
      	var still = data.data[i].images.fixed_height_still.url;
      	var image = $('<img>');
      	image.attr('src', still);
      	image.attr('data-still', still);
      	image.attr('data-animated', animated);
      	image.attr('data-state', 'still');
      	image.addClass('searchImage');
      	searchDiv.append(p);
      	searchDiv.append(image);
      	$('#searches').append(searchDiv);

      }

	});
})

$(document).on("click", ".searchImage", function(){
	var state = $(this).attr("data-state");
	if (state == "still") {
		$(this).attr('src', $(this).data("animated"));
		$(this).attr("data-state", "animated");
	} else {
		$(this).attr('src', $(this).data("still"));
		$(this).attr("data-state", "still");
	}

	
});

$("#submit").on("click", function(e) {
	e.preventDefault()
	console.log($('input').eq(0).val());
	if ($('input').eq(0).val() != "") {
		var newSearch = $('input').eq(0).val();
		searchArray.push(newSearch);
		generateButton(searchArray);
		return false;
		

	}
	
});



