import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SignUpBtn = () => {
  return (
    <Wrapper>
      <Button>
        <Link to="/GuideForm">Become a guide</Link>{" "}
      </Button>
    </Wrapper>
  );
};

export default SignUpBtn;

const Wrapper = styled.div``;
const Button = styled.button`
  font-size: 15px;
  justify-content: flex-end;
`;
