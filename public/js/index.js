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



// Toggle review stars and store review value
$oneStar.on("click", function() {

  $twoStar.removeClass("starClicked");
  $threeStar.removeClass("starClicked");
  $fourStar.removeClass("starClicked");
  $fiveStar.removeClass("starClicked");
  $twoStar.attr("data-selected", "false");
  $threeStar.attr("data-selected", "false");
  $fourStar.attr("data-selected", "false");
  $fiveStar.attr("data-selected", "false");

  if ($(this).attr("data-selected") === "false") {
    $(this).addClass("starClicked");
    $(this).attr("data-selected", "true");
    var reviewStar = 1;
  } else {
    $(this).removeClass("starClicked");
    $(this).attr("data-selected", "false");
  };
  return reviewStar;
});


$twoStar.on("click", function() {

  $threeStar.removeClass("starClicked");
  $fourStar.removeClass("starClicked");
  $fiveStar.removeClass("starClicked");
  $threeStar.attr("data-selected", "false");
  $fourStar.attr("data-selected", "false");
  $fiveStar.attr("data-selected", "false");

  if ($(this).attr("data-selected") === "false") {
    $(this).addClass("starClicked");
    $oneStar.addClass("starClicked");
    $(this).attr("data-selected", "true");
    $oneStar.attr("data-selected", "true");
    reviewStar = 2;
  } else {
    $(this).removeClass("starClicked");
    $oneStar.removeClass("starClicked");
    $(this).attr("data-selected", "false");
    $oneStar.attr("data-selected", "false");
  }
  return reviewStar;
});

$threeStar.on("click", function() {

  $fourStar.removeClass("starClicked");
  $fiveStar.removeClass("starClicked");
  $fourStar.attr("data-selected", "false");
  $fiveStar.attr("data-selected", "false");

  if ($(this).attr("data-selected") === "false") {
    $(this).addClass("starClicked");
    $oneStar.addClass("starClicked");
    $twoStar.addClass("starClicked");
    $(this).attr("data-selected", "true");
    reviewStar = 3;
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
  $fiveStar.removeClass("starClicked");
  $fiveStar.attr("data-selected", "false");

  if ($(this).attr("data-selected") === "false") {
    $(this).addClass("starClicked");
    $oneStar.addClass("starClicked");
    $twoStar.addClass("starClicked");
    $threeStar.addClass("starClicked");
    $(this).attr("data-selected", "true");
    reviewStar = 4;
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
    reviewStar = 5;
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
  
});


$reviewSubmit.on("click", function (){
  event.preventDefault();
  var review = {
    reviewLocation: $("#reviewLocation").val(),
    reviewStar: reviewStar,
    reviewText: $("#reviewText").val(),
  };

});

