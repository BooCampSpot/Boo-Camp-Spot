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