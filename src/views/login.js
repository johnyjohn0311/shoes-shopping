import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";
import Header from "./components/header";
import registration from "../css/registration.module.css";
import { retrieveCart } from "../controller/cart.js";

export default function Login() {
  let navigation = useNavigate();

  useEffect(() => {
    /**
     * showing password
     */
    let pass = document.getElementById('password');
    let checkBox = document.getElementById('checkBox');
    checkBox.onclick = function() {
      if (checkBox.checked) {
        pass.type = 'text'
      } else {
        pass.type = 'password'
      }
    }

    /**
     * log in
     */
    let loginBtn = document.getElementById('login-btn');

    loginBtn.onclick = function(e) {
      e.preventDefault();
      let formInputs = document.querySelectorAll('.login__form__input');
      let xhr = new XMLHttpRequest();
      let formData = new FormData();

      for (let i = 0; i < formInputs.length; i++) {
        formData.append(formInputs[i].name, formInputs[i].value);
      }

      xhr.open("POST", "http://localhost:8080/login.php", true);
      xhr.send(formData);
      xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let loginObj = JSON.parse(this.responseText);

          if (loginObj.success !== '') {
            let userId = loginObj.userId;
            localStorage.setItem('userId', JSON.stringify(userId));

            retrieveCart();
            navigation("/");

          } else {
            let errors = '';

            errors = loginObj.emailErr + loginObj.passwordErr;
            
            document.getElementById('errors').innerHTML = errors;
          }
        }
      }
    }
  }, []);

  return (
    <div className="container">
      <Header />

      <main className={registration.main} id="main">
        <h1 className={registration.title__h1}>
          Log in
        </h1>
        
        <div id="errors"></div>

        <form className={registration.signInForm}>
          <label className={registration.form__label} for="email">Email</label>
          <input type="email" className={`${registration.form__input} login__form__input`} name="email" id="email" placeholder="Email"/>
          <label className={registration.form__label} for="password">Password</label>
          <input type="password" className={`${registration.form__input} login__form__input`} name="password" id="password" placeholder="Password"/>
          <div className={registration.showPass}>
            <input type="checkbox" className={`${registration.form__input} ${registration.check__box}`} id="checkBox"/>
            <label className={registration.form__label} for="checkBox">Show password</label>
          </div>
          <button type="button" id="login-btn" className={registration.signInBtn}>Log in</button>
        </form>

        <div className={registration.redirect}>
          Don't have any account? <Link to="/signup"><b>Sign up</b></Link>
        </div>

        <div className={registration.otherSignIn}>
          <div className={registration.sign__up__with}>Log in with</div>
          <div className={registration.brandIcons}>
            <button className={registration.brandBtn}>
              <img className={registration.brand__logo} src="../images/icons/google.png" alt="logo"/>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}