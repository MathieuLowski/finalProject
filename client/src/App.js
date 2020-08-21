import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/Header/NavBar";
import GlobalStyles from "./components/GlobalStyles";
import styled from "styled-components";
import HomePage from "./components/Homepage/HomePage";
import GuideForm from "./components/GuideForm";
import GuideId from "./components/GuideId";
import Profile from "./components/Profile";

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
          <Route exact path="/GuideForm">
            <GuideForm />
          </Route>
          <Route exact path="/guide/:_id">
            <GuideId />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
export default App;
