import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const Header = () => {
  const Navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("jwtToken");
    Navigate("/login");
  };
  return (
    <div className="nav-bar-cont">
      <ul className="nav-bar">
        <li>
          <Link to="/">
            <img
              className="nav-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="web logo"
            />
          </Link>
        </li>
        <li>
          <Link className="n-link" to="/">
            Home
          </Link>
          <Link className="n-link" to="/job">
            jobs
          </Link>
        </li>
        <li>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
