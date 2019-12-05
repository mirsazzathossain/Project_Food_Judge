/*
===============
    Toogler
===============
*/

$(function(){
    $('button.navbar-toggler').on('click',function(){
        $(this).addClass('animated tada').one('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd mozAnimationEnd',function(){
            $(this).removeClass('animated tada');
        });
    });
});

/*-- Smooth Scroll --*/
// Add scrollspy to <body>
$('body').scrollspy({target: ".navbar", offset: 50});

function smoothScrollTo(button){
  $(button).on('click', function(event){
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash;
      });
    }
  });
}

smoothScrollTo("#navbarResponsive a");
smoothScrollTo("#rev");

/*-- Change Navbar Color On Scroll --*/
$(window).scroll(function(){
  $('nav').toggleClass('scrolled', $(this).scrollTop()>200);
});