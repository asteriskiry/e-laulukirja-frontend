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
      <div>
        
          <div id="main">
        
            <table id="songlist">
              <tbody>
              <tr><th colSpan="2"><input id="search" placeholder="Etsi..." onChange={this.handleChange}></input></th></tr>
              <tr id="toprow"><th class="toprowcell" onClick={() => this.setState({sortBy : true})}>Laulu</th>
              <th class="toprowcell" onClick={() => this.setState({sortBy : false })}>Numero</th></tr>{songs.map((song) => (
              <tr class="tablerow" key={song.title}><th><Link class="link" to={`/song/${song.number}`}>{song.title}</Link></th><th>{song.number}</th></tr>
              ))}
              </tbody>
            </table>
        
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