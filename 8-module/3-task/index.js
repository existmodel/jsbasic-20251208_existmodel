export default class Cart {
  cartItems = [];
  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (product === null || product === undefined) {
      return;
    }
    let cartItem = this.cartItems.find((item) => item.id == product.id);
    if (cartItem) {
      cartItem.count++;
      this.onProductUpdate(cartItem);
    } else if (cartItem === undefined) {
      cartItem = product;
      cartItem.count = 1;
      this.cartItems.push(cartItem);
      this.onProductUpdate(cartItem);
    }
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find((item) => item.id == productId);
    if (cartItem) {
      cartItem.count = cartItem.count + amount;

      if (cartItem.count <= 0) {
        this.cartItems = this.cartItems.filter((item) => item.id !== productId);
        this.onProductUpdate(cartItem);
      }
    }
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let result = this.cartItems.reduce((sum, item) => sum + item.count, 0);

    return result;
  }

  getTotalPrice() {
    let result = this.cartItems.reduce(
      (sum, item) => sum + item.count * item.price,
      0,
    );
    return result;
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
  }
}
