import axios from "axios";

import {
  allPostsData as _allPostsData,
  singlePostData as _singlePostData,
  allTagPostsData as _allTagPostsData,
  createSinglePost as _createSinglePost,
  deleteSinglePost as _deleteSinglePost,
  loadUserData as _loadUserData,
} from "./urls";

export const allPostsData = () => {
  const data = axios.get(_allPostsData);

  return data;
};

export const singlePostData = (id) => {
  return axios.get(_singlePostData.replace("{id}", id));
};

export const allTagPostsData = (tagName) => {
  return axios.get(_allTagPostsData.replace("{tagName}", tagName));
};

export const createSinglePost = (formData, auth) => {
  console.log("token from form data from postsApis = ", auth.user);
  const config_headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + auth.token,
    },
  };

  return axios.post(
    _createSinglePost.replace("{userId}", auth.user.id),
    formData,
    config_headers
  );
};

export const deleteSinglePost = (id) => {
  return axios.delete(_deleteSinglePost.replace("{id}", id));
};
