import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const apiKey = "RGAPI-1c906d75-696b-46f2-b046-1870f69cb995";
const baseUrl = "https://na1.api.riotgames.com/lol/";
//summoner/v3/summoners/by-name/punk%20x%20pete?api_key=


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <SummonerSearch></SummonerSearch>
      </div>
    );
  }
}

class SummonerSearch extends Component {
  constructor(props){
    super(props);
    this.state = {sumName: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event ) => {
    this.setState({sumName: event.target.value});
  }

  handleSubmit(event){
    // prevent html submit page change
    console.log(this.state.sumName);
    event.preventDefault();

    console.log(apiKey);
    let myHeader = new Headers();
    myHeader.append('X-Riot-Token', 'RGAPI-1c906d75-696b-46f2-b046-1870f69cb995');

    const headers = {
      'X-Riot-Token': 'RGAPI-1c906d75-696b-46f2-b046-1870f69cb995',
    }
      // "Origin": "https://developer.riotgames.com",
      // "Access-Control-Allow-Origin": "*",
      // "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",

      // "Accept-Language": "en-US,en;q=0.9,es;q=0.8",
      // "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"


      fetch("https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/punkxpete?api_key=RGAPI-1c906d75-696b-46f2-b046-1870f69cb995")
        .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Error. Status Code: ' + response.status);
              return;
            }
            // Examine the text in the response
            response.json().then(function(data) {
              console.log(data);
            });
          })
          .catch(function(err) {
            console.log('Fetch Error :-S', err);
          });

    // axios.get(baseUrl + "summoner/v3/summoners/by-name/" + this.state.sumName,
    //   {header: headers}
    // )
    //   .then(function(response){
    //     console.log(response)
    //   })
    //   .catch(function(error){
    //       console.log(error);
    //   });
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
        Summoner Name:
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="submit" />
      </form>
    )
  }
}

export default App;
