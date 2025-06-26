export let cart = [];

if (JSON.parse(localStorage.getItem('cart'))) {
  cart = JSON.parse(localStorage.getItem('cart'));
}

/**
 * add product to the cart function
 * check if the product is already in the cart
 * if it is increase the quantity otherwise push the product into the cart
 */
export function addToCart(productId, colorId, sizeId, quantity) {
  let matchingProduct;

  if (!cart) {
    cart.push({ 
      productId: productId,
      colorId: colorId,
      sizeId: sizeId,
      quantity: Number(quantity)
    });
  } else {
    cart.forEach(cartItem => { 
      if (cartItem.productId === productId 
        && cartItem.colorId === colorId
        && cartItem.sizeId === sizeId) {
          matchingProduct = cartItem;
      }
    });

    if (matchingProduct) {
      matchingProduct.quantity = Number(matchingProduct.quantity) + Number(quantity);
    }  else {
      cart.push({ 
        productId: productId,
        colorId: colorId,
        sizeId: sizeId,
        quantity: Number(quantity)
      });
    }
  }
}

/**
 * remove from cart function
 */
let newCart = [];
export function removeFromCart(productId, colorId, sizeId) {
   cart.forEach(item => {
    if (item.productId !== productId ||
      item.colorId !== colorId ||
      item.sizeId !== sizeId) {
        newCart.push(item);
      }
   }) 
  
  cart = newCart;
  localStorage.setItem('cart', JSON.stringify(cart)); 
  /**
   * set cart of the user
   */
  // localStorage.setItem(`cart1`, JSON.stringify(cart)); 
}
