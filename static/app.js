// ---------------carousel-------
$('#nominacjeLiteratura').carousel({
  interval: 4000
});

$('.carousel .item').each(function(){
  var next = $(this).next();
  if (!next.length) {
    next = $(this).siblings(':first');
  }

  next.children(':first-child').clone().appendTo($(this));

  for (var i=0; i<2; i++) {
    next = next.next();
    if (!next.length) {
      next = $(this).siblings(':first');
    }

    next.children(':first-child').clone().appendTo($(this));
  }
});

// ----------carousel2------------

$('#nominacjeGrafika').carousel({
  interval: 5000
});


// -----------partnerzy---------------

var imgs = document.querySelectorAll("#slider-data img");
var imgArray = [];

for (var i = 0; i < imgs.length; i++ ) {
    imgArray.push(imgs[i].src);
}

shuffle(imgArray);

var curIndex = 0;
var imgDuration = 3000;

function slideShow() {
    document.getElementById('slider').className += "fadeOut";
    setTimeout(function() {
        document.getElementById('slider').src = imgArray[curIndex];
        document.getElementById('slider').className = "";
    },1000);
    curIndex++;
    if (curIndex == imgArray.length) { curIndex = 0; }
    setTimeout(slideShow, imgDuration);
}
slideShow();


// -------------Upowszechnianie---------------


var firstImgArray = [
    'images/bjork1.jpg',
    'images/bjork2.jpg',
    'images/bjork3.jpeg',
    'images/bjork4.jpg',
    'images/bjork5.jpg'],
    nowIndex = 0;
    imgDuration = 4000;

function firstSlideShow() {
    document.getElementById('first-slider').className += "fadeOut";
    setTimeout(function() {
        document.getElementById('first-slider').src = firstImgArray[nowIndex];
        document.getElementById('first-slider').className = "";
    },1000);
    nowIndex++;
    if (nowIndex == firstImgArray.length) { nowIndex = 0; }
    setTimeout(firstSlideShow, imgDuration);
}
firstSlideShow();

// -------scrolling to internal links----------------
$(document).ready(function(){
  $('a[href^="#"]').on('click',function (e) {
      e.preventDefault();

      var target = this.hash;
      var $target = $(target);

      $('html, body').stop().animate({
          'scrollTop': $target.offset().top
      }, 1000, 'swing', function () {
          window.location.hash = target;
      });
  });
});
// -------------small menu------------

$(document).ready(function () {

  $(".nav_btn").click(function(){
  $("#nav").toggle(500);
   $(".nav_btn").css("display","none");
  
  });

  $(window).resize(function(){
    if ($(window).width() <= 991){  
      $("#nav").css("display","none");

    } 
     
  });

$("#nav").mouseleave(function() {
  // $("#nav").css("display","none");
  $(".nav_btn").css("display","block");
   $("#nav").toggle(500);

});

});


// copied from https://github.com/Daplie/knuth-shuffle, Apache 2.0 licensed.

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
