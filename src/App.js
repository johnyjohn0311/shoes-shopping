import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";
import Home from "./views/index.js";
import Account from "./views/account.js";
import Details from "./views/details.js";
import Checkout from "./views/checkout.js";
import Signup from "./views/signup.js";
import Login from "./views/login.js";

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="details" element={<Details />} />
          <Route path="account" element={<Account />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
