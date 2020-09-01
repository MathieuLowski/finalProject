import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FaCity } from "react-icons/fa";
import { FiMail, FiMessageSquare } from "react-icons/fi";

const UserCard = () => {
  const [guideInfo, setGuideInfo] = useState();
  const { currentUser } = useContext(CurrentUserContext);
  const [form, setForm] = useState(false);
  const [subject, setSubject] = useState();
  const [mailContent, setMailContent] = useState();
  const { _id } = useParams();
  const [displayForm, setDisplayForm] = useState();
  const [mailConfirm, setMailConfirm] = useState();

  useEffect(() => {
    fetch(`/guide/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setGuideInfo(data);
      });
  }, [_id]);

  const handleChange = (ev) => {
    return setDisplayForm(!displayForm);
  };

  const mailManager = () => {
    const mailBody = {
      subject,
      mailContent,
      user1: currentUser.user.userInfo.mail,
      user2: guideInfo.message.mail,
    };
    fetch("/emailForm", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(mailBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMailConfirm(data);
      });
  };
  console.log(guideInfo);
  console.log("Confirm", mailConfirm);

  if (!guideInfo) {
    return (
      <>
        <Spinner>
          <CircularProgress color="secondary" />
        </Spinner>
      </>
    );
  } else if (guideInfo && !mailConfirm) {
    return (
      <>
        <Wrapper>
          <Pic src={guideInfo.message.imgUrl} />
          <Card>
            <Name>
              Hi, I'm {guideInfo.message.name} {guideInfo.message.lastName}
            </Name>
            <About>About: {guideInfo.message.bio}</About>
            <City>
              <FaCity /> {guideInfo.message.city}
            </City>
            <Lang>
              <FiMessageSquare />
              {guideInfo.message.lang.map((lang) => {
                return <> {lang} </>;
              })}
            </Lang>
            <Mail>
              <FiMail /> {guideInfo.message.mail}
            </Mail>
            <Contact onClick={(ev) => handleChange(ev)}>
              Let's organise your day
            </Contact>
            <>
              {displayForm && (
                <Form
                  onSubmit={(ev) => {
                    ev.preventDefault();
                    mailManager();
                    handleChange();
                  }}
                >
                  <Input
                    type="subject"
                    placeholder="subject"
                    value={subject}
                    onChange={(ev) => setSubject(ev.target.value)}
                  />
                  <TextArea
                    placeholder="I will be happy to asnwer any of your questions"
                    value={mailContent}
                    onChange={(ev) => setMailContent(ev.target.value)}
                  />
                  <Button type="submit">send</Button>
                </Form>
              )}
            </>
          </Card>
        </Wrapper>
      </>
    );
  } else if (mailConfirm.status === 200) {
    return (
      <>
        <Confirmation>Your message has been sent.</Confirmation>
      </>
    );
  }
};

export default UserCard;

const Confirmation = styled.div``;
const Spinner = styled.div`
  display: flex;
  justify-content: center;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 35px;
  flex-wrap: wrap;
`;
const Card = styled.div`
  border: solid 1px #06d6a0;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);
  font-size: 18px;
  padding: 10px;
  border-radius: 5px;
  width: 600px;
  margin: 30px;
`;
const Pic = styled.img`
  width: 250px;
  height: 300px;
  border-radius: 50%;
  border: 2px solid #ffd166;
`;
const Name = styled.div``;
const About = styled.div`
  border-bottom: solid 2px #ffd166;
  padding: 5px;
  margin: 3px;
`;

const City = styled.div`
  border-bottom: solid 2px #ffd166;
  padding: 5px;
  margin: 3px;
`;

const Lang = styled.div`
  border-bottom: solid 2px #ffd166;
  padding: 5px;
  margin: 3px;
`;

const Mail = styled.div`
  border-bottom: solid 2px #ffd166;
  padding: 5px;
  margin: 3px;
`;

const Contact = styled.button`
  margin: 3px;
  width: 200px;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
`;
const Input = styled.input`
  padding: 5px;
  margin: 3px;
  border: 0;
  width: 200px;

  border-bottom: solid 2px #ffd166;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);

  outline: none;
`;
const TextArea = styled.textarea`
  height: 400px;
  margin: 10px;
  resize: none;

  width: 400px;
  padding: 5px;
  margin: 3px;
  border: 0;
  border-bottom: solid 2px #ffd166;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.06);
  width: 100%;
  outline: none;
`;

const Button = styled.button`
  margin: 3px;
  width: 200px;
  padding: 10px;
  border: none;
  background-color: #06d6a0;
  color: #ffd166;
  font-weight: 600;
  border-radius: 5px;
  margin-left: 200px;

  outline: none;
  transition-property: all;
  transition-duration: 0.2s;
  transition-timing-function: ease-in;
  :hover {
    background-color: #ffd166;
    color: #06d6a0;
  }
`;
