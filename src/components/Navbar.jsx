import { useEffect, useState } from "react";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [userData, setUserData] = useState({
    user_id: null,
    first_name: "",
    last_name: "",
    email: "",
    is_admin: false,
  });

  useEffect(() => {
    const userVerification = async (user_id) => {
      try {
        const request = await fetch(
          `http://localhost:8080/ticket-booking/php/fetchuser.php?id=${user_id}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const response = await request.json();

        if (response.user) {
          setUserData({
            user_id: response.user.user_id,
            first_name: response.user.first_name,
            last_name: response.user.last_name,
            email: response.user.email,
            is_admin: response.user.is_admin === "1" ? true : false,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (localStorage.getItem("user_id")) {
      userVerification(localStorage.getItem("user_id"));
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">TICKETFLOW</Link>
      </div>
      <div className="navbar-mid"></div>
      {!userData.user_id ? (
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
      ) :  (
        <div className="navbar-right">
          <div className="navbar-link-cont">
            <Link to={`/profile/${userData.user_id}`}>
              <div>{`${userData.first_name} ${userData.last_name}`}</div>
            </Link>
          </div>
        </div>
      ) }
    </nav>
  );
};

export default Navbar;
