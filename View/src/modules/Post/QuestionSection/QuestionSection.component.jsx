import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import CommentCell from "./CommentCell/CommentCell.component";
import VoteCell from "./VoteCell/VoteCell.component";
import PostCell from "./PostCell/PostCell.component";

import "./QuestionSection.styles.scss";

const QuestionSection = ({
  post: {
    post: { answers, comments, tags },
  },
}) => {
  return (
    <Fragment>
      <div className="question">
        <div className="post-layout">
          <VoteCell
            answerCount={answers.length}
            commentCount={comments.length}
            tagCount={tags ? tags.length : 0}
          />
          <PostCell />
          <CommentCell />
        </div>
      </div>
    </Fragment>
  );
};

QuestionSection.propTypes = {
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, null)(QuestionSection);
