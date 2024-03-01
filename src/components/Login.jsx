import { useState } from "react";
import "../App.css";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

// entry point is App component
const Login = ({ setLoggedIn, setIsAdmin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await fetch(
        "http://localhost:8080/ticket-booking/php/loginuser.php",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const response = await request.json();
      
      if (response.message) {
        setLoggedIn(true);
        setIsAdmin(response.user.isAdmin);
        setFormData({
          email: "",
          password: "",
        });
        setLoginError("");
        localStorage.setItem("user_id", response.user.user_id);
        navigate("/")
      }
      if (response.error) {
        setLoginError(response.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  return (
    <div className="login">
      <h1>Sign in</h1>
      <form
        action=""
        method="post"
        onSubmit={formSubmit}
        className="login-form"
      >
        <div className="login-form-item">
          <label htmlFor="email" className="login-form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={formChange}
            className="login-form-input"
            required
          />
        </div>
        <div className="login-form-item">
          <label htmlFor="password" className="login-form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={formChange}
            className="login-form-input"
            required
          />
        </div>
        <div className="login-form-forgot-pass">Forgot Password ?</div>
        <div className="login-error-message">{loginError}</div>
        <button className="login-form-submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default Login;
