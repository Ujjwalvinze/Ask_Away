import config from "../config";

// Users
export const usersData = "http://localhost:3000/user/allusers";
export const profileData = "http://localhost:3000/user/{id}";

// Auth
export const loadUserData = "http://localhost:3000/user/fromtoken/{token}";
export const registerUser = "http://localhost:3000/user";
export const loginUser = "http://localhost:3000/user/login-username";

// Posts
export const allPostsData = "http://localhost:3000/question/allques";
export const singlePostData = "http://localhost:3000/question/{id}";
export const allTagPostsData = config.BASE_URL + "/api/posts/tag/{tagName}";
export const createSinglePost = "http://localhost:3000/question/{userId}";
export const deleteSinglePost = config.BASE_URL + "/api/posts/{id}";

// Answers
export const allAnswersData = "http://localhost:3000/answer/{id}";
export const createSingleAnswer = "http://localhost:3000/answer/{userId}";
export const deleteSingleAnswer =
  config.BASE_URL + "/api/posts/answers/{AnswerId}";

// Comments
export const allCommentsData = config.BASE_URL + "/api/posts/comments/{id}";
export const createSingleComment =
  config.BASE_URL + "/api/posts/comments/{postId}";
export const deleteSingleComment =
  config.BASE_URL + "/api/posts/comments/{CommentId}";

// Tags
export const allTagsData = "http://localhost:3000/tag/";
export const singleTagData = "http://localhost:3000/tag/{tagId}";
