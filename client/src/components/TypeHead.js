import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { TourContext } from "./TourContext";

//import redCity from "../assets/redCity";

const TypeHead = () => {
  // console.log(handleSelect);
  const { suggestions } = useContext(TourContext);
  console.log(suggestions);
  const [value, setValue] = useState("");
  const filteredSuggestions = suggestions.filter((tour) => {
    if (value.length > 1) {
      return tour.city.toLowerCase().includes(value.toLowerCase());
    }
  });

  console.log(suggestions);
  return (
    <>
      <Wrapper>
        <Input
          placeholder="Where to next?"
          type="text"
          value={value}
          onChange={(ev) => {
            setValue(ev.target.value);
          }}
          onKeyDown={(ev) => {
            // if (ev.key === "Enter") {
            //   handleSelect(ev.target.value);
            // }
          }}
        />
        <DropDown>
          <Ul>
            {filteredSuggestions.map((tour) => {
              return (
                <Suggestion
                  key={tour.id}
                  //   onClick={() => handleSelect(tour.tourTitle)}
                >
                  <Link to={`/guide/${tour._id}`}>
                    <BigSpan>{tour.tourTitle}</BigSpan>
                    <SmallSpan>city: {tour.city}</SmallSpan>
                  </Link>
                </Suggestion>
              );
            })}
          </Ul>
        </DropDown>

        <Button onClick={() => setValue("")}>Clear</Button>
      </Wrapper>
    </>
  );
};
export default TypeHead;

const Input = styled.input`
  border: none;
  height: 25px;
  margin: 10px;
  border-radius: 7px;
  width: 300px;
  font-size: 17px;
  padding: 5px;
  margin: 3px;
  border: 0;
  border-bottom: solid 2px #ffd166;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);

  outline: none;
`;
const Wrapper = styled.div`
  background-color: #ffd166;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DropDown = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 232px;
  margin-right: 32px;
  border: solid 1px #ffd166;
  border: 7px;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 300px;
  border: solid 1px #ffd166;
  border-radius: 7px;
`;
const Suggestion = styled.li`
  display: flex;
  flex-direction: column;
  margin: 5px;

  :hover {
    background-color: #06d6a033;
    cursor: pointer;
    border-radius: 7px;
  }
`;
const BigSpan = styled.span`
  font-size: 18px;
`;
const SmallSpan = styled.span`
  font-weight: bold;
  font-size: 12px;
  font-style: oblique;
`;

const Button = styled.button`
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
    border: solid 1px#06d6a0;
  }
`;

//const [suggestions, setSuggestions] = useState([]);

//     const cities = if(suggestions !== null) {  suggestions[1].map((tours) => {
//       return tours;
// });} else {return null;}
//     console.log(cities);

//   useEffect(() => {
//     fetch("/searchBar")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("data", data.dbResult);
//         //const cities = Object.values(data);
//         //console.log("cities", cities);
//         setSuggestions(data.dbResult);
//       });
//   }, []);
