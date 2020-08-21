import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Profile = () => {
  const [char, setChar] = useState(100);
  const [aboutMe, setAboutMe] = useState("");
  const [tourDescription, setTourDescription] = useState("");
  const [firstLanguage, setFirstLanguage] = useState("");
  const [secondLanguage, setSecondLanguage] = useState("");
  const [thirdLanguage, setThirdLanguage] = useState("");
  console.log(aboutMe);
  return (
    <Wrapper>
      <div>Welcome to you page</div>
      <Form>
        <About>
          <label>About me:</label>
          <TextArea
            type="text"
            placeholder="Few words about you"
            onChange={(ev) => {
              setChar(100 - ev.target.value.length);
            }}
          />
          <Char>{char}</Char>
        </About>
        <Tour>
          <label>What can you offer:</label>
          <TextArea
            type="text"
            placeholder="Few words about you"
            onChange={(ev) => {
              setTourDescription(ev.target.value);
            }}
          />
        </Tour>
        <Lang>
          <label>Spoken languages</label>
          <input
            onChange={(ev) => {
              setFirstLanguage(ev.target.value);
            }}
          />
          <input
            onChange={(ev) => {
              setSecondLanguage(ev.target.value);
            }}
          />
          <input
            onChange={(ev) => {
              setThirdLanguage(ev.target.value);
            }}
          />
          <Categories>
            <p>Please select the categories your tour will include</p>
            <label>Food and drinks</label>
            <input type="checkbox" />

            <label>City escape</label>
            <input type="checkbox" />

            <label>Urban exploration</label>
            <input type="checkbox" />

            <label>History and monuments</label>
            <input type="checkbox" />

            <label>Food and drinks</label>
            <input type="checkbox" />
            <label>Entertainment</label>
            <input type="checkbox" />
          </Categories>
        </Lang>
      </Form>
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.div``;
const Form = styled.form``;
const About = styled.div``;
const TextArea = styled.textarea``;
const Char = styled.div``;
const Tour = styled.div``;
const Lang = styled.div``;
const Categories = styled.div`
  display: flex;
  flex-direction: column;
`;
// const = styled.div``;
// const = styled.div``;
// const = styled.div``;
