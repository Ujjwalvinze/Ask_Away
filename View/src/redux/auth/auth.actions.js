import { loadUserData, registerUser, loginUser } from "../../api/authApi";
import setAuthToken from "./auth.utils";
import { setAlert } from "../alert/alert.actions";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./auth.types";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    // const res = await loadUserData();
    // console.log("This is the token still - ", localStorage.token);
    const res = await loadUserData(localStorage.token);

    // console.log("Auth action load = ", res);

    dispatch({
      type: USER_LOADED,
      payload: res.userData,
    });
  } catch (err) {
    // console.log("catch run during user load");
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      const res = await registerUser(username, password);

      // console.log("register result in auth action : ", res);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.user,
      });

      dispatch(setAlert(res.data.message, "success"));

      dispatch(login({ username, password }));
      // dispatch(loadUser());
    } catch (err) {
      dispatch(setAlert("danger"));

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Login User
export const login =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      const res = await loginUser(username, password);

      // console.log("This is login", res.data.User.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token: res.data.User.token },
      });

      dispatch(setAlert(res.data.message, "success"));

      dispatch(loadUser());
      // window.localStorage.setItem("token", res.data.User.token);
    } catch (err) {
      dispatch(setAlert("danger"));

      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

//LOGOUT
export const logout = () => (dispatch) => {
  dispatch(setAlert("User has logged out", "success"));
  localStorage.removeItem("token");

  dispatch({ type: LOGOUT });
};
