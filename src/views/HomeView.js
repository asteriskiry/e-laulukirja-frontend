import React, { Component } from 'react';
import MainComponent from '../components/main/MainComponent.js';
import SonglistComponent from '../components/songlist/SonglistComponent.js';

class HomeView extends Component {
  render() {
    return (
      <MainComponent>
        
        <h1>E-laulukirja</h1>
        <SonglistComponent />
      </MainComponent>
    );
  }
}

export default HomeView;
