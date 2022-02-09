import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Alert, AlertContainer } from "../component-style/Alert-style";
import { Button } from "../component-style/Button-style";
import {
  FormStyle,
  InputContainerStyle,
  InputStyle,
} from "../component-style/Input-style";
import { GET_POST } from "../page/SinglePost";
// import { GET_ALL_POSTS } from "./PostList";

const CREATE_COMMENT = gql`
  mutation CreateComment($id: ID!, $body: String!) {
    createComment(id: $id, body: $body) {
      id
      body
      username
      createdAt
      userid
    }
  }
`;

const GET_ALL_POSTS = gql`
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

export default function CommentInput({ id }) {
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);

  const { data: allPost, loading, error: errorMsg } = useQuery(GET_ALL_POSTS);

  const [createComment] = useMutation(CREATE_COMMENT, {
    variables: {
      id,
      body,
    },
    update(cache, { data }) {
      // console.log("up");
      const existedData = cache.readQuery({ query: GET_ALL_POSTS });
      const singleData = cache.readQuery({
        query: GET_POST,
        variables: { id },
      });
      // console.log(singleData);
      // console.log(existedData);
      let newData;
      if (existedData) {
        newData = existedData.posts.map((post) => {
          if (post.id === id) {
            // console.log("id");
            return {
              ...post,
              comments: data.createComment,
              commentCount: post.commentCount + 1,
            };
          }
          return post;
        });
      }
      // existedData.post.comments = data.createComment;
      // console.log(existedData);
      // console.log("write");
      cache.writeQuery({
        query: GET_ALL_POSTS,
        data: { posts: newData },
      });
    },
    onError(error) {
      setError(error.graphQLErrors[0].extensions.error);
      setAlert(true);
    },
    onCompleted() {
      setBody("");
    },
  });

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => clearTimeout(timeOut);
  }, [error]);
  return (
    <>
      <FormStyle>
        <AlertContainer>
          {alert &&
            Object.values(error).map((err, index) => {
              return <Alert key={index}>{err}</Alert>;
            })}
        </AlertContainer>
        <InputContainerStyle>
          <InputStyle
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="write some comment..."
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              createComment();
            }}
          >
            Submit
          </Button>
        </InputContainerStyle>
      </FormStyle>
    </>
  );
}
