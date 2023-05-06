import React, { Component } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom'

//Sivun oletusnäkymägi
class SonglistComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      categories: [],
      search: "",
      sortBy: false,
      filter: "Kaikki"
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
  }

//Hakukentän muutoksenkäsittely
  handleChange(event){
    this.setState({search: event.target.value})
}

  handleFilter(event){
    this.setState({filter: event.target.value})
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
   sortedSongs = songs.sort((a, b) => (parseInt(a.number) > parseInt(b.number) ? 1 : -1))
  return sortedSongs
}

  filterSongs(){
    let filtered = this.state.songs.filter(song => song.title.toLowerCase().includes(this.state.search.toLowerCase()) ||
                                                   this.state.search.toLowerCase() === song.number.substring(0, this.state.search.length).toLowerCase())
    if (this.state.filter !== "Kaikki"){
      let categoryNumber = this.state.categories.find(category => category.category === this.state.filter).number
      filtered = filtered.filter(song => song.number.length === 4 ? song.number.substring(0,2) === categoryNumber : song.number.substring(0,1) === categoryNumber)
    }
    return filtered
  }

  render() {
    //Rajataan laululista haun perusteella
    var filtered = this.filterSongs()
    let songs = this.sortSongs(filtered)

    return (
      <div id="main">
          <div>
            <div id="songlist">
              <div id="songlist-container">
                <div id="filter-search-row">
                  <select id="filter-input" value={this.state.filter} onChange={this.handleFilter}>
                    <option>Kaikki</option>
                    {this.state.categories.map((category) =>(
                      <option key={category.number}>{category.category}</option>
                  ))}</select>
                  <div id="search-container">
                    <input id="search" value={this.search} required={true} onChange={this.handleChange}></input>
                    <p id="search-placeholder">Hae laulua</p>
                  </div>
                </div>
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
      let songs = await axios.get('/laulukirjaV4_2.json', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let categories = await axios.get('/kategoriat.json', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let songdata = songs.data
      let categorydata = categories.data
      //Lajitellaan laulut numeron perusteella
      this.setState({
        ...this.state,
        ...{
          songs: songdata,
          categories: categorydata
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default SonglistComponent;