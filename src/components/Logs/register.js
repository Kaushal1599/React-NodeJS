import React, { useState, useContext, useEffect } from "react";
import Authcontext from "../../components/auth/Authcontext";
import { SET_ALERT } from "../type";
export const Register = props => {
  const authcontext = useContext(Authcontext);

  const { register, isAuthenticated } = authcontext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);
  const [user, setUser] = useState({
    name: "",
    emp_id: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, emp_id, email, password, password2 } = user;

  const onChange = e =>
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();

    register({
      name,
      emp_id,
      email,
      password
    });
  };

  return (
    <div className="form=container">
      <h1>
        Account <span className="text-primary">Register </span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emp_id">Employee ID </label>
          <input
            type="text"
            name="emp_id"
            value={emp_id}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
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
        <div className="form-group">
          <label htmlFor="password2">Confirm Password </label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
