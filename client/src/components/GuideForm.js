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
  //const [submit, setSubmit] = useState(false);
  const { currentUser, dispatchCurrentUser } = useContext(CurrentUserContext);
  console.log(currentUser);

  const signUp = () => {
    const postBody = { name, lastName, city, mail, password };
    console.log(dispatchCurrentUser);
    fetch("/createGuide", {
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
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              ultricies lacinia massa. Nullam scelerisque tellus quis nulla
              imperdiet, vel sodales tortor fringilla. Nulla velit dolor,
              posuere id eleifend nec, faucibus ac urna. Etiam eu lacus ut quam
              venenatis semper sit amet nec libero. Morbi vel porttitor lacus.
              Morbi turpis neque, hendrerit sit amet pulvinar ut, faucibus sed
              ligula.
            </p>
          </Text>
          <Form
            onSubmit={(ev) => {
              ev.preventDefault();
              signUp();
            }}
          >
            <label>First Name:</label>
            <input
              required
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Last Name:</label>
            <input
              required
              value={lastName}
              onChange={(ev) => setLastName(ev.target.value)}
            />
            <label>City:</label>
            <input
              required
              value={city}
              onChange={(ev) => setCity(ev.target.value)}
            />
            <label>email:</label>
            <input
              required
              value={mail}
              onChange={(ev) => setMail(ev.target.value)}
            />
            <label>Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />

            <button type="submit">Sign Up</button>
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
  border: solid 1px tomato;
  border-radius: 15px;
`;
