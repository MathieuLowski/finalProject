import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaGlobeAmericas } from "react-icons/fa";
import SignUpBtn from "./SignUpBtn";
import LoginBtn from "./LoginBtn";
import LougoutBtn from "./LogoutBtn";
import { CurrentUserContext } from "../CurrentUserContext";
import AccountBtn from "./AccountBtn";

const NavBar = () => {
  const { currentUser } = useContext(CurrentUserContext);
  console.log("nav", currentUser);

  return (
    <Wrapper>
      {currentUser.user ? (
        <>
          <StyledLink to="/">
            <FaGlobeAmericass />
          </StyledLink>
          <Link to="/">
            <H1>CiTiS</H1>
          </Link>
          <BtnDiv>
            <AccountBtn />
            {/* <SignUpBtnStyled /> */}
            {/* <LoginBtnStyled /> */}
            <LougoutBtn />
          </BtnDiv>
        </>
      ) : (
        <>
          <StyledLink to="/">
            <FaGlobeAmericas />
          </StyledLink>
          <Link to="/">
            <H1>CiTiS</H1>
          </Link>
          <BtnDiv>
            <SignUpBtnStyled />
            <></>
            <LoginBtnStyled />
            {/* <LougoutBtn /> */}
          </BtnDiv>
        </>
      )}
    </Wrapper>
  );
};

export default NavBar;
const StyledLink = styled(Link)`
  color: #ffd166;
  width: 55px;
  font-size: 4rem;
`;
const FaGlobeAmericass = styled(FaGlobeAmericas)`
  width: 55px;
`;
const SignUpBtnStyled = styled(SignUpBtn)`
  color: #ffd166;
`;

const LoginBtnStyled = styled(LoginBtn)``;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #06d6a0;
  padding: 10px;
`;

const BtnDiv = styled.div`
  display: flex;
  color: #ffd166;
`;
const H1 = styled.h1`
  font-size: 60px;
  font-weight: bold;
  color: #ffd166;
  padding: 15px;
`;
