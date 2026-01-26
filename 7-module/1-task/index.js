import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
    this.setup();
  }

  render() {
    this.elem = document.createElement("div");
    this.elem.className = "ribbon";
    let arrowLeft =
      createElement(`<button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`);

    let arrowRight =
      createElement(`<button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`);

    this.elem.appendChild(arrowLeft);

    let ribbonInner = document.createElement("nav");
    ribbonInner.className = "ribbon__inner";

    let categoriesElements = this.categories.map(({ name, id }) => {
      return createElement(`<a href="#" class="ribbon__item" data-id="${id}">${name}</a>
          `);
    });

    ribbonInner.append(...categoriesElements);
    this.elem.appendChild(ribbonInner);
    this.elem.appendChild(arrowRight);
    return this.elem;
  }

  setup() {
    this.buttonRight = this.elem.querySelector(".ribbon__arrow_right");
    this.buttonLeft = this.elem.querySelector(".ribbon__arrow_left ");
    this.inner = this.elem.querySelector(".ribbon__inner");
    this.item = this.elem.querySelector(".ribbon__item");
    this.bindEvents();
  }

  bindEvents() {
    this.elem.addEventListener("click", (event) => {
      if (event.target.closest(".ribbon__arrow_right")) {
        this.inner.scrollBy(350, 0);
      }
      if (event.target.closest(".ribbon__arrow_left")) {
        this.inner.scrollBy(-350, 0);
      }
    });

    this.inner.addEventListener("scroll", () => {
      this.updateCurrentPos();
    });

    this.elem.addEventListener("click", (event) => {
      let link = event.target.closest(".ribbon__item");
      if (link) {
        event.preventDefault();
        this.item.classList.toggle("ribbon__item_active");
        let id = link.dataset.id;
        event.target.dispatchEvent(
          new CustomEvent("ribbon-select", {
            detail: id,
            bubbles: true,
          }),
        );
      }
    });
  }

  updateCurrentPos() {
    let scrollWidth = this.inner.scrollWidth;
    let scrollLeft = this.inner.scrollLeft;
    let clientWidth = this.inner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollLeft === 0) {
      this.buttonLeft.classList.remove("ribbon__arrow_visible");
    } else {
      this.buttonLeft.classList.add("ribbon__arrow_visible");
    }
    if (scrollRight <= 1) {
      this.buttonRight.classList.remove("ribbon__arrow_visible");
    } else {
      this.buttonRight.classList.add("ribbon__arrow_visible");
    }
  }
}
