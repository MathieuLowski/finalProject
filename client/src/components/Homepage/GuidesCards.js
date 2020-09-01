import React, { useState, useContext, useEffect, Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../CurrentUserContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import Carousel from "react-elastic-carousel";

//import "react-multi-carousel/lib/styles.css";

const GuidesCards = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [feed, setFeed] = useState(null);
  console.log("currUs", currentUser);

  useEffect(() => {
    fetch("/homePageFeed")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        //const tours = Object.values(data);
        setFeed(data);
      });
  }, []);
  console.log(feed);
  // LEFT: class="sc-fznZeY dKZHez rec rec-arrow rec rec-arrow-left "
  //RIGHT: class="sc-fznZeY dJOhGd rec rec-arrow rec rec-arrow-left "
  const breakPoints = [];

  if (feed === null) {
    return (
      <>
        <Spinner>
          <CircularProgress color="secondary" />
        </Spinner>
      </>
    );
  } else
    return (
      <Wrapper>
        <StyledCarousel itemsToshow={1}>
          {feed.dbFeeed.map((tourInfo) => {
            return (
              <Card>
                <Link to={`./guide/${tourInfo._id}`}>
                  <ProfPic src={tourInfo.imgUrl} />
                  <Title>{tourInfo.tourTitle}</Title>

                  <City>city: {tourInfo.city}</City>
                </Link>
              </Card>
            );
          })}
        </StyledCarousel>
      </Wrapper>
    );
};

export default GuidesCards;

const Feature1 = styled.div``;
const Spinner = styled.div`
  display: flex;
  justify-content: center;
`;
const StyledCarousel = styled(Carousel)`
  button {
    background-color: #06d6a0;
    :hover {
      background-color: #ffd166;
    }
  }
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin: 5px;
`;
const Description = styled.div`
  font-size: 18px;
`;

const Card = styled.div`
  cursor: pointer;
  border: 1px solid #06d6a0;
  border-radius: 5px;
  margin: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 350px;
  width: 300px;
  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: ease-in;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);
  :hover {
    border: 1px solid #ffd166;
    background-color: #06d6a0;
    font: #ffd166;
  }
`;

const ProfPic = styled.img`
  width: 290px;
  height: 200px;
  border-radius: 5px;
  border: 2px solid #ffd166;
`;
const City = styled.div`
  padding-top: 7px;
  font-size: 15px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 50px;
`;
