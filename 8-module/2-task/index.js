import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.filteredProducts = this.products;
    this.elem = this.render();
  }

  render() {
    if (!this.elem) {
      this.elem = document.createElement("div");
      this.elem.className = "products-grid";
    }
    this.elem.innerHTML = "";

    let inner = document.createElement("div");
    inner.className = "products-grid__inner";

    //если без import ProductCard from "../../6-module/2-task/index.js";
    // let productsElements = this.filteredProducts.map(
    //   ({ name, price, image }) => {
    //     price = (+price).toFixed(2);
    //     return createElement(`
    //       <div class="card">
    //       <div class="card__top">
    //           <img src="/assets/images/products/${image}" class="card__image" alt="product">
    //           <span class="card__price">€${price}</span>
    //       </div>
    //       <div class="card__body">
    //           <div class="card__title">${name}</div>
    //           <button type="button" class="card__button">
    //               <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    //           </button>
    //       </div>
    //   </div>`);
    //   },
    // );
    //

    let productsElements = this.filteredProducts.map((product) => {
      let card = new ProductCard(product);
      return card.elem;
    });

    inner.append(...productsElements);
    this.elem.append(inner);
    return this.elem;
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    let result = this.products;

    if (this.filters.noNuts) {
      result = result.filter(
        (product) => product.nuts === false || product.nuts === undefined,
      );
      console.log(result);
    }

    if (this.filters.vegeterianOnly) {
      result = result.filter((product) => product.vegeterian === true);
    }

    if (
      Number.isFinite(this.filters.maxSpiciness) &&
      this.filters.maxSpiciness >= 0 &&
      this.filters.maxSpiciness < 5
    ) {
      result = result.filter(
        (product) => product.spiciness <= this.filters.maxSpiciness,
      );
      console.log(result);
    }

    if (this.filters.category) {
      result = result.filter(
        (product) => this.filters.category === product.category,
      );
    }
    this.filteredProducts = result;
    this.render();
  }
}
