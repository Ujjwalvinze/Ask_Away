import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { singleTagData } from "../../../api/tagsApi";

import "./TagBadge.styles.scss";

const TagBadge = ({ tagId, size, display, link, href }) => {
  const [tag_name, setTag_name] = useState();
  useEffect(async () => {
    const tagData = await singleTagData(tagId);
    // console.log("Tag Badge2 = ", tagData, tagId);
    setTag_name(tagData.data.newTag?.name);
  });

  return (
    <Fragment>
      <div className="tags-badge" style={{ display }}>
        {href === true ? (
          <Link className={`${size}`} to={link ? link : `/tags/${tag_name}`}>
            {tag_name}
          </Link>
        ) : (
          <Link className={`${size}`} to={link ? link : `/tags/${tag_name}`}>
            {tag_name}
          </Link>
        )}
      </div>
    </Fragment>
  );
};

export default TagBadge;
