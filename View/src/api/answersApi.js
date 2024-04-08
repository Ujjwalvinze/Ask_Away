import axios from "axios";

import {
  allAnswersData as _allAnswersData,
  createSingleAnswer as _createSingleAnswer,
  deleteSingleAnswer as _deleteSingleAnswer,
} from "./urls";

export const allAnswersData = (id) => {
  return axios.get(_allAnswersData.replace("{id}", id));
};

export const createSingleAnswer = (token, userId, postId, formData) => {
  console.log("This is the question id = ", postId);
  const config_headers = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  const body = JSON.stringify({
    quesId: postId,
    body: formData,
  });

  // return null;
  return axios.post(
    _createSingleAnswer.replace("{userId}", userId),
    body,
    config_headers
  );
};

export const deleteSingleAnswer = (AnswerId) => {
  console.log("this is the answer id = ", AnswerId);
  return axios.delete(_deleteSingleAnswer.replace("{AnswerId}", AnswerId));
};
