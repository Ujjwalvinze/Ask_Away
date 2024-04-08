import { setAlert } from "../alert/alert.actions";
import {
  GET_POSTS,
  GET_POST,
  GET_TAG_POSTS,
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
} from "./posts.types";
import {
  allPostsData,
  singlePostData,
  allTagPostsData,
  createSinglePost,
  deleteSinglePost,
} from "../../api/postsApis";
import { connect } from "react-redux";

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await allPostsData();

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "danger"));

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await singlePostData(id);
    // console.log("Single post data = ", res);

    dispatch({
      type: GET_POST,
      payload: res.data[0],
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "danger"));

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//GET TAG POSTS
export const getTagPosts = (tagName) => async (dispatch) => {
  try {
    const res = await allTagPostsData(tagName);

    dispatch({
      type: GET_TAG_POSTS,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "danger"));

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add post
export const addPost = (formData, auth) => async (dispatch) => {
  try {
    const res = await createSinglePost(formData, auth);

    // console.log("post action question created = ", res);

    dispatch({
      type: ADD_POST,
      payload: res.data.question,
    });

    dispatch(setAlert(res.data.message, "success"));

    dispatch(getPosts());
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "danger"));

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete post
export const deletePost = (id, auth) => async (dispatch) => {
  try {
    const res = await deleteSinglePost(id, auth);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(setAlert("success"));
  } catch (err) {
    console.log(err);
    dispatch(setAlert(err.response.data.msg, "danger"));

    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(deletePost);
