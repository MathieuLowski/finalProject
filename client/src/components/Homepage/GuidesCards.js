import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { guides } from "../../data";

const GuidesCards = () => {
  return (
    <Wrapper>
      {guides.length &&
        guides.map((guide) => {
          return (
            <Card>
              <Link to={`/guide/${guide._id}`}>
                <Ul>
                  <Li>
                    {guide.firstName} {guide.lastName}
                  </Li>
                  <Li></Li>
                  <Li>City: {guide.city}</Li>
                  <Li>From: {guide.country}</Li>
                </Ul>
              </Link>
            </Card>
          );
        })}
    </Wrapper>
  );
};

const Card = styled.div`
  border: 1px solid tomato;
  border-radius: 15px;
  margin: 15px;
`;

const Li = styled.li`
  padding: 20px;
  list-style-type: none;
`;

const Wrapper = styled.div`
  font-size: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 50px;
`;

const Ul = styled.div`
  padding: 20px;
`;
export default GuidesCards;
