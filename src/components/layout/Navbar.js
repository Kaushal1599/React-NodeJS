import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../components/auth/Authcontext";

export const Navbar = ({ title }) => {
  const authContext = useContext(AuthContext);

  const {
    isAuthenticated,
    isTelecaller,
    isExecutive,
    isManager,
    logout,
    user
  } = authContext;

  const onLogout = () => {
    logout();
  };
  const ExceutiveLinks = (
    <Fragment>
      <li>
        <Link to="/Update">Update</Link>
      </li>
      <li>
        <Link to="/Leave">Leave</Link>
      </li>
      <li>HELLO {user && user.name}</li>
      <li>
        <Link onClick={onLogout} to="/logout">
          logout
        </Link>
      </li>
    </Fragment>
  );
  const TelecallerLinks = (
    <Fragment>
      <li>
        <Link to="/Update">Update</Link>
      </li>
      <li>
        <Link to="/Leave">Leave</Link>
      </li>
      <li>
        <Link to="/Form">Form</Link>
      </li>
      <li>HELLO {user && user.name}</li>
      <li>
        <Link onClick={onLogout} to="/logout">
          logout
        </Link>
      </li>
    </Fragment>
  );

  const ManagerLinks = (
    <Fragment>
      <li>
        <Link to="/">Update</Link>
      </li>
      <li>
        <Link to="/Leave">Leave</Link>
      </li>
      <li>HELLO {user && user.name}</li>
      <li>
        <Link onClick={onLogout} to="/logout">
          logout
        </Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </Fragment>
  );
  return (
    <div className="navbar bg-dark">
      <h1>{title}</h1>
      <ul>
        {isAuthenticated
          ? isExecutive
            ? ExceutiveLinks
            : isTelecaller
            ? TelecallerLinks
            : ManagerLinks
          : guestLinks}
      </ul>
    </div>
  );
};

Navbar.prototype = {
  title: PropTypes.string.isRequired
};

Navbar.defaultProps = {
  title: "WELCOME!!"
};
export default Navbar;
