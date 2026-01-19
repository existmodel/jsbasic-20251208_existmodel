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
      // Для начала определим расстояние от начала элемента слайдера до места, на котором находился курсор в момент клика
      // Мы будем использовать координаты относительно окна. Возьмем координату по горизонтали (из свойства clientX объекта события)
      //  и вычтем из нее координату крайней левой точки слайдера, которую получим с помощью метода getBoundingClientRect():
      // В итоге мы получим расстояние в пикселях от начала слайдера до места клика.
      // В итоге мы получим расстояние в пикселях от начала слайдера до места клика. Но нам нужно выбрать значение слайдера из дипазона – 0, 1, 2, 3, 4.
      // Поэтому рассчитаем относительное значение, взяв за основу ширину слайдера:

      // Если клик произошел на каком-то конкретном шаге, например на 2, то мы меняем значение на значение этого шага.
      //Для начала определим расстояние от начала элемента слайдера до места, на котором находился курсор в момент клика.
      //просто число от 0 до 1, которое показывает, на какой части слайдера произошёл клик.
      //   итоге мы получим расстояние в пикселях от начала слайдера до места клика.
      let left = event.clientX - this.elem.getBoundingClientRect().left; //вычтем из нее координату крайней левой точки слайдера
      //   Но нам нужно выбрать значение слайдера из дипазона – 0, 1, 2, 3, 4. Поэтому рассчитаем относительное значение, взяв за основу ширину слайдера:
      let leftRelative = left / this.elem.offsetWidth;
      // Как вы помните, нам нужно получить конкретное значение слайдера (0, 1, 2, 3, 4).
      // Для этого возьмем полученное значение (переменная leftRelative) и умножим его на количество сегментов:
      let value = Math.round(leftRelative * this.segments); //округлим дробное значение по правилам математики:
      this.setValue(value); //получаем значение и добавляем его в метод

      //!!Drag-and-Drop
      //   Напоминаем, что для корректной работы нужно «выключить» встроенный браузерный
      // Drag-and-Drop для элемента с классом slider__thumb:
      // Получаем метрики ползунка
      let thumb = this.elem.querySelector(".slider__thumb"); //ползунок
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
