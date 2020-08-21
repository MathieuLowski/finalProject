import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaGlobeAmericas } from "react-icons/fa";
import SignUpBtn from "./SignUpBtn";

const NavBar = () => {
  return (
    <Wrapper>
      <StyledLink to="/">
        <FaGlobeAmericas />
      </StyledLink>
      <Link to="/">
        <H1>Relax with locals</H1>
      </Link>
      <SignUpBtnStyled />
    </Wrapper>
  );
};

export default NavBar;
const StyledLink = styled(Link)`
  color: white;
  width: 55px;
`;
const SignUpBtnStyled = styled(SignUpBtn)``;
const Div = styled.div`
  width: 60px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: tomato;
  padding: 10px;
`;

const H1 = styled.h1`
  font-size: 40px;
  color: white;
  padding: 15px;
`;
