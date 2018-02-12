import React, { Component } from 'react';
import './App.css';
let queues = [];
let champions = [];

// TODO: use https://mushroom.teemo.gg/8.2/ for resources
function errorCatching(response){
  if(!response.ok){
    throw Error(response.statusText)
  }
  return response;
}

const imgUrl = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"//LeeSin_0.jpg
// TODO:version might need to be updated per patch update
// TODO: get iconUrl version from request /lol/static-data/v3/versions
const iconUrl = "http://ddragon.leagueoflegends.com/cdn/8.3.1/img/profileicon/"//3262.png"

// TODO: make this work with other regions as well
//gameID, then playerid
const matchUrl = "https://matchhistory.na.leagueoflegends.com/en/#match-details/NA1/"//2704428580/216172135"

class App extends Component{
    constructor(props){
      super(props);
      this.state = {
        gameData:[],
        loaded:false,
        queues:false,
        champions:false,
        region:'NA1',
        testID: 50308642
      }
    }

    regions = [
      ["BR" , "BR1"],
      ["EUNE", "EUN1"],
      ["EUW", "EUW1"],
      ["JP" ,"JP1"],
      ["KR" ,"KR"],
      ["LAN", "LA1"],
      ["LAS", "LA2"],
      ["NA" ,"NA1"],
      ["OCE", "OC1"],
      ["TR" ,"TR1"],
      ["RU" ,"RU"],
      ["PBE", "PBE1"],
    ]

    componentDidMount(){

      fetch('/queues')
      .then(response => {return response.json()})
      .then(data => {
        queues = data;
        console.log("got queue data");
        this.setState({queues:true})
      });

      fetch('/champions')
      .then(response => {return response.json()})
      .then(data =>{
        champions = data;
        console.log("got champion data")
        this.setState({champions: true})
      })

      // fetch('/demoData')
      // .then(response =>{ return response.json()})
      // .then(data => {
      //   console.log("got match history data");
      //   this.setState( {gameData : data, loaded:true})
      //   // console.log(this.state.gameData);
      // })
    }

    getPlayerInfo = (name) =>{
      fetch(`/sumNameId/${this.state.region}/${name}`)
      .then(response => {return response.json()})
      .then(data => {
        this.setState({playerInfo:data})
        console.log(data);
      })
    }

    getRegion = (e) =>{
      this.setState({region: e.target.value})
    }

    showParentState = () =>{
      console.log("showing updated State");
      console.log(this.state.region);
      let url = `/teamMatches/${this.state.region}/${this.state.testID}`
      // let url="/demoData"
      console.log(url);
      fetch(url)
      .then(response =>{ return response.json()})
      .then(data => {
        console.log("got match history data");
        console.log(data);
        this.setState({
          gameData : data,
          loaded:true,
          friend: {
            id:209891246,
            name:"KraveMyGameCube"
          }
        },
        console.log("data", this.state.gameData))
      })
    }

    //get both summoner names from input fields
    parentSubmitHandler = (value) => {
      console.log(`passed up value is "${value}"`);
        this.getPlayerInfo(value);
    }

    render(){//conditional rendering of app
      let myElement = null;
      if(this.state.loaded && this.state.queues && this.state.champions){
        let playerInfo = this.state.gameData.mainUser;
        console.log("all data is ready, render app");
        console.log(playerInfo);
          myElement =
            <div className="resultDiv">
              <div className="bothSums">
                {/*  TODO some icon have very different sizes*/}
                <SumInfo
                  icon={playerInfo.icon}
                  name={playerInfo.name} />
              </div>
              <TeamMates members={this.state.gameData.commonPlayers}/>
              <MatchList
                matches={this.state.gameData.matches}
                friend={this.state.friend}
                player={this.state.gameData.mainUser}
              />
            </div>
      } else {
        myElement = <p>Loading</p>
      console.log("data not ready, do not render");
      }

      return (
        <div className="App">
          <header className="App-header">
            <SummonerSearch
              parentSubmitHandler={this.parentSubmitHandler}
              regionHandler={this.getRegion}
              selectedRegion={this.state.region}
              regions={this.regions}
            />
            <button onClick={this.showParentState}>Show State</button>
          </header>
          {myElement}
        </div>
      )
    }
  }

function TeamMates(props){
    return (
      props.members.map(member => {
        return <SingleTeamMate
          key={member.name}
          name={member.name}
          icon={member.icon}
          id={member.id}
          count={member.count}/>
      })
    )
}

