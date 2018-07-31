// Get references to page elements

var $sightingButton = $("#sighting-button");
var $placeButton = $("#place-button");
var $userLogin = $("#user-login");
var $reviewLocation = $("#review-location");
var $oneStar = $("#oneStar");
var $twoStar = $("#twoStar");
var $threeStar = $("#threeStar");
var $fourStar = $("#fourStar");
var $fiveStar = $("#fiveStar");
var $reviewSubmit = $("#reviewSubmit");

$oneStar.on("click", function() {
  if ($(this).attr("data-selected") === "false") {
    $(this).addClass("starClicked");
    $(this).attr("data-selected", "true");
    review = "1";
  }
  else if ($(this).attr("data-selected") === "true"){
    
  }
});

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
