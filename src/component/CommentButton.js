import React from "react";
import { FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CommentIcon } from "../component-style/Post-style";

export default function CommentButton({ post }) {
  return (
    <>
      <Link to={`/post/${post.id}`}>
        <CommentIcon>
          <FaRegComment />
          {post.commentCount === 0 ? " " : post.commentCount}
        </CommentIcon>
      </Link>
    </>
  );
}
