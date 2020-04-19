import React, { Component } from 'react';
import MainComponent from '../components/main/MainComponent.js';


//Ehkä tähän vielä joskus tulee oikeaa sisältöä, nyt ei kuitenkaan käytössä
class LoginView extends Component {
  render() {
    return (
      <MainComponent>
        <h1>Kirjaudu sisään</h1>
      </MainComponent>
    );
  }
}

export default LoginView;
