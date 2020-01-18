import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import  logo from './asteriski-logo.png'

class HeaderComponent extends Component {

  render() {
    return (
      <Navbar id="header" variant="dark" expand="lg" >
<<<<<<< HEAD
        <Navbar.Brand id="header" href="/"><img id="logo" src={logo} /><b>E-laulukirja</b></Navbar.Brand>
=======
       <Navbar.Brand id="header" href="/"><img id="logo" src={logo} /><b>E-laulukirja</b></Navbar.Brand>
>>>>>>> 92eaa45be56ed404d6e6b7ab45f2bcbc50861405
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
