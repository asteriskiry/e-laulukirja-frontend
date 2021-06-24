import React, { Component } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom'

//Sivun oletusnäkymägi
class SonglistComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      search: "",
      sortBy: false
    };
    this.handleChange = this.handleChange.bind(this)
  }

//Hakukentän muutoksenkäsittely
  handleChange(event){
    this.setState({search: event.target.value})
}

songById(id){
  const song = this.state.songs.find(song => song.number === id)
  return song
}

//Laululistan lajittelu
sortSongs(songs){
  let sortedSongs = null
  //Jos sortBy totta, lajitellaan aakkosjärjestyksessä, jos ei niin numerojärjestyksessä
  this.state.sortBy === true ?  sortedSongs = songs.sort((a, b) => (a.title.charCodeAt(0) > b.title.charCodeAt(0) ? 1 : -1)) :
   sortedSongs = songs.sort((a, b) => (a.number > b.number ? 1 : -1))
  return sortedSongs
}

  render() {
    //Rajataan laululista haun perusteella
    var filtered = this.state.songs.filter(song => song.title.toLowerCase().includes(this.state.search.toLowerCase())
    || this.state.search.toLowerCase() === song.number.substring(0, this.state.search.length).toLowerCase())
    let songs = this.sortSongs(filtered)

    return (
      <div id="main">
          <div>
            <div id="songlist">
              <div id="songlist-container">
                <div><div colSpan="2"><input id="search" placeholder="Etsi..." onChange={this.handleChange}></input></div></div>
                <div id="toprow"><div id="toprow-left" className="toprowcell" onClick={() => this.setState({sortBy : true})}>Laulu</div>
                  <div id="toprow-right" className="toprowcell" onClick={() => this.setState({sortBy : false })}>Numero</div>
                </div>
                {songs.map((song) => (
                <Link to={`/song/${song.number}`} className="tablerow" key={song.title}>
                  <div className="songtitle"><div className="link">{song.title}</div></div>
                  <div className="songnumber">{song.number}</div>
                </Link>))}
              </div>
            </div>
          </div>
      </div>
      )
  }

  async componentDidMount() {
    //Noudetaan laulukirjatiedosto
    try {
      let songs = await axios.get('/laulukirjaV3.json', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let songdata = songs.data
      //Lajitellaan laulut numeron perusteella
      this.setState({
        ...this.state,
        ...{
          songs: songdata,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default SonglistComponent;