import { useEffect } from "react";
import Header from "./components/header";
import index from "../css/index.module.css";
import "../controller/products.js";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();

  /**
   * products display 
   */
  let products = JSON.parse(localStorage.getItem('products'));
  let productsHtml = '';

  productsHtml = products.map(product => {
    let imgPath = "./images/" + product.img;

    return (
      <div className={`${index.productCard} indexProductCard`} key={product.id} data-product-id={product.id}>
        <div className={index.productImage}>
          <img className={index.product__img} src={imgPath} alt="product"/>
        </div>

        <div className={index.productDescription}>
          <div className={index.product__name}>
            {product.name}
          </div>
          <div className={index.product__brand}>{product.brand}</div>
          <div className={index.product__price}>$ {product.price}</div>
        </div>
      </div>
    );
  });

  useEffect(() => {
    /**
     * product click event
     */
    let productCards = document.querySelectorAll('.indexProductCard');

    productCards.forEach(product => {
      product.onclick = function() {
        let productId = product.dataset.productId;
        localStorage.setItem('PRODUCT_ID', JSON.stringify(productId));
        navigate("/details");
      }
    }); 

    /**
     * slides scrolling
     */
    let productSlides = document.querySelector('.indexProductSlides');
    let productCard = document.querySelector('.indexProductCard');
    let arrows = document.querySelectorAll('.arrow');

    arrows.forEach(arrow => {
      let width = productCard.clientWidth;
      arrow.onclick = function() {
        let direction = arrow.id == "left-arr"? -1: 1;
        let scrollAmount = direction * width;
        productSlides.scrollBy({left: scrollAmount, behavior: "smooth"});
      }
    });
  }, []);

  return (
    <div className="container">
      <Header />

      <main className={index.main} id="main">
        <h1 className={index.title__h1}>
          MEN'S TRAINERS & SHOES
        </h1>

        <div className={index.filterArrange}>
          <button className={index.filterBtn}>
            <img className={index.filter__img} src="./images/icons/filter.png" alt="filter"/>
            Filter
          </button>
          <button className={index.arrangeBtn}>
            <img className={index.downarr__img} src="./images/icons/down-arrow.png" alt="arrange"/>
            Arrange
          </button>
        </div>

        <div className={`${index.productSlides} indexProductSlides`}>
          {productsHtml}
        </div>

        <div className={index.pagination}>
          <button className={`${index.pageBtn} arrow`} id="left-arr">{'<'}</button>
          <button className={`${index.pageBtn} arrow`} id="right-arr">{'>'}</button>
        </div>
      </main>
    </div>
  );
}