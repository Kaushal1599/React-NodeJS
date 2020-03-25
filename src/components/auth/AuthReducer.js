import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ISEXECUTIVE,
  ISMANAGER,
  ISTELECALLER,
  LOGOUT,
  ROLE_FAIL
} from "../type";

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    /*switch (action.role) {
        case ISTELECALLER:
          return {
            ...state,
            isAuthenticated: true,
            isTelecaller: true,
            loading: false,
            user: action.payload
          };

        case ISMANAGER:
          return {
            ...state,
            isAuthenticated: true,
            isManager: true,
            loading: false,
            user: action.payload
          };

        case ISEXECUTIVE:
          return {
            ...state,
            isAuthenticated: true,
            isExecutive: true,
            loading: false,
            user: action.payload
          };*/
    //}

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      switch (action.role) {
        case ISTELECALLER:
          return {
            ...state,
            isAuthenticated: true,
            isTelecaller: true,
            loading: false,
            user: action.payload
          };

        case ISMANAGER:
          return {
            ...state,
            isAuthenticated: true,
            isManager: true,
            loading: false,
            user: action.payload
          };

        case ISEXECUTIVE:
          return {
            ...state,
            isAuthenticated: true,
            isExecutive: true,
            loading: false,
            user: action.payload
          };
      }

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isExecutive: false,
        isManager: false,
        isTelecaller: false,
        loading: false,
        user: null,
        error: action.payload
      };
  }
};
