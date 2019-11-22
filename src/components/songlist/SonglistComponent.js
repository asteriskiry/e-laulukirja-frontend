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
    var filtered = this.state.songs.filter(song => this.state.search.toLowerCase() === song.name.substring(0, this.state.search.length).toLowerCase())
   
   
    const songs = filtered.map((song, key) => (
    <li key={song.number}><a href="#">{song.name}</a></li>
     ));
    
    
    return (
      <div id="main">
        <input onChange={this.handleChange}></input>
        <ul>
          {songs}
        </ul>
      </div>
        )
  }
  async componentDidMount() {
    try {
      let songs = await axios.get('songs.json', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      this.setState({
        ...this.state,
        ...{
          songs: songs.data,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default SonglistComponent;
