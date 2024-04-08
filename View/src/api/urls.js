// import config from "../config";

const { REACT_APP_BASE_URL: URL } = process.env;

// Users
export const usersData = URL + "/user/allusers";
export const profileData = URL + "/user/{id}";

// Auth
export const loadUserData = URL + "/user/fromtoken/{token}";
export const registerUser = URL + "/user";
export const loginUser = URL + "/user/login-username";

// Posts
export const allPostsData = URL + "/question/allques";
export const singlePostData = URL + "/question/{id}";
export const allTagPostsData = "/api/posts/tag/{tagName}";
export const createSinglePost = URL + "/question/{userId}";
export const deleteSinglePost = "/question/{id}";

// Answers
export const allAnswersData = URL + "/answer/{id}";
export const createSingleAnswer = URL + "/answer/{userId}";
export const deleteSingleAnswer = URL + "/api/posts/answers/{AnswerId}";

// Comments
export const allCommentsData = URL + "/api/posts/comments/{id}";
export const createSingleComment = URL + "/api/posts/comments/{postId}";
export const deleteSingleComment = URL + "/api/posts/comments/{CommentId}";

// Tags
export const allTagsData = URL + "/tag/";
export const singleTagData = URL + "/tag/{tagId}";
