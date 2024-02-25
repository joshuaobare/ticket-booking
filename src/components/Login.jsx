import { useState } from "react";
import "../App.css";

const Login = ({ setLoggedIn, setIsAdmin }) => {
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
        setIsAdmin(response.user.isAdmin)
        setFormData({
          email: "",
          password: "",
        });
        setLoginError("");
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
    <div>
      <form action="" method="post" onSubmit={formSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={formChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={formChange}
          />
        </div>
        <div>{loginError}</div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