function SingleTeamMate(props){
  return(
    <div className="teamMember">
      <p>{props.name}</p>
      <img className="iconImageTeamMates" alt={props.icon} src={iconUrl+props.icon+".png"} />
      <p>{props.count} games</p>
    </div>
  )
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
  //return only matches where friend played
  function filteredList(matches){
    console.log("matches");
    // console.log(matches);
    let filtered =  matches.filter((match, index) => {
      console.log(match.playersObj);
      return match.playersObj.hasOwnProperty(props.friend.name)
    })
    console.log("filtered");
    console.log(filtered);
    return filtered;
  }

  return (
    <ul className="listContainer">
      {filteredList(props.matches).map((match, index) => {
        return <Match
          friend={props.friend}
          player={props.player}
          key={match.gameId}
          idx={index}
          match={match}></Match>
      })}
    </ul>
  )
}

function Match (props){
  const checkWinColor =
    () => props.match.team.win === "Win" ? "blueGame" : "redGame";

    const getQueue =
      (queueId) => {return queues[queueId].name}

    const matchDate =
      (millis) => {
        console.log("this was used to make the date",millis)
        let myDate = new Date(millis)
        return myDate.getMonth()+1+"/"+myDate.getDate()+"/"+myDate.getFullYear()
      }

      const matchLength =
        (seconds) => {return Math.floor(seconds / 60)}

        const findChamp = (champId) => {
          let myChamp = champions.find(x => {
            return x.id === champId
          })
          console.log(myChamp);
          return myChamp;
        }

      let player1 = props.match.playersObj[props.player.name][0]
      let player2 = props.match.playersObj[props.friend.name][0]

  return (
    <div className={"match " + checkWinColor()}>

      <Player
        lane={player1.lane}
        champion={findChamp(player1.championId)}
        stats={player1.stats}
      />
      <div className="matchInfo">
        <p>{props.match.team.win === "Win" ? "Victory" : "Defeat"}</p>
        <p>Date: {matchDate(props.match.gameCreation)}</p>
        <p>Length: {matchLength(props.match.length)} minutes</p>
        <button className="myButton"><a
          target="_blank"
          href={matchUrl+props.match.gameId+'/'+
          props.friend.id}>Match Details</a>
        </button>
        <p>Queue: {getQueue(props.match.queue)}</p>
      </div>
      <Player
        lane={player2.lane}
        // champ={props.match.champ2.name}
        champion={findChamp(player2.championId)}
        // img={props.match.champ2.key}
        stats={player2.stats}
      />
    </div>
  )
}

function Player (props){
  let pStats = props.stats;
  //lane (role) is all caps, so make it Caps instead
  const formatLane = (lane) => {
    return lane.charAt(0)+ lane.slice(1).toLowerCase()
  }

  return (
  <div className="playerClass">
    <p> {formatLane(props.lane)} - {props.champion.name}</p>
    <img src={imgUrl+props.champion.alias+"_0.jpg"} alt={props.img} title={props.img} />
    <p>Champ Lvl: {pStats.champLevel}</p>
    <p>KDA: {pStats.kills} / {pStats.deaths} / {pStats.assists}</p>
    <p>CS: {pStats.totalMinionsKilled + pStats.neutralMinionsKilled}</p>
  </div>
  );
};


class SearchBar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      inputVal:"",
      validated:"invalid",
      formatted:""
    }
  }

  handleChange = (e) => {
    this.setState({inputVal:e.target.value})
    let str = e.target.value.replace(/\s+/g, '');
    // TODO: figure out how to use unicode letters in regex
    // let re = /^[0-9\\p{L}_\\.]+$/u;
    let re = /^[A-Za-z._0-9]+$/;
    if(re.test(str) ===true) {
      console.log("valid " + str);
      this.setState({
        validated: "valid",
        formatted: str
      })
    } else{
      console.log("invalid "+str);
      this.setState({validated:"invalid"})
    }
  }

  handleSubmit = (e) => {
    e.preventDefault(); //prevent redirect from form submission
    console.log("there was a form submit");
    this.props.parentSubmitHandler(this.state.formatted)
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input type ="text" value={this.state.inputVal} placeholder="Summoner Name" onChange={this.handleChange}></input>
        <button disabled={this.state.validated !== "valid"} type="submit">Search for Summoner</button>
      </form>
    )
  }
}

// TODO: make this component hold state for all input
class SummonerSearch extends Component{
  constructor(props){
    super(props);
    this.state = {
      sum1Name:"",
      sum2Name:""
    }
  }



  // handleChange = (e) => {
  //   console.log("changing the value to ", e.target.value);
  //   this.setState({region:e.target.value})
  // }

  render(){
    return(
      <div className="searchBarsDiv">
        <p>Enter your in game summoner name, and a friend's</p>
        <p>Region</p>
        <select value={this.props.selectedRegion} onChange={this.props.regionHandler}>
          {this.props.regions.map(region => {
            return <option value={region[1]} key={region[0]}>{region[0]}</option>
          })}
        </select>
        <SearchBar parentSubmitHandler = {this.props.parentSubmitHandler}/>
      </div>
    )
  }
}

export default App;
