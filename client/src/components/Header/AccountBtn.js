import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AccountBtn = () => {
  return (
    <Wrapper>
      <Link to="/profile">
        <Button>Account</Button>
      </Link>
    </Wrapper>
  );
};

export default AccountBtn;

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
