import React from "react";
import styled from "styled-components";
//import { guides } from "../../data";
import GuidesCards from "./GuidesCards";
const HomePage = () => {
  // console.log(data);
  //console.log(guides);

  return (
    <Wrapper>
      <Intro>
        <h2>Explore your next city like a local</h2>
        <p>Browse between local guides to pick a tour catered for your</p>
      </Intro>
      <GuidesCards />
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Intro = styled.div`
  padding: 30px;
`;
export default HomePage;
