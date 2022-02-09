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

const CREATE_USER = gql`
  mutation CreateUser($input: userInput!) {
    createUser(input: $input) {
      id
      name
      email
      token
      createdAt
    }
  }
`;

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [alert, setAlert] = useState(false);

  const navigate = useNavigate();

  const context = useGlobalContext();

  const [create_user, { loading }] = useMutation(CREATE_USER, {
    variables: {
      input: {
        email,
        name,
        password,
        confirmPassword,
      },
    },
    update: (_, { data }) => {
      // console.log(data);
      context.login(data.createUser);
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
          <Title>Register</Title>
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
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormInput>
        </FormControl>
        <FormControl>
          <FromLabel>name</FromLabel>
          <FormInput
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <FromLabel>Conform Password</FromLabel>
          <FormInput
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></FormInput>
        </FormControl>
        <FormControl>
          <ButtonBlock
            onClick={(e) => {
              e.preventDefault();
              create_user();
            }}
          >
            Submit
          </ButtonBlock>
        </FormControl>
      </Form>
    </>
  );
}
