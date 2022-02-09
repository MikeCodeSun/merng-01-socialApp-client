import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { DeleteIcon } from "../component-style/Post-style";
import { useGlobalContext } from "../context/context";
import { GET_ALL_POSTS } from "./PostList";

const DELETE_COMMENT = gql`
  mutation DeleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
    }
  }
`;

export default function DeletePostButton({ post, commentId, comment }) {
  const { user } = useGlobalContext();
  const { id: postId } = post;
  // console.log(backHome);
  const { data } = useQuery(GET_ALL_POSTS);
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    variables: {
      postId,
      commentId,
    },
    update(cache) {
      const existedData = cache.readQuery({ query: GET_ALL_POSTS });
      // console.log(existedData);
      const newData = existedData.posts.map((i) => {
        if (i.id === postId) {
          const newComments = i.comments.filter((c) => c.id !== commentId);
          return {
            ...i,
            comments: newComments,
          };
        }
        return i;
      });
      cache.writeQuery({
        query: GET_ALL_POSTS,
        data: { posts: newData },
      });
    },
  });
  return (
    <DeleteIcon
      onClick={() => {
        deleteComment();
      }}
    >
      {user && user.id === comment.userid && <FaTrashAlt />}
    </DeleteIcon>
  );
}
