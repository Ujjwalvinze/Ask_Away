import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteAnswer } from "../../../../redux/answers/answers.actions";
import { profileData } from "../../../../api/usersApi";

import { ReactComponent as UpVote } from "../../../../assets/ArrowUpLg.svg";
import { ReactComponent as DownVote } from "../../../../assets/ArrowDownLg.svg";
import UserCard from "../../../../components/molecules/UserCard/UserCard.component";

import "./AnswerItem.styles.scss";
import censorBadWords from "../../../../utils/censorBadWords";

const AnswerItem = ({
  deleteAnswer,
  answer: { body, author: user_id, gravatar, id, activity, username },
  post: { post },
  auth,
}) => {
  const [author, setAuthor] = useState();

  // console.log("AnswerItem userId = ", user_id);

  useEffect(async () => {
    const author = await profileData(user_id);
    setAuthor(author.data.user);
  }, []);

  return (
    <Fragment>
      <div className="answer-layout">
        <div className="vote-cell">
          <div className="vote-container">
            <button
              className="vote-up"
              title="This answer is useful (click again to undo)"
            >
              <UpVote className="icon" />
            </button>
            <div className="vote-count fc-black-500">0</div>
            <button
              className="vote-down"
              title="This answer is not useful (click again to undo)"
            >
              <DownVote className="icon" />
            </button>
          </div>
        </div>
        <div className="answer-item">
          <div
            className="answer-content "
            dangerouslySetInnerHTML={{ __html: censorBadWords(body) }}
          ></div>
          <div className="answer-actions">
            <div className="action-btns">
              <div className="answer-menu">
                <Link
                  className="answer-links"
                  title="short permalink to this question"
                  to="/"
                >
                  share
                </Link>
                <Link
                  className="answer-links"
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
                      title="Delete the answer"
                      onClick={(e) => deleteAnswer(id)}
                      to={`/questions/${post.id}`}
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
                dateType={"Answered"}
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

AnswerItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  answer: PropTypes.object.isRequired,
  deleteAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { deleteAnswer })(AnswerItem);
