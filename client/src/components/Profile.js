import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import { FiBook, FiUser } from "react-icons/fi";
import { FaSuitcase, FaPencilRuler } from "react-icons/fa";
const Profile = () => {
  const { currentUser, dispatchCurrentUser, initialState } = useContext(
    CurrentUserContext
  );
  console.log(currentUser);
  let userData = Object.values(currentUser);
  console.log(userData);

  return (
    <>
      {userData[0] &&
        userData.map((info) => {
          return (
            <>
              <H2>Welcome to your profile {info.userInfo.name}</H2>
            </>
          );
        })}
      <Wrapper>
        {currentUser && (
          <UserInfo>
            <>
              <ProfPic src={currentUser.user.userInfo.imgUrl} />
              {currentUser.user.userInfo.name ? (
                <Name>
                  Legal name:
                  {`${currentUser.user.userInfo.name} ${currentUser.user.userInfo.lastName}`}
                </Name>
              ) : (
                <Name> Legal name:Doesn't exist</Name>
              )}
              <Mail>email: {currentUser.user.userInfo.mail}</Mail>
              <Lang>
                Spoken languages:{" "}
                {currentUser.user.userInfo.lang &&
                  currentUser.user.userInfo.lang.map((lang) => {
                    return (
                      <ul>
                        {" "}
                        <li>{`${lang} `}</li>
                      </ul>
                    );
                  })}
              </Lang>
              <Bio>About yourself: {currentUser.user.userInfo.bio}</Bio>
              <City>City: {currentUser.user.userInfo.city}</City>
            </>
          </UserInfo>
        )}

        <Commands>
          <Link to="/personalinfo">
            <PersonalInfo>
              <FiBook />
              Personal information
            </PersonalInfo>
          </Link>

          <Link to="/tourfrom">
            <PersonalInfo>
              <FaPencilRuler />
              Create your tour
            </PersonalInfo>
          </Link>
          <Link to="/">
            <PersonalInfo>
              <FaSuitcase />
              Book a tour
            </PersonalInfo>
          </Link>
          <Link to="/manageTours">
            <PersonalInfo>
              <FiUser />
              Manage your tours
            </PersonalInfo>
          </Link>
        </Commands>
      </Wrapper>
    </>
  );
};

export default Profile;
const ProfPic = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 2px solid #ffd166;
`;
const Name = styled.div`
  margin: 5px;
  border-bottom: solid 2px #ffd166;
`;
const Mail = styled.div`
  margin: 5px;
  border-bottom: solid 2px #ffd166;
`;
const Lang = styled.div`
  margin: 5px;
  border-bottom: solid 2px #ffd166;
`;
const Bio = styled.div`
  margin: 5px;
  border-bottom: solid 2px #ffd166;
`;
const City = styled.div`
  margin: 5px;
  border-bottom: solid 2px #ffd166;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`;

const H2 = styled.h2`
  margin-top: 35px;
  margin-left: 15px;
  margin-bottom: 45px;
  font-size: 28px;
`;

const UserInfo = styled.div`
  border: solid 1px #06d6a0;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 35px;
  font-size: 18px;
  padding: 10px;
`;

const Commands = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 600px;
`;

const PersonalInfo = styled.button`
  color: #ffd166;
  font-size: 28px;
  width: 250px;
  height: 150px;
  border-radius: 5px;
  margin: 15px;
  border: none;
  background: none;
  border: solid 1px #06d6a0;
  outline: none;

  -webkit-box-shadow: 7px 5px 15px -1px rgba(7, 59, 76, 0.48);
  -moz-box-shadow: 7px 5px 15px -1px rgba(7, 59, 76, 0.48);
  box-shadow: 7px 5px 15px -1px rgba(7, 59, 76, 0.48);
  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: ease-in;
  :hover {
    background: #ffd166;
    color: #06d6a0;
    border-radius: 5px;
  }
`;

const CreateTour = styled.button`
  width: 250px;
  height: 150px;
  border-radius: 10px;
  margin: 15px;
  border: none;
  background: none;
  -webkit-box-shadow: 7px 5px 15px -1px rgba(7, 59, 76, 0.48);
  -moz-box-shadow: 7px 5px 15px -1px rgba(7, 59, 76, 0.48);
  box-shadow: 7px 5px 15px -1px rgba(7, 59, 76, 0.48);
  :hover {
    background: #ffd16683;
    color: #06d6a0;
    border-radius: 5px;
  }
`;
const BookTour = styled.button`
  width: 250px;
  height: 150px;
  border-radius: 10px;
  margin: 15px;
  border: none;
  background: none;
  -webkit-box-shadow: 7px 5px 15px -1px rgba(7, 59, 76, 0.48);
  -moz-box-shadow: 7px 5px 15px -1px rgba(7, 59, 76, 0.48);
  box-shadow: 7px 5px 15px -1px rgba(7, 59, 76, 0.48);
  :hover {
    background: #ffd16683;
    color: #06d6a0;
    border-radius: 5px;
  }
`;

const TourManage = styled.button`
  width: 250px;
  height: 150px;
  border-radius: 10px;
  margin: 15px;
  border: none;
  background: none;
  -webkit-box-shadow: 7px 5px 15px -1px rgba(7, 59, 76, 0.48);
  -moz-box-shadow: 7px 5px 15px -1px rgba(7, 59, 76, 0.48);
  box-shadow: 7px 5px 15px -1px rgba(7, 59, 76, 0.48);
  :hover {
    background: #ffd16683;
    color: #06d6a0;
    border-radius: 5px;
  }
`;

// const = styled.div``;
// const = styled.div``;
