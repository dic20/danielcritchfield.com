<!--enable all tooltips-->
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});

<!--shrink nav bar when scrolling down-->
$(window).scroll(function() {
  if ($(document).scrollTop() > 50) {
    $('nav').addClass('shrink');
  } else {
    $('nav').removeClass('shrink');
  }
});

// Add smooth scrolling on all links inside the navbar
$("#myNavbar a").on('click', function(event) {

  // Make sure this.hash has a value before overriding default behavior
  if (this.hash !== "") {

    // Prevent default anchor click behavior
    event.preventDefault();

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
      scrollTop: $(this.hash).offset().top
    }, 800, function(){

      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = this.hash;
    });
  }
});

// fade in animation for innerExperience div
$(document).ready(function() {
  $("#innerExperience").fadeIn(1000);
});

// animation for content to slide in when you scroll down
$(window).scroll(function() {
  if($(document).scrollTop() > 50) {
    $("#innerAbout").animate({width: "show"}, 350);
  } else {
    console.log($(document).scrollTop());
  }
});