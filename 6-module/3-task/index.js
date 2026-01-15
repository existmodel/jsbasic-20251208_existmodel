import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlideNumber = 0;
    this.maxSlides = slides.length;
    this.elem = this.render();

    this.setup();
  }

  render() {
    this.elem = document.createElement("div");
    this.elem.className = "carousel";
    let arrowRight =
      createElement(`<div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>`);
    let arrowLeft =
      createElement(`<div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>`);
    this.elem.appendChild(arrowRight);
    this.elem.appendChild(arrowLeft);
    let carouselInner = document.createElement("div");
    carouselInner.className = "carousel__inner";
    let slidesElements = this.slides.map(({ name, price, image, id }) => {
      price = (+price).toFixed(2);
      return createElement(`
          <div class="carousel__slide" data-id="${id}" >
            <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
              <div class="carousel__caption">
               <span class="carousel__price">€${price}</span>
               <div class="carousel__title">${name}</div>
                <button type="button" class="carousel__button">
               <img src="/assets/images/icons/plus-icon.svg" alt="icon">
             </button>
            </div>
          </div>
      `);
    });
    carouselInner.append(...slidesElements);
    this.elem.appendChild(carouselInner);
    console.log(this.elem);
    return this.elem;
  }

  setup() {
    this.buttonRight = this.elem.querySelector(".carousel__arrow_right");
    this.buttonLeft = this.elem.querySelector(".carousel__arrow_left");
    this.inner = this.elem.querySelector(".carousel__inner");
    this.slide = this.elem.querySelector(".carousel__slide");
    this.bindEvents();
    this.updateCurrentPos();
  }

  bindEvents() {
    this.elem.addEventListener("click", (event) => {
      let button = event.target.closest(".carousel__button");
      if (event.target.closest(".carousel__arrow_right")) {
        this.goToNextSlide();
      }
      if (event.target.closest(".carousel__arrow_left")) {
        this.goToPrevSlide();
      }
      if (button) {
        let slide = button.closest(".carousel__slide");
        let id = slide.dataset.id;
        event.target.dispatchEvent(
          new CustomEvent("product-add", {
            detail: id,
            bubbles: true,
          })
        );
      }
    });
  }

  goToNextSlide() {
    this.currentSlideNumber++;
    this.updateCurrentPos();
  }

  goToPrevSlide() {
    this.currentSlideNumber--;
    this.updateCurrentPos();
  }

  updateCurrentPos() {
    let currentShift = this.slide.offsetWidth * this.currentSlideNumber;
    this.inner.style.transform = `translateX(-${currentShift}px)`;

    if (this.currentSlideNumber === this.maxSlides - 1) {
      this.buttonRight.style.display = "none";
    } else {
      this.buttonRight.style.display = "";
    }
    if (this.currentSlideNumber === 0) {
      this.buttonLeft.style.display = "none";
    } else {
      this.buttonLeft.style.display = "";
    }
  }
}
