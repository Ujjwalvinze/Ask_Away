import { setAlert } from "../alert/alert.actions";
import { GET_TAG, GET_TAGS, TAG_ERROR } from "./tags.types";
import { allTagsData, singleTagData } from "../../api/tagsApi";

export const getTag = (tagId) => async (dispatch) => {
  try {
    const res = await singleTagData(tagId);
    // console.log("Get tag api = ", res);

    dispatch({
      type: GET_TAG,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "danger"));

    dispatch({
      type: TAG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getTags = () => async (dispatch) => {
  try {
    const res = await allTagsData();

    // console.log("respose from tags action = ", res.data.allTags);

    const tags = res.data.allTags.map((tag) => {
      return tag;
    });

    dispatch({
      type: GET_TAGS,
      payload: tags,
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, "danger"));

    dispatch({
      type: TAG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
