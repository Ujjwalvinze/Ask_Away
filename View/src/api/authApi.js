import axios from "axios";

import {
  loadUserData as _loadUserData,
  registerUser as _registerUser,
  loginUser as _loginUser,
} from "./urls";

export const loadUserData = async (tokenData) => {
  // const config_headers = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  // };

  // const body = JSON.stringify({token : tokenData})

  // const loadUserRes = await axios.post(_loadUserData, body, config_headers);

  if (!tokenData) {
    return null;
  }
  const loadUserData = await axios.get(
    _loadUserData.replace("{token}", tokenData)
  );
  // const loadUserRes = await axios.post(_loadUserData);
  // console.log("hello Auth api", loadUserRes);
  return loadUserData.data;
};

export const registerUser = async (username, password) => {
  const config_headers = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const email = "Default Email";
  const about = "";
  const socials = {
    github: "",
    x: "",
  };
  const tags = [];

  const body = JSON.stringify({
    username,
    password,
    email,
    about,
    socials,
    tags,
  });

  return await axios.post(_registerUser, body, config_headers);
};

export const loginUser = (username, password) => {
  const config_headers = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const body = JSON.stringify({ username, password });

  return axios.post(_loginUser, body, config_headers);
};
