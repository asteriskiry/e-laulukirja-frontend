import React, { Component } from 'react';
import axios from 'axios';

class SonglistComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      search: ""
    };
    this.handleChange = this.handleChange.bind(this)
  }


  handleChange(event){
    this.setState({search: event.target.value})
}
  render() {
    var filtered = this.state.songs.filter(song => this.state.search.toLowerCase() === song.title.substring(0, this.state.search.length).toLowerCase())
   
   
    const songs = <table id="songlist">
      <tr><th colSpan="2"><input id="search" placeholder="Etsi..." onChange={this.handleChange}></input></th></tr>
      <tr id="toprow"><th>Laulu</th><th>Numero</th></tr>{filtered.map((song, key) => (
      <tr id="tablerow" key={song.title}><th>{song.title}</th><th>{song.number}</th></tr>
     ))}</table>
    
    
    return (
      <div id="main">
        
        
        {songs}
        
      </div>
        )
  }
  async componentDidMount() {
    try {
      let songs = await axios.get('laulukirjaV3.json', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let songdata = songs.data
      let sortedSongs= songdata.sort((a, b) => (a.number > b.number) ? 1 : -1)

      this.setState({
        ...this.state,
        ...{
          songs: sortedSongs,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default SonglistComponent;
