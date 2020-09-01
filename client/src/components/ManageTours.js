import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import CircularProgress from "@material-ui/core/CircularProgress";

import { CurrentUserContext } from "./CurrentUserContext";

const ManageTours = () => {
  const { currentUser, dispatchCurrentUser } = useContext(CurrentUserContext);
  const [userTours, setUserTours] = useState(null);
  const [toggle, setToggle] = useState(false);
  console.log(currentUser);
  console.log(currentUser.user.status);

  const handleDelete = (id) => {
    fetch(`/deleteTour/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setToggle(!toggle);
      });
  };

  useEffect(() => {
    if (currentUser.user) {
      const activeId = { userId: currentUser.user.userInfo._id };
      console.log("active", activeId);
      fetch("/manageUserTours", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(activeId),
      })
        .then((res) => res.json())
        .then((data) => {
          const updaded = Object.values(data);
          setUserTours(updaded);
          setUserTours(Object.values(data));
        });
    }
  }, [currentUser, toggle]);
  console.log(userTours);

  if (userTours === null) {
    return (
      <>
        <Spinner>
          <CircularProgress />
        </Spinner>
      </>
    );
  } else
    return (
      <Wrapper>
        {userTours[1].map((tour) => {
          if (tour.length < 1) {
            return (
              <>
                <p>You have no tour at the moment</p>
              </>
            );
          } else
            return (
              <>
                <Ul>
                  <Link to={`/guide/${tour._id}`}>
                    <Li>Tour name: {tour.tourTitle}</Li>
                    <Li>City: {tour.city}</Li>
                    <Li>What to expect: {tour.tourDescription}</Li>
                  </Link>
                  <Button
                    onClick={(ev) => {
                      handleDelete(tour._id);
                    }}
                  >
                    Delete
                  </Button>
                </Ul>
              </>
            );
        })}
      </Wrapper>
    );
};

export default ManageTours;

const Wrapper = styled.div`
  margin: 35px;
`;
const Spinner = styled.div`
  margin: 75px;
  display: flex;
  justify-content: center;
`;
const Div = styled.div`
  width: 600px;
`;
const Ul = styled.ul`
  border: solid 1px #06d6a0;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);
  margin: 15px;
  border-radius: 5px;
  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: ease-in;
  :hover {
    background-color: #ffd16633;
    border-radius: 5px;
  }
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
  }
`;
const Li = styled.li`
  margin: 5px;
`;
{
  /* {userTours ? (
  <p>Loading</p>
) : (
  <>
    <div>Manage your tours</div>
    {userTours.map((tour, i) => {
      return <p>{tour[1].tourTitle}</p>;
    })}
  </>
)} */
}
