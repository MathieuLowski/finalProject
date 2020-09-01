import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";

const Profile = () => {
  const [char, setChar] = useState(100);
  const [tourDescription, setTourDescription] = useState("");
  const [tourTitle, setTourTitle] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [foodAndDrinks, setFoodAndDrinks] = useState(false);
  const [cityEscape, setCityEscape] = useState(false);
  const [urbanExplo, setUrbanExplo] = useState(false);
  const [historical, setHistorical] = useState(false);
  const [shopping, setShopping] = useState(false);
  const [entertainment, setEntertainment] = useState(false);
  //console.log(foodAndDrinks);
  const { currentUser, dispatchCurrentUser } = useContext(CurrentUserContext);
  console.log(currentUser);

  const [answer, setAnswer] = useState("");
  const [file, setFile] = useState({});

  const createTour = async () => {
    const imgUrl = await postImage();
    const tourBody = {
      tourTitle,
      city,
      tourDescription,
      foodAndDrinks,
      cityEscape,
      urbanExplo,
      historical,
      shopping,
      entertainment,
      price,
      userId: currentUser.user.userInfo._id,
      userName: currentUser.user.userInfo.userName,
      participantsArray: [],
      imgUrl,
    };
    // allPaticipants =[]

    // for(id of participantsArray){
    //   const participant = await db.collection('usesrs').findONe(_id: ObjectID(id))
    //   allPaticipants.push(participant)
    // }
    console.log(currentUser);
    console.log("tourInfo", tourBody);
    fetch("/tourform", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(tourBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAnswer(data);
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

  console.log("new", answer);
  if (answer.status === 201) {
    return (
      <>
        <Redirect to="/profile" />
      </>
    );
  }
  return (
    <Div>
      <H2>Let's build your tour</H2>
      <Wrapper>
        <Form
          onSubmit={(ev) => {
            ev.preventDefault();
            createTour();
          }}
        >
          <Title>
            <Label>Name your tour</Label>
            <Input
              required
              placeholder="ex: local brews quest"
              value={tourTitle}
              onChange={(ev) => {
                setTourTitle(ev.target.value);
              }}
            ></Input>
          </Title>
          <City>
            <Label>City</Label>
            <Input
              required
              placeholder="What city are we visiting"
              value={city}
              onChange={(ev) => {
                setCity(ev.target.value);
              }}
            ></Input>
          </City>
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
          <Tour>
            <Label>Describe your tour:</Label>
            <TextArea
              type="text"
              placeholder="What kind of activities we will do"
              onChange={(ev) => {
                setTourDescription(ev.target.value);
              }}
            />
          </Tour>
          <Pricing>
            <Label>Price your tour</Label>
            <Price
              placeholder="ex:40$"
              onChange={(ev) => {
                setPrice(ev.target.value);
              }}
            />
          </Pricing>
          <Categories>
            <p>Please select the categories your tour will include</p>
            <Label>Food and drinks</Label>
            <input
              type="checkbox"
              checked={foodAndDrinks}
              onClick={() => {
                setFoodAndDrinks(!foodAndDrinks);
              }}
            />

            <Label>City escape</Label>
            <input
              type="checkbox"
              checked={cityEscape}
              onClick={() => {
                setCityEscape(!cityEscape);
              }}
            />

            <Label>Urban exploration</Label>
            <input
              type="checkbox"
              checked={urbanExplo}
              onClick={() => {
                setUrbanExplo(!urbanExplo);
              }}
            />

            <Label>History and monuments</Label>
            <input
              type="checkbox"
              checked={historical}
              onClick={() => setHistorical(!historical)}
            />

            <Label>Shopping</Label>
            <input
              type="checkbox"
              checked={shopping}
              onClick={() => setShopping(!shopping)}
            />
            <Label>Entertainment</Label>
            <input
              type="checkbox"
              checked={entertainment}
              onClick={() => setEntertainment(!entertainment)}
            />
          </Categories>

          <Button type="submit">Create Tour</Button>
        </Form>
      </Wrapper>
    </Div>
  );
};

export default Profile;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const H2 = styled.h2`
  margin-top: 35px;
  margin-left: 15px;
  margin-bottom: 45px;
  font-size: 28px;
`;
const Wrapper = styled.div`
  margin: 10px;
  border: solid 1px #06d6a0;
  border-radius: 5px;
  width: 600px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const Form = styled.form`
  margin-top: 35px;
  margin: 10px;
  margin: 10px;
  /* border-radius: 5px;
  width: 600px;
  display: flex;
  justify-content: center;
  flex-direction: column; */
`;
const Title = styled.div``;
const Label = styled.label`
  margin: 5px;
`;
const Input = styled.input`
  padding: 5px;
  margin: 3px;
  border: 0;
  border-bottom: solid 2px #ffd166;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  outline: none;
`;
const Pricing = styled.div``;
const Price = styled.input`
  padding: 5px;
  margin: 3px;
  border: 0;
  border-bottom: solid 2px #ffd166;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  outline: none;
`;
const City = styled.div`
  margin: 10px;
`;
const TextArea = styled.textarea`
  margin: 10px;
  resize: none;
  height: 100px;
  width: 400px;
  padding: 5px;
  margin: 3px;
  border: 0;
  border-bottom: solid 2px #ffd166;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);
  width: 100%;
  outline: none;
`;

const Tour = styled.div`
  margin: 10px;
`;

const Categories = styled.div`
  display: flex;
  flex-direction: column;

  margin: 10px;
`;
const Button = styled.button`
  margin: 3px;

  padding: 10px;
  border: none;
  background-color: #06d6a0;
  color: #ffd166;
  font-weight: 600;
  border-radius: 5px;
  width: 100%;
  outline: none;
  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: ease-in;
  :hover {
    background-color: #ffd166;
    color: #06d6a0;
  }
`;
