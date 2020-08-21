import React from "react";
import styled from "styled-components";
import { guides, tours } from "../data";

const GuideId = () => {
  console.log(guides);
  console.log(tours);

  return (
    <Wrapper>
      Welcome to my tour(s)
      {}
    </Wrapper>
  );
};

export default GuideId;

const Wrapper = styled.div``;
