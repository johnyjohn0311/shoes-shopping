import { useEffect } from "react";
import Header from "./components/header";
import details from "../css/details.module.css";
import "../controller/colorsizeimages.js";
import {cart, addToCart} from '../js/data/cart.js';
import {insertCart, retrieveCart} from '../controller/cart.js';

export default function Details() {
  let PRODUCT_ID = Number(JSON.parse(localStorage.getItem('PRODUCT_ID')));
  let userId = JSON.parse(localStorage.getItem('userId'));

  /**
   * display subimages html 
   */
  let subImagesHtml = '';
  let subImagesArr = JSON.parse(localStorage.getItem('subImages'));
  let subImages = [];

  for (let i = 0; i < subImagesArr.length; i++) {
    if (subImagesArr[i].productId == PRODUCT_ID) {
      subImages.push(subImagesArr[i]);
    }
  }

  subImagesHtml = subImages.map(imgArr => {
    let imgPath = "/images/subimages/" + imgArr.img;
    return (
      <div className={`${details.productScrollImage} detailsProductScrollImage`}>
        <img className={`${details.product__subimg} details__product__subimg`} src={imgPath} alt="product image"/>
      </div>
    );
  });

  /** 
   * color html
   */ 
  let colorsHtml = '';
  let colorsArr = JSON.parse(localStorage.getItem('colors'));
  let colors = [];

  for (let i = 0; i < colorsArr.length; i++) {
    if (colorsArr[i].productId == PRODUCT_ID) {
      colors.push(colorsArr[i]);
    }
  }

  colorsHtml = colors.map(color => {
    let imgPath = "/images/color-images/" + color.img;
    return (
      <button className={`${details.colorBtn} detailsColorBtn`} key={color.id} data-color-id={color.id} type="button" value={color.color}>
        <img className={`${details.colorBtn} detailsColorBtn`} src={imgPath} alt="color"/>
      </button>
    );
  });

  /**
   * size html
   */ 
  let sizeHtml = '';
  let sizesArr = JSON.parse(localStorage.getItem('sizes'));
  let sizes = [];

  for (let i = 0; i < sizesArr.length; i++) {
    if (sizesArr[i].productId == PRODUCT_ID) {
      sizes.push(sizesArr[i]);
    }
  }

  sizeHtml = sizes.map(size => {
    return (
      <button className={`${details.sizeBtn} detailsSizeBtn`} key={size.id} data-size-id={size.id} type="button" value={size.size}>{size.size}</button>
    );
  });



  useEffect(() => {
    /**
     * image scroll
    */
    let productScrollBar = document.querySelector('.detailsProductScrollBar');
    let productImg = document.querySelector('.details__product__img');
    let scrollBtns = document.querySelectorAll('.detailsScrollBtn');
    let productScrollImages = document.querySelectorAll('.detailsProductScrollImage');
    let productSubImages = document.querySelectorAll('.details__product__subimg');
    let imageIndex = 0;
    productImg.src = productSubImages[imageIndex].src;
    productSubImages[imageIndex].style.borderWidth = '2px';
    productSubImages[imageIndex].style.borderStyle = 'solid';
    productSubImages[imageIndex].style.borderColor = 'black';

    scrollBtns.forEach(btn => {
      btn.onclick = function() {
        let direction = btn.id === 'scrollBtnLeft'? -1: 1;
        let scrollAmount = productScrollImages[0].clientWidth * direction;
        productScrollBar.scrollBy({left: scrollAmount, behavior: "smooth"});

        // show border
        if (direction > 0) {
          if (imageIndex < productSubImages.length - 1) {
            imageIndex++;
          }
        } else {
          if (imageIndex > 0) {
            imageIndex--;
          }
        }

        imageShow();
      }
    }); 

    // image show on click
    productSubImages.forEach((img, index) => {
      img.onclick = function() {
        imageIndex = index;
        imageShow();
      }
    });

    function imageShow() {
      productImg.src = productSubImages[imageIndex].src;
      productSubImages[imageIndex].style.borderWidth = '2px';
      productSubImages[imageIndex].style.borderStyle = 'solid';
      productSubImages[imageIndex].style.borderColor = 'black';
      for (let j = 0; j < productSubImages.length; j++) {
        if (j != imageIndex) {
          productSubImages[j].style.border = 'none';
        }
      }
    }

    /**
     * update quantity
    */
    let subtractBtns = document.querySelectorAll('.subtractBtn');
    let plusBtns = document.querySelectorAll('.plusBtn');
    let quantityInputs = document.querySelectorAll('.details__number__input');
    
    plusBtns.forEach((btn, index) => {
      btn.onclick = function() {
        quantityInputs[index].value++;
      }
    });

    subtractBtns.forEach((btn, index) => {
      btn.onclick = function() {
        if (quantityInputs[index].value > 1) {
          quantityInputs[index].value--;
        }
      }
    });

    /**
    * add to cart 
    */
    // color choosing
    let colorBtns = document.querySelectorAll('.detailsColorBtn');
    let colorId;
    let colorText = '';

    colorBtns.forEach(color => {
      color.onclick = function() {
        colorText = color.value;
        colorId = color.dataset.colorId;
        document.querySelector('.details__color__text').textContent = 'Color: ' + colorText;
      }
    });

    document.querySelector('.details__color__text').textContent = 'Color: ' + colorText;

    // size choosing
    let sizeBtns = document.querySelectorAll('.detailsSizeBtn');
    let sizeId;
    let sizeText = '';

    sizeBtns.forEach(size => {
      size.onclick = function() {
        sizeText = size.value;
        sizeId = size.dataset.sizeId;
        document.querySelector('.details__size__text').textContent = 'Size: ' + sizeText;
      }
    });

    document.querySelector('.details__size__text').textContent = 'Size: ' + sizeText;

    /**
     * add to cart
     */
    let addBtn = document.querySelector('.detailsAddBtn');
    addBtn.onclick = function() {
      if ((!colorId) || (!sizeId)) {
        alert("please choose both color and size!");
      } else {
        let quantity = document.querySelector('.details__number__input').value;
        let productId = addBtn.dataset.productId;

        addToCart(productId, colorId, sizeId, quantity);
        localStorage.setItem('cart', JSON.stringify(cart));

        if (userId) {
          insertCart(); 
          retrieveCart(); 
        }

        alert("added to cart");

        /**
        * cart quantity
        */
        let count;

        if (!cart) {
          count = 0;
        } else {
          count = cart.length;
        }

        document.querySelector('.product__count').innerHTML = count;
      }
    }

  }, []);

  return (
    <div className="container">
      <Header />

      <main className={details.main} id="main">
        <section className={details.productShow}>
          <div className={details.productImage}>
            <img className={`${details.product__img} details__product__img`} src="../images/ASIAN Men's CAPTAIN-13 Sports Running,Walking & Gym Shoes with Lightweight Eva Sole with Casual Sneaker Shoes for Men's & Boy's.jpg" alt="product"/>
          </div>
          <div className={details.productScroll}>
            <button className={`${details.scrollBtn} ${details.scrollBtnLeft} detailsScrollBtn`} id="scrollBtnLeft">{'<'}</button>
            <button className={`${details.scrollBtn} ${details.scrollBtnRight} detailsScrollBtn`} id="scrollBtnRight">{'>'}</button>

            <div className={`${details.productScrollBar} detailsProductScrollBar`}>
              {subImagesHtml}
            </div>
          </div>
        </section>

        <section className={details.productAdd}>
          <form onSubmit={(e) => {e.preventDefault();}} className={details.productForm}>
            <h2 className={details.product__name}>
              ASIAN Men's CAPTAIN-13 Sports Running,Walking & Gym Shoes with Lightweight Eva Sole with Casual Sneaker Shoes for Men's & Boy's
            </h2>
            <div className={details.product__brand}>Nike</div>
            <div className={details.product__price}>$ 100</div>
            <div className={details.productColor}>
              <span className={`${details.color__text} details__color__text`}>Color: Black</span>

              <div className={details.colorSelection}>
                {colorsHtml}
                {/* <button className={details.colorBtn} type="button" value="">
                  <img className={details.color__img} src="../images/color-images/ASIAN Men's CAPTAIN-13 Sports Running,Walking & Gym Shoes with Lightweight Eva Sole with Casual Sneaker Shoes for Men's & Boy's-blue.jpg" alt="color"/>
                </button>
                <button className={details.colorBtn} type="button" value="">
                  <img className={details.color__img} src="../images/color-images/ASIAN Men's CAPTAIN-13 Sports Running,Walking & Gym Shoes with Lightweight Eva Sole with Casual Sneaker Shoes for Men's & Boy's-navy.jpg" alt="color"/>
                </button> */}
              </div>
            </div>

            <div className={details.productSize}>
              <span className={`${details.size__text} details__size__text`}>Size: 41</span>
              <div className={details.sizeSelection}>
                {sizeHtml}
                {/* <button className={details.sizeBtn} type="button" value="41">41</button>
                <button className={details.sizeBtn} type="button" value="42">42</button>
                <button className={details.sizeBtn} type="button" value="43">43</button> */}
              </div>
            </div>

            <div className={details.quantityUpdate}>
              <button className={`${details.quantityBtn} subtractBtn`} id="subtract">-</button>
              <input id="quantityInput" className={`${details.number__input} details__number__input`} type="number" defaultValue="1" min="1"/>
              <button className={`${details.quantityBtn} plusBtn`} id="add">+</button>
            </div>

            <button type="submit" data-product-id={PRODUCT_ID} className={`${details.addBtn} detailsAddBtn`}>Add to Cart</button>
          </form>
        </section>
      </main>
    </div>
  );
}