import React from "react";
import { Link, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import {
  IconContainer,
  OnePost,
  PostContainer,
  PostContent,
  PostDate,
  PostInfo,
  UserIcon,
} from "../component-style/Post-style";
import moment from "moment";
import LikeButton from "../component/LikeButton";

import { useGlobalContext } from "../context/context";
import { Loading, LoadingCircle } from "../component-style/Loading-style";
import CommentList from "../component/CommentList";
import CommentInput from "../component/CommentInput";

import Modal from "../component/Modal";

export const GET_POST = gql`
  query Post($id: ID!) {
    post(id: $id) {
      id
      body
      username
      userid
      createdAt
      comments {
        id
        body
        username
        userid
        createdAt
      }
      likes {
        username
        userid
        createdAt
      }
      likeCount
      commentCount
    }
  }
`;

export default function SinglePost() {
  const { user } = useGlobalContext();
  const { id } = useParams();

  // console.log(id);
  const { data, loading, error } = useQuery(GET_POST, {
    variables: { id },
  });

  if (loading) {
    return <LoadingCircle></LoadingCircle>;
  }
  if (error) {
    return <Loading>Something went wrong...</Loading>;
  }

  // console.log(data);
  return (
    <>
      <Link to="/">back to Home</Link>

      {data && (
        <PostContainer>
          <OnePost>
            <PostInfo>
              <UserIcon>{data.post.username[0]}</UserIcon>
              {data.post.username}

              <PostDate>
                {moment(new Date(Number(data.post.createdAt))).fromNow()}
              </PostDate>
            </PostInfo>
            <PostContent>{data.post.body}</PostContent>
            <IconContainer>
              <LikeButton post={data.post} />

              {/* <EditIcon>
                {user && user.id === data.post.userid && <FaEdit />}
              </EditIcon> */}

              <Modal post={data.post} edit={true} />

              <Modal post={data.post} edit={false} emptyPage={true} />
            </IconContainer>
          </OnePost>
          {user && <CommentInput id={id} />}
          {data.post.comments
            .slice(0)
            .reverse()
            .map((comment) => {
              return (
                <CommentList
                  key={comment.id}
                  comment={comment}
                  post={data.post}
                />
              );
            })}
        </PostContainer>
      )}
    </>
  );
}
