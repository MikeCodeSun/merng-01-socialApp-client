import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useGlobalContext } from "../context/context";
import { Loading, LoadingCircle } from "../component-style/Loading-style";
import {
  IconContainer,
  PostContainer,
  PostContent,
  PostDate,
  PostInfo,
  OnePost,
  UserIcon,
} from "../component-style/Post-style";
import moment from "moment";

import LikeButton from "./LikeButton";

import CommentButton from "./CommentButton";
import PostInput from "./PostInput";

import Modal from "./Modal";

export const GET_ALL_POSTS = gql`
  query Posts {
    posts {
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

export default function PostList() {
  const { data, loading, error } = useQuery(GET_ALL_POSTS);
  const { user } = useGlobalContext();

  if (loading) {
    return <LoadingCircle></LoadingCircle>;
  }
  if (error) {
    return <Loading>Something went wrong...</Loading>;
  }
  // console.log(data.posts);

  return (
    <>
      <PostContainer>
        {user && <PostInput />}
        {data &&
          data.posts.map((post) => {
            // console.log(post.likes);
            return (
              <OnePost key={post.id}>
                <PostInfo>
                  <UserIcon>{post.username[0]}</UserIcon>
                  {post.username}

                  <PostDate>
                    {moment(new Date(Number(post.createdAt))).fromNow()}
                  </PostDate>
                </PostInfo>
                <PostContent>{post.body}</PostContent>
                <IconContainer>
                  <LikeButton post={post} />

                  <CommentButton post={post} />

                  <Modal post={post} edit={true} />
                  <Modal post={post} edit={false} emptyPage={false} />
                </IconContainer>
              </OnePost>
            );
          })}
      </PostContainer>
    </>
  );
}
