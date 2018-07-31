// Get references to page elements

var $sightingButton = $("#sighting-button");
var $placeButton = $("#place-button");
var $userLogin = $("#user-login");
var $reviewLocation = $("#reviewLocation");
var $oneStar = $("#oneStar");
var $twoStar = $("#twoStar");
var $threeStar = $("#threeStar");
var $fourStar = $("#fourStar");
var $fiveStar = $("#fiveStar");
var $reviewSubmit = $("#reviewSubmit");
var reviewStar = 0

var review = {
  reviewLocation: $("#review-location").val(),
  reviewStar: reviewStar,
  reviewText: $("#reviewText").val(),
}


// Toggle review stars and store review value
$oneStar.on("click", function() {
  if ($(this).attr("data-selected") === "false") {
    $(this).addClass("starClicked");
    $(this).attr("data-selected", "true");
    reviewStar = 1;
  } else {
    $(this).removeClass("starClicked");
    $(this).attr("data-selected", "false");
  };
  return reviewStar;
});


$twoStar.on("click", function() {
  if ($(this).attr("data-selected") === "false") {
    $(this).addClass("starClicked");
    $oneStar.addClass("starClicked");
    $(this).attr("data-selected", "true");
    reviewStar = "2";
  } else {
    $(this).removeClass("starClicked");
    $oneStar.removeClass("starClicked");
    $(this).attr("data-selected", "false");
    $oneStar.attr("data-selected", "false");
  }
  return reviewStar;
});

$threeStar.on("click", function() {
  if ($(this).attr("data-selected") === "false") {
    $(this).addClass("starClicked");
    $oneStar.addClass("starClicked");
    $twoStar.addClass("starClicked");
    $(this).attr("data-selected", "true");
    reviewStar = "3";
  } else {
    $(this).removeClass("starClicked");
    $oneStar.removeClass("starClicked");
    $twoStar.removeClass("starClicked");
    $(this).attr("data-selected", "false");
    $oneStar.attr("data-selected", "false");
    $twoStar.attr("data-selected", "false");
  }
  return reviewStar;
});

$fourStar.on("click", function() {
  if ($(this).attr("data-selected") === "false") {
    $(this).addClass("starClicked");
    $oneStar.addClass("starClicked");
    $twoStar.addClass("starClicked");
    $threeStar.addClass("starClicked");
    $(this).attr("data-selected", "true");
    reviewStar = "4";
  } else {
    $(this).removeClass("starClicked");
    $oneStar.removeClass("starClicked");
    $twoStar.removeClass("starClicked");
    $threeStar.removeClass("starClicked");
    $(this).attr("data-selected", "false");
    $oneStar.attr("data-selected", "false");
    $twoStar.attr("data-selected", "false");
    $threeStar.attr("data-selected", "false");
  }
  return reviewStar;
});

$fiveStar.on("click", function() {
  if ($(this).attr("data-selected") === "false") {
    $(this).addClass("starClicked");
    $oneStar.addClass("starClicked");
    $twoStar.addClass("starClicked");
    $threeStar.addClass("starClicked");
    $fourStar.addClass("starClicked");
    $(this).attr("data-selected", "true");
    reviewStar = "5";
  } else {
    $(this).removeClass("starClicked");
    $oneStar.removeClass("starClicked");
    $twoStar.removeClass("starClicked");
    $threeStar.removeClass("starClicked");
    $fourStar.removeClass("starClicked");
    $(this).attr("data-selected", "false");
    $oneStar.attr("data-selected", "false");
    $twoStar.attr("data-selected", "false");
    $threeStar.attr("data-selected", "false");
    $fourStar.attr("data-selected", "false");
  }
  return reviewStar;
});


$reviewSubmit.on("click", function (){
  event.preventDefault();
  console.log(review.reviewLocation);
  console.log(review.reviewStar);
  console.log(reviewText);
})
  ;
/*
var reviewFormSubmit = function(event) {
  event.preventDefault();

  var review = {
    reviewLocation: $reviewLocation.val(),
    reviewRating: 

  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
*/
