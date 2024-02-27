import "../styles/Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">TICKETFLOW</div>
      <div className="navbar-mid"></div>
      <div className="navbar-right">
        <div>
          <Link to="/login">
            <div>Sign In</div>
          </Link>
        </div>
        <div>
          <Link to="/signup">
            <div>Register</div>
          </Link>
        </div>
        <div>
          <button>Admin</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
