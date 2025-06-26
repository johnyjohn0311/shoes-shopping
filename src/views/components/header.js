import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";
import { useEffect } from "react";

export default function Header() {
  let quantity;
  let navigation = useNavigate();

  useEffect(() => {
    /**
     * display menu, contact
    */
    let contactBtn = document.querySelector('.contactBtn');
    let contactSocial = document.querySelector('.contactSocial');
    let menuBtn = document.querySelector('.menuBtn');
    let navContainer = document.querySelector('.navContainer');
    contactBtn.onclick = function() {
      contactSocial.classList.toggle('navContainer-contactSocial');
    }

    menuBtn.onclick = function() {
      navContainer.classList.toggle('navContainer-contactSocial');
    }

    /**
     * cart quantity
     */
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
      quantity = 0;
    } else {
      quantity = cart.length;
    }
    document.querySelector('.product__count').innerHTML = quantity;

    /**
     * hide signup and login sections when a user log in
     */
    let userId = JSON.parse(localStorage.getItem('userId'));
    let registerLinks = document.querySelectorAll('.registerLink');
    let logoutLink = document.querySelector('.logoutLink');
    let accountLink = document.querySelector('.accountLink');

    logoutLink.style.display = 'none';
    accountLink.style.display = 'none';
    
    if (userId) {
      registerLinks.forEach(link => {
        link.style.display = 'none';
      });
      logoutLink.style.display = 'block';
      accountLink.style.display = 'block';
    }

    /**
     * log out 
     */
    logoutLink.onclick = function() {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", "http://localhost:8080/logout.php", true);
      xhr.send(); 
      xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let response = this.responseText;
          console.log(response);
          let cart = [];
          localStorage.setItem('cart', JSON.stringify(cart));
          localStorage.setItem('userId', 'null');
          navigation("/");
        }
      }
    }
  }, []);

  return (
    <header className="header" id="header">
      <div className="upperHeader">
        <div className="logoContainer"><img className="logo__img" src={'/images/logo.jpg'} alt="logo"/></div>
        <div className="contactSocial">
          <Link href="">Supports</Link>
          <Link href=""><img className="social__img" src="./images/icons/facebook.png" alt="facebook"/></Link>
          <Link href=""><img className="social__img" src="./images/icons/instagram.png" alt="facebook"/></Link>
          <Link href=""><img className="social__img" src="./images/icons/youtube.png" alt="facebook"/></Link>
          <Link href=""><img className="social__img" src="./images/icons/twitter.png" alt="facebook"/></Link>
        </div>

        <button className="contactBtn">
          Contact
        </button>
      </div>

      <nav className="lowerHeader">
        <button className="menuBtn">
          <img className="menu__img" src="./images/icons/menu.png" alt="menu"/>
        </button>
        <div className="navContainer">
          <Link className="navLink" to="/">
            <img className="home__img" src="./images/icons/home.png" alt="home"/>
            Home
          </Link>
          <Link className="navLink accountLink" to="/account">My account</Link>
          <Link className="navLink logoutLink">Log out</Link>
          <Link className="navLink registerLink" to="/login">Log in</Link>
          <Link className="navLink registerLink" to="/signup">Sign up</Link>
          <Link className="navLink cartLink cartLinkDesktop" to="/checkout">
            <div className="product__count">0</div>
            <img className="cart__img" src="./images/icons/cart.png" alt="cart"/>
          </Link>
        </div>
      </nav>
    </header>
  );
}