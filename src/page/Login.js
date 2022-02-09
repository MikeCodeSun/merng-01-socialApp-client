import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FromLabel,
  FormInput,
} from "../component-style/Form-style";
import {
  TitleContainer,
  Title,
  TitleUnderLine,
} from "../component-style/Title-style";
import { ButtonBlock } from "../component-style/Button-style";
import { gql, useMutation } from "@apollo/client";
import { useGlobalContext } from "../context/context";
import { useNavigate } from "react-router-dom";
import { Alert, AlertContainer } from "../component-style/Alert-style";
import { LoadingCircle } from "../component-style/Loading-style";

const LOGIN_USER = gql`
  mutation LoginUser($input: loginInput!) {
    loginUser(input: $input) {
      id
      name
      email
      token
      createdAt
    }
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);

  const navigate = useNavigate();

  const context = useGlobalContext();

  const [login_user, { loading }] = useMutation(LOGIN_USER, {
    variables: {
      input: {
        email,
        password,
      },
    },
    update: (_, { data }) => {
      // console.log(data);
      context.login(data.loginUser);
      navigate("/");
    },
    onError: (error) => {
      setError(error.graphQLErrors[0].extensions.error);
      setAlert(true);
    },
  });
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => clearTimeout(timeOut);
  }, [error]);

  if (loading && Object.keys(error).length === 0) {
    return <LoadingCircle></LoadingCircle>;
  }

  return (
    <>
      <Form>
        <TitleContainer>
          <Title>Login</Title>
          <TitleUnderLine></TitleUnderLine>
        </TitleContainer>

        <AlertContainer>
          {alert &&
            Object.values(error).map((err, index) => {
              return <Alert key={index}>{err}</Alert>;
            })}
        </AlertContainer>

        <FormControl>
          <FromLabel>Email</FromLabel>
          <FormInput
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormInput>
        </FormControl>
        <FormControl>
          <FromLabel>Password</FromLabel>
          <FormInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></FormInput>
        </FormControl>
        <FormControl>
          <ButtonBlock
            onClick={(e) => {
              e.preventDefault();
              login_user();
            }}
          >
            Submit
          </ButtonBlock>
        </FormControl>
      </Form>
    </>
  );
}
