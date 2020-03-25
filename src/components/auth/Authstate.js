import React, { useReducer } from "react";
import AuthContext from "./Authcontext";
import AuthReducer from "./AuthReducer";
import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERROR,
  ISEXECUTIVE,
  ISMANAGER,
  ISTELECALLER,
  ROLE_FAIL,
  LOGOUT
} from "../type";
import setAuthToken from "../../utils/setAuthToken";

const Authstate = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    loading: true,
    isAuthenticated: null,
    error: null,
    user: null,
    isExecutive: null,
    isTelecaller: null,
    isManager: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //load USer
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    // const role = formData.emp_id.slice(0, 2);
    // console.log(role);

    try {
      const res = await axios.get("./api/auth");

      // if (role === "EX") {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
      /*} else if (role === "TC") {
        dispatch({
          type: USER_LOADED,
          role: ISTELECALLER,
          payload: res.data
        });
      } else if (role === "MA") {
        dispatch({
          type: USER_LOADED,
          role: ISMANAGER,
          payload: res.data
        });

      }*/
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.msg
      });
    }
  };

  //Regsiter user

  const register = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const role = formData.emp_id.slice(0, 2);

    try {
      const res = await axios.post("./api/users", formData, config);

      if (role === "EX") {
        dispatch({
          type: REGISTER_SUCCESS,
          role: ISEXECUTIVE,
          payload: res.data
        });
      } else if (role === "TC") {
        dispatch({
          type: REGISTER_SUCCESS,
          role: ISTELECALLER,
          payload: res.data
        });
      } else if (role === "MA") {
        dispatch({
          type: REGISTER_SUCCESS,
          role: ISMANAGER,
          payload: res.data
        });
      }

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  //login user
  const login = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const role = formData.emp_id.slice(0, 2);
    try {
      const res = await axios.post("./api/auth", formData, config);
      if (role === "EX") {
        dispatch({
          type: LOGIN_SUCCESS,
          role: ISEXECUTIVE,
          payload: res.data
        });
      } else if (role === "TC") {
        dispatch({
          type: LOGIN_SUCCESS,
          role: ISTELECALLER,
          payload: res.data
        });
      } else if (role === "MA") {
        dispatch({
          type: LOGIN_SUCCESS,
          role: ISMANAGER,
          payload: res.data
        });
      }
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        role: ROLE_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  //logout
  const logout = () => dispatch({ type: LOGOUT });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        isExecutive: state.isExecutive,
        isTelecaller: state.isTelecaller,
        isManager: state.isManager,
        register,
        login,
        logout,
        loadUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default Authstate;
