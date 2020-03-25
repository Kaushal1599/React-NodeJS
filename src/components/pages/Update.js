import React, { useContext, useEffect, useState } from "react";
import Authcontext from "../auth/Authcontext";
export const Update = () => {
  const [user, setUser] = useState({
    task: "",
    work: "",
    hour: ""
  });

  const { task, work, hour } = user;

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
        <span className="text-primary"> Daily Update </span>
      </h1>
      <form>
        <div className="form-group">
          <label htmlFor="task">Task </label>
          <input
            type="text"
            name="task"
            value={task}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Work">Work Description </label>
          <input
            type="textfield"
            name="work"
            value={work}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="hour">No of Hour</label>
          <input
            type="number"
            name="hour"
            min="1"
            max="8"
            value={hour}
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
