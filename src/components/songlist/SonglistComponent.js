import React, { Component } from 'react';
import axios from 'axios';

class SonglistComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
    };
  }
  render() {
    const songs = this.state.songs.map((song, key) => (
      <li key={song.number}><a href="#">{song.name}</a></li>
    ));
    return (
      <ul>
        {songs}
      </ul>
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
