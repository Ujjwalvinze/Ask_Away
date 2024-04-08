import React from "react";

import AvatarCard from "./AvatarCard/AvatarCard.component";
import ContentCard from "./ContentCard/ContentCard.component";

import { ReactComponent as ProfilePic } from "../../../assets/defaultProfile.svg";

import "./UserSection.styles.scss";

const UserSection = ({ user }) => (
  <div className="grid">
    <AvatarCard id={user._id} gravatar={ProfilePic} views={user.views} />
    <ContentCard
      username={user.username}
      answers_count={user.userAnswers.length}
      posts_count={user.userQuestions.length}
      comments_count={user.userComments.length}
      tags_count={user.tags.length}
      created_at={user.activity.joinDate}
    />
  </div>
);

export default UserSection;
