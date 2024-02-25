const SignUp = () => {
  return (
    <div>
      <form action=""></form>
      <div>
        <label htmlFor="first_name">First Name</label>
        <input type="text" id="first_name" name="first_name"/>
      </div>
      <div>
        <label htmlFor="last_name">Last Name</label>
        <input type="text" name="last_name" id="last_name"/>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email"/>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password"/>
      </div>
      <button>Submit</button>
    </div>
  );
};
