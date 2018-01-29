import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const imgUrl = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"//LeeSin_0.jpg

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header> */}
        <MatchList></MatchList>
      </div>
    );
  }
}

class MatchList extends Component {
  constructor(props){
    super(props);
    this.state = {gameData:[]}
  }

  componentDidMount(){
    fetch('/fakeData')
    .then(response =>{ return response.json()})
    .then( (data) => {
      console.log(data);
      let matchInfo = []
      data[0].champ1 = Object.assign({}, data[2])
      data[0].champ2 = Object.assign({}, data[3])
      data[1].champ1 = Object.assign({}, data[4])
      data[1].champ2 = Object.assign({}, data[5])
      matchInfo.push(data[0])
      matchInfo.push(data[1])

      console.log("this is the state data");
      this.setState( {gameData : matchInfo})
      console.log(this.state.gameData);
    })
  }


  render(){
    return (
      <ul>
        {this.state.gameData.map( (match, index) => {
          return <Match key={index} idx={index} match={match}></Match>
        })}
      </ul>
    )
  }
}

function Match (props){

  return (
    <div>
      <p>{props.match.quickInfo.win}</p>
     <Player
       playerName={props.match.quickInfo.sumName}
       lane={props.match.quickInfo.lane}
       champ={props.match.champ1.name}
       img={props.match.champ1.key}
       >
       </Player>
       <Player
         playerName={props.match.quickInfo.friend}
         lane={props.match.quickInfo.friendLane}
         champ={props.match.champ2.name}
         img={props.match.champ2.key}
         >
         </Player>
  </div>
  )
}

function Player (props){
  return (
  <div className="playerClass">
    <p>{props.playerName} {props.lane} {props.champ}</p>
  <img src={imgUrl+props.img+"_0.jpg"} />
    {/* <h1>{props.player.name} </h1>
  <h1>{props.player.role} hey</h1>
<h1>{props.player.champion}</h1>
  <h1>{props.player.kd.k} / {props.player.kd.d} / {props.player.kd.a}</h1> */}
  </div>
  );
};

// class SummonerSearch extends Component {
//   constructor(props){
//     super(props);
//     this.state = {sumName: ''};
//
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//
//
//   handleChange = (event ) => {
//     this.setState({sumName: event.target.value});
//   }
//
//   handleSubmit(event){
//     // prevent html submit page change
//     console.log(this.state.sumName);
//     event.preventDefault();
//
//     let myHeader = new Headers();
//     myHeader.append('X-Riot-Token', 'RGAPI-1c906d75-696b-46f2-b046-1870f69cb995');
//
//     const headers = {
//       'X-Riot-Token': 'RGAPI-1c906d75-696b-46f2-b046-1870f69cb995',
//     }
//       // "Origin": "https://developer.riotgames.com",
//       // "Access-Control-Allow-Origin": "*",
//       // "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
//
//       // "Accept-Language": "en-US,en;q=0.9,es;q=0.8",
//       // "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"
//
//
//       fetch("https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/punkxpete?api_key=RGAPI-1c906d75-696b-46f2-b046-1870f69cb995")
//         .then(
//           function(response) {
//             if (response.status !== 200) {
//               console.log('Error. Status Code: ' + response.status);
//               return;
//             }
//             // Examine the text in the response
//             response.json().then(function(data) {
//               console.log(data);
//             });
//           })
//           .catch(function(err) {
//             console.log('Fetch Error :-S', err);
//           });
//
//     // axios.get(baseUrl + "summoner/v3/summoners/by-name/" + this.state.sumName,
//     //   {header: headers}
//     // )
//     //   .then(function(response){
//     //     console.log(response)
//     //   })
//     //   .catch(function(error){
//     //       console.log(error);
//     //   });
//   }
//
//   render () {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//         Summoner Name:
//         <input type="text" value={this.state.value} onChange={this.handleChange} />
//         </label>
//         <input type="submit" value="submit" />
//       </form>
//     )
//   }
// }

export default App;
