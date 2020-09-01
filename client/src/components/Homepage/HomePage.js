import React, { useContext, useState } from "react";
import styled from "styled-components";
//import { guides } from "../../data";
import GuidesCards from "./GuidesCards";
import { CurrentUserContext } from "../CurrentUserContext";
import axios from "axios";

import TypeHead from "../TypeHead";

const HomePage = () => {
  // console.log(data);
  //console.log(guides);

  const { currentUser, dispatchCurrentUser, initialState } = useContext(
    CurrentUserContext
  );
  console.log(currentUser);
  const [name, setName] = useState("");
  const [file, setFile] = useState();

  const send = (ev) => {
    console.log("hey");
    const data = new FormData();
    data.append("name", name);
    data.append("file", file);
    console.log(data);
    axios
      .post("/upload", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <Wrapper>
      <TypeHead
        //suggestions={}
        handleSelect={(suggestions) => {
          window.alert(suggestions);
        }}
      />
      <Intro>
        <H2>Welcome to Citites</H2>
        <P>
          Enter your next destination and discover what gems the locals wants to
          share with you.
        </P>
        <P>Travel, make new connections, share the beauty of your town. </P>
        <P>Become part of an international community</P>
        {/* <Div>
          <from enctype="multipart/form-data">
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                onChange={(ev) => {
                  setName(ev.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="file">File</label>
              <input
                type="file"
                id="file"
                accept=".jpg"
                onChange={(ev) => {
                  setFile(ev.target.files[0]);
                }}
              />
            </div>
          </from>
          <button onClick={send}>Send</button>
        </Div> */}
      </Intro>
      <GuidesCards />
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Intro = styled.div`
  padding: 30px;
`;

const Div = styled.div`
  display: flex;
`;
const H2 = styled.h2`
  font-size: 30px;
  margin: 10px;
`;
const P = styled.p`
  font-size: 25px;
  margin: 10px;
`;
export default HomePage;
