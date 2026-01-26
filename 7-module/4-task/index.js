import createElement from "../../assets/lib/create-element.js";
export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
    this.segments = this.steps - 1;
    this.bindEvents();
    this.setValue(this.value);
  }

  render() {
    this.elem = document.createElement("div");
    this.elem.className = "slider";
    let sliderThumb = createElement(`<div class="slider__thumb">
      <span class="slider__value">${this.value}</span>
    </div>`);
    this.elem.appendChild(sliderThumb);
    let sliderProgress = createElement(`<div class="slider__progress"></div>`);
    this.elem.appendChild(sliderProgress);
    let sliderSteps = createElement(`<div class="slider__steps"> </div>`);
    this.elem.appendChild(sliderSteps);
    let spans = [];
    for (let i = 0; i < this.steps; i++) {
      let span = document.createElement("span");
      spans.push(span);
    }
    sliderSteps.append(...spans);
    return this.elem;
  }

  setValue(value) {
    this.value = value;
    this.elem.querySelector(".slider__thumb").style.left =
      (value / this.segments) * 100 + "%";
    this.elem.querySelector(".slider__progress").style.width =
      (value / this.segments) * 100 + "%";
    this.elem.querySelector(".slider__value").innerHTML = value;
    let activeStep = this.elem.querySelector(".slider__step-active");
    if (activeStep) {
      activeStep.classList.remove("slider__step-active");
    }
    const steps = this.elem.querySelector(".slider__steps").children;
    steps[this.value].classList.add("slider__step-active");
    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      }),
    );
  }

  bindEvents() {
    let thumb = this.elem.querySelector(".slider__thumb");
    let progress = this.elem.querySelector(".slider__progress");
    this.elem.addEventListener("click", (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;

      let leftRelative = left / this.elem.offsetWidth;

      let value = Math.round(leftRelative * this.segments);
      this.setValue(value);

      let thumb = this.elem.querySelector(".slider__thumb");
      thumb.ondragstart = () => false;
    });

    thumb.onpointerdown = (event) => {
      event.preventDefault();
      let handlePointerMove = (event) => {
        let left = event.clientX - this.elem.getBoundingClientRect().left;
        let leftRelative = left / this.elem.offsetWidth;
        if (leftRelative < 0) {
          leftRelative = 0;
        }
        if (leftRelative > 1) {
          leftRelative = 1;
        }
        let leftPercents = leftRelative * 100;
        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;
        let approximateValue = leftRelative * this.segments;
        let value = Math.round(approximateValue);
        this.value = value;
        this.elem.querySelector(".slider__value").innerHTML = value;
        const steps = this.elem.querySelector(".slider__steps").children;
        steps[this.value].classList.add("slider__step-active");
      };

      this.elem.classList.add("slider_dragging");
      handlePointerMove(event);

      let handlePointerUp = () => {
        this.setValue(this.value);
        document.removeEventListener("pointermove", handlePointerMove);
        thumb.onpointerup = null;
      };

      document.addEventListener("pointermove", handlePointerMove); //двигаться будет когда сработает pointermove
      document.addEventListener("pointerup", handlePointerUp);
    };
  }
}
