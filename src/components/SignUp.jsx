import { useState } from "react";
import "../styles/SignUp.css"

const SignUp = ({is_admin}) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await fetch(
        "http://localhost:8080/ticket-booking/php/createuser.php",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({...formData, is_admin: is_admin? 1: 0}),
        }
      );
      const response = await request.json();
      console.log(response);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      });
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
    <div className="signup">
      <h1>Register</h1>
      <form action="" method="post" onSubmit={formSubmit} className="signup-form">        
        <div className="signup-form-item">
          <label htmlFor="first_name" className="signup-form-item-label">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            onChange={formChange}
            className="signup-form-item-input"
            value={formData.first_name}
            required
          />
        </div>
        <div className="signup-form-item">
          <label htmlFor="last_name" className="signup-form-item-label">Last Name</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            className="signup-form-item-input"
            onChange={formChange}
            value={formData.last_name}
            required
          />
        </div>
        <div className="signup-form-item">
          <label htmlFor="email" className="signup-form-item-label">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="signup-form-item-input"
            onChange={formChange}
            value={formData.email}
            required
          />
        </div>
        <div className="signup-form-item">
          <label htmlFor="password" className="signup-form-item-label">Password</label>
          <input
            type="password"
            className="signup-form-item-input"
            name="password"
            id="password"
            onChange={formChange}
            value={formData.password}
            required
          />
        </div>
        <button className="signup-form-submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
