import "regenerator-runtime/runtime";
import React from "react";
import { login, logout } from "./utils";

import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// components
import Home from "./Components/Home";
import NewPoll from "./Components/NewPoll";
import PollingStation from "./Components/PollingStation";

// images
import BlockVoteLogo from "./assets/logopng.png";

import getConfig from "./config";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

export default function App() {
  const changeCandidatesFunction = async (prompt) => {
    console.log(prompt);
    let namePair = await window.contract.getCandidatePair({ prompt: prompt });
    localStorage.setItem("Candidate1", namePair[0]);
    localStorage.setItem("Candidate2", namePair[1]);
    localStorage.setItem("prompt", prompt);
    window.location.replace(window.location.href + "PollingStation");
  };

  return (
    <Router>

      <Navbar  collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='/' style={{fontSize:"3rem",fontFamily:"'Orbitron', sans-serif"}}>
            <img style={{ width: 160, height: 200 }} src={BlockVoteLogo}></img>
            {' '}
            Near-Poll
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mx-auto'></Nav>
            <Nav>
              <Nav.Link style={{fontSize:"1.5rem",color:"white",fontFamily:"'Orbitron', sans-serif"}} href='/NewPoll'>New Poll</Nav.Link>
              <Nav.Link style={{fontSize:"1rem",color:"white",fontFamily:"'Orbitron', sans-serif"}} onClick={window.accountId === "" ? login : logout}>
                {window.accountId === "" ? "Login" : window.accountId+" (Click to Logout)"}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch >
        <Route exact path='/'>
          <Home changeCandidates={changeCandidatesFunction} />
        </Route>
        <Route exact path='/PollingStation'>
          <PollingStation />
        </Route>
        <Route exact path='/NewPoll'>
          <NewPoll />
        </Route>
      </Switch>
    </Router>
    
  );
}
