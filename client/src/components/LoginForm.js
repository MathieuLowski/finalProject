import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";

import Profile from "./Profile";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, dispatchCurrentUser } = useContext(CurrentUserContext);
  //console.log(currentUser);

  const login = () => {
    const postLogin = { email, password };
    fetch("/login", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(postLogin),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("ss", data);
        if (data.status === 201) {
          const action = {
            type: "login",
            payload: { ...data },
          };
          console.log(action);
          dispatchCurrentUser(action);
        } else console.log("err");
      });
  };
  return (
    <Wrapper>
      {currentUser.user ? (
        <p>
          <Redirect to="/profile" />
        </p>
      ) : (
        <>
          <Form
            onSubmit={(ev) => {
              ev.preventDefault();
              login();
            }}
          >
            <label>Email:</label>
            <Mail
              required
              value={email}
              onChange={(ev) => {
                setEmail(ev.target.value);
              }}
            />
            <label>Password:</label>
            <Pass
              required
              type="password"
              value={password}
              onChange={(ev) => {
                setPassword(ev.target.value);
              }}
            />
            <Submit type="submit">Login</Submit>
          </Form>
        </>
      )}
    </Wrapper>
  );
};

export default LoginForm;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px;
`;
const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 50px;
  border: solid 1px #06d6a0;
  border-radius: 5px;
`;

const Mail = styled.input`
  padding: 5px;
  margin: 3px;
  border: 0;
  border-bottom: solid 2px #ffd166;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  outline: none;
`;
const Pass = styled.input`
  padding: 5px;
  margin: 3px;
  border: 0;
  border-bottom: solid 2px #ffd166;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);
  outline: none;
`;

const Submit = styled.button`
  margin: 3px;
  cursor: pointer;
  padding: 10px;
  border: none;
  background-color: #06d6a0;
  color: #ffd166;
  font-weight: 600;
  border-radius: 5px;
  width: 100%;
  outline: none;
  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: ease-in;
  :hover {
    background-color: #ffd166;
    color: #06d6a0;
  }
`;
