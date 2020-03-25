import React, { useContext, useEffect, useState } from "react";
import Authcontext from "../auth/Authcontext";
export const Update = () => {
  const [user, setUser] = useState({
    holiday: "",
    date: "",
    reason: ""
  });

  const { holiday, date, reason } = user;

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
        <span className="text-primary"> Leave Form </span>
      </h1>
      <form>
        <div className="form-group">
          <label htmlFor="holiday">No of Holiday </label>
          <input
            type="number"
            name="holiday"
            min="1"
            max="10"
            value={holiday}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date </label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason</label>
          <input
            type="textfield"
            name="reason"
            value={reason}
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

export default Update;
