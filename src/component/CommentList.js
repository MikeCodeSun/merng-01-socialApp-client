import React from "react";

import {
  IconContainer,
  OnePost,
  PostContent,
  PostDate,
  PostInfo,
  UserIcon,
} from "../component-style/Post-style";

import moment from "moment";

import DeleteCommentButton from "./DeleteCommentButton";

export default function CommentList({ post, comment }) {
  return (
    <>
      <OnePost>
        <PostInfo>
          <UserIcon>{comment.username[0]}</UserIcon>
          {comment.username}

          <PostDate>
            {moment(new Date(Number(comment.createdAt))).fromNow()}
          </PostDate>
        </PostInfo>
        <PostContent>{comment.body}</PostContent>

        <IconContainer>
          <DeleteCommentButton
            post={post}
            comment={comment}
            commentId={comment.id}
          />
        </IconContainer>
      </OnePost>
    </>
  );
}
