import { useState } from "react";

const SignUp = () => {
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
          body: JSON.stringify(formData),
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
    <div>
      <form action="" method="post" onSubmit={formSubmit}>
        <div>
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            onChange={formChange}
            value={formData.first_name}
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            onChange={formChange}
            value={formData.last_name}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={formChange}
            value={formData.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={formChange}
            value={formData.password}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SignUp;
