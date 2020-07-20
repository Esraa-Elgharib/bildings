// $(document).ready(function(){
//   $('.owl-carousel').owlCarousel({
//     loop: true,
//     margin: 10,
//     dots: false,
//     autoplay: true,
//     smartSpeed: 100,
//     // responsiveClass: true,
//     // responsive: {
//     //     0: {
//     //         items: 1,
//     //         nav: true
//     //     },
//     //     600: {
//     //         items: 2,
//     //         nav: false
//     //     },
//     //     1000: {
//     //         items: 3,
//     //         nav: true,
//     //         loop: false,
//     //         margin: 20
//     //     }
//     // }

// })
// });

 /****** Timer  ***/

 const FULL_DASH_ARRAY = 283;
 const WARNING_THRESHOLD = 10;
 const ALERT_THRESHOLD = 5;
 
 const COLOR_CODES = {
   info: {
     color: "green"
   },
   warning: {
     color: "orange",
     threshold: WARNING_THRESHOLD
   },
   alert: {
     color: "red",
     threshold: ALERT_THRESHOLD
   }
 };
 
 const TIME_LIMIT = 300;
 let timePassed = 0;
 let timeLeft = TIME_LIMIT;
 let timerInterval = null;
 let remainingPathColor = COLOR_CODES.info.color;
 
 document.getElementById("app").innerHTML = `
 <div class="base-timer">
   <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
     <g class="base-timer__circle">
       <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
       <path
         id="base-timer-path-remaining"
         stroke-dasharray="283"
         class="base-timer__path-remaining ${remainingPathColor}"
         d="
           M 50, 50
           m -45, 0
           a 45,45 0 1,0 90,0
           a 45,45 0 1,0 -90,0
         "
       ></path>
     </g>
   </svg>
   <span id="base-timer-label" class="base-timer__label">${formatTime(
     timeLeft
   )}</span>
 </div>
 `;
 
 startTimer();
 
 function onTimesUp() {
   clearInterval(timerInterval);
 }
 
 function startTimer() {
   timerInterval = setInterval(() => {
     timePassed = timePassed += 1;
     timeLeft = TIME_LIMIT - timePassed;
     document.getElementById("base-timer-label").innerHTML = formatTime(
       timeLeft
     );
     setCircleDasharray();
     setRemainingPathColor(timeLeft);
 
     if (timeLeft === 0) {
       onTimesUp();
     }
   }, 1000);
 }
 
 function formatTime(time) {
   const minutes = Math.floor(time / 60);
   let seconds = time % 60;
 
   if (seconds < 10) {
     seconds = `0${seconds}`;
   }
 
   return `${minutes}:${seconds}`;
 }
 
 function setRemainingPathColor(timeLeft) {
   const { alert, warning, info } = COLOR_CODES;
   if (timeLeft <= alert.threshold) {
     document
       .getElementById("base-timer-path-remaining")
       .classList.remove(warning.color);
     document
       .getElementById("base-timer-path-remaining")
       .classList.add(alert.color);
   } else if (timeLeft <= warning.threshold) {
     document
       .getElementById("base-timer-path-remaining")
       .classList.remove(info.color);
     document
       .getElementById("base-timer-path-remaining")
       .classList.add(warning.color);
   }
 }
 
 function calculateTimeFraction() {
   const rawTimeFraction = timeLeft / TIME_LIMIT;
   return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
 }
 
 function setCircleDasharray() {
   const circleDasharray = `${(
     calculateTimeFraction() * FULL_DASH_ARRAY
   ).toFixed(0)} 283`;
   document
     .getElementById("base-timer-path-remaining")
     .setAttribute("stroke-dasharray", circleDasharray);
 }
 

 /******* Timer *****/


 $('.num').keyup(function () {
  var inputVal = $(this).val();
  var characterReg = /^[0-9]{1}$/;
  var s = characterReg.test(inputVal);
  if (s) {
      var inputs = $(this).closest('form').find(':input');
      inputs.eq(inputs.index(this) - 1 ).focus();
  }
  });


  // Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}



