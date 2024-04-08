import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deletePost } from "../../../../redux/posts/posts.actions";
import { profileData } from "../../../../api/usersApi";

import TagBadge2 from "../../../../components/molecules/TagBadge/TagBadge.component2";
import UserCard from "../../../../components/molecules/UserCard/UserCard.component";

import "./PostCell.styles.scss";
import censorBadWords from "../../../../utils/censorBadWords";

const PostCell = ({
  deletePost,
  auth,
  post: {
    post: {
      _id: id,
      body: post_body,
      tags,
      gravatar,
      author: user_id,
      username,
      activity,
    },
  },
}) => {
  const [author, setAuthor] = useState();

  useEffect(async () => {
    const author = await profileData(user_id);
    setAuthor(author.data.user);
  }, []);

  return (
    <Fragment>
      <div className="post-cell">
        <div
          className="post-text fc-black-800"
          dangerouslySetInnerHTML={{ __html: censorBadWords(post_body) }}
        ></div>
        <div className="post-tags fc-black-800">
          Tags :
          {tags.map((tag, index) => (
            <TagBadge2 key={index} tagId={tag} size={"s-tag"} float={"left"} />
          ))}
        </div>
        <div className="post-actions fc-black-800">
          <div className="post-actions-extended">
            <div className="post-btns">
              <div className="post-menu">
                <Link
                  className="post-links"
                  title="short permalink to this question"
                  to="/"
                >
                  share
                </Link>
                <Link
                  className="post-links"
                  title="Follow this question to receive notifications"
                  to="/"
                >
                  follow
                </Link>
                {!auth.loading &&
                  auth.isAuthenticated &&
                  user_id === auth.user.id && (
                    <Link
                      className="s-link s-link__danger"
                      style={{ paddingLeft: "4px" }}
                      title="Delete the post"
                      onClick={(e) => deletePost(id)}
                      to="/questions"
                    >
                      delete
                    </Link>
                  )}
              </div>
            </div>
            {author ? (
              <UserCard
                created_at={activity.lastModified}
                user_id={user_id}
                gravatar={gravatar}
                username={author.username}
                dateType={"Asked"}
                backgroundColor={"transparent"}
              />
            ) : (
              <div>Author Loading</div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

PostCell.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost })(PostCell);
