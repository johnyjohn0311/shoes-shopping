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

export default function Signup() {
  let navigation = useNavigate();
  useEffect(() => {
    /**
     * showing password
     */
    let pass = document.getElementById('password');
    let cpass = document.getElementById('cpassword');
    let checkBox = document.getElementById('checkBox');
    checkBox.onclick = function() {
      if (checkBox.checked) {
        pass.type = 'text'
        cpass.type = 'text';
      } else {
        pass.type = 'password'
        cpass.type = 'password';
      }
    }

    /**
     * sign up
     */
    let signupBtn = document.getElementById('signup-btn');
    signupBtn.onclick = function(e) {
      e.preventDefault();
      let formInputs = document.querySelectorAll('.register__form__input');
      let xhr = new XMLHttpRequest();
      let formData = new FormData();
      
      for (let i = 0; i < formInputs.length; i++) {
        formData.append(formInputs[i].name, formInputs[i].value);
      }

      // send user informations to the server
      xhr.open("POST", "http://localhost:8080/signup.php", true);
      xhr.send(formData);
      xhr.onreadystatechange = function() {
        if (this.status == 200 && this.readyState == 4) {
          let signObj = JSON.parse(this.responseText);

          if (signObj.success !== '') {
            let userId = signObj.userId;
            let cart = [];

            localStorage.setItem('userId', JSON.stringify(userId));
            localStorage.setItem('cart', JSON.stringify(cart));

            navigation("/");
          } else {
            let errors = '';

            errors = signObj.userNameErr + signObj.emailErr + 
            signObj.passwordErr + signObj.cpasswordErr + signObj.emailDuplicate;

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
          Sign up
        </h1>
        
        <div id="errors"></div>
        <form className={registration.signInForm} return="false;">
          <label className={registration.form__label} for="userName">Your name</label>
          <input type="text" className={`${registration.form__input} register__form__input`} name="userName" id="userName" placeholder="Your name"/>
          <label className={registration.form__label} for="email">Email</label>
          <input type="email" className={`${registration.form__input} register__form__input`} name="email" id="email" placeholder="Email"/>
          <label className={registration.form__label} for="password">Password</label>
          <input type="password" className={`${registration.form__input} register__form__input`} name="password" id="password" placeholder="Password"/>
          <label className={registration.form__label} for="cpassword">Confirm password</label>
          <input type="password" className={`${registration.form__input} register__form__input`} name="cpassword" id="cpassword" placeholder="Confirm password"/>
          <div className={registration.showPass}>
            <input type="checkbox" className={`${registration.form__input} ${registration.check__box}`} id="checkBox"/>
            <label className={registration.form__label} for="checkBox">Show password</label>
          </div>
          <button type="button" id="signup-btn" className={registration.signInBtn}>Create account</button>
        </form>

        <div className={registration.redirect}>
          Already have an account? <Link to="/login"><b>Log in</b></Link>
        </div>

        <div className={registration.otherSignIn}>
          <div className={registration.sign__up__with}>Sign up with</div>
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