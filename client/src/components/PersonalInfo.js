import React, { useContext, useState } from "react";
import styled from "styled-components";
import CurrentUserProvider, { CurrentUserContext } from "./CurrentUserContext";
import { Link, Redirect, useHistory } from "react-router-dom";
import axios from "axios";

const PersonalInfo = () => {
  const { currentUser, dispatchCurrentUser } = useContext(CurrentUserContext);
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [mail, setMail] = useState("");
  const [langOne, setLangOne] = useState("");
  const [langTwo, setLangTwo] = useState("");
  const [langThree, setLangThree] = useState("");
  const [char, setChar] = useState(100);
  const history = useHistory();

  const [file, setFile] = useState({});
  const [url, setUrl] = useState();

  // console.log("surrUser", currentUser);
  //console.log("user", currentUser.user);

  let id = currentUser.user.userInfo._id;
  let userPersInfo = Object.values(currentUser);

  const updateInfo = async (id) => {
    console.log("am here");
    const imgUrl = await postImage();

    console.log("await url", imgUrl);
    const lang = [langOne, langTwo, langThree];
    const postUpdatedInfo = { bio, lang, name, lastName, city, mail, imgUrl };
    fetch(`/personalInfo/${id}`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(postUpdatedInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(currentUser);
        console.log(data);
        if (data.status === 201) {
          const action = {
            type: "personalInfoUpdate",
            payload: { ...data },
          };
          dispatchCurrentUser(action);
        } else console.log("error");
      });
  };

  const postImage = () => {
    //let _id = currentUser.user.userInfo._id;
    console.log("hey");
    const data = new FormData();

    data.append("file", file);
    data.append("upload_preset", "cities");
    data.append("cloud_name", "dplnagckr");

    return fetch("	https://api.cloudinary.com/v1_1/dplnagckr/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        return data.url;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleClick() {
    if (currentUser.user.bio === true) return history.push("/profile");
  }

  return (
    <BigWrapper>
      <H2>Personal Information:</H2>
      <Form
        enctype="multipart/form-data"
        onSubmit={(ev) => {
          ev.preventDefault();
          updateInfo(id);
          handleClick();
        }}
      >
        <div>
          <Label htmlFor="file">File</Label>
          <Input
            // value={file}
            type="file"
            id="file"
            accept=".jpg"
            onChange={(ev) => {
              console.log(ev.target.files[0]);
              setFile(ev.target.files[0]);
            }}
          />
        </div>
        <Label>Legal first name:</Label>
        <Name
          placeholder="first name"
          value={name}
          onChange={(ev) => {
            setName(ev.target.value);
          }}
        />
        <Label>Legal last name:</Label>
        <LastName
          placeholder="last name"
          value={lastName}
          onChange={(ev) => {
            setLastName(ev.target.value);
          }}
        />
        <Label>City:</Label>
        <City
          placeholder="city"
          value={city}
          onChange={(ev) => {
            setCity(ev.target.value);
          }}
        />
        <Label>Email:</Label>
        <Email
          placeholder="@mail.com"
          value={mail}
          onChange={(ev) => {
            setMail(ev.target.value);
          }}
        />
        <About>
          <Label>About me:</Label>
          <Bio>
            <TextArea
              maxLength="100"
              type="text"
              placeholder="Few words about you..."
              onChange={(ev) => {
                setChar(100 - ev.target.value.length);
                setBio(ev.target.value);
              }}
            />
            <Char>{char}</Char>
          </Bio>
        </About>

        <Label>Spoken languages:</Label>
        <Lang>
          <Input
            placeholder="first"
            type="text"
            value={langOne}
            onChange={(ev) => setLangOne(ev.target.value)}
          ></Input>
          <Input
            placeholder="second"
            type="text"
            value={langTwo}
            onChange={(ev) => {
              setLangTwo(ev.target.value);
            }}
          ></Input>
          <Input
            placeholder="third"
            type="text"
            value={langThree}
            onChange={(ev) => {
              setLangThree(ev.target.value);
            }}
          ></Input>
        </Lang>
        <Submit type="submit">Update info</Submit>
      </Form>
    </BigWrapper>
  );
};

export default PersonalInfo;

const BigWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const H2 = styled.h2`
  margin-top: 35px;
  margin-left: 15px;

  font-size: 28px;
`;

const Label = styled.label`
  margin: 5px;
`;

const Form = styled.form`
  margin-top: 35px;
  border: solid 1px #06d6a0;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const Name = styled.input`
  padding: 5px;
  margin: 5px;
  border: 0;
  border-bottom: solid 2px #ffd166;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);
  width: 200px;

  outline: none;
`;
const LastName = styled.input`
  padding: 5px;
  margin: 3px;
  border: 0;
  border-bottom: solid 2px #ffd166;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);
  width: 200px;

  outline: none;
`;
const City = styled.input`
  padding: 5px;
  margin: 3px;
  border: 0;
  width: 200px;

  border-bottom: solid 2px #ffd166;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);

  outline: none;
`;
const Email = styled.input`
  padding: 5px;
  margin: 3px;
  border: 0;
  width: 200px;

  border-bottom: solid 2px #ffd166;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);

  outline: none;
`;

const Submit = styled.button`
  margin: 3px;

  padding: 10px;
  border: none;
  background-color: #06d6a0;
  color: #ffd166;
  font-weight: 600;
  border-radius: 5px;

  outline: none;
  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: ease-in;
  :hover {
    background-color: #ffd166;
    color: #06d6a0;
  }
`;
const About = styled.div`
  margin: 10px;
`;
const TextArea = styled.textarea`
  margin: 10px;
  resize: none;
  height: 60px;
  width: 400px;
  padding: 5px;
  margin: 3px;
  border: 0;
  border-bottom: solid 2px #ffd166;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);
  width: 100%;
  outline: none;
`;
const Char = styled.div`
  margin: 10px;
  color: #ffd166;
  font-size: 15px;
`;
const Lang = styled.div`
  display: flex;
  margin: 15px;
`;

const Input = styled.input`
  padding: 5px;
  margin: 3px;
  border: 0;
  border-bottom: solid 2px #ffd166;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);

  outline: none;
`;
const Bio = styled.div`
  display: flex;
`;
