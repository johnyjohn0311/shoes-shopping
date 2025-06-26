/**
 * send cart to server
 */
let userId = JSON.parse(localStorage.getItem('userId'));

insertCart();
export function insertCart() {
  /**
   * get out the cart of the user
   */
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart) {
    cart = [];
  }

  let xhr = new XMLHttpRequest();
  let formData = new FormData();
  let userId = JSON.parse(localStorage.getItem('userId'));

  for (let i = 0; i < cart.length; i++) {
    formData.append('productId', cart[i].productId);
    formData.append('colorId', cart[i].colorId);
    formData.append('sizeId', cart[i].sizeId);
    formData.append('quantity', cart[i].quantity);
    formData.append('userId', userId);
    xhr.open("POST", "http://localhost:8080/cartinserting.php", true);
    xhr.send(formData);
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let error = this.responseText;
        console.log(error);
      }
    }
  }
}

/**
 * fetching cart items from databases
 */
if (userId) {
  retrieveCart();
}

export function retrieveCart() {
  let formData1 = new FormData();
  let userId = JSON.parse(localStorage.getItem('userId'));
  var xhr1 = new XMLHttpRequest();

  formData1.append('userId', userId);

  xhr1.open("POST", "http://localhost:8080/cart.php", true);
  xhr1.send(formData1);
  xhr1.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let cart = JSON.parse(this.responseText);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
}

/**
 * update cart quantity
 */
export function updateCart(productId, colorId, sizeId, quantity) {
  let xhr2 = new XMLHttpRequest();
  let formData2 = new FormData();
  let userId = JSON.parse(localStorage.getItem('userId'));

  formData2.append('productId', productId);
  formData2.append('colorId', colorId);
  formData2.append('sizeId', sizeId);
  formData2.append('quantity', quantity);
  formData2.append('userId', userId);

  xhr2.open("POST", "http://localhost:8080/cartupdating.php", true);
  xhr2.send(formData2);
  xhr2.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let error = this.responseText;
      console.log(error);
    }
  }
}

export function deleteCart(productId, colorId, sizeId) {
  let xhr3 = new XMLHttpRequest();
  let formData3 = new FormData();
  let userId = JSON.parse(localStorage.getItem('userId'));

  formData3.append('productId', productId);
  formData3.append('colorId', colorId);
  formData3.append('sizeId', sizeId);
  formData3.append('userId', userId);
  
  xhr3.open("POST", "http://localhost:8080/cartdeleting.php", true);
  xhr3.send(formData3);
  xhr3.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let error = this.responseText;
      console.log(error);
    }
  }
}