import axios from "axios";

import { usersData as _usersData, profileData as _profileData } from "./urls";

export const usersData = async () => {
  const pop = await axios.get(_usersData);
  return pop;
};

export const profileData = (id) => {
  return axios.get(_profileData.replace("{id}", id));
};
