import React, { useContext, useEffect, useState } from "react";
import Authcontext from "../auth/Authcontext";
export const Form = () => {
  const [user, setUser] = useState({
    total: "",
    recieved: "",
    response: ""
  });

  const { total, recieved, response } = user;

  const onChange = e =>
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  /*const onSubmit = e => {
    e.preventDefault();

    register({
      name,
      email,
      password
    });
  };*/
  const AuthContext = useContext(Authcontext);

  useEffect(() => {
    AuthContext.loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="form=container">
      <h1>
        <span className="text-primary"> Report Form </span>
      </h1>
      <form>
        <div className="form-group">
          <label htmlFor="total">Total Calls </label>
          <input
            type="number"
            name="total"
            min="0"
            value={total}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="recieved">Call Recieved </label>
          <input
            type="number"
            name="recieved"
            value={recieved}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="notrecieved">Not Recieved</label>
          <input
            type="number"
            name="notrecieved"
            min="0"
            value={total - recieved}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="response">Response</label>
          <input
            type="text"
            name="response"
            value={response}
            onChange={onChange}
          />
        </div>

        <input
          type="submit"
          value="Submit"
          className="btn btn-success btn-block"
        />
      </form>
    </div>
  );
};

export default Form;
