import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useGlobalContext } from "../context/context";

import { LikeIcon } from "../component-style/Post-style";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { GET_ALL_POSTS } from "./PostList";

const LIKE = gql`
  mutation Like($id: ID!) {
    like(id: $id) {
      username
      userid
      createdAt
    }
  }
`;

export default function LikeButton({ post }) {
  const { user } = useGlobalContext();
  const [like] = useMutation(LIKE);
  return (
    <LikeIcon
      onClick={() => {
        like({
          variables: { id: post.id },
          update(cache, { data }) {
            const existedData = cache.readQuery({
              query: GET_ALL_POSTS,
            });
            // console.log(existedData.posts);
            const like = data.like.find((i) => i.userid === user.id);
            // console.log(data.like);
            // like is action add user to like, so if like ,will have user, unlike will remove user
            let newData;
            if (like) {
              newData = existedData.posts.map((item) => {
                if (item.id === post.id) {
                  // console.log(item.likes);
                  // item.likes = data.like;
                  // item.likeCount++;
                  return {
                    ...item,
                    likes: data.like,
                    likeCount: item.likeCount + 1,
                  };
                }
                return item;
              });
            } else {
              newData = existedData.posts.map((item) => {
                if (item.id === post.id) {
                  // console.log(item.likes);
                  // item.likes = data.like;
                  // item.likeCount--;
                  return {
                    ...item,
                    likes: data.like,
                    likeCount: item.likeCount - 1,
                  };
                }
                return item;
              });
            }

            cache.writeQuery({
              query: GET_ALL_POSTS,
              data: { posts: newData },
            });
          },
        });
      }}
    >
      {user && post.likes.find((like) => like.userid === user.id) ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
      {post.likeCount === 0 ? " " : post.likeCount}
    </LikeIcon>
  );
}
