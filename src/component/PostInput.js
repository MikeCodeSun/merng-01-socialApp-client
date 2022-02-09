import React, { useEffect, useState } from "react";
import { Button } from "../component-style/Button-style";
import {
  FormStyle,
  InputContainerStyle,
  InputStyle,
} from "../component-style/Input-style";
import { gql, useMutation } from "@apollo/client";
import { Alert, AlertContainer } from "../component-style/Alert-style";
import { GET_ALL_POSTS } from "./PostList";

const CREATE_POST = gql`
  mutation CreatePost($input: postInput!) {
    createPost(input: $input) {
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
      }
      likes {
        userid
        username
        createdAt
      }
    }
  }
`;

export default function PostInput() {
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);

  const [createPost] = useMutation(CREATE_POST, {
    variables: {
      input: {
        body,
      },
    },
    update(cache, { data }) {
      const existedData = cache.readQuery({ query: GET_ALL_POSTS });
      // console.log(data);
      // console.log(existedData.posts);

      cache.writeQuery({
        query: GET_ALL_POSTS,
        data: { posts: [data.createPost, ...existedData.posts] },
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
            placeholder="Write some Post..."
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              createPost();
            }}
          >
            Submit
          </Button>
        </InputContainerStyle>
      </FormStyle>
    </>
  );
}
