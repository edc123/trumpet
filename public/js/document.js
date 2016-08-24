$(document).ready(function(){
  $("body").hide(0).delay(200).fadeIn(1000)
  $(".btn").click(function() {
    $(".popup").fadeOut(1000)
    $(".footer").hide(0).delay(1000).fadeIn(1000)
    $(".fbButton").hide(0).delay(1000).fadeIn(1000)
    $("body").css("background", "white");
  });
});