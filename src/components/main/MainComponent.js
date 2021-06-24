import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../header/HeaderComponent.js';
import BannerComponent from '../banner/BannerComponent.js'

class MainComponent extends Component {
  render() {
    return (
      <div>
        <Header />
          <BannerComponent />
          <Container id="container">{this.props.children}</Container>
      </div>
    );
  }
}

export default MainComponent;
