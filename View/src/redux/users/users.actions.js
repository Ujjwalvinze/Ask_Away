import { GET_USERS, GET_USER, USER_ERROR } from "./users.types";
import { usersData, profileData } from "../../api/usersApi";

// Get users
export const getUsers = () => async (dispatch) => {
  try {
    // console.log("Hello");
    const res = await usersData();
    // console.log("Hello", res.data);
    dispatch({
      type: GET_USERS,
      payload: res.data.user,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err },
    });
  }
};

// Get user
export const getProfile = (id) => async (dispatch) => {
  try {
    const res = await profileData(id);

    dispatch({
      type: GET_USER,
      payload: res.data.user,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
