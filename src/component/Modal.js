import React, { useState } from "react";
import { FaEdit, FaTimes, FaTrashAlt } from "react-icons/fa";
import {
  ButtonClose,
  DeleteButtonConatiner,
  ModalContainer,
  ModalContent,
  ModalTitle,
} from "../component-style/Modal-style";
import { DeleteIcon, EditIcon } from "../component-style/Post-style";
import { useGlobalContext } from "../context/context";
import DeletePostButton from "./DeletePostButton";
import { ButtonCloseModal } from "../component-style/Button-style";
import EditButton from "./EditButton";

export default function Modal({ post, edit, emptyPage }) {
  const [showModal, setShowModal] = useState(false);
  const { user } = useGlobalContext();
  return (
    <>
      {edit ? (
        <EditIcon onClick={() => setShowModal(true)}>
          {user && user.id === post.userid && <FaEdit />}
        </EditIcon>
      ) : (
        <DeleteIcon
          onClick={() => {
            setShowModal(true);
          }}
        >
          {user && user.id === post.userid && <FaTrashAlt />}
        </DeleteIcon>
        // <DeletePostButton post={post} backHome={false} />
      )}

      <ModalContainer
        $showModal={showModal}
        style={{ background: "rgba(0,0,0, 0.4)" }}
      >
        <ModalContent>
          <ButtonClose onClick={() => setShowModal(false)}>
            <FaTimes />
          </ButtonClose>

          {edit ? (
            <section>
              <EditButton setShowModal={setShowModal} post={post} />
            </section>
          ) : (
            <section>
              <ModalTitle>Are you sure DELETE this Post?</ModalTitle>
              <DeleteButtonConatiner>
                <DeletePostButton
                  post={post}
                  backHome={false}
                  emptyPage={emptyPage}
                />
                <ButtonCloseModal onClick={() => setShowModal(false)}>
                  No
                </ButtonCloseModal>
              </DeleteButtonConatiner>
            </section>
          )}
        </ModalContent>
      </ModalContainer>
    </>
  );
}
