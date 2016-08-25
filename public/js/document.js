$(document).ready(function(){
  $("body").hide(0).delay(200).fadeIn(1000)
  $(".btn").click(function() {
    $(".popup").fadeOut(1000)
    $(".footer").hide(0).delay(1000).fadeIn(1000)
    $(".fbButton").hide(0).delay(1000).fadeIn(1000)
    $("body").css("background", "white");
  });
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-83129575-1', 'auto');
ga('send', 'pageview');