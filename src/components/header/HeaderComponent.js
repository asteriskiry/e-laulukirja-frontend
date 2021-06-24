import React, { Component } from 'react';
import logo from './asteriski-logo.png'

class HeaderComponent extends Component {
  render() {
    return (
      <div id="header">
       <div id="header-container" href="/"><img id="logo" alt="Asteriski logo" src={logo} />
        <a id="header-link" href="/"><p id="header-title">Asteriski ry</p> <p id="header-subtitle">Turun Yliopisto</p></a></div>
      </div>
    );
  }
}

export default HeaderComponent;
