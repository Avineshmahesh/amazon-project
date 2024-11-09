export const cart = [];

export function addToCart(productId) {
    let matchingItem;
    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });
    const quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId}`
    );
    let newQuantity = Number(quantitySelector.value);
    if (matchingItem) {
      matchingItem.quantity += newQuantity;
    }
    else {
      cart.push({
        productId: productId,
        quantity: newQuantity
      });
    }
  }