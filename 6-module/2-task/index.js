import createElement from "../../assets/lib/create-element.js";

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = this.render();
  }

  render() {
    let price = +this.product.price;
    price = price.toFixed(2);
    this.card = createElement(`
      <div class="card">
      <div class="card__top">
  
          <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
          <span class="card__price">€${price}</span>
      </div>
      <div class="card__body">
          <div class="card__title">${this.product.name}</div>
          <button type="button" class="card__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
      </div>
  </div>
  `);
    this.onClick();
    console.log(price);
    return this.card;
  }
  onClick() {
    this.card.addEventListener("click", (event) => {
      let button = event.target.closest("button");
      if (!button) return;
      event.target.dispatchEvent(
        new CustomEvent("product-add", {
          detail: this.product.id,
          bubbles: true,
        })
      );
    });
  }
}
