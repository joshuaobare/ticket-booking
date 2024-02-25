import "../App.css";
const Login = () => {
    const [formData, setFormData] = useState({        
        email: "",
        password: "",
      });
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
          console.log(response);
          setFormData({            
            email: "",
            password: ""
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
      <form action="" method="post">
        <div>
          <label htmlFor="">Email</label>
          <input type="email" name="email" id="email" value={formData.email}/>
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="password" name="password" id="password" value={formData.password}/>
        </div>
      </form>
    </div>
  );
};

export default Login;