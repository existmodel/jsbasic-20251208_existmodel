function initCarousel() {
  let buttonRight = document.querySelector(".carousel__arrow_right");
  let buttonLeft = document.querySelector(".carousel__arrow_left");
  let container = document.querySelector("[data-carousel-holder]");
  let inner = document.querySelector(".carousel__inner");
  let slide = document.querySelector(".carousel__slide");

  let slideWidth = slide.offsetWidth;

  let currentIndex = 0;
  let currentShift = slideWidth;

  buttonLeft.style.display = "none";

  container.addEventListener("click", function (event) {
    let targetRight = event.target.closest(".carousel__arrow_right");
    let targetLeft = event.target.closest(".carousel__arrow_left");

    if (targetRight === buttonRight) {
      currentIndex++;
      currentShift = slideWidth * currentIndex;
      inner.style.transform = `translateX(-${currentShift}px)`;
      if (currentIndex === 3) {
        buttonRight.style.display = "none";
      }
    }

    if (targetLeft === buttonLeft) {
      currentIndex--;
      currentShift = slideWidth * currentIndex;
      inner.style.transform = `translateX(-${currentShift}px)`;

      if (currentIndex === 0) {
        buttonLeft.style.display = "none";
      }
    }
    if (currentIndex === 1 || currentIndex === 2) {
      buttonLeft.style.display = "";
      buttonRight.style.display = "";
    }
  });
}
