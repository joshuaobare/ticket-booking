import "../styles/Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">TICKETFLOW</Link>
      </div>
      <div className="navbar-mid"></div>
      <div className="navbar-right">
        <div className="navbar-link-cont">
          <Link to="/login">
            <div>Sign In</div>
          </Link>
        </div>
        <div className="navbar-link-cont">
          <Link to="/signup">
            <div>Register</div>
          </Link>
        </div>
        <div className="navbar-link-cont">
          <button>Admin</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
