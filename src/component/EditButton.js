import React, { useState } from "react";
import {
  ButtonCloseModal,
  EditButtonStyle,
} from "../component-style/Button-style";
import {
  DeleteButtonConatiner,
  EditTitle,
  ModalEditInput,
} from "../component-style/Modal-style";
import { gql, useMutation } from "@apollo/client";

const EDIT_POST = gql`
  mutation UpdatePost($ide: ID!, $body: String!) {
    updatePost(id: $ide, body: $body) {
      id
      body
      username
      userid
      createdAt
      likeCount
      commentCount
      comments {
        userid
        username
        body
        id
        createdAt
      }
      likes {
        userid
      }
    }
  }
`;

export default function EditButton({ setShowModal, post }) {
  const [body, setBody] = useState(post.body);

  const { id } = post;
  // console.log(id, body);
  const [editPost] = useMutation(EDIT_POST, {
    variables: {
      ide: id,
      body,
    },
    update(cache, { data }) {
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },
    onCompleted() {
      setShowModal(false);
    },
  });

  const editHandle = () => {
    if (!body) {
      window.alert("Please add some content to change");
    } else {
      editPost();
    }
  };

  return (
    <>
      <EditTitle>Edit Post</EditTitle>

      <ModalEditInput
        type="text"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <DeleteButtonConatiner>
        <EditButtonStyle onClick={editHandle}>Edit</EditButtonStyle>
        <ButtonCloseModal onClick={() => setShowModal(false)}>
          close
        </ButtonCloseModal>
      </DeleteButtonConatiner>
    </>
  );
}
