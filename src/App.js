import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

// TODO: use https://mushroom.teemo.gg/8.2/ for resources
// TODO: add iconUrl to quickInfo
// TODO: use constants for queue types


const imgUrl = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"//LeeSin_0.jpg
// TODO:version might need to be updated per patch update
const iconUrl = "http://ddragon.leagueoflegends.com/cdn/8.2.1/img/profileicon/"//3262.png"

//gameID, then playerid
const matchUrl = "https://matchhistory.na.leagueoflegends.com/en/#match-details/NA1/"//2704428580/216172135"

class App extends Component {
  render() {
    return (
      <div className="App">
         <header className="App-header">
           <SummonerSearch />
        </header>
        <MainWrapper></MainWrapper>
      </div>
    );
  }
}

class MainWrapper extends Component{
    constructor(props){
      super(props);
      this.state = {gameData:[], loaded:false}
    }

    componentDidMount(){
      fetch('/fakeData')
      .then(response =>{ return response.json()})
      .then(data => {
        console.log(data);
        let gameData = []
        data[0].champ1 = Object.assign({}, data[2])
        data[0].champ2 = Object.assign({}, data[3])
        data[1].champ1 = Object.assign({}, data[4])
        data[1].champ2 = Object.assign({}, data[5])
        gameData.push(data[0])
        gameData.push(data[1])

        console.log("this is the state data");
        this.setState( {gameData : gameData, loaded:true})
        console.log(this.state.gameData);
      })
    }

    render(){
      let myElementReady = this.state.loaded
      let myElement = null;
      if(myElementReady){
        let quickInfo = this.state.gameData[0].quickInfo
        console.log("data is ready");
          myElement =
            <div>
              <SumInfo
                icon={"3262"} // TODO: this is hardcoded
                name={quickInfo.sumName} />
            <SumInfo
              icon={"588"}
              name={quickInfo.friend} />
          </div>

      } else {
        myElement = <p>Loading</p>
      console.log("data not ready");
      }

      return (
        <div>

        {/* <SumInfo gameData={this.state.gameData} quickInfo={this.state.gameData[0].quickInfo}></SumInfo> */}
        {myElement}
        <MatchList gameData={this.state.gameData}></MatchList>
        </div>
      )
    }
  }

function SumInfo (props){
  function showProps(){
    // console.log(props.gameData[0].quickInfo.sumIndex);
  }

  return (
    <div className="playerSummary">
      {/* <p>This is where the sum information goes like the name and icon</p> */}
      {/* <button onClick={showProps}> Click me </button> */}
    {/* <img src={this.props.gameData.participantIdentities.profileIcon}></img> */}
      {/* <p>{props..quickInfo}</p> */}
      <p>{props.name}</p>
    <img className="iconImage"src={iconUrl+props.icon+".png"} />
    </div>
  )
}

function MatchList(props) {
  return (
    <ul className="listContainer">
      {props.gameData.map( (match, index) => {
        return <Match key={index} idx={index} match={match}></Match>
      })}
    </ul>
  )
}




function Match (props){
  const checkWinColor =
    () => props.match.quickInfo.win === "Win" ? "blueGame" : "redGame";

  return (
    <div className={checkWinColor()}>
      <p>{props.match.quickInfo.win === "Win" ? "Victory" : "Defeat"}</p>
     <Player
       // playerName={props.match.quickInfo.sumName}
       lane={props.match.quickInfo.lane}
       champ={props.match.champ1.name}
       img={props.match.champ1.key}
       >
       </Player>
       <button><a target="_blank"
         href={matchUrl+props.match.gameId+'/'+
         props.match.participantIdentities[0].player.accountId}>Match Details</a></button>
       <Player
         // playerName={props.match.quickInfo.friend}
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
    <p> {props.lane} {props.champ}</p>
  <img src={imgUrl+props.img+"_0.jpg"} alt={props.img} title={props.img}/>
    {/* <h1>{props.player.name} </h1>
  <h1>{props.player.role} hey</h1>
<h1>{props.player.champion}</h1>
  <h1>{props.player.kd.k} / {props.player.kd.d} / {props.player.kd.a}</h1> */}
  </div>
  );
};

class SummonerSearch extends Component {
  constructor(props){
    super(props);
    this.state = {sum1:null, sum2:null};
  }

  render(){
    return (
      <div className="searchBarsDiv">
        <p>This is where the search bar will go</p>
      </div>
    )
  }
}

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
