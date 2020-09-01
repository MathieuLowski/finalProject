import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/Header/NavBar";
import GlobalStyles from "./components/GlobalStyles";
import styled from "styled-components";
import HomePage from "./components/Homepage/HomePage";
import SignUpForm from "./components/SignUpForm";
import GuideId from "./components/GuideId";
import Profile from "./components/Profile";
import LoginForm from "./components/LoginForm";
import TourForm from "./components/TourForm";
import PersonalInfo from "./components/PersonalInfo";
import ManageTours from "./components/ManageTours";
import UserCard from "./components/UserCard";

function App() {
  return (
    <Wrapper>
      <GlobalStyles />
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/signupform">
            <SignUpForm />
          </Route>
          <Route exact path="/loginform">
            <LoginForm />
          </Route>
          <Route exact path="/guide/:_id">
            <GuideId />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/tourfrom">
            <TourForm />
          </Route>
          <Route exact path="/personalinfo">
            <PersonalInfo />
          </Route>
          <Route exact path="/manageTours">
            <ManageTours />
          </Route>
          <Route exact path="/guide/UserCard/:_id">
            <UserCard />
          </Route>
        </Switch>
      </Router>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
export default App;
