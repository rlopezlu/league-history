import React, { Component } from 'react';
import './App.css';
let queues = [];

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
      this.state = {gameData:[], loaded:false, queues:false}
    }

    componentDidMount(){

      fetch('/queues')
      .then(response => {return response.json()})
      .then(data => {
        queues = data;
        console.log(queues);
        this.setState({queues:true})
      });

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
      let myJsonReady = this.state.queues
      let myElement = null;
      if(myElementReady && myJsonReady){
        let quickInfo = this.state.gameData[0].quickInfo
        console.log("data is ready");
          myElement =
            <div className="resultDiv">
              <div className="bothSums">
              <SumInfo
                icon={"3262"} // TODO: this is hardcoded
                name={quickInfo.sumName} />
            <SumInfo
              icon={"588"}
              name={quickInfo.friend} />
            </div>
            <MatchList gameData={this.state.gameData}></MatchList>
          </div>
      } else {
        myElement = <p>Loading</p>
      console.log("data not ready");
      }

      return (
        <div>
          {myElement}
        </div>
      )
    }
  }


function SumInfo (props){
  return (
    <div className="sumInfo">
      <p>{props.name}</p>
    <img className="iconImage" alt={props.icon} src={iconUrl+props.icon+".png"} />
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

    const getQueue =
      (queueId) => {return queues[queueId].name}

    const matchDate =
      (millis) => {
        let myDate = new Date(millis)

        return myDate.getMonth()+1+"/"+myDate.getDate()+"/"+myDate.getFullYear()
      }

      const matchLength =
        (seconds) => {
          return Math.floor(seconds / 60)
        }

  return (
    <div className={"match " + checkWinColor()}>

     <Player
       lane={props.match.quickInfo.lane}
       champ={props.match.champ1.name}
       img={props.match.champ1.key}
       stats={props.match.participants[props.match.quickInfo.sumIndex-1].stats}
     />
   <div className="matchInfo">
      <p>{props.match.quickInfo.win === "Win" ? "Victory" : "Defeat"}</p>
    <p>Date: { matchDate(props.match.gameCreation)}</p>
  <p>Length: {matchLength(props.match.gameDuration)} minutes</p>
<button className="myButton"><a
         target="_blank"
         href={matchUrl+props.match.gameId+'/'+
          props.match.participantIdentities[0].player.accountId}>Match Details</a></button>
       <p>Queue: {getQueue(props.match.queueId)}</p>
      </div>
       <Player
         lane={props.match.quickInfo.friendLane}
         champ={props.match.champ2.name}
         img={props.match.champ2.key}
         stats={props.match.participants[props.match.quickInfo.friendIndex-1].stats}
       />
  </div>
  )
}

function Player (props){
  const formatLane = (lane) => {
    return lane.charAt(0)+ lane.slice(1).toLowerCase()
  }

  return (
  <div className="playerClass">
    <p> {formatLane(props.lane)} - {props.champ}</p>
    <img src={imgUrl+props.img+"_0.jpg"} alt={props.img} title={props.img}/>
<p>Champ Lvl: {props.stats.champLevel}</p>
  <p>KDA: {props.stats.kills} / {props.stats.deaths} / {props.stats.assists}</p>
    <p>CS: {props.stats.totalMinionsKilled + props.stats.neutralMinionsKilled}</p>

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
//}
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
