import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import { CurrentUserContext } from "../CurrentUserContext";

const LogoutBtn = () => {
  const { currentUser, dispatchCurrentUser } = useContext(CurrentUserContext);
  const [click, setClick] = useState(false);
  console.log(click);
  console.log(currentUser);
  if (click === true) {
    const action = { type: "logout", payload: { click } };
    dispatchCurrentUser(action);
  } else console.log("err");

  const logout = () => {};
  return (
    <Wrapper>
      <>
        <Link to="/">
          <Button onClick={() => setClick(!click)}>Logout</Button>
        </Link>
      </>
    </Wrapper>
  );
};

export default LogoutBtn;

const Wrapper = styled.div``;
const Button = styled.button`
  font-size: 20px;
  color: #ffd166;
  justify-content: flex-end;
  background-color: #06d6a0;
  border-radius: 5px;
  font-weight: 600;
  border: none;
  width: 95px;
  height: 35px;
  outline: none;

  :hover {
    background-color: #06d6a0;
    color: #ffd166;
    border-radius: 5px;
    border: solid 2px #ffd166;
  }
`;
