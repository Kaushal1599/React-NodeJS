import React, { useState, useContext, useEffect } from "react";
import Authcontext from "../../components/auth/Authcontext";

const Login = props => {
  const authcontext = useContext(Authcontext);
  const { login, isAuthenticated } = authcontext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  const [user, setUser] = useState({
    emp_id: "",
    password: ""
  });
  const { emp_id, password } = user;

  const onChange = e =>
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();
    login({
      emp_id,
      password
    });
  };

  return (
    <div className="form=container">
      <h1>
        Account <span className="text-primary">Login </span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="emp_id">Employee ID </label>
          <input type="text" name="emp_id" value={emp_id} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>

        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
