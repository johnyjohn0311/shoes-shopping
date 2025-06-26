import { useEffect } from "react";
import Header from "./components/header";
import checkout from "../css/checkout.module.css";
import {removeFromCart} from '../js/data/cart.js'; // when use the database to display the cart
import {updateCart, retrieveCart, deleteCart} from '../controller/cart.js';

export default function Checkout() {
  // cart of the user
  let cart = JSON.parse(localStorage.getItem('cart'));
  let userId = JSON.parse(localStorage.getItem('userId'));

  /**
   * display cart item html
   */
  let products = JSON.parse(localStorage.getItem('products'));
  let cartItemsHtml = '';

  cartItemsHtml = cart.map(cartItem => {
    // find matching product from product in the cart
    let matchingProduct;
    products.forEach(product => {
      if(product.id == cartItem.productId) {
        matchingProduct = product;
      }
    });

    /**
     * find matching color of each product by colorId 
     */ 
    let matchingColor;
    let colorsArr = JSON.parse(localStorage.getItem('colors'));
    let colors = [];

    for (let i = 0; i < colorsArr.length; i++) {
      if (colorsArr[i].productId == cartItem.productId) {
        colors.push(colorsArr[i]);
      }
    }

    colors.forEach(color => {
      if (color.id == cartItem.colorId) {
        matchingColor = color.color;
      }
    });

    /**
     * find matching size of each product by sizeId
     */
    let matchingSize;
    let sizesArr = JSON.parse(localStorage.getItem('sizes'));
    let sizes = [];

    for (let i = 0; i < sizesArr.length; i++) {
      if (sizesArr[i].productId == cartItem.productId) {
        sizes.push(sizesArr[i]);
      }
    }

    sizes.forEach(size => {
      if (size.id == cartItem.sizeId) {
        matchingSize = size.size;
      }
    });

    let orderItemClass = 'orderItem-' + cartItem.productId + '-' + cartItem.colorId + '-' + cartItem.sizeId;
    let checkBoxClass = 'check-' + cartItem.productId + '-' + cartItem.colorId + '-' + cartItem.sizeId;
    let dataCheckBox = cartItem.productId + '-' + cartItem.colorId + '-' + cartItem.sizeId;
    let imgPath = '/images/' + matchingProduct.img;
    let quantityId = 'quantityInput' + cartItem.productId + cartItem.colorId + cartItem.sizeId;

    return (
      <div className={`${checkout.orderItem} ${orderItemClass}`}>
        <input className={`${checkout.item__checkBox} checkout__item__checkBox ${checkBoxClass}`} 
          data-check-box = {dataCheckBox}
        type="checkbox"/>
        <div className={checkout.itemImage}>
          <img className={checkout.item__img} src={imgPath} alt="item"/>
        </div>

        <div className={checkout.itemDetails}>
          <div className={checkout.itemDescription}>
            <div className={checkout.item__name}>
            {matchingProduct.name}
            </div>
            <div className={checkout.quantityUpdate}>
              <button className={`${checkout.quantityBtn} subtractBtn`} data-product-id={cartItem.productId} data-color-id={cartItem.colorId} data-size-id={cartItem.sizeId} id="subtract">-</button>
              <input id={quantityId} className={`${checkout.number__input} checkout__number__input`} data-product-id={cartItem.productId} data-color-id={cartItem.colorId} data-size-id={cartItem.sizeId} type="number" defaultValue={cartItem.quantity} min="1"/>
              <button className={`${checkout.quantityBtn} plusBtn`} data-product-id={cartItem.productId} data-color-id={cartItem.colorId} data-size-id={cartItem.sizeId} id="add">+</button>
            </div>
            <button className={`${checkout.item__delete__btn} checkout__item__delete__btn`} 
            data-product-id={cartItem.productId}
            data-color-id={cartItem.colorId}
            data-size-id={cartItem.sizeId}>
              Delete
            </button>
            <div className={checkout.item__color}>Color: {matchingColor}</div>
            <div className={checkout.item__size}>Size: {matchingSize}</div>
          </div>

          <div className={checkout.item__price}>$ {matchingProduct.price}</div>
        </div>

      </div>
    );
  });

  useEffect(() => {
    let subTotalPrice = 0; 
    let itemCheckBoxes = document.querySelectorAll('.checkout__item__checkBox');

    // function calculate the price each time increase/decrease quantity
    function updateSubTotalPrice() {
      subTotalPrice = 0;
      cart.forEach((cartItem) => {
        let itemCheck = JSON.parse(localStorage.getItem(`${cartItem.productId}-${cartItem.colorId}-${cartItem.sizeId}`));
        if (itemCheck) {
          products.forEach(product => {
            if (cartItem.productId == product.id) {
              subTotalPrice += (cartItem.quantity * product.price);
            }
          });
        }
      });

      localStorage.setItem('subTotalPrice', JSON.stringify(subTotalPrice));
    }

    function removeCheckBox(productId, colorId, sizeId) {
      localStorage.removeItem(`${productId}-${colorId}-${sizeId}`);
    }

    itemCheckBoxes.forEach(checkBox => {
      checkBox.onclick = function() {
        let checkBoxData = checkBox.dataset.checkBox;
        let checkVar = JSON.parse(localStorage.getItem(`${checkBoxData}`));

        if (!checkVar) {
          localStorage.setItem(`${checkBoxData}`, 'true');
          updateSubTotalPrice();
          localStorage.setItem('subTotalPrice', JSON.stringify(subTotalPrice));

          let discountSubTotal = subTotalPrice * 0.1;
          let totalPrice = subTotalPrice - discountSubTotal;

          document.querySelector('.subTotal').textContent = 'Sub total: $' + subTotalPrice;
          document.querySelector('.discount').textContent = 'Discount (10%): $' + discountSubTotal;
          document.querySelector('.totalPrice').textContent = 'Total Price: $' + totalPrice;
        } else {
          localStorage.setItem(`${checkBoxData}`, 'false');
          updateSubTotalPrice();
          localStorage.setItem('subTotalPrice', JSON.stringify(subTotalPrice));

          let discountSubTotal = subTotalPrice * 0.1;
          let totalPrice = subTotalPrice - discountSubTotal;

          document.querySelector('.subTotal').textContent = 'Sub total: $' + subTotalPrice;
          document.querySelector('.discount').textContent = 'Discount (10%): $' + discountSubTotal;
          document.querySelector('.totalPrice').textContent = 'Total Price: $' + totalPrice;
        }
      }
    });

    // calculate price
    if (JSON.parse(localStorage.getItem('subTotalPrice'))) {
      subTotalPrice = JSON.parse(localStorage.getItem('subTotalPrice'));
    }

    let discountSubTotal = subTotalPrice * 0.1;
    let totalPrice = subTotalPrice - discountSubTotal;

    document.querySelector('.subTotal').textContent = 'Sub total: $' + subTotalPrice;
    document.querySelector('.discount').textContent = 'Discount (10%): $' + discountSubTotal;
    document.querySelector('.totalPrice').textContent = 'Total Price: $' + totalPrice;

    // check the checkboxes
    cart.forEach((cartItem, index) => {
      itemCheckBoxes[index].checked = JSON.parse(localStorage.getItem(`${cartItem.productId}-${cartItem.colorId}-${cartItem.sizeId}`));
    });

    /**
     * remove from cart
     */
    let deleteBtns = document.querySelectorAll('.checkout__item__delete__btn');
    deleteBtns.forEach(link => {
      link.addEventListener('click', removeCartItem);
      function removeCartItem() {
        let productId = link.dataset.productId;
        let colorId = link.dataset.colorId;
        let sizeId = link.dataset.sizeId;
        
        removeCheckBox(productId, colorId, sizeId);
        updateSubTotalPrice();
        removeFromCart(productId, colorId, sizeId);

        if (userId) {
          deleteCart(productId, colorId, sizeId);
          retrieveCart();
        }

        const cartItem = document.querySelector(`.orderItem-${productId}-${colorId}-${sizeId}`);
        cartItem.remove();
        window.location.reload();
      }
    });

    /**
     * update price on number input change
     */
    let numberInputs = document.querySelectorAll('.checkout__number__input');
    numberInputs.forEach(input => {
      input.addEventListener('change', updateQuantity);

      function updateQuantity() {
        let matchingProduct;
        let productId = input.dataset.productId;
        let colorId = input.dataset.colorId;
        let sizeId = input.dataset.sizeId;
        let updateNumber = input.value;
      
        cart.forEach(cartItem => { 
          if (cartItem.productId == productId &&
            cartItem.colorId == colorId &&
            cartItem.sizeId == sizeId) {
            matchingProduct = cartItem;
          }
        });
      
        matchingProduct.quantity = updateNumber;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateSubTotalPrice();

        if (userId) {
          updateCart(productId, colorId, sizeId, matchingProduct.quantity);
          retrieveCart();
        }

        window.location.reload(); 
      }  
    }); 

    /**
     * update quantity with plus and subtract buttons
     */
    let subtractBtns = document.querySelectorAll('.subtractBtn');
    let plusBtns = document.querySelectorAll('.plusBtn');

    plusBtns.forEach((btn, index) => {
      btn.addEventListener('click', updateQuantity);

      function updateQuantity() {
        let matchingProduct;
        let productId = btn.dataset.productId;
        let colorId = btn.dataset.colorId;
        let sizeId = btn.dataset.sizeId;
      
        cart.forEach(cartItem => {
          if (cartItem.productId == productId &&
            cartItem.colorId == colorId &&
            cartItem.sizeId == sizeId) {
            matchingProduct = cartItem;
          }
        });
      
        matchingProduct.quantity = Number(matchingProduct.quantity) + 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateSubTotalPrice();

        if (userId) {
          updateCart(productId, colorId, sizeId, matchingProduct.quantity);
          retrieveCart();
        }

        window.location.reload();
      } 
    });

    subtractBtns.forEach((btn, index) => {
      btn.addEventListener('click', updateQuantity);

      function updateQuantity() {
        let matchingProduct;
        let productId = btn.dataset.productId;
        let colorId = btn.dataset.colorId;
        let sizeId = btn.dataset.sizeId;
      
        cart.forEach(cartItem => {
          if (cartItem.productId == productId &&
            cartItem.colorId == colorId &&
            cartItem.sizeId == sizeId) {
            matchingProduct = cartItem;
          }
        });
      
        if (matchingProduct.quantity > 1) {
          matchingProduct.quantity = Number(matchingProduct.quantity) - 1;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateSubTotalPrice();

        if (userId) {
          updateCart(productId, colorId, sizeId, matchingProduct.quantity);
          retrieveCart();
        }

        window.location.reload();
      } 
    });

  }, []);
  return (
    <div className="container">
      <Header />

      <main className={checkout.main} id="main">
        <h1 className={checkout.title__h1}>Shopping Cart</h1>
        <div className={checkout.orders}>
          <section className={checkout.orderItems}>
            {cartItemsHtml}
          </section>

          <section className={checkout.orderSummary}>
            <h2 className={checkout.order__summary__title}>Order Summary</h2>
            <div className={`${checkout.orderTerm} subTotal`}>
              Sub Total: $0
            </div>
            <div className={`${checkout.orderTerm} discount`}>
              Discount (10%): -$0
            </div>
            <div className={`${checkout.orderTerm} totalPrice`}>
              Final Total: $0
            </div>
            <button className={checkout.checkoutBtn}>Checkout Now</button>
          </section>
        </div>
      </main>
    </div>
  );
}