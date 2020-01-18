import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import  logo from './asteriski-logo.png'

class HeaderComponent extends Component {

  render() {
    return (
      <Navbar id="header" variant="dark" expand="lg" >
        <Navbar.Brand id="header" href="/"><img id="logo" src={logo} /><b>E-laulukirja</b></Navbar.Brand>
        <Navbar.Toggle id="button" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="header">
          <Nav className="ml-auto">
            <Nav.Link style={{color: "White"}} href="/">Koti</Nav.Link>
            <Nav.Link style={{color : "white"}} href="/login">Kirjaudu sisään</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default HeaderComponent;
