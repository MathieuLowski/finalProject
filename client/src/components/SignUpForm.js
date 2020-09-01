import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";

import Profile from "./Profile";

const GuideForm = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, dispatchCurrentUser } = useContext(CurrentUserContext);
  console.log(currentUser);

  const signUp = () => {
    const postBody = { name, lastName, city, mail, password };
    console.log(dispatchCurrentUser);
    fetch("/signupform", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(postBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("zz", data);
        if (data.status === 201) {
          const action = {
            type: "signUp",
            payload: { ...data },
          };
          dispatchCurrentUser(action);
        } else console.log("err");
      });
  };
  console.log(currentUser);
  console.log();

  return (
    <Wrapper>
      {currentUser.user ? (
        <p>
          <Redirect to="/profile" />
        </p>
      ) : (
        <>
          <Text>
            <P>Just a little step to join our community.</P>
            <P>
              Sign up and create your profile to start meeting with different
              locals around the world.
            </P>
          </Text>
          <Form
            onSubmit={(ev) => {
              ev.preventDefault();
              signUp();
            }}
          >
            <label>First Name:</label>
            <Input
              required
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Last Name:</label>
            <Input
              required
              value={lastName}
              onChange={(ev) => setLastName(ev.target.value)}
            />
            <label>City:</label>
            <Input
              required
              value={city}
              onChange={(ev) => setCity(ev.target.value)}
            />
            <label>email:</label>
            <Input
              required
              value={mail}
              onChange={(ev) => setMail(ev.target.value)}
            />
            <label>Password</label>
            <Input
              required
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />

            <Submit type="submit">Sign Up</Submit>
          </Form>
        </>
      )}
    </Wrapper>
  );
};

export default GuideForm;

const Text = styled.div`
  padding: 50px;
`;

const P = styled.div`
  margin: 10px;
  font-size: 18px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 50px;
`;
const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 50px;
  border: solid 1px #06d6a0;
  border-radius: 5px;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);
`;

const Input = styled.input`
  padding: 5px;
  margin: 3px;
  border: 0;
  border-bottom: solid 2px #ffd166;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);
  width: 100%;
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
