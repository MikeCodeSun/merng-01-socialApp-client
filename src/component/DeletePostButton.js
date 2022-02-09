import { gql, useMutation } from "@apollo/client";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { DeleteIcon } from "../component-style/Post-style";
import { useGlobalContext } from "../context/context";
import { GET_ALL_POSTS } from "./PostList";
import { useNavigate } from "react-router-dom";
import { ButtonDelete } from "../component-style/Button-style";

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export default function DeletePostButton({ post, backHome, emptyPage }) {
  const { user } = useGlobalContext();
  const { id } = post;
  // console.log(backHome);
  const navigate = useNavigate();
  const [deletePost] = useMutation(DELETE_POST, {
    variables: {
      id,
    },
    update(cache) {
      const existedData = cache.readQuery({ query: GET_ALL_POSTS });
      const newData = existedData.posts.filter((post) => post.id !== id);
      cache.writeQuery({
        query: GET_ALL_POSTS,
        data: { posts: newData },
      });
    },
    onCompleted() {
      if (emptyPage) {
        navigate("/");
      }
    },
  });
  return (
    <>
      {user &&
        user.id === post.userid &&
        (backHome ? (
          <DeleteIcon
            onClick={() => {
              deletePost();
            }}
          >
            <FaTrashAlt></FaTrashAlt>
          </DeleteIcon>
        ) : (
          <ButtonDelete
            onClick={() => {
              deletePost();
            }}
          >
            Yes
          </ButtonDelete>
        ))}
    </>
  );
}
