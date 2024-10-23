import React from "react";
function SignUpForm() {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  });
  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();

    const { name, email, password, confirmpassword } = state;
    if(password === confirmpassword){
      alert(
        `You are sign up with name: ${name} email: ${email} and password: ${password}`
      );
  
      for (const key in state) {
        setState({
          ...state,
          [key]: ""
        });
      }
    }
    else{
      alert(
        `Your password: ${password} and confirm password ${confirmpassword} is not matched!!!`
      );
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <input
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          type="password"
          name="confirmpassword"
          value={state.confirmpassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        <input
          type="password"
          name="confirmpassword"
          value={state.confirmpassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        <input
          type="password"
          name="confirmpassword"
          value={state.confirmpassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        <button className="checkbutton">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
