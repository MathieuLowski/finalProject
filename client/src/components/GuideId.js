import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { TourContext } from "./TourContext";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
//import { Link } from "@material-ui/core";

const GuideId = () => {
  const { suggestions } = useContext(TourContext);
  const { currentUser } = useContext(CurrentUserContext);
  const [confirmed, setConfirmed] = useState(false);
  const { _id } = useParams();
  const [tourInfo, setTourInfo] = useState(null);
  console.log(currentUser);

  const specificTour = suggestions.find((tour) => {
    if (_id === tour._id) {
      console.log(tour.city);
      return tour;
    }
  });

  useEffect(() => {
    fetch(`/getTourInfo/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setTourInfo(data);
      });
  }, [_id]);

  console.log(tourInfo);

  const bookTour = () => {
    if (currentUser.user === null) {
      return window.alert("you must be logged in");
    } else {
      const userId = currentUser.user.userInfo._id;
      const data = { _id, userId };
      console.log(data);
      console.log("trying to book");
      fetch("/bookTour", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setConfirmed(data);

          //if data.status is correct redirect to confirmation.
        });
    }
  };
  console.log("confir", confirmed);
  return (
    <Wrapper>
      {specificTour !== undefined && !confirmed ? (
        <>
          <Tour>
            <H1>{specificTour.tourTitle}</H1>
            <ProfPic src={specificTour.imgUrl} />
            <Description>{specificTour.tourDescription}</Description>
            <City>City: {specificTour.city}</City>
            <Price>$ {specificTour.price}</Price>

            <Linkk to={`./UserCard/${specificTour.guideId}`}>
              Checkout your host
            </Linkk>

            <Button onClick={(ev) => bookTour()}>Book the tour</Button>
          </Tour>
        </>
      ) : confirmed.status === 201 ? (
        <Confirmation>
          <Div>Booking confirmation</Div>
          <Div>Your booking is confirmed and the host has beed notified</Div>
          <Div>
            Check out your guide page to get in contact with him and start
            adding content to your visit
          </Div>
          <Button>
            <Link to="/profile">Go back to account</Link>
          </Button>
        </Confirmation>
      ) : (
        <>
          <Spinner>
            <CircularProgress />
          </Spinner>
        </>
      )}
    </Wrapper>
  );
};

{
  /* : (



) */
}

export default GuideId;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProfPic = styled.img`
  width: 550px;
  height: 300px;
  border-radius: 5px;
  border: 2px solid #06d6a0;
`;
const Tour = styled.div`
  margin-top: 35px;
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid 1px #06d6a0;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
`;
const Spinner = styled.div`
  margin: 35px;
  display: flex;
  justify-content: center;
`;
const H1 = styled.h1`
  font-weight: bold;
  font-size: 20px;
  margin: 10px;
`;
const Description = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;
const City = styled.div`
  font-weight: bold;
  font-size: 20px;
`;
const Price = styled.div`
  margin: 10px;
`;
const Linkk = styled(Link)`
  border-bottom: solid 2px #ffd166;
  margin: 7px;
  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: ease-in;
  :hover {
    border-bottom: solid 2px #06d6a0;
  }
`;
//const Host = styled.div``;
const Button = styled.button`
  margin: 3px;
  margin: 15px;
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

const Confirmation = styled.div`
  margin-top: 35px;
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: solid 1px #06d6a0;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
`;
const Div = styled.div`
  margin: 7px;
  font-size: 20px;
`;
//<Wrapper>
{
  /* Welcome to my tour
{suggestions.map((tour) => {
  return <p>{tour.tourTitle}</p>;
})} */
}
//</Wrapper>
