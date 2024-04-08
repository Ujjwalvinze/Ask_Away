import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { usersData } from "../../../api/urls";
import { useEffect } from "react";

import censorBadWords from "../../../utils/censorBadWords";

import htmlSubstring from "../../../utils/htmlSubstring";
import injectEllipsis from "../../../utils/injectEllipsis";

import UserCard from "../UserCard/UserCard.component";
import TagBadge from "../TagBadge/TagBadge.component";

import "./PostItem.styles.scss";
import { profileData } from "../../../api/usersApi";

const PostItem = ({
  post: {
    _id: id,
    title,
    body,
    author: authorId,
    gravatar,
    answers,
    comments,
    activity,
    tags,
  },
}) => {
  const answerVoteUp = (
    <div className="vote answer">
      <span className="vote-count">{answers.length}</span>
      <div className="count-text">answers</div>
    </div>
  );

  const answerVoteDown = (
    <div className="vote">
      <span className="vote-count">{answers.length}</span>
      <div className="count-text">answers</div>
    </div>
  );

  const [author, setAuthor] = useState();

  useEffect(async () => {
    const author = await profileData(authorId);
    setAuthor(author.data.user);
  }, []);

  // console.log(body);

  return (
    <div className="posts">
      <div className="stats-container fc-black-500">
        <div className="stats">
          <div className="vote">
            <span className="vote-count">{comments.length}</span>
            <div className="count-text">comments</div>
          </div>
          {answers.length > 0 ? answerVoteUp : answerVoteDown}
          <div className="vote">
            <span className="vote-count">{tags.length}</span>
            <div className="count-text">tags</div>
          </div>
          <div className="vote">
            <div className="count-text">{activity.views} views</div>
          </div>
        </div>
      </div>
      <div className="summary">
        <h3>
          <Link to={`/questions/${id}`}>{censorBadWords(title)}</Link>
        </h3>
        <div
        // className="brief"
        // dangerouslySetInnerHTML={{
        //   __html: injectEllipsis(censorBadWords(htmlSubstring(body, 200))),
        // }}
        >
          {censorBadWords(body)}
        </div>
        <div className="profile-tags">
          {tags.map((tag, index) => (
            <TagBadge key={index} tag_name={tag.tagname} size={"s-tag"} />
          ))}
        </div>
        {author ? (
          <UserCard
            created_at={activity.lastModified}
            user_id={authorId}
            gravatar={gravatar}
            username={author?.username}
            float={"right"}
            backgroundColor={"transparent"}
          />
        ) : (
          <div>Loading Author</div>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default connect(null)(PostItem);
