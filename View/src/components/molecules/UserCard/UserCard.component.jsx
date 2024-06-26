import React, { Fragment } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import { ReactComponent as ProfilePic } from "../../../assets/defaultProfileVerySmall.svg";

import "./UserCard.styles.scss";

const UserCard = ({
  created_at,
  user_id,
  gravatar,
  username,
  dateType,
  float,
  backgroundColor,
}) => {
  return (
    <Fragment>
      <div
        className="owner"
        style={{ float: float, backgroundColor: backgroundColor }}
      >
        <div className="user-block fc-black-500">
          <div className="action-time">
            {dateType ? dateType : "modified"}{" "}
            {moment(created_at).fromNow(true)} ago by
          </div>
          <div className="user-logo">
            <Link className="user-link" to={`/users/${user_id}`}>
              {/* <div className="logo-wrapper"> */}
              {/* <img alt="user_logo" src={"/def.png"} /> */}
              <ProfilePic />
              {/* </div> */}
            </Link>
          </div>
          <div className="user-profile">
            <Link
              className="user-profile-link fc-blue-600"
              to={`/users/${user_id}`}
            >
              {username}
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UserCard;
